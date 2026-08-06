import Link from "next/link";
import { Calendar } from "lucide-react";
import { Task, Priority } from "@/types/task";
import { PriorityBadge, OverdueBadge } from "@/components/ui/Badge";
import TaskCompleteCheckbox from "@/components/tasks/TaskCompleteCheckbox";

const PRIORITY_BORDER_CLASSES: Record<Priority, string> = {
  LOW: "border-l-info-500",
  MEDIUM: "border-l-warning-500",
  HIGH: "border-l-danger-500",
};

function formatDate(dueDate: string | null): string {
  if (!dueDate) return "Sem prazo";
  const date = new Date(`${dueDate}T00:00:00`);
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const completed = task.status === "COMPLETED";

  return (
    <Link
      href={`/tasks/${task.id}`}
      className={`flex items-start gap-4 rounded-lg border-l-4 border-y border-r border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-colors hover:border-primary-500 ${
        completed ? "border-l-border opacity-60" : PRIORITY_BORDER_CLASSES[task.priority]
      }`}
    >
      <div className="pt-0.5">
        <TaskCompleteCheckbox taskId={task.id} completed={completed} />
      </div>

      <div className="flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <PriorityBadge priority={task.priority} />
          {task.overdue && <OverdueBadge />}
        </div>
        <p
          className={`text-base font-semibold text-text-primary ${completed ? "line-through" : ""}`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="mt-1 text-sm text-text-secondary">{task.description}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1.5 pt-0.5 text-xs font-medium text-text-tertiary">
        <Calendar className="h-3.5 w-3.5" />
        {formatDate(task.dueDate)}
      </div>
    </Link>
  );
}
