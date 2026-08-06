"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2, Check, X, Folder, Star, Briefcase, Home, User, LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { updateCategory, deleteCategory, ApiError } from "@/lib/api";
import {
  CategoryAppearance,
  CategoryIconName,
  getCategoryAppearance,
  removeCategoryAppearance,
} from "@/lib/categoryAppearance";

const ICON_COMPONENTS: Record<CategoryIconName, LucideIcon> = {
  folder: Folder,
  star: Star,
  briefcase: Briefcase,
  home: Home,
  user: User,
};

interface CategoryRowProps {
  id: string;
  name: string;
  taskCount: number;
}

export default function CategoryRow({ id, name, taskCount }: CategoryRowProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [appearance] = useState<CategoryAppearance>(() => getCategoryAppearance(id));

  const Icon = ICON_COMPONENTS[appearance.icon];

  function handleSave() {
    if (!editedName.trim() || editedName.trim() === name) {
      setIsEditing(false);
      setEditedName(name);
      return;
    }

    startTransition(async () => {
      try {
        await updateCategory(id, { name: editedName.trim() });
        setIsEditing(false);
        router.refresh();
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "Erro ao editar categoria");
      }
    });
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setEditedName(name);
    setError(null);
  }

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      try {
        await deleteCategory(id);
        removeCategoryAppearance(id);
        router.refresh();
      } catch (err) {
        setError(
          err instanceof ApiError
            ? err.message
            : "Erro ao excluir categoria"
        );
      }
    });
  }

  return (
    <tr className="border-b border-border last:border-0">
      <td className="px-5 py-4 pr-4">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              autoFocus
              className="h-9 w-56"
            />
            <button
              onClick={handleSave}
              disabled={isPending}
              aria-label="Salvar"
              className="rounded p-1.5 text-success-600 hover:bg-success-50"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={handleCancelEdit}
              aria-label="Cancelar"
              className="rounded p-1.5 text-text-tertiary hover:bg-surface-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <Link
            href={`/tasks?categoryId=${id}`}
            className="flex w-fit items-center gap-2 font-medium text-text-primary hover:text-primary-600 hover:underline"
          >
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${appearance.color}1a`, color: appearance.color }}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            {name}
          </Link>
        )}
        {error && <p className="mt-1 text-xs text-danger-500">{error}</p>}
      </td>
      <td className="py-4 pr-4">
        <span className="inline-flex rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-600">
          {taskCount} tarefa{taskCount !== 1 ? "s" : ""}
        </span>
      </td>
      <td className="py-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsEditing(true)}
            aria-label="Editar categoria"
            className="rounded p-1.5 text-text-tertiary hover:bg-surface-muted"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            aria-label="Excluir categoria"
            className="rounded p-1.5 text-text-tertiary hover:bg-danger-50 hover:text-danger-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
