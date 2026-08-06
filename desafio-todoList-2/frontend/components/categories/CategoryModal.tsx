"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Folder, Star, Briefcase, Home, User, Check, LucideIcon } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createCategory, ApiError } from "@/lib/api";
import {
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  CategoryIconName,
  setCategoryAppearance,
} from "@/lib/categoryAppearance";

const ICON_COMPONENTS: Record<CategoryIconName, LucideIcon> = {
  folder: Folder,
  star: Star,
  briefcase: Briefcase,
  home: Home,
  user: User,
};

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CategoryModal({ open, onClose }: CategoryModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [color, setColor] = useState<string>(CATEGORY_COLORS[0]);
  const [icon, setIcon] = useState<CategoryIconName>("folder");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  function reset() {
    setName("");
    setColor(CATEGORY_COLORS[0]);
    setIcon("folder");
    setError(null);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;

    setError(null);
    setIsSaving(true);
    createCategory({ name: name.trim() })
      .then((category) => {
        setCategoryAppearance(category.id, { color, icon });
        reset();
        onClose();
        router.refresh();
      })
      .catch((err) => {
        setError(err instanceof ApiError ? err.message : "Erro ao criar categoria");
      })
      .finally(() => setIsSaving(false));
  }

  return (
    <Modal open={open} onClose={handleClose} title="Nova Categoria">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Nome da Categoria"
          placeholder="Ex: Projetos de Design"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error ?? undefined}
          autoFocus
        />

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-text-secondary">Cor de Identificação</span>
          <div className="flex items-center gap-2">
            {CATEGORY_COLORS.map((swatch) => (
              <button
                key={swatch}
                type="button"
                aria-label={`Selecionar cor ${swatch}`}
                onClick={() => setColor(swatch)}
                className={`flex h-8 w-8 items-center justify-center rounded-full ring-offset-2 transition-shadow ${
                  color === swatch ? "ring-2 ring-primary-500" : ""
                }`}
                style={{ backgroundColor: swatch }}
              >
                {color === swatch && <Check className="h-4 w-4 text-white" />}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-secondary">Ícone</span>
            <span className="text-xs text-text-tertiary">Opcional</span>
          </div>
          <div className="flex items-center gap-2">
            {CATEGORY_ICONS.map((name) => {
              const Icon = ICON_COMPONENTS[name];
              const selected = icon === name;
              return (
                <button
                  key={name}
                  type="button"
                  aria-label={`Selecionar ícone ${name}`}
                  onClick={() => setIcon(name)}
                  className={`flex h-10 w-10 items-center justify-center rounded-md border ${
                    selected
                      ? "border-primary-500 bg-primary-50 text-primary-600"
                      : "border-border text-text-secondary hover:bg-surface-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSaving || !name.trim()}>
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
