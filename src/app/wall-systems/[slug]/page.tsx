export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { getProductTypeBySlug } from "@/lib/data/knowledge";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type SourceRecord = {
  id: string;
  title: string;
  source_type: string;
  source_owner: string | null;
  supplier: string | null;
  url: string | null;
  local_file_name: string | null;
  status: string;
  notes: string | null;
  slug: string;
};

type ProductSourceRecord = {
  relationship_type: string;
  note: string | null;
  sources: SourceRecord | null;
};

type EvidenceNoteRecord = {
  id: string;
  title: string;
  body: string;
  evidence_type: string;
  page_reference: string | null;
  section_reference: string | null;
  confidence: string;
  review_status: string;
  sources: SourceRecord | null;
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

function SourceCard({ productSource }: { productSource: ProductSourceRecord }) {
  const source = productSource.sources;

  if (!source) return null;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {source.source_type}
        </span>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {productSource.relationship_type}
        </span>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          {source.status}
        </span>
      </div>

      <Link
        href={`/sources/${source.slug}`}
        className="mt-4 block text-lg font-semibold text-slate-950 hover:text-blue-700"
      >
        {source.title}
      </Link>

      <p className="mt-2 text-sm text-slate-600">
        {source.source_owner || "Unknown owner"}
        {source.supplier ? ` · ${source.supplier}` : ""}
      </p>

      {productSource.note && (
        <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
          {productSource.note}
        </p>
      )}

      {source.notes && <p className="mt-3 text-sm text-slate-500">{source.notes}</p>}

      {source.url ? (
        <a
          href={source.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex text-sm font-medium text-blue-700 hover:underline"
        >
          Open web source →
        </a>
      ) : (
        <p className="mt-4 text-sm font-medium text-slate-500">
          Local file: {source.local_file_name || "Not linked yet"}
        </p>
      )}
    </article>
  );
}

function EvidenceNoteCard({ note }: { note: EvidenceNoteRecord }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {note.evidence_type}
        </span>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          confidence: {note.confidence}
        </span>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          {note.review_status}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-950">{note.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{note.body}</p>

      <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
        <p>
          <strong>Source:</strong>{" "}
          {note.sources ? (
            <Link href={`/sources/${note.sources.slug}`} className="text-blue-700 hover:underline">
              {note.sources.title}
            </Link>
          ) : (
            "No source linked"
          )}
        </p>

        {note.page_reference && (
          <p className="mt-1">
            <strong>Page/reference:</strong> {note.page_reference}
          </p>
        )}

        {note.section_reference && (
          <p className="mt-1">
            <strong>Section:</strong> {note.section_reference}
          </p>
        )}
      </div>
    </article>
  );
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductTypeBySlug(slug);
  const productSources = (product.product_sources || []) as ProductSourceRecord[];
  const evidenceNotes = (product.evidence_notes || []) as EvidenceNoteRecord[];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/wall-systems" className="text-sm font-medium text-slate-500 hover:text-slate-950">
        ← Back to wall systems
      </Link>

      

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={product.hero_image_path || "/images/wall-systems/concrete-crib-walls.svg"}
            alt={`${product.name} representative placeholder image`}
            width={1200}
            height={760}
            className="h-72 w-full object-cover"
            priority
          />
        </div>
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

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-slate-950">Evidence notes</h2>
          <p className="mt-2 text-sm text-slate-600">
            Draft source-backed notes for this retaining wall system. These are review items, not final engineering instructions.
          </p>
        </div>

        {evidenceNotes.length > 0 ? (
          <div className="grid gap-4">
            {evidenceNotes.map((note) => (
              <EvidenceNoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            No evidence notes yet.
          </div>
        )}
      </section>

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-slate-950">Linked sources</h2>
          <p className="mt-2 text-sm text-slate-600">
            Source cards show the documents, webpages or image references behind this wall system.
          </p>
        </div>

        {productSources.length > 0 ? (
          <div className="grid gap-4">
            {productSources.map((productSource) => (
              <SourceCard
                key={`${productSource.relationship_type}-${productSource.sources?.id}`}
                productSource={productSource}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            No linked sources yet.
          </div>
        )}
      </section>
    </main>
  );
}
