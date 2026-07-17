"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as tus from "tus-js-client";
import type { ReplaceSourceFileResult } from "./actions";

type SourceFileReplacementProps = {
  sourceId: string;
  currentFileName: string | null;
  currentFileSize: number | null;
  action: (
    formData: FormData
  ) => Promise<ReplaceSourceFileResult>;
};

type UploadPhase =
  | "idle"
  | "preparing"
  | "uploading"
  | "saving";

type PreparedUpload = {
  sourceId: string;
  bucket: string;
  storagePath: string;
  originalFileName: string;
  contentType: string;
  fileSize: number;
  token: string;
  apiKey: string;
  uploadEndpoint: string;
};

const MAX_FILE_SIZE_BYTES = 250 * 1024 * 1024;
const TUS_CHUNK_SIZE_BYTES = 6 * 1024 * 1024;

function formatFileSize(size: number | null) {
  if (!size) {
    return "Size not recorded";
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

async function prepareUpload(
  file: File
): Promise<PreparedUpload> {
  const response = await fetch("/api/source-uploads/prepare", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName: file.name,
      contentType:
        file.type || "application/octet-stream",
      fileSize: file.size,
    }),
  });

  const data = (await response.json().catch(() => null)) as
    | PreparedUpload
    | { error?: string }
    | null;

  if (!response.ok) {
    throw new Error(
      data && "error" in data && data.error
        ? data.error
        : "Could not prepare the replacement upload."
    );
  }

  return data as PreparedUpload;
}

function uploadWithTus(
  file: File,
  prepared: PreparedUpload,
  onProgress: (percentage: number) => void
) {
  return new Promise<void>((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint: prepared.uploadEndpoint,
      retryDelays: [0, 3000, 5000, 10000, 20000],

      headers: {
        apikey: prepared.apiKey,
        "x-signature": prepared.token,
      },

      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,

      metadata: {
        bucketName: prepared.bucket,
        objectName: prepared.storagePath,
        contentType: prepared.contentType,
        cacheControl: "3600",
      },

      chunkSize: TUS_CHUNK_SIZE_BYTES,

      onError(error) {
        reject(error);
      },

      onProgress(bytesUploaded, bytesTotal) {
        const percentage =
          bytesTotal > 0
            ? Math.round(
                (bytesUploaded / bytesTotal) * 100
              )
            : 0;

        onProgress(percentage);
      },

      onSuccess() {
        onProgress(100);
        resolve();
      },
    });

    upload.start();
  });
}

export function SourceFileReplacement({
  sourceId,
  currentFileName,
  currentFileSize,
  action,
}: SourceFileReplacementProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [phase, setPhase] =
    useState<UploadPhase>("idle");

  const [uploadProgress, setUploadProgress] =
    useState(0);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const [warningMessage, setWarningMessage] =
    useState<string | null>(null);

  const isWorking = phase !== "idle";

  async function handleReplaceFile() {
    if (isWorking) {
      return;
    }

    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setErrorMessage(
        "Select a replacement file first."
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(
        "The maximum source file size is 250 MB."
      );
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setWarningMessage(null);
    setUploadProgress(0);

    try {
      setPhase("preparing");

      const prepared = await prepareUpload(file);

      setPhase("uploading");

      await uploadWithTus(
        file,
        prepared,
        setUploadProgress
      );

      setPhase("saving");

      const formData = new FormData();

      formData.set("source_id", sourceId);
      formData.set(
        "replacement_upload_id",
        prepared.sourceId
      );
      formData.set(
        "storage_bucket",
        prepared.bucket
      );
      formData.set(
        "storage_path",
        prepared.storagePath
      );
      formData.set(
        "original_file_name",
        prepared.originalFileName
      );
      formData.set(
        "file_mime_type",
        prepared.contentType
      );
      formData.set(
        "file_size_bytes",
        String(prepared.fileSize)
      );

      const result = await action(formData);

      if (!result.success) {
        throw new Error(result.message);
      }

      setSuccessMessage(result.message);
      setWarningMessage(result.warning || null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setPhase("idle");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not replace the source file."
      );

      setPhase("idle");
    }
  }

  const buttonLabel =
    phase === "preparing"
      ? "Preparing replacement…"
      : phase === "uploading"
        ? `Uploading ${uploadProgress}%`
        : phase === "saving"
          ? "Saving replacement…"
          : "Replace uploaded file";

  return (
    <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <h3 className="text-base font-semibold text-slate-950">
        Replace uploaded file
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        Current file:{" "}
        <span className="font-medium">
          {currentFileName || "File name not recorded"}
        </span>
        {" · "}
        {formatFileSize(currentFileSize)}
      </p>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        The replacement is uploaded and verified before
        the source record changes. The previous object is
        removed only after the replacement has been saved.
      </p>

      <label className="mt-5 block">
        <span className="text-sm font-semibold text-slate-700">
          Replacement file
        </span>

        <input
          ref={fileInputRef}
          type="file"
          disabled={isWorking}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.jpg,.jpeg,.png,.webp,.dwg,.dxf"
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white disabled:opacity-60"
        />
      </label>

      {phase === "uploading" ? (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Uploading replacement</span>
            <span>{uploadProgress}%</span>
          </div>

          <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-950 transition-all"
              style={{
                width: `${uploadProgress}%`,
              }}
            />
          </div>
        </div>
      ) : null}

      {errorMessage ? (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
        >
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div
          role="status"
          className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
        >
          {successMessage}
        </div>
      ) : null}

      {warningMessage ? (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-amber-300 bg-white p-4 text-sm text-amber-900"
        >
          {warningMessage}
        </div>
      ) : null}

      <button
        type="button"
        disabled={isWorking}
        onClick={handleReplaceFile}
        className="mt-5 rounded-xl bg-amber-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {buttonLabel}
      </button>
    </section>
  );
}
