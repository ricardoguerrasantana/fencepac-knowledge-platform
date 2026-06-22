type SourceFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
};

const sourceKindOptions = [
  { value: "manual_reference", label: "Manual reference" },
  { value: "external_link", label: "External link" },
  { value: "uploaded_file", label: "Uploaded file" },
];

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
  { value: "draft_not_for_construction", label: "Draft / not for construction" },
  { value: "reviewed", label: "Reviewed" },
  { value: "superseded", label: "Superseded" },
];

function TextInput({
  label,
  name,
  required = false,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        type={type}
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-950"
      />
    </label>
  );
}

function SelectInput({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-950"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SourceForm({ action, submitLabel }: SourceFormProps) {
  return (
    <form action={action} className="mt-6 grid gap-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Source details</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <TextInput
            label="Title"
            name="title"
            required
            placeholder="Supplier brochure, project drawing, web article, internal reference"
          />

          <TextInput
            label="Slug"
            name="slug"
            placeholder="optional-readable-url-slug"
          />

          <SelectInput
            label="Source kind"
            name="source_kind"
            options={sourceKindOptions}
            defaultValue="manual_reference"
          />

          <SelectInput
            label="Source type"
            name="source_type"
            options={sourceTypeOptions}
            defaultValue="pdf"
          />

          <SelectInput
            label="Status"
            name="status"
            options={statusOptions}
            defaultValue="needs_review"
          />

          <TextInput
            label="Supplier"
            name="supplier"
            placeholder="Fencepac, Geofabrics, Maccaferri, National Masonry"
          />

          <TextInput
            label="Source owner"
            name="source_owner"
            placeholder="Supplier, internal team, project team, external website"
          />

          <TextInput
            label="External URL"
            name="external_url"
            type="url"
            placeholder="https://example.com/source"
          />
        </div>

        <div className="mt-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Upload source file
            </span>
            <input
              name="source_file"
              type="file"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
          </label>

          <p className="mt-2 text-sm text-slate-500">
            Use this when Source kind is Uploaded file. For external links, leave this blank.
          </p>
        </div>

        <label className="mt-5 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <input name="is_confidential" type="checkbox" className="mt-1" />
          <span>
            <span className="block text-sm font-semibold text-slate-700">
              Mark as confidential
            </span>
            <span className="mt-1 block text-sm leading-6 text-slate-500">
              Use this for internal, commercial, project-specific or supplier-restricted files.
            </span>
          </span>
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-slate-700">Notes</span>
          <textarea
            name="notes"
            rows={4}
            placeholder="Internal comments about where this source came from, when it was added, or how it should be reviewed."
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-slate-950"
          />
        </label>
      </section>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
        Choose Source kind carefully. Uploaded files are stored in the private source-files bucket.
        External links are saved as URL records. Manual references are saved without a file or link.
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {submitLabel}
        </button>

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
