
import {
  Plus,
  Trash2,
  Users,
} from "lucide-react";

import { useResumeStore } from "../../store/resumeStore";
import useEntryValidation from "../../hooks/useEntryValidation";

const emptyReference = {
  name: "",
  jobTitle: "",
  organization: "",
  relationship: "",
  email: "",
  phone: "",
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

export default function References() {
  const references = useResumeStore(
    (state) => state.resume.references
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
  } = useEntryValidation("references");

  // Add reference
  const handleAdd = () => {
    addEntry("references", { ...emptyReference });
  };

  // Update reference
  const handleUpdate = (id, field, value) => {
    updateEntry("references", id, {
      [field]: value,
    });

    const currentEntry = references.find(
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

  // Validate on blur
  const handleBlur = (item, field, value) => {
    validateField(
      item.id,
      item,
      field,
      value
    );
  };

  // Remove reference
  const handleRemove = (id) => {
    clearEntryErrors(id);
    removeEntry("references", id);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      {/* Section Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Users
              size={20}
              className="text-indigo-600"
            />

            <h2 className="text-lg font-semibold text-slate-900">
              References
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Add professional or academic references.
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
      {references.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center">
          <p className="text-sm text-slate-500">
            No references added yet.
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Click Add to include a professional reference.
          </p>
        </div>
      ) : (

        /* Reference Entries */
        <div className="space-y-5">
          {references.map((item, index) => {
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
                    Reference {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove reference ${index + 1}`}
                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* Full Name */}
                  <Field
                    label="Full Name"
                    value={item.name}
                    onChange={(e) =>
                      handleUpdate(
                        item.id,
                        "name",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleBlur(
                        item,
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="e.g. John Smith"
                    error={entryErrors.name}
                    maxLength={200}
                  />

                  {/* Job Title */}
                  <Field
                    label="Job Title"
                    value={item.jobTitle}
                    onChange={(e) =>
                      handleUpdate(
                        item.id,
                        "jobTitle",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleBlur(
                        item,
                        "jobTitle",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Senior Software Engineer"
                    error={entryErrors.jobTitle}
                    maxLength={200}
                  />

                  {/* Organization */}
                  <Field
                    label="Organization"
                    value={item.organization}
                    onChange={(e) =>
                      handleUpdate(
                        item.id,
                        "organization",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleBlur(
                        item,
                        "organization",
                        e.target.value
                      )
                    }
                    placeholder="e.g. ABC Technologies"
                    error={entryErrors.organization}
                    maxLength={200}
                  />

                  {/* Relationship */}
                  <Field
                    label="Relationship"
                    value={item.relationship}
                    onChange={(e) =>
                      handleUpdate(
                        item.id,
                        "relationship",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleBlur(
                        item,
                        "relationship",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Former Manager"
                    error={entryErrors.relationship}
                    maxLength={200}
                  />

                  {/* Email */}
                  <Field
                    label="Email Address"
                    type="email"
                    value={item.email}
                    onChange={(e) =>
                      handleUpdate(
                        item.id,
                        "email",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleBlur(
                        item,
                        "email",
                        e.target.value
                      )
                    }
                    placeholder="john@example.com"
                    error={entryErrors.email}
                    maxLength={254}
                  />

                  {/* Phone */}
                  <Field
                    label="Phone Number"
                    type="tel"
                    value={item.phone}
                    onChange={(e) =>
                      handleUpdate(
                        item.id,
                        "phone",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleBlur(
                        item,
                        "phone",
                        e.target.value
                      )
                    }
                    placeholder="+977 98XXXXXXXX"
                    error={entryErrors.phone}
                    maxLength={30}
                  />

                  {/* Additional Notes */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Additional Notes (Optional)
                    </label>

                    <textarea
                      rows={3}
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
                      aria-invalid={Boolean(
                        entryErrors.notes
                      )}
                      placeholder="Add any additional information about this reference..."
                      className={`w-full resize-y rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
                        entryErrors.notes
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
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
