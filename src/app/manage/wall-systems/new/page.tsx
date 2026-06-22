import Link from "next/link";
import { WallSystemForm } from "../WallSystemForm";
import { createWallSystem } from "../actions";

export const dynamic = "force-dynamic";

export default function NewWallSystemPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/manage/wall-systems"
        className="text-sm font-medium text-slate-500 hover:text-slate-950"
      >
        ← Back to wall systems management
      </Link>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Manage wall systems</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Add wall system
        </h1>
        <p className="mt-3 text-slate-600">
          Create a new retaining wall system record. Keep the status as needs review until the
          information has been checked.
        </p>
      </section>

      <WallSystemForm action={createWallSystem} submitLabel="Create wall system" />
    </main>
  );
}
