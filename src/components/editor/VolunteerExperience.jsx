
import { Plus, Trash2, HeartHandshake } from "lucide-react";
import { useResumeStore } from "../../store/resumeStore";

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
  placeholder = "",
  type = "text",
  disabled = false,
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
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
      />
    </div>
  );
}

export default function VolunteerExperience() {
  const volunteerExperience = useResumeStore(
    (state) => state.resume.volunteerExperience
  ) ?? [];

  const addEntry = useResumeStore((state) => state.addEntry);
  const updateEntry = useResumeStore((state) => state.updateEntry);
  const removeEntry = useResumeStore((state) => state.removeEntry);

  const handleAdd = () => {
    addEntry("volunteerExperience", { ...emptyVolunteer });
  };

  const handleUpdate = (id, field, value) => {
    updateEntry("volunteerExperience", id, { [field]: value });
  };

  const handleCurrentChange = (id, checked) => {
    updateEntry("volunteerExperience", id, {
      isCurrent: checked,
      endDate: checked ? "" : undefined,
    });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <HeartHandshake size={20} className="text-indigo-600" />

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
        <div className="space-y-5">
          {volunteerExperience.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">
                  Volunteer Activity {index + 1}
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    removeEntry("volunteerExperience", item.id)
                  }
                  aria-label={`Remove volunteer activity ${index + 1}`}
                  className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Role / Position"
                  value={item.role}
                  onChange={(value) =>
                    handleUpdate(item.id, "role", value)
                  }
                  placeholder="e.g. Volunteer Coordinator"
                />

                <Field
                  label="Organization"
                  value={item.organization}
                  onChange={(value) =>
                    handleUpdate(item.id, "organization", value)
                  }
                  placeholder="e.g. Red Cross"
                />

                <Field
                  label="Location"
                  value={item.location}
                  onChange={(value) =>
                    handleUpdate(item.id, "location", value)
                  }
                  placeholder="e.g. Kathmandu, Nepal"
                />

                <Field
                  label="Start Date"
                  type="month"
                  value={item.startDate}
                  onChange={(value) =>
                    handleUpdate(item.id, "startDate", value)
                  }
                />

                <Field
                  label="End Date"
                  type="month"
                  value={item.endDate}
                  disabled={item.isCurrent}
                  onChange={(value) =>
                    handleUpdate(item.id, "endDate", value)
                  }
                />

                <div className="flex items-center pt-6">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={Boolean(item.isCurrent)}
                      onChange={(e) =>
                        handleCurrentChange(item.id, e.target.checked)
                      }
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />

                    Currently volunteering
                  </label>
                </div>

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
                    placeholder="Describe your responsibilities, contributions, and achievements..."
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
