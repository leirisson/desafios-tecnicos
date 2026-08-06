"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, ListChecks, Calendar, Tag, CheckCheck } from "lucide-react";
import CreateTaskButton from "@/components/tasks/CreateTaskButton";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/tasks", label: "Tarefas", icon: ListChecks },
  { href: "/calendar", label: "Calendário", icon: Calendar },
  { href: "/categories", label: "Categorias", icon: Tag },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex w-72 shrink-0 flex-col gap-8 border-r border-border bg-surface p-6">
      <div className="flex items-center gap-3 px-1">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-500 text-white">
          <CheckCheck className="h-6 w-6" />
        </span>
        <div>
          <p className="text-lg font-semibold leading-tight text-text-primary">Todo List</p>
          <p className="text-sm text-text-tertiary">Gestão de tarefas</p>
        </div>
      </div>

      <CreateTaskButton className="h-12 w-full justify-center text-sm font-semibold" />

      <div className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary-50 text-primary-600"
                  : "text-text-secondary hover:bg-surface-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
