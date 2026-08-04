"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import {
  IconArrowLeft,
  IconBan,
  IconMail,
  IconPencil,
  IconPhone,
  IconStar,
} from "@/components/ui/icons";
import { disableContact, toggleFavoriteContact } from "@/lib/api";
import { categoryLabels, Contact } from "@/lib/types";

function InfoRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof IconPhone;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border py-3.5 last:border-b-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
        <Icon className="h-4 w-4 text-text-muted" />
        {value}
      </span>
    </div>
  );
}

export function ContactDetail({
  contact,
  onContactChange,
}: {
  contact: Contact;
  onContactChange: (contact: Contact) => void;
}) {
  const router = useRouter();
  const [togglingFavorite, setTogglingFavorite] = useState(false);
  const [disabling, setDisabling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleToggleFavorite() {
    setError(null);
    setTogglingFavorite(true);
    try {
      const updated = await toggleFavoriteContact(contact.id);
      onContactChange(updated);
    } catch {
      setError("Não foi possível atualizar o favorito.");
    } finally {
      setTogglingFavorite(false);
    }
  }

  async function handleDisable() {
    if (!window.confirm(`Deseja realmente desativar ${contact.name}?`)) return;
    setError(null);
    setDisabling(true);
    try {
      await disableContact(contact.id);
      router.push("/");
      router.refresh();
    } catch {
      setError("Não foi possível desativar o contato.");
      setDisabling(false);
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary"
      >
        <IconArrowLeft className="h-4 w-4" />
        Voltar para Contatos
      </Link>

      <div className="mt-4 flex items-center gap-4 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <Avatar name={contact.name} size={72} className="text-xl" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-xl font-semibold text-text-primary">
              {contact.name}
            </p>
          </div>
          <div className="mt-2">
            <Badge category={contact.category}>{categoryLabels[contact.category]}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <IconButton
            aria-label={contact.favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            variant={contact.favorite ? "primary" : "default"}
            onClick={handleToggleFavorite}
            disabled={togglingFavorite}
          >
            <IconStar
              className={`h-4 w-4 ${contact.favorite ? "fill-amber-400 text-amber-400" : ""}`}
            />
          </IconButton>
          <Link href={`/contacts/${contact.id}/edit`}>
            <IconButton aria-label="Editar contato">
              <IconPencil className="h-4 w-4" />
            </IconButton>
          </Link>
          <IconButton
            aria-label="Desativar contato"
            className="text-danger hover:bg-danger-light"
            onClick={handleDisable}
            disabled={disabling}
          >
            <IconBan className="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm text-danger" role="alert">
          {error}
        </p>
      )}

      <div className="mt-4 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-base font-semibold text-text-primary">
          Informações de Contato
        </h2>
        <div className="mt-3">
          <InfoRow label="Telefone" value={contact.phone} icon={IconPhone} />
          {contact.email && (
            <InfoRow label="E-mail" value={contact.email} icon={IconMail} />
          )}
        </div>
      </div>
    </div>
  );
}
