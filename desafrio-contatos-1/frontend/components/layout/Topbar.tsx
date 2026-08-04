"use client";

import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { IconPlusCircle, IconSearch } from "@/components/ui/icons";

export function Topbar({
  searchValue,
  onSearchChange,
}: {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}) {
  return (
    <header className="flex items-center gap-4 border-b border-border bg-surface px-6 py-3.5">
      <div className="max-w-md flex-1">
        <Input
          icon={<IconSearch className="h-4 w-4" />}
          placeholder="Buscar por nome..."
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Link href="/contacts/new">
          <IconButton aria-label="Adicionar novo contato">
            <IconPlusCircle className="h-5 w-5" />
          </IconButton>
        </Link>

        <Avatar name="Usuário" size={60} className="ml-1" />
      </div>
    </header>
  );
}
