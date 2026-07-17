import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const SOURCE_FILE_BUCKET = "source-files";
const MAX_FILE_SIZE_BYTES = 250 * 1024 * 1024;

type PrepareUploadBody = {
  fileName?: unknown;
  contentType?: unknown;
  fileSize?: unknown;
};

function safeFileName(value: string) {
  const cleaned = value
    .trim()
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return cleaned || "source-file";
}

function getResumableUploadEndpoint() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!rawUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL.");
  }

  const url = new URL(rawUrl);

  if (url.hostname.endsWith(".supabase.co")) {
    const projectRef = url.hostname.split(".")[0];

    return `https://${projectRef}.storage.supabase.co/storage/v1/upload/resumable/sign`;
  }

  // Local Supabase fallback.
  return `${url.origin}/storage/v1/upload/resumable/sign`;
}

export async function POST(request: Request) {
  let body: PrepareUploadBody;

  try {
    body = (await request.json()) as PrepareUploadBody;
  } catch {
    return NextResponse.json(
      { error: "Request body must contain valid JSON." },
      { status: 400 }
    );
  }

  const fileName =
    typeof body.fileName === "string" ? body.fileName.trim() : "";

  const contentType =
    typeof body.contentType === "string" && body.contentType.trim()
      ? body.contentType.trim()
      : "application/octet-stream";

  const fileSize =
    typeof body.fileSize === "number" ? body.fileSize : Number(body.fileSize);

  if (!fileName) {
    return NextResponse.json(
      { error: "A file name is required." },
      { status: 400 }
    );
  }

  if (!Number.isFinite(fileSize) || fileSize <= 0) {
    return NextResponse.json(
      { error: "A valid file size is required." },
      { status: 400 }
    );
  }

  if (fileSize > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { error: "The maximum source file size is 250 MB." },
      { status: 413 }
    );
  }

  const sourceId = randomUUID();
  const originalFileName = safeFileName(fileName);
  const storagePath = `${sourceId}/${originalFileName}`;

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.storage
    .from(SOURCE_FILE_BUCKET)
    .createSignedUploadUrl(storagePath, {
      upsert: false,
    });

  if (error || !data?.token) {
    console.error("Could not prepare source upload:", error);

    return NextResponse.json(
      { error: "Could not prepare the source file upload." },
      { status: 500 }
    );
  }

  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!publishableKey) {
    return NextResponse.json(
      { error: "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    sourceId,
    bucket: SOURCE_FILE_BUCKET,
    storagePath,
    originalFileName,
    contentType,
    fileSize,
    token: data.token,
    apiKey: publishableKey,
    uploadEndpoint: getResumableUploadEndpoint(),
  });
}
