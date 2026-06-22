import Link from "next/link";
import { createSource } from "../actions";
import { SourceForm } from "../SourceForm";

export const dynamic = "force-dynamic";

export default function NewSourcePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/manage/sources"
        className="text-sm font-medium text-slate-500 hover:text-slate-950"
      >
        ← Back to sources management
      </Link>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Manage sources</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Add source
        </h1>
        <p className="mt-3 text-slate-600">
          Add a manual reference, external link or uploaded document to the source register.
          Source files are preserved separately from evidence notes and review decisions.
        </p>
      </section>

      <SourceForm action={createSource} submitLabel="Create source" />
    </main>
  );
}
