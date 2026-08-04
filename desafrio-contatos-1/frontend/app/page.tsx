"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ContactCard } from "@/components/contacts/ContactCard";
import { listActiveContacts, searchContactsByName } from "@/lib/api";
import { Contact, ContactCategory } from "@/lib/types";

type FetchState =
  | { status: "loading"; search: string }
  | { status: "error"; search: string }
  | { status: "success"; search: string; contacts: Contact[] };

function ContactsList({ search }: { search: string }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as ContactCategory | null;
  const onlyFavorites = searchParams.get("favorite") === "true";

  const [state, setState] = useState<FetchState>({ status: "loading", search });

  useEffect(() => {
    let cancelled = false;

    const trimmed = search.trim();
    const fetchPromise = trimmed
      ? searchContactsByName(trimmed).then((data) =>
          data.filter((contact) => contact.active !== false),
        )
      : listActiveContacts();

    fetchPromise
      .then((data) => {
        if (!cancelled) setState({ status: "success", search, contacts: data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", search });
      });

    return () => {
      cancelled = true;
    };
  }, [search]);

  const isLoading = state.search !== search;

  const filteredContacts = useMemo(() => {
    if (state.status !== "success" || isLoading) return [];
    return state.contacts.filter((contact) => {
      const matchesCategory = !category || contact.category === category;
      const matchesFavorite = !onlyFavorites || contact.favorite === true;
      return matchesCategory && matchesFavorite;
    });
  }, [state, isLoading, category, onlyFavorites]);

  if (isLoading || state.status === "loading") {
    return <p className="mt-10 text-sm text-text-secondary">Carregando contatos...</p>;
  }

  if (state.status === "error") {
    return (
      <p className="mt-10 text-sm text-danger">
        Não foi possível carregar os contatos. Verifique se o servidor está rodando.
      </p>
    );
  }

  if (filteredContacts.length === 0) {
    return (
      <p className="mt-10 text-sm text-text-secondary">Nenhum contato encontrado.</p>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap gap-4">
      {filteredContacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <AppShell onSearchChange={setSearch}>
      <h1 className="text-2xl font-semibold text-text-primary">Meus Contatos</h1>

      <Suspense fallback={null}>
        <ContactsList search={search} />
      </Suspense>
    </AppShell>
  );
}
