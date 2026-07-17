"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as tus from "tus-js-client";

type CreateSourceResult =
  | {
      success: true;
      slug: string;
    }
  | {
      success: false;
      message: string;
    };

type SourceFormProps = {
  action: (formData: FormData) => Promise<CreateSourceResult>;
  submitLabel: string;
};

type SourceKind =
  | "manual_reference"
  | "external_link"
  | "uploaded_file";

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

const sourceKindOptions = [
  { value: "manual_reference", label: "Manual reference" },
  { value: "external_link", label: "External link" },
  { value: "uploaded_file", label: "Uploaded file" },
];

const sourceTypeOptions = [
  { value: "pdf", label: "PDF" },
  { value: "docx", label: "DOCX" },
  { value: "image", label: "Image" },
  { value: "web", label: "Web" },
  { value: "email", label: "Email" },
  { value: "manual", label: "Manual" },
  { value: "drawing", label: "Drawing" },
  { value: "other", label: "Other" },
];

const statusOptions = [
  { value: "needs_review", label: "Needs review" },
  { value: "external_reference", label: "External reference" },
  { value: "company_source", label: "Company source" },
  {
    value: "draft_not_for_construction",
    label: "Draft / not for construction",
  },
  { value: "reviewed", label: "Reviewed" },
  { value: "superseded", label: "Superseded" },
];

function TextInput({
  label,
  name,
  required = false,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        type={type}
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-950"
      />
    </label>
  );
}

async function prepareUpload(file: File): Promise<PreparedUpload> {
  const response = await fetch("/api/source-uploads/prepare", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type || "application/octet-stream",
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
        : "Could not prepare the file upload."
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
            ? Math.round((bytesUploaded / bytesTotal) * 100)
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

export function SourceForm({
  action,
  submitLabel,
}: SourceFormProps) {
  const router = useRouter();

  const [sourceKind, setSourceKind] =
    useState<SourceKind>("manual_reference");

  const [sourceType, setSourceType] = useState("manual");
  const [phase, setPhase] = useState<UploadPhase>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSubmitting = phase !== "idle";

  function handleSourceKindChange(value: SourceKind) {
    setSourceKind(value);

    if (value === "manual_reference") {
      setSourceType("manual");
    }

    if (value === "external_link") {
      setSourceType("web");
    }

    if (value === "uploaded_file") {
      setSourceType("pdf");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setErrorMessage(null);
    setUploadProgress(0);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      if (sourceKind === "uploaded_file") {
        const file = formData.get("source_file");

        if (!(file instanceof File) || file.size === 0) {
          throw new Error("Select a source file to upload.");
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
          throw new Error("The maximum source file size is 250 MB.");
        }

        setPhase("preparing");

        const prepared = await prepareUpload(file);

        setPhase("uploading");

        await uploadWithTus(file, prepared, setUploadProgress);

        formData.set("uploaded_source_id", prepared.sourceId);
        formData.set("storage_bucket", prepared.bucket);
        formData.set("storage_path", prepared.storagePath);
        formData.set("original_file_name", prepared.originalFileName);
        formData.set("file_mime_type", prepared.contentType);
        formData.set("file_size_bytes", String(prepared.fileSize));
      }

      // The file must never be sent through the Server Action.
      formData.delete("source_file");

      setPhase("saving");

      const result = await action(formData);

      if (!result.success) {
        throw new Error(result.message);
      }

      router.push("/manage/sources");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not create the source."
      );

      setPhase("idle");
    }
  }

  const buttonLabel =
    phase === "preparing"
      ? "Preparing upload…"
      : phase === "uploading"
        ? `Uploading ${uploadProgress}%`
        : phase === "saving"
          ? "Saving source…"
          : submitLabel;

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">
          Source details
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <TextInput
            label="Title"
            name="title"
            required
            placeholder="Supplier brochure, project drawing or internal reference"
          />

          <TextInput
            label="Slug"
            name="slug"
            placeholder="optional-readable-url-slug"
          />

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Source kind
            </span>

            <select
              name="source_kind"
              value={sourceKind}
              onChange={(event) =>
                handleSourceKindChange(
                  event.target.value as SourceKind
                )
              }
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-950"
            >
              {sourceKindOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Source type
            </span>

            <select
              name="source_type"
              value={sourceType}
              onChange={(event) => setSourceType(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-950"
            >
              {sourceTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Status
            </span>

            <select
              name="status"
              defaultValue="needs_review"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-950"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <TextInput
            label="Supplier"
            name="supplier"
            placeholder="Geofabrics, National Masonry, Fencepac"
          />

          <TextInput
            label="Source owner"
            name="source_owner"
            placeholder="Supplier, project team or internal team"
          />

          {sourceKind === "external_link" ? (
            <TextInput
              label="External URL"
              name="external_url"
              type="url"
              required
              placeholder="https://example.com/source"
            />
          ) : null}
        </div>

        {sourceKind === "uploaded_file" ? (
          <div className="mt-5">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Upload source file
              </span>

              <input
                name="source_file"
                type="file"
                required
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.jpg,.jpeg,.png,.webp,.dwg,.dxf"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
              />
            </label>

            <p className="mt-2 text-sm text-slate-500">
              Maximum file size: 250 MB. Large files upload directly
              to private Supabase Storage.
            </p>

            {phase === "uploading" ? (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Uploading source file</span>
                  <span>{uploadProgress}%</span>
                </div>

                <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-slate-950 transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        <label className="mt-5 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <input
            name="is_confidential"
            type="checkbox"
            className="mt-1"
          />

          <span>
            <span className="block text-sm font-semibold text-slate-700">
              Mark as confidential
            </span>

            <span className="mt-1 block text-sm leading-6 text-slate-500">
              Use this for internal, commercial, project-specific or
              supplier-restricted information.
            </span>
          </span>
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-slate-700">
            Notes
          </span>

          <textarea
            name="notes"
            rows={4}
            placeholder="Internal comments about this source and how it should be reviewed."
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-slate-950"
          />
        </label>
      </section>

      {errorMessage ? (
        <div
          role="alert"
          className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
        >
          {errorMessage}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {buttonLabel}
        </button>

        <a
          href="/manage/sources"
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
