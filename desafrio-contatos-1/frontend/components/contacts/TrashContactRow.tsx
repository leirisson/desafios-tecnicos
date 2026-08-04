"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { IconRestore } from "@/components/ui/icons";
import { reactivateContact } from "@/lib/api";
import { categoryLabels, Contact } from "@/lib/types";

export function TrashContactRow({
  contact,
  onRestored,
}: {
  contact: Contact;
  onRestored: (id: string) => void;
}) {
  const [restoring, setRestoring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRestore() {
    setError(null);
    setRestoring(true);
    try {
      await reactivateContact(contact);
      onRestored(contact.id);
    } catch {
      setError("Não foi possível reativar o contato.");
      setRestoring(false);
    }
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm">
      <Avatar name={contact.name} size={44} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-text-primary">{contact.name}</p>
        <p className="truncate text-sm text-text-secondary">{contact.phone}</p>
        {error && <p className="mt-1 text-xs text-danger">{error}</p>}
      </div>
      <Badge category={contact.category}>{categoryLabels[contact.category]}</Badge>
      <IconButton
        aria-label={`Reativar ${contact.name}`}
        variant="primary"
        onClick={handleRestore}
        disabled={restoring}
      >
        <IconRestore className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
