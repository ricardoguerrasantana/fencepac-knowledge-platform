type WallSystemFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  wallSystem?: {
    id: string;
    slug: string;
    name: string;
    category: string;
    system_type: string;
    short_description: string;
    typical_use: string | null;
    key_components: string[] | null;
    installation_basics: string[] | null;
    qa_checks: string[] | null;
    common_risks: string[] | null;
    source_status: string;
    hero_image_path: string | null;
  };
};

const sourceStatusOptions = [
  { value: "needs_review", label: "Needs review" },
  { value: "draft", label: "Draft" },
  { value: "external_research", label: "External research" },
  { value: "verified_company_knowledge", label: "Verified company knowledge" },
  { value: "unresolved_question", label: "Unresolved question" },
  { value: "superseded", label: "Superseded" },
];

function listToTextarea(items: string[] | null | undefined) {
  return items?.join("\n") || "";
}

function TextInput({
  label,
  name,
  defaultValue,
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue || ""}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-950"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  required = false,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue || ""}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-slate-950"
      />
    </label>
  );
}

export function WallSystemForm({ action, submitLabel, wallSystem }: WallSystemFormProps) {
  return (
    <form action={action} className="mt-6 grid gap-6">
      {wallSystem ? (
        <>
          <input type="hidden" name="id" value={wallSystem.id} />
          <input type="hidden" name="original_slug" value={wallSystem.slug} />
        </>
      ) : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Core details</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <TextInput
            label="Name"
            name="name"
            defaultValue={wallSystem?.name}
            required
            placeholder="Concrete crib walls"
          />

          <TextInput
            label="Slug"
            name="slug"
            defaultValue={wallSystem?.slug}
            placeholder="concrete-crib-walls"
          />

          <TextInput
            label="Category"
            name="category"
            defaultValue={wallSystem?.category}
            required
            placeholder="Gravity wall"
          />

          <TextInput
            label="System type"
            name="system_type"
            defaultValue={wallSystem?.system_type}
            required
            placeholder="Interlocking precast concrete crib gravity wall"
          />
        </div>

        <div className="mt-5 grid gap-5">
          <TextArea
            label="Short description"
            name="short_description"
            defaultValue={wallSystem?.short_description}
            required
            rows={3}
            placeholder="Short plain-English description shown on cards and search results."
          />

          <TextArea
            label="Typical use"
            name="typical_use"
            defaultValue={wallSystem?.typical_use}
            rows={3}
            placeholder="Where this wall system is typically used."
          />

          <TextInput
            label="Hero image path"
            name="hero_image_path"
            defaultValue={wallSystem?.hero_image_path}
            placeholder="/images/wall-systems/concrete-crib-walls.jpg"
          />

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Source status</span>
            <select
              name="source_status"
              defaultValue={wallSystem?.source_status || "needs_review"}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-950"
            >
              {sourceStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Knowledge fields</h2>
        <p className="mt-2 text-sm text-slate-600">
          Enter one item per line for lists. These fields appear on the wall system detail page.
        </p>

        <div className="mt-5 grid gap-5">
          <TextArea
            label="Key components"
            name="key_components"
            defaultValue={listToTextarea(wallSystem?.key_components)}
            placeholder="One component per line"
          />

          <TextArea
            label="Installation basics"
            name="installation_basics"
            defaultValue={listToTextarea(wallSystem?.installation_basics)}
            placeholder="One installation note per line"
          />

          <TextArea
            label="QA checks"
            name="qa_checks"
            defaultValue={listToTextarea(wallSystem?.qa_checks)}
            placeholder="One QA check per line"
          />

          <TextArea
            label="Common risks"
            name="common_risks"
            defaultValue={listToTextarea(wallSystem?.common_risks)}
            placeholder="One risk per line"
          />
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {submitLabel}
        </button>

        <a
          href="/manage/wall-systems"
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
