import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type SourceRecord = {
  id: string;
  slug?: string | null;
  title?: string | null;
  source_type?: string | null;
  source_kind?: string | null;
  supplier?: string | null;
  publisher?: string | null;
  status?: string | null;
  external_url?: string | null;
  storage_bucket?: string | null;
  storage_path?: string | null;
  original_file_name?: string | null;
  file_mime_type?: string | null;
  file_size_bytes?: number | null;
  uploaded_at?: string | null;
  is_confidential?: boolean | null;
};

const sourceKindLabels: Record<string, string> = {
  manual_reference: "Manual reference",
  external_link: "External link",
  uploaded_file: "Uploaded file",
};

function displayText(value: unknown, fallback = "—") {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return fallback;
}

function formatFileSize(size: number | null | undefined) {
  if (!size) {
    return "—";
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function KindBadge({ value }: { value?: string | null }) {
  const kind = value || "manual_reference";

  const classes =
    kind === "uploaded_file"
      ? "bg-emerald-50 text-emerald-700"
      : kind === "external_link"
        ? "bg-blue-50 text-blue-700"
        : "bg-slate-100 text-slate-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${classes}`}>
      {sourceKindLabels[kind] || kind}
    </span>
  );
}

async function getSources() {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("sources")
    .select("*")
    .order("title", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []) as SourceRecord[];
}

export default async function ManageSourcesPage() {
  const sources = await getSources();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <Link href="/manage" className="text-sm font-medium text-slate-500 hover:text-slate-950">
        ← Back to Manage Knowledge
      </Link>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Manage Knowledge</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Manage sources
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Maintain source records used by wall systems, evidence notes and training content.
              Sources can be manual references, external links or uploaded files.
            </p>
          </div>

          <Link
            href="/manage/sources/new"
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Add source
          </Link>
        </div>

        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          Uploaded source files should remain unchanged. Use evidence notes and review status to
          capture interpretation, comments and company review decisions separately from the original
          document.
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-950">Current sources</h2>
          <p className="text-sm text-slate-500">
            {sources.length} record{sources.length === 1 ? "" : "s"}
          </p>
        </div>

        {sources.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600">
            No sources found.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Source
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Kind
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    File / link
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {sources.map((source) => {
                  const sourceKind = source.source_kind || "manual_reference";
                  const owner = source.supplier || source.publisher;
                  const publicHref = source.slug ? `/sources/${source.slug}` : null;

                  return (
                    <tr key={source.id} className="align-top">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-950">
                          {displayText(source.title, "Untitled source")}
                        </p>

                        <p className="mt-1 text-sm text-slate-600">
                          {displayText(owner, "No supplier/publisher recorded")}
                        </p>

                        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                          {displayText(source.source_type)}
                        </p>

                        {source.is_confidential ? (
                          <p className="mt-2 inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
                            Confidential
                          </p>
                        ) : null}
                      </td>

                      <td className="px-5 py-4">
                        <KindBadge value={sourceKind} />
                      </td>

                      <td className="px-5 py-4 text-sm leading-6 text-slate-600">
                        {sourceKind === "uploaded_file" ? (
                          <>
                            <p>{displayText(source.original_file_name, "Uploaded file")}</p>
                            <p className="text-xs text-slate-400">
                              {formatFileSize(source.file_size_bytes)}
                            </p>
                          </>
                        ) : sourceKind === "external_link" ? (
                          <p className="max-w-xs truncate">
                            {displayText(source.external_url, "External link")}
                          </p>
                        ) : (
                          <p>Manual record</p>
                        )}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {displayText(source.status)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          {publicHref ? (
                            <Link
                              href={publicHref}
                              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                              View
                            </Link>
                          ) : null}

                          <Link
                            href={`/manage/sources/${source.id}/edit`}
                            className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
