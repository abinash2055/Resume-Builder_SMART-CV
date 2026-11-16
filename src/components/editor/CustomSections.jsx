
import { useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  FolderPlus,
} from "lucide-react";
import { useResumeStore } from "../../store/resumeStore";

export default function CustomSections() {
  const customSections = useResumeStore(
    (state) => state.resume.customSections
  ) ?? [];

  const addCustomSection = useResumeStore(
    (state) => state.addCustomSection
  );
  const updateCustomSection = useResumeStore(
    (state) => state.updateCustomSection
  );
  const removeCustomSection = useResumeStore(
    (state) => state.removeCustomSection
  );

  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [entryForms, setEntryForms] = useState({});

  const handleAddSection = () => {
    const title = newTitle.trim();

    if (!title) return;

    addCustomSection(title);
    setNewTitle("");
  };

  const handleRename = (section) => {
    const title = editingTitle.trim();

    if (!title) return;

    updateCustomSection(section.id, { title });
    setEditingId(null);
    setEditingTitle("");
  };

  const handleAddItem = (section) => {
    const form = entryForms[section.id] || {
      title: "",
      description: "",
    };

    if (!form.title.trim()) return;

    const newItem = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      description: form.description.trim(),
    };

    updateCustomSection(section.id, {
      items: [...(section.items || []), newItem],
    });

    setEntryForms((previous) => ({
      ...previous,
      [section.id]: { title: "", description: "" },
    }));
  };

  const handleUpdateItem = (section, itemId, field, value) => {
    const updatedItems = (section.items || []).map((item) =>
      item.id === itemId
        ? { ...item, [field]: value }
        : item
    );

    updateCustomSection(section.id, {
      items: updatedItems,
    });
  };

  const handleRemoveItem = (section, itemId) => {
    updateCustomSection(section.id, {
      items: (section.items || []).filter(
        (item) => item.id !== itemId
      ),
    });
  };

  const updateEntryForm = (sectionId, field, value) => {
    setEntryForms((previous) => ({
      ...previous,
      [sectionId]: {
        title: "",
        description: "",
        ...previous[sectionId],
        [field]: value,
      },
    }));
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <FolderPlus size={20} className="text-indigo-600" />
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Custom Sections
          </h2>
          <p className="text-sm text-slate-500">
            Create additional sections for your resume.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={newTitle}
          maxLength={100}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddSection();
          }}
          placeholder="e.g. Professional Memberships"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <button
          type="button"
          onClick={handleAddSection}
          disabled={!newTitle.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={16} />
          Add Section
        </button>
      </div>

      {customSections.length === 0 ? (
        <div className="mt-5 rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center">
          <p className="text-sm text-slate-500">
            No custom sections created yet.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Create a section using the field above.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          {customSections.map((section) => {
            const form = entryForms[section.id] || {
              title: "",
              description: "",
            };

            return (
              <div
                key={section.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  {editingId === section.id ? (
                    <div className="flex min-w-0 flex-1 gap-2">
                      <input
                        value={editingTitle}
                        maxLength={100}
                        onChange={(e) =>
                          setEditingTitle(e.target.value)
                        }
                        className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
                        autoFocus
                      />

                      <button
                        type="button"
                        onClick={() => handleRename(section)}
                        aria-label="Save section title"
                        className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                      >
                        <Check size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        aria-label="Cancel editing"
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-slate-800">
                        {section.title}
                      </h3>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(section.id);
                            setEditingTitle(section.title);
                          }}
                          aria-label="Rename section"
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            removeCustomSection(section.id)
                          }
                          aria-label="Delete custom section"
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  {(section.items || []).map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg bg-slate-50 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1 space-y-2">
                          <input
                            value={item.title}
                            onChange={(e) =>
                              handleUpdateItem(
                                section,
                                item.id,
                                "title",
                                e.target.value
                              )
                            }
                            placeholder="Entry title"
                            maxLength={200}
                            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-indigo-500"
                          />

                          <textarea
                            rows={2}
                            value={item.description || ""}
                            onChange={(e) =>
                              handleUpdateItem(
                                section,
                                item.id,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Entry description"
                            maxLength={3000}
                            className="w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveItem(section, item.id)
                          }
                          aria-label="Remove custom entry"
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                  <input
                    value={form.title}
                    onChange={(e) =>
                      updateEntryForm(
                        section.id,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="New entry title"
                    maxLength={200}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
                  />

                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) =>
                      updateEntryForm(
                        section.id,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Description (optional)"
                    maxLength={3000}
                    className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
                  />

                  <button
                    type="button"
                    onClick={() => handleAddItem(section)}
                    disabled={!form.title.trim()}
                    className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus size={15} />
                    Add Entry
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
