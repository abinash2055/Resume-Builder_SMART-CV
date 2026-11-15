
export default function RangeControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
  description,
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>

        <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">
          {value}{unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
        className="w-full cursor-pointer accent-indigo-600"
      />

      <div className="flex justify-between text-xs text-slate-400">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>

      {description && (
        <p className="text-xs text-slate-500">{description}</p>
      )}
    </div>
  );
}
