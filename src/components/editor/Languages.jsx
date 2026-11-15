
import {
  Plus,
  Trash2,
  Languages as LanguagesIcon,
} from "lucide-react";

import { useResumeStore } from "../../store/resumeStore";
import useEntryValidation from "../../hooks/useEntryValidation";

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

function Field({
  label,
  value,
  onChange,
  onBlur,
  placeholder = "",
  type = "text",
  error,
  maxLength,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
        }`}
      />

      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Languages() {
  const languages = useResumeStore(
    (state) => state.resume.languages
  ) ?? [];

  const addEntry = useResumeStore(
    (state) => state.addEntry
  );

  const updateEntry = useResumeStore(
    (state) => state.updateEntry
  );

  const removeEntry = useResumeStore(
    (state) => state.removeEntry
  );

  // Entry validation
  const {
    errorsByEntry,
    validateField,
    clearEntryErrors,
  } = useEntryValidation("languages");

  // Add language
  const handleAdd = () => {
    addEntry("languages", { ...emptyLanguage });
  };

  // Update language
  const handleUpdate = (id, field, value) => {
    updateEntry("languages", id, {
      [field]: value,
    });

    const currentEntry = languages.find(
      (item) => item.id === id
    );

    if (currentEntry) {
      validateField(
        id,
        currentEntry,
        field,
        value
      );
    }
  };

  // Validate field on blur
  const handleBlur = (item, field, value) => {
    validateField(
      item.id,
      item,
      field,
      value
    );
  };

  // Remove language
  const handleRemove = (id) => {
    clearEntryErrors(id);
    removeEntry("languages", id);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      {/* Section Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <LanguagesIcon
              size={20}
              className="text-indigo-600"
            />

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

      {/* Empty State */}
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

        /* Language Entries */
        <div className="space-y-5">
          {languages.map((item, index) => {
            const entryErrors =
              errorsByEntry[item.id] || {};

            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 p-4"
              >

                {/* Entry Header */}
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Language {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove language ${index + 1}`}
                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* Language */}
                  <Field
                    label="Language"
                    value={item.language}
                    onChange={(e) =>
                      handleUpdate(
                        item.id,
                        "language",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleBlur(
                        item,
                        "language",
                        e.target.value
                      )
                    }
                    placeholder="e.g. English"
                    error={entryErrors.language}
                    maxLength={100}
                  />

                  {/* Proficiency */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Proficiency
                    </label>

                    <select
                      value={item.proficiency || "Intermediate"}
                      onChange={(e) =>
                        handleUpdate(
                          item.id,
                          "proficiency",
                          e.target.value
                        )
                      }
                      onBlur={(e) =>
                        handleBlur(
                          item,
                          "proficiency",
                          e.target.value
                        )
                      }
                      aria-invalid={Boolean(
                        entryErrors.proficiency
                      )}
                      className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
                        entryErrors.proficiency
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                    >
                      {proficiencyLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>

                    {entryErrors.proficiency && (
                      <p
                        className="mt-1 text-xs text-red-600"
                        role="alert"
                      >
                        {entryErrors.proficiency}
                      </p>
                    )}
                  </div>

                  {/* Certification */}
                  <div className="sm:col-span-2">
                    <Field
                      label="Certification (Optional)"
                      value={item.certification}
                      onChange={(e) =>
                        handleUpdate(
                          item.id,
                          "certification",
                          e.target.value
                        )
                      }
                      onBlur={(e) =>
                        handleBlur(
                          item,
                          "certification",
                          e.target.value
                        )
                      }
                      placeholder="e.g. IELTS, TOEFL, JLPT"
                      error={entryErrors.certification}
                      maxLength={200}
                    />
                  </div>

                  {/* Additional Notes */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Additional Notes (Optional)
                    </label>

                    <textarea
                      rows={2}
                      value={item.notes ?? ""}
                      onChange={(e) =>
                        handleUpdate(
                          item.id,
                          "notes",
                          e.target.value
                        )
                      }
                      onBlur={(e) =>
                        handleBlur(
                          item,
                          "notes",
                          e.target.value
                        )
                      }
                      maxLength={2000}
                      aria-invalid={Boolean(entryErrors.notes)}
                      className={`w-full resize-y rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
                        entryErrors.notes
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                      placeholder="Add any relevant details..."
                    />

                    <div className="mt-1 flex items-center justify-between">
                      {entryErrors.notes ? (
                        <p
                          className="text-xs text-red-600"
                          role="alert"
                        >
                          {entryErrors.notes}
                        </p>
                      ) : (
                        <span />
                      )}

                      <span className="text-xs text-slate-400">
                        {(item.notes || "").length}/2000
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
