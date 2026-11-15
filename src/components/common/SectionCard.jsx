
import { ChevronDown } from "lucide-react";

function SectionCard({
  title,
  description,
  icon: Icon,
  children,
  defaultOpen = true,
}) {
  return (
    <details
      open={defaultOpen}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Icon size={20} />
            </div>
          )}

          <div>
            <h2 className="font-semibold text-slate-900">{title}</h2>
            {description && (
              <p className="mt-1 text-xs text-slate-500">{description}</p>
            )}
          </div>
        </div>

        <ChevronDown
          size={20}
          className="shrink-0 text-slate-400 transition-transform group-open:rotate-180"
        />
      </summary>

      <div className="border-t border-slate-100 p-5 sm:p-6">
        {children}
      </div>
    </details>
  );
}

export default SectionCard;
