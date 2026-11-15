
import { Link } from "react-router-dom";
import { ArrowRight, Check, FileText, Sparkles } from "lucide-react";

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "A contemporary professional layout.",
    color: "bg-indigo-600",
    category: "Professional",
  },
  {
    id: "classic",
    name: "Classic",
    description: "A traditional and formal resume design.",
    color: "bg-slate-700",
    category: "Traditional",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "A clean layout with simple typography.",
    color: "bg-emerald-600",
    category: "Minimal",
  },
  {
    id: "compact",
    name: "Compact",
    description: "A space-efficient professional layout.",
    color: "bg-violet-600",
    category: "Compact",
  },
];

function TemplateGallery() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-brand-600">
          <Sparkles size={16} />
          Resume designs
        </div>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
          Choose your template
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Explore different resume styles and find a layout that matches
          your professional identity.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {templates.map((template) => (
          <article
            key={template.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="bg-slate-100 p-5">
              <div className="mx-auto flex aspect-[210/297] max-w-[210px] flex-col bg-white p-5 shadow-md">
                <div className={`h-2 w-full rounded ${template.color}`} />
                <div className="mt-5 h-3 w-3/4 rounded-sm bg-slate-700" />
                <div className="mt-2 h-1.5 w-1/2 rounded-sm bg-slate-300" />

                <div className="mt-6 space-y-2">
                  <div className="h-1.5 w-1/3 rounded-sm bg-slate-500" />
                  <div className="h-1 w-full rounded-sm bg-slate-200" />
                  <div className="h-1 w-5/6 rounded-sm bg-slate-200" />
                  <div className="h-1 w-4/5 rounded-sm bg-slate-200" />
                </div>

                <div className="mt-5 space-y-2">
                  <div className="h-1.5 w-2/5 rounded-sm bg-slate-500" />
                  <div className="h-1 w-full rounded-sm bg-slate-200" />
                  <div className="h-1 w-5/6 rounded-sm bg-slate-200" />
                </div>

                <div className="mt-5 space-y-2">
                  <div className="h-1.5 w-1/3 rounded-sm bg-slate-500" />
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <span
                        key={index}
                        className="h-2 w-8 rounded-sm bg-slate-200"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-bold text-slate-900">
                  {template.name}
                </h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
                  {template.category}
                </span>
              </div>

              <p className="mt-2 min-h-10 text-xs leading-5 text-slate-500">
                {template.description}
              </p>

              <Link
                to="/builder"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                <Check size={16} />
                Use template
                <ArrowRight size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
        <FileText className="mt-0.5 shrink-0 text-brand-600" size={21} />
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            More customization is coming
          </h3>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            Font selection, colors, layouts, page formats, and fully
            functional resume templates will be implemented in later phases.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TemplateGallery;
