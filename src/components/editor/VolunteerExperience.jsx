
import {
  Plus,
  Trash2,
  HeartHandshake,
} from "lucide-react";

import { useResumeStore } from "../../store/resumeStore";
import useEntryValidation from "../../hooks/useEntryValidation";

const emptyVolunteer = {
  role: "",
  organization: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
};

function Field({
  label,
  value,
  onChange,
  onBlur,
  placeholder = "",
  type = "text",
  disabled = false,
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
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 ${
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

export default function VolunteerExperience() {
  const volunteerExperience = useResumeStore(
    (state) => state.resume.volunteerExperience
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
  } = useEntryValidation("volunteerExperience");

  // Add volunteer experience
  const handleAdd = () => {
    addEntry("volunteerExperience", { ...emptyVolunteer });
  };

  // Update volunteer experience
  const handleUpdate = (id, field, value) => {
    updateEntry("volunteerExperience", id, {
      [field]: value,
    });

    const currentEntry = volunteerExperience.find(
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

  // Current volunteering status
  const handleCurrentChange = (id, checked) => {
    updateEntry("volunteerExperience", id, {
      isCurrent: checked,
      endDate: checked ? "" : "",
    });

    const currentEntry = volunteerExperience.find(
      (item) => item.id === id
    );

    if (currentEntry) {
      validateField(
        id,
        {
          ...currentEntry,
          isCurrent: checked,
          endDate: "",
        },
        "endDate",
        ""
      );
    }
  };

  // Remove volunteer experience
  const handleRemove = (id) => {
    clearEntryErrors(id);
    removeEntry("volunteerExperience", id);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      {/* Section Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <HeartHandshake
              size={20}
              className="text-indigo-600"
            />

            <h2 className="text-lg font-semibold text-slate-900">
              Volunteer Experience
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Highlight your community service and volunteer contributions.
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
      {volunteerExperience.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center">
          <p className="text-sm text-slate-500">
            No volunteer experience added yet.
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Click Add to include your volunteer activities.
          </p>
        </div>
      ) : (

        /* Volunteer Entries */
        <div className="space-y-5">
          {volunteerExperience.map((item, index) => {
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
                    Volunteer Activity {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove volunteer activity ${index + 1}`}
                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* Role */}
                  <Field
                    label="Role / Position"
                    value={item.role}
                    onChange={(e) =>
                      handleUpdate(
                        item.id,
                        "role",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleBlur(
                        item,
                        "role",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Volunteer Coordinator"
                    error={entryErrors.role}
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
                    placeholder="e.g. Red Cross"
                    error={entryErrors.organization}
                    maxLength={200}
                  />

                  {/* Location */}
                  <Field
                    label="Location"
                    value={item.location}
                    onChange={(e) =>
                      handleUpdate(
                        item.id,
                        "location",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleBlur(
                        item,
                        "location",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Kathmandu, Nepal"
                    error={entryErrors.location}
                    maxLength={200}
                  />

                  {/* Start Date */}
                  <Field
                    label="Start Date"
                    type="month"
                    value={item.startDate}
                    onChange={(e) =>
                      handleUpdate(
                        item.id,
                        "startDate",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleBlur(
                        item,
                        "startDate",
                        e.target.value
                      )
                    }
                    error={entryErrors.startDate}
                  />

                  {/* End Date */}
                  <Field
                    label="End Date"
                    type="month"
                    value={item.endDate}
                    disabled={item.isCurrent}
                    onChange={(e) =>
                      handleUpdate(
                        item.id,
                        "endDate",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleBlur(
                        item,
                        "endDate",
                        e.target.value
                      )
                    }
                    error={entryErrors.endDate}
                  />

                  {/* Currently Volunteering */}
                  <div className="flex items-center pt-6">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={Boolean(item.isCurrent)}
                        onChange={(e) =>
                          handleCurrentChange(
                            item.id,
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />

                      Currently volunteering
                    </label>
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Responsibilities & Contributions
                    </label>

                    <textarea
                      rows={4}
                      value={item.description ?? ""}
                      onChange={(e) =>
                        handleUpdate(
                          item.id,
                          "description",
                          e.target.value
                        )
                      }
                      onBlur={(e) =>
                        handleBlur(
                          item,
                          "description",
                          e.target.value
                        )
                      }
                      maxLength={5000}
                      aria-invalid={Boolean(
                        entryErrors.description
                      )}
                      placeholder="Describe your responsibilities, contributions, and achievements..."
                      className={`w-full resize-y rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
                        entryErrors.description
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                    />

                    <div className="mt-1 flex items-center justify-between">
                      {entryErrors.description ? (
                        <p
                          className="text-xs text-red-600"
                          role="alert"
                        >
                          {entryErrors.description}
                        </p>
                      ) : (
                        <span />
                      )}

                      <span className="text-xs text-slate-400">
                        {(item.description || "").length}/5000
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
