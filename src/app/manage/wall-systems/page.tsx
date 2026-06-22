import Link from "next/link";
import { getProductTypes } from "@/lib/data/knowledge";

export const dynamic = "force-dynamic";

type WallSystemRecord = {
  id: string;
  slug: string;
  name: string;
  category: string;
  system_type: string;
  short_description: string;
  source_status: string;
  image_url: string | null;
};

function StatusBadge({ value }: { value: string }) {
  const classes =
    value === "reviewed" || value === "verified_company_knowledge"
      ? "bg-emerald-50 text-emerald-700"
      : value === "superseded" || value === "archived"
        ? "bg-slate-100 text-slate-700"
        : value === "draft" || value === "needs_review"
          ? "bg-amber-50 text-amber-700"
          : "bg-blue-50 text-blue-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${classes}`}>
      {value}
    </span>
  );
}

export default async function ManageWallSystemsPage() {
  const wallSystems = (await getProductTypes()) as WallSystemRecord[];

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
              Manage wall systems
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Review the retaining wall system records currently used across the knowledge
              platform. The next step will add create and edit forms from this area.
            </p>
          </div>

          <Link
            href="/manage/wall-systems/new"
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Add wall system
          </Link>
        </div>

        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          Changes to wall systems affect what team members see in the main catalogue, evidence
          library, search results and training pages. Keep source-backed content clearly marked until
          it has been reviewed.
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-950">
            Current wall systems
          </h2>
          <p className="text-sm text-slate-500">
            {wallSystems.length} record{wallSystems.length === 1 ? "" : "s"}
          </p>
        </div>

        {wallSystems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600">
            No wall systems found.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Wall system
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Category
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
                {wallSystems.map((wallSystem) => (
                  <tr key={wallSystem.id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-950">{wallSystem.name}</p>
                      <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
                        {wallSystem.short_description}
                      </p>
                      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                        {wallSystem.system_type}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {wallSystem.category}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge value={wallSystem.source_status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/wall-systems/${wallSystem.slug}`}
                          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          View
                        </Link>

                        <Link
                          href={`/manage/wall-systems/${wallSystem.id}/edit`}
                          className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
