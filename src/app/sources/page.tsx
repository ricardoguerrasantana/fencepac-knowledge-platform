import Link from "next/link";
import { getSources } from "@/lib/data/knowledge";

export default async function SourcesPage() {
  const sources = await getSources();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">Source register</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Sources
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Documents, webpages, supplier references and image records used as evidence for the retaining wall systems.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {sources.map((source) => (
          <Link
            key={source.id}
            href={`/sources/${source.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {source.source_type}
              </span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                {source.status}
              </span>
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-950">{source.title}</h2>

            <p className="mt-2 text-sm text-slate-600">
              {source.source_owner || "Unknown owner"}
              {source.supplier ? ` · ${source.supplier}` : ""}
            </p>

            {source.notes && <p className="mt-3 text-sm text-slate-500">{source.notes}</p>}

            <p className="mt-4 text-sm font-medium text-slate-500">
              Open source record →
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
