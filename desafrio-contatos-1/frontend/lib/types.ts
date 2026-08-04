export type ContactCategory = "PERSONAL" | "WORK" | "OTHER";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  category: ContactCategory;
  favorite: boolean | null;
  active: boolean | null;
}

export interface CreateContactInput {
  name: string;
  phone: string;
  email: string | null;
  category: ContactCategory;
  active: boolean;
}

export const categoryLabels: Record<ContactCategory, string> = {
  PERSONAL: "Pessoal",
  WORK: "Trabalho",
  OTHER: "Outro",
};
