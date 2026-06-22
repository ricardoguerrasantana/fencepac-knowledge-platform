export const dynamic = "force-dynamic";

import Link from "next/link";
import { searchKnowledge } from "@/lib/data/knowledge";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() || "";
  const results = await searchKnowledge(query);

  const totalResults =
    results.products.length + results.sources.length + results.glossaryTerms.length;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">Knowledge search</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Search retaining wall knowledge
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Search across retaining wall systems, source records and glossary terms.
        </p>
      </div>

      <form action="/search" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <label htmlFor="q" className="text-sm font-medium text-slate-700">
          Search term
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id="q"
            name="q"
            defaultValue={query}
            placeholder="Try gabion, geogrid, sleeper, drainage, surcharge..."
            className="min-h-11 flex-1 rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-900"
          />
          <button
            type="submit"
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Search
          </button>
        </div>
      </form>

      {!query ? (
        <section className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-950">Start with a keyword</h2>
          <p className="mt-2 text-sm text-slate-600">
            Good first searches: gabion, geogrid, crib, sleeper, drainage, surcharge, MSE, RSS.
          </p>
        </section>
      ) : (
        <section className="mt-6">
          <p className="text-sm text-slate-600">
            Found <strong>{totalResults}</strong> result{totalResults === 1 ? "" : "s"} for{" "}
            <strong>{query}</strong>.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Retaining wall systems
              </h2>
              <div className="mt-3 grid gap-3">
                {results.products.length > 0 ? (
                  results.products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/wall-systems/${product.slug}`}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                    >
                      <p className="font-semibold text-slate-950">{product.name}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {product.short_description}
                      </p>
                      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                        {product.system_type}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
                    No matching systems.
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-950">Sources</h2>
              <div className="mt-3 grid gap-3">
                {results.sources.length > 0 ? (
                  results.sources.map((source) => (
                    <article
                      key={source.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                          {source.source_type}
                        </span>
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                          {source.status}
                        </span>
                      </div>
                      <Link
                        href={`/sources/${source.slug}`}
                        className="mt-3 block font-semibold text-slate-950 hover:text-blue-700"
                      >
                        {source.title}
                      </Link>
                      <p className="mt-1 text-sm text-slate-600">
                        {source.source_owner || "Unknown owner"}
                        {source.supplier ? ` · ${source.supplier}` : ""}
                      </p>
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex text-sm font-medium text-blue-700 hover:underline"
                        >
                          Open web source →
                        </a>
                      ) : (
                        <p className="mt-3 text-sm text-slate-500">
                          {source.local_file_name || "No file linked yet"}
                        </p>
                      )}
                    </article>
                  ))
                ) : (
                  <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
                    No matching sources.
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-950">Glossary</h2>
              <div className="mt-3 grid gap-3">
                {results.glossaryTerms.length > 0 ? (
                  results.glossaryTerms.map((term) => (
                    <article
                      key={term.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <p className="font-semibold text-slate-950">{term.term}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {term.plain_definition}
                      </p>
                    </article>
                  ))
                ) : (
                  <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
                    No matching glossary terms.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
