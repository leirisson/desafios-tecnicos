import { Task, Priority } from "@/types/task";
import { PriorityBadge } from "@/components/ui/Badge";
import TaskCompleteCheckbox from "@/components/tasks/TaskCompleteCheckbox";

const PRIORITY_BORDER_CLASSES: Record<Priority, string> = {
  LOW: "border-l-info-500",
  MEDIUM: "border-l-warning-500",
  HIGH: "border-l-danger-500",
};

function formatDueDate(dueDate: string | null): string {
  if (!dueDate) return "Sem prazo";

  const today = new Date();
  const date = new Date(`${dueDate}T00:00:00`);
  const diffDays = Math.round(
    (date.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) / 86_400_000
  );

  if (diffDays === 0) return "Vence hoje";
  if (diffDays === 1) return "Vence amanhã";
  if (diffDays < 0) return `Venceu há ${Math.abs(diffDays)} dia(s)`;
  return `Vence em ${diffDays} dias`;
}

interface TaskGlanceItemProps {
  task: Task;
  categoryName?: string;
}

export default function TaskGlanceItem({ task, categoryName }: TaskGlanceItemProps) {
  const completed = task.status === "COMPLETED";

  return (
    <div
      className={`flex items-center gap-4 rounded-lg border-l-4 border-y border-r border-border bg-surface p-4 shadow-[var(--shadow-card)] ${
        completed ? "border-l-border opacity-60" : PRIORITY_BORDER_CLASSES[task.priority]
      }`}
    >
      <TaskCompleteCheckbox taskId={task.id} completed={completed} />
      <div className="flex-1">
        <p
          className={`text-sm font-semibold text-text-primary ${completed ? "line-through" : ""}`}
        >
          {task.title}
        </p>
        <p className="text-xs text-text-tertiary">
          {formatDueDate(task.dueDate)}
          {categoryName ? ` • ${categoryName}` : ""}
        </p>
      </div>
      <PriorityBadge priority={task.priority} className="shrink-0" />
    </div>
  );
}
