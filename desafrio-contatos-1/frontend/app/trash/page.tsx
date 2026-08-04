"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { TrashContactRow } from "@/components/contacts/TrashContactRow";
import { listDisabledContacts } from "@/lib/api";
import { Contact } from "@/lib/types";

type FetchState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; contacts: Contact[] };

export default function TrashPage() {
  const [state, setState] = useState<FetchState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    listDisabledContacts()
      .then((contacts) => {
        if (!cancelled) setState({ status: "success", contacts });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function handleRestored(id: string) {
    setState((current) =>
      current.status === "success"
        ? { status: "success", contacts: current.contacts.filter((c) => c.id !== id) }
        : current,
    );
  }

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold text-text-primary">Lixeira</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Contatos desativados. Reative um contato para que ele volte a aparecer na sua lista.
      </p>

      <div className="mt-6 flex max-w-2xl flex-col gap-3">
        {state.status === "loading" && (
          <p className="text-sm text-text-secondary">Carregando...</p>
        )}
        {state.status === "error" && (
          <p className="text-sm text-danger">
            Não foi possível carregar a lixeira. Verifique se o servidor está rodando.
          </p>
        )}
        {state.status === "success" && state.contacts.length === 0 && (
          <p className="text-sm text-text-secondary">A lixeira está vazia.</p>
        )}
        {state.status === "success" &&
          state.contacts.map((contact) => (
            <TrashContactRow key={contact.id} contact={contact} onRestored={handleRestored} />
          ))}
      </div>
    </AppShell>
  );
}
