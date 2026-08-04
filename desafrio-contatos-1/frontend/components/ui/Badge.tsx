import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ContactCategory } from "@/lib/types";

const categoryClasses: Record<ContactCategory, string> = {
  WORK: "bg-primary-light text-primary",
  PERSONAL: "bg-violet-100 text-violet-700",
  OTHER: "bg-surface-muted text-text-secondary",
};

export function Badge({
  children,
  category,
  className,
}: {
  children: ReactNode;
  category?: ContactCategory;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-wide",
        category ? categoryClasses[category] : "bg-surface-muted text-text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
