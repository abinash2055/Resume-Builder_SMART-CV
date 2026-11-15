
import { Plus, Trash2, BookOpen } from "lucide-react";
import { useResumeStore } from "../../store/resumeStore";

const emptyPublication = {
    title: "",
    publisher: "",
    authors: "",
    publicationDate: "",
    publicationUrl: "",
    description: "",
};

function Field({
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
}) {
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

export default function Publications() {
    const publications = useResumeStore(
        (state) => state.resume.publications
    ) ?? [];

    const addEntry = useResumeStore((state) => state.addEntry);
    const updateEntry = useResumeStore((state) => state.updateEntry);
    const removeEntry = useResumeStore((state) => state.removeEntry);

    const handleAdd = () => {
        addEntry("publications", { ...emptyPublication });
    };

    const handleUpdate = (id, field, value) => {
        updateEntry("publications", id, { [field]: value });
    };

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <BookOpen size={20} className="text-indigo-600" />
                        <h2 className="text-lg font-semibold text-slate-900">
                            Publications
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                        Showcase your published research, articles, and written work.
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

            {publications.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center">
                    <p className="text-sm text-slate-500">
                        No publications added yet.
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                        Click Add to include your published work.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {publications.map((item, index) => (
                        <div
                            key={item.id}
                            className="rounded-xl border border-slate-200 p-4"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-slate-800">
                                    Publication {index + 1}
                                </h3>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeEntry("publications", item.id)
                                    }
                                    aria-label={`Remove publication ${index + 1}`}
                                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                                >
                                    <Trash2 size={17} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Field
                                    label="Publication Title"
                                    value={item.title}
                                    onChange={(value) =>
                                        handleUpdate(item.id, "title", value)
                                    }
                                    placeholder="e.g. Artificial Intelligence in Healthcare"
                                />

                                <Field
                                    label="Publisher / Journal"
                                    value={item.publisher}
                                    onChange={(value) =>
                                        handleUpdate(item.id, "publisher", value)
                                    }
                                    placeholder="e.g. International Research Journal"
                                />

                                <Field
                                    label="Authors"
                                    value={item.authors}
                                    onChange={(value) =>
                                        handleUpdate(item.id, "authors", value)
                                    }
                                    placeholder="e.g. John Doe, Jane Smith"
                                />

                                <Field
                                    label="Publication Date"
                                    type="month"
                                    value={item.publicationDate}
                                    onChange={(value) =>
                                        handleUpdate(item.id, "publicationDate", value)
                                    }
                                />

                                <div className="sm:col-span-2">
                                    <Field
                                        label="Publication URL (Optional)"
                                        value={item.publicationUrl}
                                        onChange={(value) =>
                                            handleUpdate(item.id, "publicationUrl", value)
                                        }
                                        placeholder="https://example.com/publication"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Description (Optional)
                                    </label>

                                    <textarea
                                        rows={3}
                                        value={item.description ?? ""}
                                        onChange={(e) =>
                                            handleUpdate(
                                                item.id,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Briefly describe your publication and its key contributions..."
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
