export const dynamic = "force-dynamic";

import Link from "next/link";
import { getSourceBySlug } from "@/lib/data/knowledge";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type WallSystemRecord = {
  id: string;
  slug: string;
  name: string;
  category: string;
  system_type: string;
  short_description: string;
  source_status: string;
};

type ProductSourceRecord = {
  relationship_type: string;
  note: string | null;
  product_types: WallSystemRecord | null;
};

type EvidenceNoteRecord = {
  id: string;
  title: string;
  body: string;
  evidence_type: string;
  review_status: string;
  confidence: string;
  page_reference: string | null;
  section_reference: string | null;
  reviewed_at: string | null;
  review_decision_note: string | null;
  product_types: WallSystemRecord | null;
};

function StatusBadge({ value }: { value: string }) {
  const isDraft = value.includes("draft") || value.includes("needs_review");
  const classes = isDraft
    ? "bg-amber-50 text-amber-700"
    : value.includes("company") || value === "reviewed"
      ? "bg-emerald-50 text-emerald-700"
      : value === "superseded"
        ? "bg-slate-100 text-slate-700"
        : "bg-blue-50 text-blue-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${classes}`}>
      {value}
    </span>
  );
}

function EvidenceNoteCard({ note }: { note: EvidenceNoteRecord }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap gap-2">
        <StatusBadge value={note.evidence_type} />
        <StatusBadge value={note.review_status} />
        <StatusBadge value={`confidence: ${note.confidence}`} />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-950">{note.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{note.body}</p>

      <div className="mt-4 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 sm:grid-cols-2">
        <div>
          <p className="font-semibold text-slate-700">Linked wall system</p>
          {note.product_types ? (
            <Link
              href={`/wall-systems/${note.product_types.slug}`}
              className="mt-1 block text-blue-700 hover:underline"
            >
              {note.product_types.name}
            </Link>
          ) : (
            <p className="mt-1">No wall system linked</p>
          )}
        </div>

        <div>
          <p className="font-semibold text-slate-700">Page / reference</p>
          <p className="mt-1">{note.page_reference || "Not specified"}</p>
        </div>

        <div>
          <p className="font-semibold text-slate-700">Section</p>
          <p className="mt-1">{note.section_reference || "Not specified"}</p>
        </div>

        <div>
          <p className="font-semibold text-slate-700">Reviewed at</p>
          <p className="mt-1">
            {note.reviewed_at ? new Date(note.reviewed_at).toLocaleString() : "Not reviewed"}
          </p>
        </div>
      </div>

      {note.review_decision_note && (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          <p className="font-semibold">Review decision note</p>
          <p className="mt-1">{note.review_decision_note}</p>
        </div>
      )}
    </article>
  );
}

export default async function SourceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const source = await getSourceBySlug(slug);
  const linkedSystems = (source.product_sources || []) as ProductSourceRecord[];
  const evidenceNotes = (source.evidence_notes || []) as EvidenceNoteRecord[];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/sources" className="text-sm font-medium text-slate-500 hover:text-slate-950">
        ← Back to sources
      </Link>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <StatusBadge value={source.source_type} />
          <StatusBadge value={source.status} />
          {source.is_confidential ? <StatusBadge value="confidential" /> : null}
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
          {source.title}
        </h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Source owner</p>
            <p className="mt-1 text-slate-600">{source.source_owner || "Unknown"}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Supplier / reference</p>
            <p className="mt-1 text-slate-600">{source.supplier || "Not specified"}</p>
          </div>
        </div>

        {source.notes && (
          <div className="mt-4 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Notes</p>
            <p className="mt-1 text-slate-600">{source.notes}</p>
          </div>
        )}

        {source.url ? (
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Open web source
          </a>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Local file placeholder</p>
            <p className="mt-1 text-sm text-slate-600">
              {source.local_file_name || "No local file linked yet"}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Later, approved files can be stored in Supabase Storage or linked from SharePoint/OneDrive.
            </p>
          </div>
        )}

        <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Source status matters. Supplier brochures and seeded records are references only until reviewed against Fencepac requirements and project-specific documents.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-slate-950">Evidence notes from this source</h2>
        <p className="mt-2 text-sm text-slate-600">
          These are the claims, notes or learning statements currently relying on this source.
        </p>

        {evidenceNotes.length > 0 ? (
          <div className="mt-4 grid gap-4">
            {evidenceNotes.map((note) => (
              <EvidenceNoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            No evidence notes linked to this source yet.
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-slate-950">Linked retaining wall systems</h2>
        <p className="mt-2 text-sm text-slate-600">
          These are the wall system pages that currently use this source as evidence or reference material.
        </p>

        {linkedSystems.length > 0 ? (
          <div className="mt-4 grid gap-4">
            {linkedSystems.map((link) => {
              const wallSystem = link.product_types;

              if (!wallSystem) return null;

              return (
                <Link
                  key={`${wallSystem.id}-${link.relationship_type}`}
                  href={`/wall-systems/${wallSystem.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge value={link.relationship_type} />
                    <StatusBadge value={wallSystem.source_status} />
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-slate-950">{wallSystem.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{wallSystem.short_description}</p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    {wallSystem.system_type}
                  </p>

                  {link.note && (
                    <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                      {link.note}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            No retaining wall systems linked yet.
          </div>
        )}
      </section>
    </main>
  );
}
