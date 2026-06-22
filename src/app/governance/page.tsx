export const dynamic = "force-dynamic";

import Link from "next/link";
import { getGovernanceDashboardData } from "@/lib/data/knowledge";

type SourceRecord = {
  id: string;
  status: string;
  source_type: string;
  is_confidential: boolean;
};

type EvidenceNoteRecord = {
  id: string;
  review_status: string;
  confidence: string;
  evidence_type: string;
};

type TrainingModuleRecord = {
  id: string;
  module_status: string;
};

type WallSystemRecord = {
  id: string;
  source_status: string;
};

function countBy<T extends Record<string, unknown>>(items: T[], key: keyof T) {
  return items.reduce<Record<string, number>>((acc, item) => {
    const value = String(item[key] || "unknown");
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href?: string;
}) {
  const content = (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="block transition hover:-translate-y-0.5 hover:shadow-md">
      {content}
    </Link>
  );
}

function CountList({
  title,
  counts,
}: {
  title: string;
  counts: Record<string, number>;
}) {
  const entries = Object.entries(counts).sort(([a], [b]) => a.localeCompare(b));

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>

      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No records yet.</p>
      ) : (
        <div className="mt-4 divide-y divide-slate-100">
          {entries.map(([label, count]) => (
            <div key={label} className="flex items-center justify-between gap-4 py-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {label}
              </span>
              <span className="text-sm font-semibold text-slate-950">{count}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ReadinessItem({
  label,
  description,
  complete,
}: {
  label: string;
  description: string;
  complete: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span
          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            complete ? "bg-emerald-700 text-white" : "bg-amber-100 text-amber-800"
          }`}
        >
          {complete ? "✓" : "!"}
        </span>

        <div>
          <h3 className="font-semibold text-slate-950">{label}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default async function GovernancePage() {
  const data = await getGovernanceDashboardData();

  const sources = data.sources as SourceRecord[];
  const evidenceNotes = data.evidenceNotes as EvidenceNoteRecord[];
  const trainingModules = data.trainingModules as TrainingModuleRecord[];
  const wallSystems = data.wallSystems as WallSystemRecord[];

  const sourceStatusCounts = countBy(sources, "status");
  const sourceTypeCounts = countBy(sources, "source_type");
  const evidenceStatusCounts = countBy(evidenceNotes, "review_status");
  const evidenceConfidenceCounts = countBy(evidenceNotes, "confidence");
  const evidenceTypeCounts = countBy(evidenceNotes, "evidence_type");
  const trainingStatusCounts = countBy(trainingModules, "module_status");
  const wallSystemStatusCounts = countBy(wallSystems, "source_status");

  const reviewedEvidenceCount = evidenceStatusCounts.reviewed || 0;
  const needsReviewEvidenceCount = evidenceStatusCounts.needs_review || 0;
  const supersededEvidenceCount = evidenceStatusCounts.superseded || 0;
  const lowConfidenceCount = evidenceConfidenceCounts.low || 0;
  const companySourceCount = sourceStatusCounts.company_source || 0;
  const externalSourceCount = sourceStatusCounts.external_reference || 0;

  const readinessItems = [
    {
      label: "Wall systems exist",
      description: "The MVP has seeded retaining wall system records.",
      complete: wallSystems.length > 0,
    },
    {
      label: "Sources are registered",
      description: "The MVP has source records linked to wall systems.",
      complete: sources.length > 0,
    },
    {
      label: "Evidence notes exist",
      description: "The MVP has source-backed evidence notes.",
      complete: evidenceNotes.length > 0,
    },
    {
      label: "Review workflow is active",
      description: "Evidence can move through needs review, reviewed and superseded states.",
      complete: reviewedEvidenceCount > 0 || needsReviewEvidenceCount > 0 || supersededEvidenceCount > 0,
    },
    {
      label: "Training module exists",
      description: "The MVP includes at least one training module with lessons and quiz.",
      complete: trainingModules.length > 0,
    },
    {
      label: "Not everything is verified",
      description: "This is expected in the MVP. Needs-review and external-reference content should remain clearly marked.",
      complete: needsReviewEvidenceCount > 0 || externalSourceCount > 0,
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">MVP control centre</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Governance Dashboard
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Monitor source status, evidence review status, confidence levels and MVP readiness.
          This dashboard helps show whether the knowledge base is controlled or still draft.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Wall systems" value={wallSystems.length} href="/wall-systems" />
        <StatCard label="Sources" value={sources.length} href="/sources" />
        <StatCard label="Evidence notes" value={evidenceNotes.length} href="/evidence" />
        <StatCard label="Training modules" value={trainingModules.length} href="/training" />
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Reviewed evidence" value={reviewedEvidenceCount} href="/evidence?status=reviewed" />
        <StatCard label="Needs review" value={needsReviewEvidenceCount} href="/review" />
        <StatCard label="Low confidence" value={lowConfidenceCount} href="/evidence?confidence=low" />
        <StatCard label="Company sources" value={companySourceCount} href="/sources" />
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <CountList title="Sources by status" counts={sourceStatusCounts} />
        <CountList title="Sources by type" counts={sourceTypeCounts} />
        <CountList title="Evidence by review status" counts={evidenceStatusCounts} />
        <CountList title="Evidence by confidence" counts={evidenceConfidenceCounts} />
        <CountList title="Evidence by type" counts={evidenceTypeCounts} />
        <CountList title="Training modules by status" counts={trainingStatusCounts} />
        <CountList title="Wall systems by source status" counts={wallSystemStatusCounts} />
      </section>

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-slate-950">MVP readiness checklist</h2>
          <p className="mt-2 text-sm text-slate-600">
            This is a practical readiness check for the local MVP. It is not a formal compliance claim.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {readinessItems.map((item) => (
            <ReadinessItem
              key={item.label}
              label={item.label}
              description={item.description}
              complete={item.complete}
            />
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
        <h2 className="font-semibold">Governance note</h2>
        <p className="mt-2">
          This dashboard supports internal control of source-backed knowledge, but the MVP should not
          claim ISO certification, engineering approval or public release readiness. Supplier and
          seeded content still needs human review before being treated as company knowledge.
        </p>
      </section>
    </main>
  );
}
