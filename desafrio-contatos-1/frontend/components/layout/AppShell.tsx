"use client";

import { ReactNode, Suspense, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export function AppShell({
  children,
  onSearchChange,
}: {
  children: ReactNode;
  onSearchChange?: (value: string) => void;
}) {
  const [search, setSearch] = useState("");

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Suspense fallback={null}>
        <Sidebar />
      </Suspense>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          searchValue={search}
          onSearchChange={(value) => {
            setSearch(value);
            onSearchChange?.(value);
          }}
        />
        <main className="flex-1 overflow-y-auto px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
