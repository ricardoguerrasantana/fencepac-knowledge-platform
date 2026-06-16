import { supabase } from "@/lib/supabase";

export async function getProductTypes() {
  const { data, error } = await supabase
    .from("product_types")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getProductTypeBySlug(slug: string) {
  const { data, error } = await supabase
    .from("product_types")
    .select(
      `
      *,
      product_sources (
        relationship_type,
        note,
        sources (*)
      ),
      evidence_notes (
        *,
        sources (*)
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getSources() {
  const { data, error } = await supabase
    .from("sources")
    .select("*")
    .order("title", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getGlossaryTerms() {
  const { data, error } = await supabase
    .from("glossary_terms")
    .select("*")
    .order("term", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTrainingModules() {
  const { data, error } = await supabase
    .from("training_modules")
    .select("*")
    .order("title", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getTrainingModuleBySlug(slug: string) {
  const { data, error } = await supabase
    .from("training_modules")
    .select(
      `
      *,
      training_lessons (*),
      quiz_questions (*)
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (data.training_lessons) {
    data.training_lessons.sort((a, b) => a.lesson_order - b.lesson_order);
  }

  if (data.quiz_questions) {
    data.quiz_questions.sort((a, b) => a.question_order - b.question_order);
  }

  return data;
}

export async function searchKnowledge(query: string) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return {
      products: [],
      sources: [],
      glossaryTerms: [],
    };
  }

  const pattern = `%${trimmedQuery}%`;

  const [productsResult, sourcesResult, glossaryResult] = await Promise.all([
    supabase
      .from("product_types")
      .select("*")
      .or(
        `name.ilike.${pattern},category.ilike.${pattern},system_type.ilike.${pattern},short_description.ilike.${pattern},typical_use.ilike.${pattern}`
      )
      .order("name", { ascending: true }),

    supabase
      .from("sources")
      .select("*")
      .or(
        `title.ilike.${pattern},source_owner.ilike.${pattern},supplier.ilike.${pattern},notes.ilike.${pattern},local_file_name.ilike.${pattern}`
      )
      .order("title", { ascending: true }),

    supabase
      .from("glossary_terms")
      .select("*")
      .or(
        `term.ilike.${pattern},plain_definition.ilike.${pattern},technical_note.ilike.${pattern}`
      )
      .order("term", { ascending: true }),
  ]);

  if (productsResult.error) {
    throw new Error(productsResult.error.message);
  }

  if (sourcesResult.error) {
    throw new Error(sourcesResult.error.message);
  }

  if (glossaryResult.error) {
    throw new Error(glossaryResult.error.message);
  }

  return {
    products: productsResult.data,
    sources: sourcesResult.data,
    glossaryTerms: glossaryResult.data,
  };
}

export async function getSourceBySlug(slug: string) {
  const { data, error } = await supabase
    .from("sources")
    .select(
      `
      *,
      product_sources (
        relationship_type,
        note,
        product_types (*)
      ),
      evidence_notes (
        *,
        product_types (*)
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getEvidenceNotesForReview() {
  const { data, error } = await supabase
    .from("evidence_notes")
    .select(
      `
      *,
      product_types (*),
      sources (*)
    `
    )
    .or("review_status.eq.needs_review,review_status.eq.draft,confidence.eq.low")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

type EvidenceNoteFilter = {
  reviewStatus?: string;
  confidence?: string;
};

export async function getEvidenceNotes(filters: EvidenceNoteFilter = {}) {
  let query = supabase
    .from("evidence_notes")
    .select(
      `
      *,
      product_types (*),
      sources (*)
    `
    )
    .order("created_at", { ascending: false });

  if (filters.reviewStatus && filters.reviewStatus !== "all") {
    query = query.eq("review_status", filters.reviewStatus);
  }

  if (filters.confidence && filters.confidence !== "all") {
    query = query.eq("confidence", filters.confidence);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getWallSystemsBySlugs(slugs: string[]) {
  if (slugs.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("product_types")
    .select("*")
    .in("slug", slugs)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getEvidenceNotesForWallSystemSlugs(slugs: string[]) {
  if (slugs.length === 0) {
    return [];
  }

  const wallSystems = await getWallSystemsBySlugs(slugs);
  const wallSystemIds = wallSystems.map((wallSystem) => wallSystem.id);

  if (wallSystemIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("evidence_notes")
    .select(
      `
      *,
      product_types (*),
      sources (*)
    `
    )
    .in("product_type_id", wallSystemIds)
    .order("review_status", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getGovernanceDashboardData() {
  const [sourcesResult, evidenceResult, trainingResult, wallSystemsResult] = await Promise.all([
    supabase.from("sources").select("*"),
    supabase.from("evidence_notes").select("*"),
    supabase.from("training_modules").select("*"),
    supabase.from("product_types").select("*"),
  ]);

  if (sourcesResult.error) {
    throw new Error(sourcesResult.error.message);
  }

  if (evidenceResult.error) {
    throw new Error(evidenceResult.error.message);
  }

  if (trainingResult.error) {
    throw new Error(trainingResult.error.message);
  }

  if (wallSystemsResult.error) {
    throw new Error(wallSystemsResult.error.message);
  }

  return {
    sources: sourcesResult.data,
    evidenceNotes: evidenceResult.data,
    trainingModules: trainingResult.data,
    wallSystems: wallSystemsResult.data,
  };
}
