"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { ContactCategory } from "@/lib/types";
import {
  IconBriefcase,
  IconFamily,
  IconPerson,
  IconPlus,
  IconStar,
  IconTrash,
  IconUsers,
} from "@/components/ui/icons";

type CategoryFilter = "ALL" | "FAVORITES" | ContactCategory;

const navItems: {
  filter: CategoryFilter;
  label: string;
  icon: typeof IconUsers;
}[] = [
  { filter: "ALL", label: "Todos os Contatos", icon: IconUsers },
  { filter: "FAVORITES", label: "Favoritos", icon: IconStar },
  { filter: "WORK", label: "Trabalho", icon: IconBriefcase },
  { filter: "OTHER", label: "Família", icon: IconFamily },
  { filter: "PERSONAL", label: "Pessoal", icon: IconPerson },
];

const footerItems = [
  { href: "/trash", label: "Lixeira", icon: IconTrash },
];

function filterHref(filter: CategoryFilter) {
  if (filter === "ALL") return "/";
  if (filter === "FAVORITES") return "/?favorite=true";
  return `/?category=${filter}`;
}

export function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeFilter: CategoryFilter = searchParams.get("favorite") === "true"
    ? "FAVORITES"
    : (searchParams.get("category") as ContactCategory | null) ?? "ALL";

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-surface px-4 py-5">
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          C
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">Contatos</p>
          <p className="text-xs text-text-secondary">Gestão de Contatos</p>
        </div>
      </div>

      <Link href="/contacts/new" className="mt-5">
        <Button className="w-full">
          <IconPlus className="h-4 w-4" />
          Novo Contato
        </Button>
      </Link>

      <nav className="mt-5 flex flex-1 flex-col gap-1">
        {navItems.map(({ filter, label, icon: Icon }) => {
          const isActive = pathname === "/" && filter === activeFilter;
          return (
            <Link
              key={label}
              href={filterHref(filter)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-light text-primary"
                  : "text-text-secondary hover:bg-surface-muted hover:text-text-primary",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1 border-t border-border pt-4">
        {footerItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === href
                ? "bg-primary-light text-primary"
                : "text-text-secondary hover:bg-surface-muted hover:text-text-primary",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
