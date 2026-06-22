export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  getGlossaryTerms,
  getProductTypes,
  getSources,
  getTrainingModules,
  getEvidenceNotes,
} from "@/lib/data/knowledge";

export default async function HomePage() {
  const [products, sources, glossaryTerms, trainingModules, evidenceNotes] = await Promise.all([
    getProductTypes(),
    getSources(),
    getGlossaryTerms(),
    getTrainingModules(),
    getEvidenceNotes(),
  ]);

  const stats = [
    { label: "Wall systems", value: products.length, href: "/wall-systems" },
    { label: "Sources", value: sources.length, href: "/sources" },
    { label: "Glossary terms", value: glossaryTerms.length, href: "/glossary" },
    { label: "Training modules", value: trainingModules.length, href: "/training" },
    { label: "Evidence notes", value: evidenceNotes.length, href: "/evidence" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Local MVP</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          Fencepac Knowledge Platform
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          A source-backed retaining wall knowledge browser for wall systems, source documents,
          glossary terms and training content.
        </p>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          MVP warning: this app is not engineering advice. Content is seeded for review and must be
          checked against project-specific drawings, supplier documentation and supervisor direction.
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">{stat.value}</p>
          </Link>
        ))}
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        <Link
          href="/wall-systems"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-slate-950">Browse retaining wall systems</h2>
          <p className="mt-2 text-sm text-slate-600">
            Start with system types like crib walls, gabions, MSE walls, sleeper walls and segmental
            block walls.
          </p>
        </Link>

        <Link
          href="/training"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-slate-950">Open training module</h2>
          <p className="mt-2 text-sm text-slate-600">
            Review the first Retaining Wall Basics module and use it as the prototype training path.
          </p>
        </Link>

        <Link
          href="/governance"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-slate-950">Check governance dashboard</h2>
          <p className="mt-2 text-sm text-slate-600">
            Review source status, evidence review status, confidence levels and MVP readiness.
          </p>
        </Link>
      </section>
    </main>
  );
}
