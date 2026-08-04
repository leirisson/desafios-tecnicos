"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ContactDetail } from "@/components/contacts/ContactDetail";
import { useContact } from "@/lib/useContact";

export default function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { contact, setContact } = useContact(id);

  if (contact === undefined) {
    return (
      <AppShell>
        <p className="text-sm text-text-secondary">Carregando contato...</p>
      </AppShell>
    );
  }

  if (contact === null) {
    notFound();
  }

  return (
    <AppShell>
      <div className="flex justify-center">
        <ContactDetail contact={contact} onContactChange={setContact} />
      </div>
    </AppShell>
  );
}
