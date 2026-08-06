import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
}

const FIELD_CLASSES =
  "h-10 rounded-md border border-border bg-surface px-3 text-sm text-text-primary outline-none focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, required, placeholder, options, className = "", ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-secondary">
          {label}
          {required && <span className="ml-0.5 text-danger-500">*</span>}
        </label>
      )}
      <select ref={ref} className={`${FIELD_CLASSES} ${className}`} {...props}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-danger-500">{error}</span>}
    </div>
  );
});
