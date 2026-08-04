import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type IconButtonVariant = "default" | "primary" | "muted";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  "aria-label": string;
}

const variantClasses: Record<IconButtonVariant, string> = {
  default:
    "text-text-secondary hover:bg-surface-muted hover:text-text-primary",
  primary: "bg-primary-light text-primary hover:bg-primary/20",
  muted: "text-text-muted hover:bg-surface-muted hover:text-text-primary",
};

export function IconButton({
  variant = "default",
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
