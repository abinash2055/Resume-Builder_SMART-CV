
import { useResumeStore } from "../../store/resumeStore";
import { Check, RotateCcw } from "lucide-react";
import { TEMPLATE_CONFIG } from "../../data/templateConfig";

const previewColors = {
  modern: "bg-indigo-600",
  classic: "bg-slate-700",
  minimal: "bg-stone-400",
  compact: "bg-emerald-700",
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

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Choose a resume template
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select a design to update your live resume preview.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {TEMPLATE_CONFIG.map((template) => {
          const isSelected = selectedTemplate === template.id;

          return (
            <div
              key={template.id}
              className={`rounded-xl border-2 p-4 transition ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/40 shadow-md"
                  : "border-slate-200 bg-white hover:border-indigo-300"
              }`}
            >
              <button
                type="button"
                onClick={() => selectTemplate(template.id)}
                aria-pressed={isSelected}
                className="w-full text-left"
              >
                <div className="mb-4 flex h-36 items-center justify-center rounded-lg bg-slate-100 p-4">
                  <div className="h-full w-24 rounded-sm bg-white p-2 shadow-sm">
                    <div
                      className={`mb-2 h-2 w-12 rounded ${previewColors[template.id]}`}
                    />

                    <div className="mb-3 h-1 w-16 rounded bg-slate-300" />

                    <div className="space-y-1.5">
                      <div className="h-1 w-full rounded bg-slate-200" />
                      <div className="h-1 w-5/6 rounded bg-slate-200" />
                      <div className="h-1 w-full rounded bg-slate-200" />
                    </div>

                    <div className="mb-2 mt-3 h-1 w-10 rounded bg-slate-400" />

                    <div className="space-y-1.5">
                      <div className="h-1 w-full rounded bg-slate-200" />
                      <div className="h-1 w-4/5 rounded bg-slate-200" />
                      <div className="h-1 w-full rounded bg-slate-200" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">
                    {template.name}
                  </h3>

                  {isSelected && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2 py-1 text-xs font-semibold text-white">
                      <Check size={12} />
                      Selected
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm leading-5 text-slate-500">
                  {template.description}
                </p>
              </button>

              {isSelected && (
                <button
                  type="button"
                  onClick={() => resetTemplateStyle(template.id)}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-indigo-600 hover:text-indigo-800"
                >
                  <RotateCcw size={13} />
                  Restore default style
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
