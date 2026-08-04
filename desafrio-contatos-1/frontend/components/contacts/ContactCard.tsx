import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { IconMail, IconPhone, IconStar } from "@/components/ui/icons";
import { categoryLabels, Contact } from "@/lib/types";

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div className="flex w-full max-w-sm flex-col rounded-xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/contacts/${contact.id}`} className="flex items-start gap-3">
        <Avatar name={contact.name} size={48} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-base font-semibold text-text-primary">
              {contact.name}
            </p>
            {contact.favorite && (
              <IconStar className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />
            )}
          </div>
        </div>
      </Link>

      <div className="mt-3 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <IconPhone className="h-4 w-4 text-primary" />
          <span>{contact.phone}</span>
        </div>
        {contact.email && (
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <IconMail className="h-4 w-4 text-primary" />
            <span className="truncate">{contact.email}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <Badge category={contact.category}>{categoryLabels[contact.category]}</Badge>
        <div className="flex items-center gap-1">
          {contact.email && (
            <IconButton aria-label={`Enviar e-mail para ${contact.name}`} variant="primary">
              <IconMail className="h-4 w-4" />
            </IconButton>
          )}
          <IconButton aria-label={`Ligar para ${contact.name}`} variant="primary">
            <IconPhone className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
