"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import TaskModal from "@/components/tasks/TaskModal";

interface CreateTaskButtonProps {
  className?: string;
  label?: string;
  showIcon?: boolean;
}

export default function CreateTaskButton({
  className = "",
  label = "Nova Tarefa",
  showIcon = true,
}: CreateTaskButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)} className={className}>
        {showIcon && <Plus className="h-4 w-4" />}
        {label}
      </Button>
      <TaskModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
