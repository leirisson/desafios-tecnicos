import { useEffect, useState } from "react";
import { listActiveContacts } from "./api";
import { Contact } from "./types";

export function useContact(id: string) {
  const [contact, setContact] = useState<Contact | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    listActiveContacts()
      .then((contacts) => {
        if (!cancelled) setContact(contacts.find((item) => item.id === id) ?? null);
      })
      .catch(() => {
        if (!cancelled) setContact(null);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { contact, setContact };
}
