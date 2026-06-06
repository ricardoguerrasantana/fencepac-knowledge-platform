import Link from "next/link";
import { getTrainingModuleBySlug } from "@/lib/data/knowledge";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TrainingModulePage({ params }: PageProps) {
  const { slug } = await params;
  const trainingModule = await getTrainingModuleBySlug(slug);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/training" className="text-sm font-medium text-slate-500 hover:text-slate-950">
        ← Back to training
      </Link>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-slate-500">Training module</p>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            {trainingModule.module_status}
          </span>
        </div>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          {trainingModule.title}
        </h1>
        <p className="mt-3 text-slate-600">{trainingModule.description}</p>

        <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Draft training content. This is for learning and review only, not a replacement for
          project-specific instructions, engineering drawings or supervisor direction.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-slate-950">Lessons</h2>

        <div className="mt-4 grid gap-4">
          {trainingModule.training_lessons.map((lesson) => (
            <article
              key={lesson.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">Lesson {lesson.lesson_order}</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-950">{lesson.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{lesson.summary}</p>
              <p className="mt-4 text-slate-700">{lesson.content}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-slate-950">Quiz preview</h2>

        <div className="mt-4 grid gap-4">
          {trainingModule.quiz_questions.map((question) => (
            <article
              key={question.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">
                Question {question.question_order}
              </p>
              <h3 className="mt-1 font-semibold text-slate-950">{question.question}</h3>

              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {(question.options as string[]).map((option) => (
                  <li key={option} className="rounded-xl bg-slate-50 px-3 py-2">
                    {option}
                  </li>
                ))}
              </ul>

              <details className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900">
                <summary className="cursor-pointer font-medium">Show answer</summary>
                <p className="mt-2">
                  <strong>Correct answer:</strong> {question.correct_answer}
                </p>
                <p className="mt-1">{question.explanation}</p>
              </details>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
