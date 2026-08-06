"use client";

import { MouseEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { completeTask } from "@/lib/api";

interface TaskCompleteCheckboxProps {
  taskId: string;
  completed: boolean;
}

export default function TaskCompleteCheckbox({ taskId, completed }: TaskCompleteCheckboxProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(false);

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (completed || isPending) return;

    setError(false);
    startTransition(async () => {
      try {
        await completeTask(taskId);
        router.refresh();
      } catch {
        setError(true);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={completed || isPending}
      aria-label={completed ? "Tarefa concluída" : "Marcar como concluída"}
      title={error ? "Não foi possível concluir a tarefa" : undefined}
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
        completed
          ? "border-primary-500 bg-primary-500 text-white"
          : "border-border bg-surface hover:border-primary-500 disabled:cursor-not-allowed"
      }`}
    >
      {completed && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
    </button>
  );
}
