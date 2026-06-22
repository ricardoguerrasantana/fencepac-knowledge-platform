"use client";

import { useMemo, useState } from "react";

type QuizQuestion = {
  id: string;
  question_order: number;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  source_status: string;
};

type InteractiveQuizProps = {
  questions: QuizQuestion[];
};

export function InteractiveQuiz({ questions }: InteractiveQuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const sortedQuestions = useMemo(
    () => [...questions].sort((a, b) => a.question_order - b.question_order),
    [questions]
  );

  const answeredCount = Object.keys(answers).length;

  const score = sortedQuestions.reduce((total, question) => {
    return answers[question.id] === question.correct_answer ? total + 1 : total;
  }, 0);

  const percentage =
    sortedQuestions.length > 0 ? Math.round((score / sortedQuestions.length) * 100) : 0;

  const passMark = 80;
  const passed = percentage >= passMark;

  function handleSelect(questionId: string, option: string) {
    if (submitted) return;

    setAnswers((current) => ({
      ...current,
      [questionId]: option,
    }));
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Interactive quiz</h2>
          <p className="mt-2 text-sm text-slate-600">
            Select an answer for each question, submit the quiz, then review the explanations.
          </p>
        </div>

        <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200">
          Answered <strong>{answeredCount}</strong> of <strong>{sortedQuestions.length}</strong>
        </div>
      </div>

      <div className="mt-4 grid gap-4">
        {sortedQuestions.map((question) => {
          const selectedAnswer = answers[question.id];
          const isCorrect = selectedAnswer === question.correct_answer;

          return (
            <article
              key={question.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-500">
                  Question {question.question_order}
                </p>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  {question.source_status}
                </span>
              </div>

              <h3 className="mt-2 font-semibold text-slate-950">{question.question}</h3>

              <div className="mt-4 grid gap-2">
                {question.options.map((option) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectOption = question.correct_answer === option;

                  let optionClass =
                    "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-white";

                  if (submitted && isCorrectOption) {
                    optionClass = "border-emerald-300 bg-emerald-50 text-emerald-900";
                  }

                  if (submitted && isSelected && !isCorrect) {
                    optionClass = "border-red-300 bg-red-50 text-red-900";
                  }

                  if (!submitted && isSelected) {
                    optionClass = "border-slate-950 bg-slate-950 text-white";
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(question.id, option)}
                      className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${optionClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`mt-4 rounded-2xl p-4 text-sm ${
                    isCorrect
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
                      : "border border-red-200 bg-red-50 text-red-900"
                  }`}
                >
                  <p className="font-semibold">{isCorrect ? "Correct" : "Not quite"}</p>
                  <p className="mt-1">
                    <strong>Correct answer:</strong> {question.correct_answer}
                  </p>
                  <p className="mt-1">{question.explanation}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {!submitted ? (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              Pass mark: <strong>{passMark}%</strong>. You can change answers before submitting.
            </p>

            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={answeredCount !== sortedQuestions.length}
              className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Submit quiz
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-slate-950">
                Score: {score} / {sortedQuestions.length} — {percentage}%
              </p>
              <p className={passed ? "mt-1 text-sm text-emerald-700" : "mt-1 text-sm text-red-700"}>
                {passed
                  ? "Passed for internal training purposes."
                  : "Below pass mark. Review the lesson and try again."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Reset quiz
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
