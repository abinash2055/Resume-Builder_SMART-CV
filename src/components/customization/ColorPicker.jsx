
export default function ColorPicker({
  label,
  value,
  onChange,
  description,
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>

        <span className="text-xs font-mono text-slate-500">
          {value}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={label}
          className="h-10 w-14 cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
        />

        <input
          type="text"
          value={value}
          onChange={(event) => {
            const next = event.target.value;

            if (/^#[0-9a-fA-F]{6}$/.test(next)) {
              onChange(next);
            }
          }}
          aria-label={`${label} hexadecimal value`}
          maxLength={7}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm uppercase outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {description && (
        <p className="text-xs text-slate-500">{description}</p>
      )}
    </div>
  );
}
