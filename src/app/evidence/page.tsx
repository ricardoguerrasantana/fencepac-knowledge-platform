import Link from "next/link";
import { getEvidenceNotes } from "@/lib/data/knowledge";

type EvidencePageProps = {
  searchParams: Promise<{
    status?: string;
    confidence?: string;
  }>;
};

type LinkedWallSystem = {
  slug: string;
  name: string;
};

type LinkedSource = {
  slug: string;
  title: string;
};

type EvidenceNote = {
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
  product_types: LinkedWallSystem | null;
  sources: LinkedSource | null;
};

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Needs review", value: "needs_review" },
  { label: "Reviewed", value: "reviewed" },
  { label: "Superseded", value: "superseded" },
  { label: "Draft", value: "draft" },
];

const confidenceFilters = [
  { label: "Any confidence", value: "all" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

function getStatusBadgeClass(status: string) {
  if (status === "reviewed") return "bg-emerald-50 text-emerald-700";
  if (status === "superseded") return "bg-slate-100 text-slate-700";
  if (status === "draft") return "bg-blue-50 text-blue-700";
  return "bg-amber-50 text-amber-700";
}

function buildFilterHref(status: string, confidence: string) {
  const params = new URLSearchParams();

  if (status !== "all") {
    params.set("status", status);
  }

  if (confidence !== "all") {
    params.set("confidence", confidence);
  }

  const query = params.toString();
  return query ? `/evidence?${query}` : "/evidence";
}

export default async function EvidencePage({ searchParams }: EvidencePageProps) {
  const params = await searchParams;

  const selectedStatus = params.status || "all";
  const selectedConfidence = params.confidence || "all";

  const notes = (await getEvidenceNotes({
    reviewStatus: selectedStatus,
    confidence: selectedConfidence,
  })) as EvidenceNote[];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">Controlled knowledge</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Evidence Library
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Browse source-backed evidence notes across all retaining wall systems. Reviewed notes can
          be used as stronger internal knowledge, while draft and needs-review notes remain warnings.
        </p>
      </div>

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-slate-700">Review status</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {statusFilters.map((filter) => (
              <Link
                key={filter.value}
                href={buildFilterHref(filter.value, selectedConfidence)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  selectedStatus === filter.value
                    ? "bg-slate-950 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {filter.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold text-slate-700">Confidence</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {confidenceFilters.map((filter) => (
              <Link
                key={filter.value}
                href={buildFilterHref(selectedStatus, filter.value)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  selectedConfidence === filter.value
                    ? "bg-slate-950 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {filter.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <p className="mb-4 text-sm text-slate-600">
        Showing <strong>{notes.length}</strong> evidence note{notes.length === 1 ? "" : "s"}.
      </p>

      {notes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600">
          No evidence notes match this filter.
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
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(
                    note.review_status
                  )}`}
                >
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

              {note.review_decision_note && (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                  <p className="font-semibold">Review decision note</p>
                  <p className="mt-1">{note.review_decision_note}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
