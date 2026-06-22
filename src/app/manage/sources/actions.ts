"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const SOURCE_FILE_BUCKET = "source-files";

function requiredText(formData: FormData, key: string) {
  const value = formData.get(key)?.toString().trim();

  if (!value) {
    throw new Error(`Missing required field: ${key}`);
  }

  return value;
}

function optionalText(formData: FormData, key: string) {
  const value = formData.get(key)?.toString().trim();
  return value || null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function safeFileName(value: string) {
  const cleaned = value
    .trim()
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, "-");

  return cleaned || "source-file";
}

function normaliseUrl(value: string | null) {
  if (!value) {
    return null;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `https://${value}`;
}

export async function createSource(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const id = randomUUID();
  const title = requiredText(formData, "title");
  const providedSlug = optionalText(formData, "slug");
  const sourceKind = requiredText(formData, "source_kind");
  const sourceType = requiredText(formData, "source_type");
  const status = requiredText(formData, "status");
  const externalUrl = normaliseUrl(optionalText(formData, "external_url"));
  const file = formData.get("source_file");

  const slugBase = providedSlug ? slugify(providedSlug) : slugify(title);
  const slug = `${slugBase}-${id.slice(0, 8)}`;

  const basePayload = {
    id,
    slug,
    title,
    source_type: sourceType,
    source_kind: sourceKind,
    status,
    source_owner: optionalText(formData, "source_owner"),
    supplier: optionalText(formData, "supplier"),
    notes: optionalText(formData, "notes"),
    is_confidential: formData.get("is_confidential") === "on",
    url: sourceKind === "external_link" ? externalUrl : null,
    external_url: sourceKind === "external_link" ? externalUrl : null,
    local_file_name: null as string | null,
    storage_bucket: null as string | null,
    storage_path: null as string | null,
    original_file_name: null as string | null,
    file_mime_type: null as string | null,
    file_size_bytes: null as number | null,
    uploaded_at: null as string | null,
  };

  if (sourceKind === "external_link" && !externalUrl) {
    throw new Error("External link sources require a URL.");
  }

  if (sourceKind === "uploaded_file") {
    if (!(file instanceof File) || file.size === 0) {
      throw new Error("Uploaded file sources require a file.");
    }

    const originalFileName = safeFileName(file.name);
    const storagePath = `${id}/${originalFileName}`;
    const fileBody = new Uint8Array(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(SOURCE_FILE_BUCKET)
      .upload(storagePath, fileBody, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    basePayload.local_file_name = originalFileName;
    basePayload.storage_bucket = SOURCE_FILE_BUCKET;
    basePayload.storage_path = storagePath;
    basePayload.original_file_name = originalFileName;
    basePayload.file_mime_type = file.type || "application/octet-stream";
    basePayload.file_size_bytes = file.size;
    basePayload.uploaded_at = new Date().toISOString();
  }

  const { error } = await supabase.from("sources").insert(basePayload);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/sources");
  revalidatePath(`/sources/${slug}`);
  revalidatePath("/manage");
  revalidatePath("/manage/sources");
  revalidatePath("/governance");

  redirect("/manage/sources");
}
