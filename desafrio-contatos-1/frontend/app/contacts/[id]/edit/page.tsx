"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ContactForm } from "@/components/contacts/ContactForm";
import { useContact } from "@/lib/useContact";

export default function EditContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { contact } = useContact(id);

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
        <ContactForm contact={contact} />
      </div>
    </AppShell>
  );
}
