import Link from "next/link";
import { getProductTypeBySlug } from "@/lib/data/knowledge";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function ListSection({ title, items }: { title: string; items: string[] | null }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductTypeBySlug(slug);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/products" className="text-sm font-medium text-slate-500 hover:text-slate-950">
        ← Back to products
      </Link>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4 flex flex-wrap gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {product.category}
          </span>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            {product.source_status}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-950">{product.name}</h1>
        <p className="mt-3 text-lg text-slate-600">{product.short_description}</p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-700">System type</p>
          <p className="mt-1 text-slate-600">{product.system_type}</p>
        </div>

        {product.typical_use && (
          <div className="mt-4 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Typical use</p>
            <p className="mt-1 text-slate-600">{product.typical_use}</p>
          </div>
        )}

        <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Draft knowledge page. This is not engineering advice and must be checked against the
          project-specific design, drawings, supplier documentation and supervisor direction.
        </p>
      </div>

      <div className="mt-6 grid gap-5">
        <ListSection title="Key components" items={product.key_components} />
        <ListSection title="Installation basics" items={product.installation_basics} />
        <ListSection title="QA checks" items={product.qa_checks} />
        <ListSection title="Common risks" items={product.common_risks} />
      </div>
    </main>
  );
}
