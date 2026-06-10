"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

type ReviewStatus = "draft" | "needs_review" | "reviewed" | "superseded";

const allowedStatuses = new Set<ReviewStatus>([
  "draft",
  "needs_review",
  "reviewed",
  "superseded",
]);

export async function updateEvidenceReviewStatus(formData: FormData) {
  const noteId = formData.get("noteId")?.toString();
  const reviewStatus = formData.get("reviewStatus")?.toString() as ReviewStatus | undefined;
  const reviewDecisionNote = formData.get("reviewDecisionNote")?.toString() || null;

  if (!noteId) {
    throw new Error("Missing evidence note ID.");
  }

  if (!reviewStatus || !allowedStatuses.has(reviewStatus)) {
    throw new Error("Invalid review status.");
  }

  const { error } = await supabase
    .from("evidence_notes")
    .update({
      review_status: reviewStatus,
      reviewed_at: reviewStatus === "reviewed" || reviewStatus === "superseded" ? new Date().toISOString() : null,
      review_decision_note: reviewDecisionNote,
    })
    .eq("id", noteId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/review");
  revalidatePath("/wall-systems");
}
