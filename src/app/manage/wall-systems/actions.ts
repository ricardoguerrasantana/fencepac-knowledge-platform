"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

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

function textareaToList(formData: FormData, key: string) {
  const value = formData.get(key)?.toString() || "";

  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildWallSystemPayload(formData: FormData) {
  const name = requiredText(formData, "name");
  const providedSlug = formData.get("slug")?.toString().trim();

  return {
    name,
    slug: providedSlug ? slugify(providedSlug) : slugify(name),
    category: requiredText(formData, "category"),
    system_type: requiredText(formData, "system_type"),
    short_description: requiredText(formData, "short_description"),
    typical_use: optionalText(formData, "typical_use"),
    key_components: textareaToList(formData, "key_components"),
    installation_basics: textareaToList(formData, "installation_basics"),
    qa_checks: textareaToList(formData, "qa_checks"),
    common_risks: textareaToList(formData, "common_risks"),
    source_status: requiredText(formData, "source_status"),
    hero_image_path: optionalText(formData, "hero_image_path"),
  };
}

export async function createWallSystem(formData: FormData) {
  const payload = buildWallSystemPayload(formData);

  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("product_types").insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/wall-systems");
  revalidatePath("/manage/wall-systems");
  revalidatePath("/governance");

  redirect("/manage/wall-systems");
}

export async function updateWallSystem(formData: FormData) {
  const id = requiredText(formData, "id");
  const originalSlug = requiredText(formData, "original_slug");
  const payload = buildWallSystemPayload(formData);

  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("product_types")
    .update(payload)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/wall-systems");
  revalidatePath(`/wall-systems/${originalSlug}`);
  revalidatePath(`/wall-systems/${payload.slug}`);
  revalidatePath("/manage/wall-systems");
  revalidatePath(`/manage/wall-systems/${id}/edit`);
  revalidatePath("/governance");

  redirect("/manage/wall-systems");
}
