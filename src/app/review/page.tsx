import Link from "next/link";
import { getEvidenceNotesForReview } from "@/lib/data/knowledge";

export default async function ReviewQueuePage() {
  const notes = await getEvidenceNotesForReview();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">Controlled knowledge</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Review Queue
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Evidence notes that need human review before they can be treated as reliable company knowledge.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        AI-assisted or seeded content must stay in review until checked against source documents,
        project-specific drawings, supplier documentation and supervisor direction.
      </div>

      {notes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600">
          No evidence notes currently need review.
        </div>
      ) : (
        <div className="grid gap-4">
          {notes.map((note) => (
            <article
              key={note.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {note.evidence_type}
                </span>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  {note.review_status}
                </span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  confidence: {note.confidence}
                </span>
              </div>

              <h2 className="mt-4 text-xl font-semibold text-slate-950">{note.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{note.body}</p>

              <div className="mt-4 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-slate-700">Wall system</p>
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
                  <p className="font-semibold text-slate-700">Source</p>
                  {note.sources ? (
                    <Link
                      href={`/sources/${note.sources.slug}`}
                      className="mt-1 block text-blue-700 hover:underline"
                    >
                      {note.sources.title}
                    </Link>
                  ) : (
                    <p className="mt-1">No source linked</p>
                  )}
                </div>

                <div>
                  <p className="font-semibold text-slate-700">Page/reference</p>
                  <p className="mt-1">{note.page_reference || "Not specified"}</p>
                </div>

                <div>
                  <p className="font-semibold text-slate-700">Section</p>
                  <p className="mt-1">{note.section_reference || "Not specified"}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
