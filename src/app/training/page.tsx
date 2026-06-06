import Link from "next/link";
import { getTrainingModules } from "@/lib/data/knowledge";

export default async function TrainingPage() {
  const modules = await getTrainingModules();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">Prototype training</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Training modules
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Training content is currently seeded as draft material for review.
        </p>
      </div>

      <div className="grid gap-5">
        {modules.map((module) => (
          <Link
            key={module.id}
            href={`/training/${module.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-950">{module.title}</h2>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                {module.module_status}
              </span>
            </div>

            <p className="mt-3 text-slate-600">{module.description}</p>
            <p className="mt-4 text-sm font-medium text-slate-500">
              Estimated time: {module.estimated_minutes} minutes
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
