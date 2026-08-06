"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck, Pencil, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { completeTask, deleteTask, ApiError } from "@/lib/api";

interface TaskActionsPanelProps {
  taskId: string;
  completed: boolean;
}

export default function TaskActionsPanel({ taskId, completed }: TaskActionsPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleComplete() {
    setError(null);
    startTransition(async () => {
      try {
        await completeTask(taskId);
        router.refresh();
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "Erro ao concluir tarefa");
      }
    });
  }

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      try {
        await deleteTask(taskId);
        router.push("/tasks");
        router.refresh();
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "Erro ao excluir tarefa");
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleComplete}
        disabled={completed || isPending}
        className="w-full"
      >
        <CircleCheck className="h-4 w-4" />
        {completed ? "Tarefa concluída" : "Marcar como concluída"}
      </Button>
      <Button variant="secondary" disabled className="w-full">
        <Pencil className="h-4 w-4" />
        Editar Tarefa
      </Button>
      <Button
        variant="outline"
        onClick={handleDelete}
        disabled={isPending}
        className="w-full border-danger-500 text-danger-600 hover:bg-danger-50"
      >
        <Trash2 className="h-4 w-4" />
        Excluir Tarefa
      </Button>
      {error && <p className="text-xs text-danger-500">{error}</p>}
    </div>
  );
}
