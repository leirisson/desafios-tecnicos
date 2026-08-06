import { InputHTMLAttributes, forwardRef } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className = "", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={`h-5 w-5 shrink-0 cursor-pointer rounded-full border-2 border-border accent-primary-500 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
});
