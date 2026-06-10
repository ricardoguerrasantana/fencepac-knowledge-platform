import Link from "next/link";
import { getSourceBySlug } from "@/lib/data/knowledge";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ProductTypeRecord = {
  id: string;
  slug: string;
  name: string;
  category: string;
  system_type: string;
  short_description: string;
  source_status: string;
};

type ProductSourceRecord = {
  relationship_type: string;
  note: string | null;
  product_types: ProductTypeRecord | null;
};

function StatusBadge({ value }: { value: string }) {
  const isDraft = value.includes("draft") || value.includes("needs_review");
  const classes = isDraft
    ? "bg-amber-50 text-amber-700"
    : value.includes("company")
      ? "bg-emerald-50 text-emerald-700"
      : "bg-slate-100 text-slate-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${classes}`}>
      {value}
    </span>
  );
}

export default async function SourceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const source = await getSourceBySlug(slug);
  const linkedSystems = (source.product_sources || []) as ProductSourceRecord[];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/sources" className="text-sm font-medium text-slate-500 hover:text-slate-950">
        ← Back to sources
      </Link>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <StatusBadge value={source.source_type} />
          <StatusBadge value={source.status} />
          {source.is_confidential ? <StatusBadge value="confidential" /> : null}
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
          {source.title}
        </h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Source owner</p>
            <p className="mt-1 text-slate-600">{source.source_owner || "Unknown"}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Supplier / reference</p>
            <p className="mt-1 text-slate-600">{source.supplier || "Not specified"}</p>
          </div>
        </div>

        {source.notes && (
          <div className="mt-4 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Notes</p>
            <p className="mt-1 text-slate-600">{source.notes}</p>
          </div>
        )}

        {source.url ? (
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Open web source
          </a>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Local file placeholder</p>
            <p className="mt-1 text-sm text-slate-600">
              {source.local_file_name || "No local file linked yet"}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Later, approved files can be stored in Supabase Storage or linked from SharePoint/OneDrive.
            </p>
          </div>
        )}

        <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Source status matters. Supplier brochures and seeded records are references only until reviewed against Fencepac requirements and project-specific documents.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-slate-950">Linked retaining wall systems</h2>
        <p className="mt-2 text-sm text-slate-600">
          These are the wall system pages that currently use this source as evidence or reference material.
        </p>

        {linkedSystems.length > 0 ? (
          <div className="mt-4 grid gap-4">
            {linkedSystems.map((link) => {
              const product = link.product_types;

              if (!product) return null;

              return (
                <Link
                  key={`${product.id}-${link.relationship_type}`}
                  href={`/wall-systems/${product.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge value={link.relationship_type} />
                    <StatusBadge value={product.source_status} />
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-slate-950">{product.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{product.short_description}</p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    {product.system_type}
                  </p>

                  {link.note && (
                    <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                      {link.note}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            No retaining wall systems linked yet.
          </div>
        )}
      </section>
    </main>
  );
}
