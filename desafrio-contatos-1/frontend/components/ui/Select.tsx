import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, className, children, ...props }, ref) => {
    return (
      <div>
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full appearance-none rounded-lg border bg-surface py-2.5 pl-3 pr-9 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40",
              error
                ? "border-danger focus:border-danger"
                : "border-border focus:border-primary",
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </div>
        {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";
