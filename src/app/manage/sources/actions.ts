"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const SOURCE_FILE_BUCKET = "source-files";

export type CreateSourceResult =
  | {
      success: true;
      slug: string;
    }
  | {
      success: false;
      message: string;
    };

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

function normaliseUrl(value: string | null) {
  if (!value) {
    return null;
  }

  const url =
    value.startsWith("http://") || value.startsWith("https://")
      ? value
      : `https://${value}`;

  new URL(url);

  return url;
}

export async function createSource(
  formData: FormData
): Promise<CreateSourceResult> {
  const supabase = getSupabaseAdmin();

  let uploadedBucket: string | null = null;
  let uploadedPath: string | null = null;

  try {
    const title = requiredText(formData, "title");
    const sourceKind = requiredText(formData, "source_kind");
    const sourceType = requiredText(formData, "source_type");
    const status = requiredText(formData, "status");

    if (
      !["manual_reference", "external_link", "uploaded_file"].includes(
        sourceKind
      )
    ) {
      throw new Error("Invalid source kind.");
    }

    const suppliedUploadId = optionalText(formData, "uploaded_source_id");

    const id =
      sourceKind === "uploaded_file"
        ? suppliedUploadId || requiredText(formData, "uploaded_source_id")
        : randomUUID();

    const providedSlug = optionalText(formData, "slug");
    const slugBase = providedSlug ? slugify(providedSlug) : slugify(title);
    const slug = `${slugBase}-${id.slice(0, 8)}`;

    const externalUrl =
      sourceKind === "external_link"
        ? normaliseUrl(optionalText(formData, "external_url"))
        : null;

    if (sourceKind === "external_link" && !externalUrl) {
      throw new Error("External link sources require a valid URL.");
    }

    let storageBucket: string | null = null;
    let storagePath: string | null = null;
    let originalFileName: string | null = null;
    let fileMimeType: string | null = null;
    let fileSizeBytes: number | null = null;
    let uploadedAt: string | null = null;

    if (sourceKind === "uploaded_file") {
      storageBucket = requiredText(formData, "storage_bucket");
      storagePath = requiredText(formData, "storage_path");
      originalFileName = requiredText(formData, "original_file_name");
      fileMimeType =
        optionalText(formData, "file_mime_type") ||
        "application/octet-stream";

      fileSizeBytes = Number(requiredText(formData, "file_size_bytes"));

      if (!Number.isFinite(fileSizeBytes) || fileSizeBytes <= 0) {
        throw new Error("Invalid uploaded file size.");
      }

      if (storageBucket !== SOURCE_FILE_BUCKET) {
        throw new Error("Invalid source storage bucket.");
      }

      const expectedStoragePath = `${id}/${originalFileName}`;

      if (storagePath !== expectedStoragePath) {
        throw new Error("Uploaded file path does not match the source record.");
      }

      uploadedBucket = storageBucket;
      uploadedPath = storagePath;

      const { data: storedObjects, error: listError } = await supabase.storage
        .from(storageBucket)
        .list(id, {
          limit: 100,
          search: originalFileName,
        });

      if (listError) {
        throw new Error(`Could not verify uploaded file: ${listError.message}`);
      }

      const objectExists = storedObjects?.some(
        (item) => item.name === originalFileName
      );

      if (!objectExists) {
        throw new Error(
          "The uploaded file could not be found in Supabase Storage."
        );
      }

      uploadedAt = new Date().toISOString();
    }

    const { error: insertError } = await supabase.from("sources").insert({
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

      url: externalUrl,
      external_url: externalUrl,

      local_file_name: originalFileName,
      storage_bucket: storageBucket,
      storage_path: storagePath,
      original_file_name: originalFileName,
      file_mime_type: fileMimeType,
      file_size_bytes: fileSizeBytes,
      uploaded_at: uploadedAt,
    });

    if (insertError) {
      throw new Error(insertError.message);
    }

    revalidatePath("/");
    revalidatePath("/sources");
    revalidatePath(`/sources/${slug}`);
    revalidatePath("/manage");
    revalidatePath("/manage/sources");
    revalidatePath("/governance");

    return {
      success: true,
      slug,
    };
  } catch (error) {
    if (uploadedBucket && uploadedPath) {
      const { error: cleanupError } = await supabase.storage
        .from(uploadedBucket)
        .remove([uploadedPath]);

      if (cleanupError) {
        console.error("Could not clean up uploaded source file:", cleanupError);
      }
    }

    const message =
      error instanceof Error ? error.message : "Could not create source.";

    console.error("Could not create source:", error);

    return {
      success: false,
      message,
    };
  }
}
