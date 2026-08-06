import { TriangleAlert } from "lucide-react";
import { Priority, Status } from "@/types/task";

const PRIORITY_CLASSES: Record<Priority, string> = {
  LOW: "bg-info-50 text-info-600",
  MEDIUM: "bg-warning-50 text-warning-600",
  HIGH: "bg-danger-50 text-danger-600",
};

const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
};

const STATUS_CLASSES: Record<Status, string> = {
  PENDING: "bg-surface-muted text-text-secondary",
  COMPLETED: "bg-success-50 text-success-600",
};

const STATUS_LABELS: Record<Status, string> = {
  PENDING: "Pendente",
  COMPLETED: "Concluída",
};

const BASE_CLASSES =
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold";

interface BadgeProps {
  className?: string;
}

interface PriorityBadgeProps extends BadgeProps {
  priority: Priority;
}

export function PriorityBadge({ priority, className = "" }: PriorityBadgeProps) {
  return (
    <span className={`${BASE_CLASSES} ${PRIORITY_CLASSES[priority]} ${className}`}>
      {PRIORITY_LABELS[priority]}
    </span>
  );
}

interface StatusBadgeProps extends BadgeProps {
  status: Status;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return (
    <span className={`${BASE_CLASSES} ${STATUS_CLASSES[status]} ${className}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

export function OverdueBadge({ className = "" }: BadgeProps) {
  return (
    <span className={`${BASE_CLASSES} bg-danger-500 text-white ${className}`}>
      <TriangleAlert className="h-4 w-4" />
      Atrasada
    </span>
  );
}

interface CategoryBadgeProps extends BadgeProps {
  name: string;
}

export function CategoryBadge({ name, className = "" }: CategoryBadgeProps) {
  return (
    <span className={`${BASE_CLASSES} bg-primary-50 text-primary-600 ${className}`}>
      {name}
    </span>
  );
}
