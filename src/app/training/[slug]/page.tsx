import Link from "next/link";
import {
  getEvidenceNotesForWallSystemSlugs,
  getTrainingModuleBySlug,
  getWallSystemsBySlugs,
} from "@/lib/data/knowledge";
import { InteractiveQuiz } from "@/components/training/InteractiveQuiz";
import { CompetencyChecklist } from "@/components/training/CompetencyChecklist";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type TrainingLessonRecord = {
  id: string;
  lesson_order: number;
  title: string;
  summary: string;
  content: string;
  related_product_slugs: string[];
  source_status: string;
};

type QuizQuestionRecord = {
  id: string;
  question_order: number;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  source_status: string;
};

type WallSystemRecord = {
  id: string;
  slug: string;
  name: string;
  category: string;
  system_type: string;
  short_description: string;
  source_status: string;
};

type EvidenceNoteRecord = {
  id: string;
  title: string;
  body: string;
  evidence_type: string;
  review_status: string;
  confidence: string;
  page_reference: string | null;
  section_reference: string | null;
  product_types: WallSystemRecord | null;
  sources: {
    slug: string;
    title: string;
  } | null;
};

function StatusBadge({ value }: { value: string }) {
  const classes =
    value === "reviewed"
      ? "bg-emerald-50 text-emerald-700"
      : value === "superseded"
        ? "bg-slate-100 text-slate-700"
        : value === "draft" || value === "seeded" || value === "needs_review"
          ? "bg-amber-50 text-amber-700"
          : "bg-blue-50 text-blue-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${classes}`}>
      {value}
    </span>
  );
}

function LessonWallSystems({
  wallSystems,
}: {
  wallSystems: WallSystemRecord[];
}) {
  if (wallSystems.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
        No wall systems linked to this lesson yet.
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {wallSystems.map((wallSystem) => (
        <Link
          key={wallSystem.id}
          href={`/wall-systems/${wallSystem.slug}`}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white hover:shadow-sm"
        >
          <div className="flex flex-wrap gap-2">
            <StatusBadge value={wallSystem.source_status} />
          </div>
          <h4 className="mt-3 font-semibold text-slate-950">{wallSystem.name}</h4>
          <p className="mt-1 text-sm text-slate-600">{wallSystem.short_description}</p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-400">
            {wallSystem.system_type}
          </p>
        </Link>
      ))}
    </div>
  );
}

function LessonEvidenceNotes({
  evidenceNotes,
}: {
  evidenceNotes: EvidenceNoteRecord[];
}) {
  if (evidenceNotes.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
        No evidence notes linked to this lesson yet.
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-3">
      {evidenceNotes.map((note) => (
        <article
          key={note.id}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
        >
          <div className="flex flex-wrap gap-2">
            <StatusBadge value={note.evidence_type} />
            <StatusBadge value={note.review_status} />
            <StatusBadge value={`confidence: ${note.confidence}`} />
          </div>

          <h4 className="mt-3 font-semibold text-slate-950">{note.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-700">{note.body}</p>

          <div className="mt-3 text-sm text-slate-600">
            {note.product_types ? (
              <p>
                <strong>Wall system:</strong>{" "}
                <Link
                  href={`/wall-systems/${note.product_types.slug}`}
                  className="text-blue-700 hover:underline"
                >
                  {note.product_types.name}
                </Link>
              </p>
            ) : null}

            {note.sources ? (
              <p className="mt-1">
                <strong>Source:</strong>{" "}
                <Link
                  href={`/sources/${note.sources.slug}`}
                  className="text-blue-700 hover:underline"
                >
                  {note.sources.title}
                </Link>
              </p>
            ) : null}

            {(note.page_reference || note.section_reference) && (
              <p className="mt-1">
                <strong>Reference:</strong>{" "}
                {[note.page_reference, note.section_reference].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export default async function TrainingModulePage({ params }: PageProps) {
  const { slug } = await params;
  const trainingModule = await getTrainingModuleBySlug(slug);

  const lessons = trainingModule.training_lessons as TrainingLessonRecord[];
  const quizQuestions = trainingModule.quiz_questions as QuizQuestionRecord[];

  const relatedSlugs = Array.from(
    new Set(
      lessons.flatMap((lesson) => lesson.related_product_slugs || [])
    )
  );

  const [relatedWallSystems, relatedEvidenceNotes] = await Promise.all([
    getWallSystemsBySlugs(relatedSlugs),
    getEvidenceNotesForWallSystemSlugs(relatedSlugs),
  ]);

  const wallSystemsBySlug = new Map(
    (relatedWallSystems as WallSystemRecord[]).map((wallSystem) => [
      wallSystem.slug,
      wallSystem,
    ])
  );

  const evidenceNotes = relatedEvidenceNotes as EvidenceNoteRecord[];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/training" className="text-sm font-medium text-slate-500 hover:text-slate-950">
        ← Back to training
      </Link>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-slate-500">Training module</p>
          <StatusBadge value={trainingModule.module_status} />
        </div>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          {trainingModule.title}
        </h1>
        <p className="mt-3 text-slate-600">{trainingModule.description}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">Lessons</p>
            <p className="mt-1 text-2xl font-bold text-slate-950">{lessons.length}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">Linked wall systems</p>
            <p className="mt-1 text-2xl font-bold text-slate-950">
              {relatedWallSystems.length}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">Evidence notes</p>
            <p className="mt-1 text-2xl font-bold text-slate-950">
              {evidenceNotes.length}
            </p>
          </div>
        </div>

        <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Draft training content. This is for learning and review only, not a replacement for
          project-specific instructions, engineering drawings or supervisor direction.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-slate-950">Lessons</h2>

        <div className="mt-4 grid gap-5">
          {lessons.map((lesson) => {
            const lessonWallSystems = (lesson.related_product_slugs || [])
              .map((relatedSlug) => wallSystemsBySlug.get(relatedSlug))
              .filter(Boolean) as WallSystemRecord[];

            const lessonEvidenceNotes = evidenceNotes.filter((note) =>
              note.product_types
                ? lesson.related_product_slugs.includes(note.product_types.slug)
                : false
            );

            return (
              <article
                key={lesson.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-500">
                    Lesson {lesson.lesson_order}
                  </p>
                  <StatusBadge value={lesson.source_status} />
                </div>

                <h3 className="mt-2 text-xl font-semibold text-slate-950">
                  {lesson.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{lesson.summary}</p>
                <p className="mt-4 leading-7 text-slate-700">{lesson.content}</p>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Related wall systems
                  </h4>
                  <LessonWallSystems wallSystems={lessonWallSystems} />
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Supporting evidence notes
                  </h4>
                  <LessonEvidenceNotes evidenceNotes={lessonEvidenceNotes} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <InteractiveQuiz questions={quizQuestions} />
      <CompetencyChecklist moduleSlug={trainingModule.slug} />
    </main>
  );
}
