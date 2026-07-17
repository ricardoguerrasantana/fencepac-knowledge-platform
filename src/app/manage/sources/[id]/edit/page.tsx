import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { SourceEditForm } from "@/app/manage/sources/SourceEditForm";
import {
  replaceSourceFile,
  updateSourceMetadata,
} from "@/app/manage/sources/actions";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditSourcePage({
  params,
}: PageProps) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();

  const { data: source, error } = await supabase
    .from("sources")
    .select(`
      id,
      slug,
      title,
      source_type,
      source_kind,
      source_owner,
      supplier,
      url,
      external_url,
      status,
      notes,
      is_confidential,
      original_file_name,
      file_size_bytes
    `)
    .eq("id", id)
    .single();

  if (error || !source) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/manage/sources"
        className="text-sm font-medium text-slate-500 hover:text-slate-950"
      >
        ← Back to sources management
      </Link>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-slate-500">
          Manage sources
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Edit source
        </h1>

        <p className="mt-3 max-w-3xl text-slate-600">
          Update the source metadata, review status and access
          classification. Uploaded files remain unchanged until a
          replacement is explicitly uploaded.
        </p>
      </section>

      <SourceEditForm
        source={source}
        action={updateSourceMetadata}
        replaceFileAction={replaceSourceFile}
      />
    </main>
  );
}
