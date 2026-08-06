import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface FieldWrapperProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function FieldWrapper({ label, error, required, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-secondary">
          {label}
          {required && <span className="ml-0.5 text-danger-500">*</span>}
        </label>
      )}
      {children}
      {error && <span className="text-xs text-danger-500">{error}</span>}
    </div>
  );
}

const FIELD_CLASSES =
  "h-10 rounded-md border border-border bg-surface px-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, required, className = "", ...props },
  ref
) {
  return (
    <FieldWrapper label={label} error={error} required={required}>
      <input ref={ref} className={`${FIELD_CLASSES} ${className}`} {...props} />
    </FieldWrapper>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, required, className = "", ...props },
  ref
) {
  return (
    <FieldWrapper label={label} error={error} required={required}>
      <textarea
        ref={ref}
        className={`min-h-24 resize-y rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    </FieldWrapper>
  );
});
