
import { Plus, Trash2, Trophy } from "lucide-react";
import { useResumeStore } from "../../store/resumeStore";

const emptyAward = {
  title: "",
  issuer: "",
  date: "",
  description: "",
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

export default function Awards() {
  const awards = useResumeStore(
    (state) => state.resume.awards
  ) ?? [];

  const addEntry = useResumeStore((state) => state.addEntry);
  const updateEntry = useResumeStore((state) => state.updateEntry);
  const removeEntry = useResumeStore((state) => state.removeEntry);

  const handleAdd = () => {
    addEntry("awards", { ...emptyAward });
  };

  const handleUpdate = (id, field, value) => {
    updateEntry("awards", id, { [field]: value });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Trophy size={20} className="text-indigo-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Awards & Achievements
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Highlight your awards, honors, and recognitions.
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

      {awards.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center">
          <p className="text-sm text-slate-500">
            No awards or achievements added yet.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Click Add to include an award or achievement.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {awards.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">
                  Award {index + 1}
                </h3>

                <button
                  type="button"
                  onClick={() => removeEntry("awards", item.id)}
                  aria-label={`Remove award ${index + 1}`}
                  className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Award / Achievement Name"
                  value={item.title}
                  onChange={(value) =>
                    handleUpdate(item.id, "title", value)
                  }
                  placeholder="e.g. Best Project Award"
                />

                <Field
                  label="Issuing Organization"
                  value={item.issuer}
                  onChange={(value) =>
                    handleUpdate(item.id, "issuer", value)
                  }
                  placeholder="e.g. University or Organization"
                />

                <Field
                  label="Date Received"
                  type="month"
                  value={item.date}
                  onChange={(value) =>
                    handleUpdate(item.id, "date", value)
                  }
                />

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Description (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={item.description ?? ""}
                    onChange={(e) =>
                      handleUpdate(item.id, "description", e.target.value)
                    }
                    placeholder="Describe why you received this award or what you achieved..."
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
