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
          Source documents, supplier references, web links and image references used to seed the MVP.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Source
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Owner / Supplier
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sources.map((source) => (
              <tr key={source.id}>
                <td className="px-4 py-4">
                  <p className="font-medium text-slate-950">{source.title}</p>
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block text-sm text-blue-700 hover:underline"
                    >
                      Open web source
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-slate-500">{source.local_file_name}</p>
                  )}
                  {source.notes && <p className="mt-2 text-sm text-slate-500">{source.notes}</p>}
                </td>
                <td className="px-4 py-4 text-sm text-slate-700">{source.source_type}</td>
                <td className="px-4 py-4 text-sm text-slate-700">
                  {source.source_owner || "—"}
                  {source.supplier ? (
                    <span className="block text-slate-500">{source.supplier}</span>
                  ) : null}
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {source.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
