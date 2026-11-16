
import { useMemo, useState } from "react";
import { useResumeStore } from "../../store/resumeStore";
import {
  Check,
  RotateCcw,
  Search,
  LayoutGrid,
  BriefcaseBusiness,
  Palette,
  GraduationCap,
  Code2,
  FileCheck,
} from "lucide-react";

import { TEMPLATE_CONFIG } from "../../data/templateConfig";

const previewColors = {
  modern: "bg-indigo-600",
  classic: "bg-slate-700",
  minimal: "bg-stone-400",
  compact: "bg-emerald-700",
  executive: "bg-blue-950",
  corporate: "bg-teal-700",
  creative: "bg-pink-600",
  developer: "bg-cyan-600",
  elegant: "bg-amber-700",
  academic: "bg-blue-700",
  "ats-friendly": "bg-gray-800",
  sidebar: "bg-indigo-700",
  bold: "bg-red-700",
  professional: "bg-blue-600",
  "modern-two-column": "bg-cyan-700",
};

const categoryIcons = {
  All: LayoutGrid,
  Professional: BriefcaseBusiness,
  Traditional: BriefcaseBusiness,
  Minimal: FileCheck,
  Compact: LayoutGrid,
  Creative: Palette,
  Technology: Code2,
  Academic: GraduationCap,
  ATS: FileCheck,
};

export default function TemplateSelector() {
  const selectedTemplate = useResumeStore(
    (state) => state.settings.template
  );

  const selectTemplate = useResumeStore(
    (state) => state.selectTemplate
  );

  const resetTemplateStyle = useResumeStore(
    (state) => state.resetTemplateStyle
  );

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useMemo(
    () => [
      "All",
      ...new Set(TEMPLATE_CONFIG.map((template) => template.category)),
    ],
    []
  );

  const filteredTemplates = useMemo(() => {
    return TEMPLATE_CONFIG.filter((template) => {
      const matchesCategory =
        activeCategory === "All" ||
        template.category === activeCategory;

      const searchValue = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        template.name.toLowerCase().includes(searchValue) ||
        template.description.toLowerCase().includes(searchValue) ||
        template.category.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Choose a resume template
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Explore different layouts and select the design that suits
              your professional profile.
            </p>
          </div>

          <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
            {TEMPLATE_CONFIG.length} Templates
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search templates..."
          aria-label="Search resume templates"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Categories */}
      <div
        className="flex flex-wrap gap-2"
        aria-label="Filter templates by category"
      >
        {categories.map((category) => {
          const Icon = categoryIcons[category] || LayoutGrid;
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              <Icon size={15} />
              {category}
            </button>
          );
        })}
      </div>

      {/* Template Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTemplates.map((template) => {
            const isSelected = selectedTemplate === template.id;

            return (
              <div
                key={template.id}
                className={`group overflow-hidden rounded-2xl border-2 bg-white transition-all duration-200 ${
                  isSelected
                    ? "border-indigo-600 shadow-lg shadow-indigo-100"
                    : "border-slate-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
                }`}
              >
                {/* Template Preview */}
                <button
                  type="button"
                  onClick={() => selectTemplate(template.id)}
                  aria-pressed={isSelected}
                  aria-label={`Select ${template.name} template`}
                  className="block w-full text-left"
                >
                  <div className="relative flex h-52 items-center justify-center overflow-hidden bg-slate-100 p-5">
                    {/* Paper */}
                    <div
                      className={`relative h-full w-36 rounded-sm bg-white p-3 shadow-md transition-transform duration-200 group-hover:scale-105 ${
                        template.columns === 2 ? "w-40" : ""
                      }`}
                    >
                      {/* Header */}
                      <div className="mb-3 border-b border-slate-100 pb-2">
                        <div
                          className={`mb-2 h-2 w-16 rounded ${previewColors[template.id] || "bg-indigo-600"}`}
                        />
                        <div className="h-1 w-20 rounded bg-slate-300" />
                      </div>

                      {/* Content */}
                      <div
                        className={`flex gap-2 ${
                          template.columns === 2 ? "flex-row" : "flex-col"
                        }`}
                      >
                        {template.columns === 2 && (
                          <div className="w-1/3 space-y-2 border-r border-slate-100 pr-1">
                            <div className="h-1 w-full rounded bg-slate-300" />
                            <div className="h-1 w-4/5 rounded bg-slate-200" />
                            <div className="h-1 w-full rounded bg-slate-200" />
                            <div className="h-1 w-3/4 rounded bg-slate-200" />
                          </div>
                        )}

                        <div className="flex-1 space-y-2">
                          <div
                            className={`h-1 w-10 rounded ${
                              previewColors[template.id] || "bg-indigo-600"
                            }`}
                          />

                          <div className="space-y-1">
                            <div className="h-1 w-full rounded bg-slate-200" />
                            <div className="h-1 w-5/6 rounded bg-slate-200" />
                            <div className="h-1 w-full rounded bg-slate-200" />
                          </div>

                          <div
                            className={`h-1 w-10 rounded ${
                              previewColors[template.id] || "bg-indigo-600"
                            }`}
                          />

                          <div className="space-y-1">
                            <div className="h-1 w-full rounded bg-slate-200" />
                            <div className="h-1 w-4/5 rounded bg-slate-200" />
                            <div className="h-1 w-full rounded bg-slate-200" />
                          </div>

                          <div className="h-1 w-8 rounded bg-slate-300" />

                          <div className="space-y-1">
                            <div className="h-1 w-full rounded bg-slate-200" />
                            <div className="h-1 w-5/6 rounded bg-slate-200" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Selected Indicator */}
                    {isSelected && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow">
                        <Check size={13} />
                        Selected
                      </span>
                    )}

                    {/* Category */}
                    <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm">
                      {template.category}
                    </span>
                  </div>

                  {/* Template Details */}
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {template.name}
                      </h3>

                      {template.columns === 2 && (
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
                          2 Columns
                        </span>
                      )}
                    </div>

                    <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                      {template.description}
                    </p>
                  </div>
                </button>

                {/* Restore Defaults */}
                {isSelected && (
                  <div className="border-t border-slate-100 px-4 py-3">
                    <button
                      type="button"
                      onClick={() => resetTemplateStyle(template.id)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 transition hover:text-indigo-800"
                    >
                      <RotateCcw size={14} />
                      Restore default style
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
          <Search size={28} className="mx-auto text-slate-400" />

          <h3 className="mt-3 font-semibold text-slate-800">
            No templates found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try another search term or select a different category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setActiveCategory("All");
            }}
            className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
