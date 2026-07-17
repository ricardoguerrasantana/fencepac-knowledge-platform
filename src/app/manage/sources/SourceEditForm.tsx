"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { UpdateSourceResult } from "./actions";

type SourceRecord = {
  id: string;
  slug: string;
  title: string;
  source_type: string;
  source_kind: string | null;
  source_owner: string | null;
  supplier: string | null;
  url: string | null;
  external_url: string | null;
  status: string;
  notes: string | null;
  is_confidential: boolean;
  original_file_name: string | null;
  file_size_bytes: number | null;
};

type SourceEditFormProps = {
  source: SourceRecord;
  action: (formData: FormData) => Promise<UpdateSourceResult>;
};

const sourceTypeOptions = [
  { value: "pdf", label: "PDF" },
  { value: "docx", label: "DOCX" },
  { value: "image", label: "Image" },
  { value: "web", label: "Web" },
  { value: "email", label: "Email" },
  { value: "manual", label: "Manual" },
  { value: "drawing", label: "Drawing" },
  { value: "other", label: "Other" },
];

const statusOptions = [
  { value: "needs_review", label: "Needs review" },
  { value: "external_reference", label: "External reference" },
  { value: "company_source", label: "Company source" },
  {
    value: "draft_not_for_construction",
    label: "Draft / not for construction",
  },
  { value: "reviewed", label: "Reviewed" },
  { value: "superseded", label: "Superseded" },
];

const sourceKindLabels: Record<string, string> = {
  manual_reference: "Manual reference",
  external_link: "External link",
  uploaded_file: "Uploaded file",
};

function formatFileSize(size: number | null) {
  if (!size) {
    return "Size not recorded";
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function SourceEditForm({
  source,
  action,
}: SourceEditFormProps) {
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const sourceKind = source.source_kind || "manual_reference";

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await action(formData);

    if (!result.success) {
      setErrorMessage(result.message);
      setIsSaving(false);
      return;
    }

    router.push("/manage/sources");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-6">
      <input type="hidden" name="id" value={source.id} />
      <input
        type="hidden"
        name="original_slug"
        value={source.slug}
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Source details
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Source kind:{" "}
              {sourceKindLabels[sourceKind] || sourceKind}
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {sourceKindLabels[sourceKind] || sourceKind}
          </span>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Title
            </span>
            <input
              name="title"
              required
              defaultValue={source.title}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-950"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Slug
            </span>
            <input
              name="slug"
              required
              defaultValue={source.slug}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-950"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Source type
            </span>
            <select
              name="source_type"
              defaultValue={source.source_type}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-950"
            >
              {sourceTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Status
            </span>
            <select
              name="status"
              defaultValue={source.status}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-950"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Supplier
            </span>
            <input
              name="supplier"
              defaultValue={source.supplier || ""}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-950"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Source owner
            </span>
            <input
              name="source_owner"
              defaultValue={source.source_owner || ""}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-950"
            />
          </label>

          {sourceKind === "external_link" ? (
            <label className="block md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                External URL
              </span>
              <input
                name="external_url"
                type="url"
                required
                defaultValue={
                  source.external_url || source.url || ""
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-950"
              />
            </label>
          ) : null}
        </div>

        {sourceKind === "uploaded_file" ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">
              Current uploaded file
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {source.original_file_name || "File name not recorded"}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {formatFileSize(source.file_size_bytes)}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              File replacement will be added in the next step.
            </p>
          </div>
        ) : null}

        <label className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <input
            name="is_confidential"
            type="checkbox"
            defaultChecked={source.is_confidential}
            className="mt-1"
          />
          <span>
            <span className="block text-sm font-semibold text-slate-700">
              Confidential
            </span>
            <span className="mt-1 block text-sm text-slate-500">
              Restrict this source to authorised internal use.
            </span>
          </span>
        </label>

        <label className="mt-6 block">
          <span className="text-sm font-semibold text-slate-700">
            Notes
          </span>
          <textarea
            name="notes"
            rows={5}
            defaultValue={source.notes || ""}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-700 outline-none focus:border-slate-950"
          />
        </label>
      </section>

      {errorMessage ? (
        <div
          role="alert"
          className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
        >
          {errorMessage}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving…" : "Save source"}
        </button>

        <a
          href={`/sources/${source.slug}`}
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          View source
        </a>

        <a
          href="/manage/sources"
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
