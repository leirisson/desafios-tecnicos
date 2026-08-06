"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/Select";
import { Category } from "@/types/category";

const PRIORITY_OPTIONS = [
  { value: "LOW", label: "Baixa" },
  { value: "MEDIUM", label: "Média" },
  { value: "HIGH", label: "Alta" },
];

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pendente" },
  { value: "COMPLETED", label: "Concluída" },
];

interface TaskFilterBarProps {
  categories: Category[];
}

export default function TaskFilterBar({ categories }: TaskFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/tasks?${params.toString()}`);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Select
        aria-label="Filtrar por categoria"
        placeholder="Categoria"
        value={searchParams.get("categoryId") ?? ""}
        onChange={(e) => setFilter("categoryId", e.target.value)}
        options={categories.map((category) => ({ value: category.id, label: category.name }))}
        className="w-40"
      />
      <Select
        aria-label="Filtrar por prioridade"
        placeholder="Prioridade"
        value={searchParams.get("priority") ?? ""}
        onChange={(e) => setFilter("priority", e.target.value)}
        options={PRIORITY_OPTIONS}
        className="w-36"
      />
      <Select
        aria-label="Filtrar por status"
        placeholder="Status"
        value={searchParams.get("status") ?? ""}
        onChange={(e) => setFilter("status", e.target.value)}
        options={STATUS_OPTIONS}
        className="w-36"
      />
    </div>
  );
}
