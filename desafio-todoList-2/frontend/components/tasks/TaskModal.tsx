"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flag } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { createTask, getCategories, ApiError } from "@/lib/api";
import { Category } from "@/types/category";
import { Priority } from "@/types/task";

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
];

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TaskModal({ open, onClose }: TaskModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>("MEDIUM");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!open) return;
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, [open]);

  function reset() {
    setTitle("");
    setDescription("");
    setCategoryId("");
    setDueDate("");
    setPriority("MEDIUM");
    setError(null);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;

    setError(null);
    setIsSaving(true);
    createTask({
      title: title.trim(),
      description: description.trim() || null,
      priority,
      duDate: dueDate || null,
      categoryId: categoryId || null,
    })
      .then(() => {
        reset();
        onClose();
        router.refresh();
      })
      .catch((err) => {
        setError(err instanceof ApiError ? err.message : "Erro ao criar tarefa");
      })
      .finally(() => setIsSaving(false));
  }

  return (
    <Modal open={open} onClose={handleClose} title="Nova Tarefa">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Título"
          required
          placeholder="Ex: Finalizar estratégia de marketing Q3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={error ?? undefined}
          autoFocus
        />

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-text-secondary">Descrição</label>
            <span className="text-xs text-primary-600">Opcional</span>
          </div>
          <Textarea
            placeholder="Adicione contexto, links ou observações relevantes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Categoria"
            placeholder="Selecione uma categoria..."
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />
          <Input
            label="Data de Vencimento"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text-secondary">Prioridade</span>
          <div className="grid grid-cols-3 overflow-hidden rounded-md border border-border">
            {PRIORITY_OPTIONS.map((option, index) => {
              const selected = priority === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value)}
                  className={`flex h-10 items-center justify-center gap-1.5 text-sm font-medium transition-colors ${
                    index > 0 ? "border-l border-border" : ""
                  } ${
                    selected
                      ? "bg-primary-50 text-primary-600"
                      : "text-text-secondary hover:bg-surface-muted"
                  }`}
                >
                  {selected && <Flag className="h-3.5 w-3.5" />}
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSaving || !title.trim()}>
            Salvar Tarefa
          </Button>
        </div>
      </form>
    </Modal>
  );
}
