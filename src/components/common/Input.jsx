
import { useId } from "react";

export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  error = "",
  hint = "",
  helperText = "",
  className = "",
  id,
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;

  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  const description = hint || helperText;

  const describedBy = [
    description ? hintId : null,
    error ? errorId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-600" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <input
        {...props}
        id={inputId}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`
          w-full rounded-lg border bg-white px-3 py-2.5
          text-sm text-slate-900 outline-none transition-colors
          placeholder:text-slate-400
          disabled:cursor-not-allowed disabled:bg-slate-100
          disabled:text-slate-500
          focus-visible:ring-2 focus-visible:ring-indigo-500
          focus-visible:ring-offset-2
          ${
            error
              ? "border-red-500 focus-visible:ring-red-500"
              : "border-slate-300 hover:border-slate-400"
          }
          ${className}
        `}
      />

      {description && (
        <p id={hintId} className="text-xs text-slate-500">
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
