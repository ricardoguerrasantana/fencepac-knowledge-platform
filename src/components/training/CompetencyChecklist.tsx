"use client";

import { useMemo, useSyncExternalStore } from "react";

type ChecklistItem = {
  id: string;
  label: string;
  description: string;
};

type CompetencyChecklistProps = {
  moduleSlug: string;
};

const checklistItems: ChecklistItem[] = [
  {
    id: "identify-wall-systems",
    label: "Identify main retaining wall system families",
    description:
      "Can recognise gravity walls, segmental block walls, gabion walls, MSE walls, reinforced soil slopes, concrete panel walls and concrete sleeper walls.",
  },
  {
    id: "gravity-vs-mse",
    label: "Explain gravity walls vs MSE/RSS systems",
    description:
      "Can explain that gravity walls rely mainly on wall mass/geometry, while MSE/RSS systems rely on reinforced compacted soil mass.",
  },
  {
    id: "drainage-importance",
    label: "Explain why drainage matters",
    description:
      "Can explain why drainage aggregate, geotextile, ag pipe and suitable outlets are important behind retaining walls.",
  },
  {
    id: "source-evidence",
    label: "Locate source evidence",
    description:
      "Can open a wall system, find linked evidence notes, and follow them back to the source record.",
  },
  {
    id: "review-status",
    label: "Understand review status",
    description:
      "Can distinguish draft, needs review, reviewed and superseded evidence notes.",
  },
  {
    id: "supplier-vs-system",
    label: "Separate supplier examples from wall system types",
    description:
      "Can explain why a brand like Keystone or MagnumStone sits under a broader wall system type.",
  },
  {
    id: "escalation",
    label: "Know when to stop and escalate",
    description:
      "Can identify situations that need supervisor, engineer or project-specific clarification before work continues.",
  },
];

const CHECKLIST_STORAGE_EVENT = "competency-checklist-updated";

function getServerSnapshot() {
  return "{}";
}

function subscribeToChecklistUpdates(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHECKLIST_STORAGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHECKLIST_STORAGE_EVENT, callback);
  };
}

function getChecklistSnapshot(storageKey: string) {
  return window.localStorage.getItem(storageKey) || "{}";
}

function parseChecklistSnapshot(snapshot: string): Record<string, boolean> {
  try {
    return JSON.parse(snapshot) as Record<string, boolean>;
  } catch {
    return {};
  }
}

function writeChecklistSnapshot(storageKey: string, value: Record<string, boolean>) {
  window.localStorage.setItem(storageKey, JSON.stringify(value));
  window.dispatchEvent(new Event(CHECKLIST_STORAGE_EVENT));
}

export function CompetencyChecklist({ moduleSlug }: CompetencyChecklistProps) {
  const storageKey = `competency-checklist:${moduleSlug}`;

  const snapshot = useSyncExternalStore(
    subscribeToChecklistUpdates,
    () => getChecklistSnapshot(storageKey),
    getServerSnapshot
  );

  const checkedItems = useMemo(() => parseChecklistSnapshot(snapshot), [snapshot]);

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checkedItems[item.id]).length,
    [checkedItems]
  );

  const percentage = Math.round((completedCount / checklistItems.length) * 100);
  const isComplete = completedCount === checklistItems.length;

  function toggleItem(itemId: string) {
    const nextCheckedItems = {
      ...checkedItems,
      [itemId]: !checkedItems[itemId],
    };

    writeChecklistSnapshot(storageKey, nextCheckedItems);
  }

  function resetChecklist() {
    writeChecklistSnapshot(storageKey, {});
  }

  return (
    <section className="mt-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Training sign-off prototype</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Competency checklist
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              This is a self-check for MVP training only. It does not replace formal competency
              assessment, supervisor sign-off, project-specific instructions or engineering review.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-950">
              {completedCount} / {checklistItems.length} complete
            </p>
            <p className="mt-1">{percentage}%</p>
          </div>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-slate-950 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="mt-6 grid gap-3">
          {checklistItems.map((item) => {
            const checked = Boolean(checkedItems[item.id]);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  checked
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <div className="flex gap-3">
                  <span
                    className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-bold ${
                      checked
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : "border-slate-400 bg-white text-transparent"
                    }`}
                  >
                    ✓
                  </span>

                  <span>
                    <span className="block font-semibold text-slate-950">{item.label}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">
                      {item.description}
                    </span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div
          className={`mt-6 rounded-2xl p-4 text-sm ${
            isComplete
              ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border border-amber-200 bg-amber-50 text-amber-900"
          }`}
        >
          {isComplete ? (
            <p>
              Checklist complete for MVP purposes. A future version should save this against a
              logged-in learner and reviewer.
            </p>
          ) : (
            <p>
              Checklist incomplete. Review the lessons, quiz feedback, wall systems and evidence
              notes before treating this module as complete.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={resetChecklist}
          className="mt-4 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Reset checklist
        </button>
      </div>
    </section>
  );
}
