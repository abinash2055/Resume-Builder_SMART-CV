
import { Plus, Trash2, Languages as LanguagesIcon } from "lucide-react";
import { useResumeStore } from "../../store/resumeStore";

const proficiencyLevels = [
  "Native",
  "Fluent",
  "Advanced",
  "Intermediate",
  "Basic",
];

const emptyLanguage = {
  language: "",
  proficiency: "Intermediate",
  certification: "",
  notes: "",
};

function Field({ label, value, onChange, placeholder = "", type = "text" }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}

export default function Languages() {
  const languages = useResumeStore(
    (state) => state.resume.languages
  ) ?? [];

  const addEntry = useResumeStore((state) => state.addEntry);
  const updateEntry = useResumeStore((state) => state.updateEntry);
  const removeEntry = useResumeStore((state) => state.removeEntry);

  const handleAdd = () => {
    addEntry("languages", { ...emptyLanguage });
  };

  const handleUpdate = (id, field, value) => {
    updateEntry("languages", id, { [field]: value });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <LanguagesIcon size={20} className="text-indigo-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Languages
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Add the languages you can communicate in.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {languages.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center">
          <p className="text-sm text-slate-500">
            No languages added yet.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Click Add to include your language skills.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {languages.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">
                  Language {index + 1}
                </h3>

                <button
                  type="button"
                  onClick={() => removeEntry("languages", item.id)}
                  aria-label={`Remove language ${index + 1}`}
                  className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Language"
                  value={item.language}
                  onChange={(value) =>
                    handleUpdate(item.id, "language", value)
                  }
                  placeholder="e.g. English"
                />

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Proficiency
                  </label>
                  <select
                    value={item.proficiency || "Intermediate"}
                    onChange={(e) =>
                      handleUpdate(item.id, "proficiency", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    {proficiencyLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <Field
                    label="Certification (Optional)"
                    value={item.certification}
                    onChange={(value) =>
                      handleUpdate(item.id, "certification", value)
                    }
                    placeholder="e.g. IELTS, TOEFL, JLPT"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={item.notes ?? ""}
                    onChange={(e) =>
                      handleUpdate(item.id, "notes", e.target.value)
                    }
                    placeholder="Add any relevant details..."
                    className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
