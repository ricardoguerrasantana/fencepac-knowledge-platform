export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { getProductTypes } from "@/lib/data/knowledge";

export default async function WallSystemsPage() {
  const products = await getProductTypes();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">Fencepac Knowledge Platform</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Retaining wall systems
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Browse retaining wall systems by system type. Supplier brands and brochures are stored as
          sources underneath each system type.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/wall-systems/${product.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-4 overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={product.hero_image_path || "/images/wall-systems/concrete-crib-walls.svg"}
                alt={`${product.name} placeholder image`}
                width={1200}
                height={760}
                className="h-44 w-full object-cover"
              />
            </div>
            
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {product.category}
              </span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                {product.source_status}
              </span>
            </div>

            <h2 className="text-lg font-semibold text-slate-950">{product.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{product.short_description}</p>

            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
              {product.system_type}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
