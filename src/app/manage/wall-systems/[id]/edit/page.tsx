import Link from "next/link";
import { getProductTypeById } from "@/lib/data/knowledge";
import { updateWallSystem } from "../../actions";
import { WallSystemForm } from "../../WallSystemForm";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditWallSystemPage({ params }: PageProps) {
  const { id } = await params;
  const wallSystem = await getProductTypeById(id);

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
          Edit wall system
        </h1>
        <p className="mt-3 text-slate-600">
          Update the wall system record. Changes will appear in the catalogue, search, evidence
          links and training pages.
        </p>
      </section>

      <WallSystemForm
        action={updateWallSystem}
        submitLabel="Save changes"
        wallSystem={wallSystem}
      />
    </main>
  );
}
