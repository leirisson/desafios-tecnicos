import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, className, ...props }, ref) => {
    return (
      <div>
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full rounded-lg border bg-surface py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40",
              icon ? "pl-10 pr-3" : "px-3",
              error
                ? "border-danger focus:border-danger"
                : "border-border focus:border-primary",
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
