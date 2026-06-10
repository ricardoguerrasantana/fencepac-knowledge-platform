import { getGlossaryTerms } from "@/lib/data/knowledge";

export default async function GlossaryPage() {
  const terms = await getGlossaryTerms();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">Training reference</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Glossary
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Plain-English retaining wall terms for team members learning wall systems and site language.
        </p>
      </div>

      <div className="grid gap-4">
        {terms.map((term) => (
          <article
            key={term.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-950">{term.term}</h2>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                {term.source_status}
              </span>
            </div>

            <p className="mt-3 text-slate-700">{term.plain_definition}</p>

            {term.technical_note && (
              <p className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                {term.technical_note}
              </p>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
