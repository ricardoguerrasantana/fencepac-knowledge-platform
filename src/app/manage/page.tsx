import Link from "next/link";

export const dynamic = "force-dynamic";

const manageSections = [
  {
    title: "Manage wall systems",
    description:
      "Add, edit and archive retaining wall system records, including descriptions, components, risks, QA checks and images.",
    href: "/manage/wall-systems",
    status: "Next",
  },
  {
    title: "Manage sources",
    description:
      "Add source records, upload documents, link web references and manage downloadable files for internal use.",
    href: "/manage/sources",
    status: "Planned",
  },
  {
    title: "Manage evidence notes",
    description:
      "Create and edit source-backed evidence notes, confidence levels, review status and links to wall systems.",
    href: "/manage/evidence",
    status: "Planned",
  },
  {
    title: "Manage glossary",
    description:
      "Add and refine plain-English definitions for technical terms used across the knowledge platform.",
    href: "/manage/glossary",
    status: "Planned",
  },
  {
    title: "Manage training content",
    description:
      "Edit lessons, quiz questions and competency checklist content once the core knowledge records are editable.",
    href: "/manage/training",
    status: "Later",
  },
];

export default function ManagePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Internal administration</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Manage Knowledge
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Use this area to maintain wall systems, sources, evidence notes, glossary terms and
          training content as the knowledge base is reviewed and improved.
        </p>

        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          Changes made here affect what team members see in the knowledge platform. Source-backed
          content should still be checked against project-specific drawings, supplier documentation,
          supervisor direction and company approval before being treated as reliable guidance.
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        {manageSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-semibold text-slate-950">{section.title}</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {section.status}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">{section.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
