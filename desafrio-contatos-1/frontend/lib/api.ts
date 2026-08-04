import { Contact, CreateContactInput } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new ApiError(
      `Falha na requisição: ${response.status} ${response.statusText}`,
      response.status,
    );
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

export function listActiveContacts() {
  return request<Contact[]>("/contacts/list");
}

export function searchContactsByName(name: string) {
  return request<Contact[]>(`/contacts/search?name=${encodeURIComponent(name)}`);
}

export async function listDisabledContacts() {
  const all = await request<Contact[]>("/contacts/search?name=");
  return all.filter((contact) => contact.active === false);
}

export function createContact(input: CreateContactInput) {
  return request<string>("/contacts", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateContact(id: string, input: CreateContactInput) {
  return request<Contact>(`/contacts/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export function disableContact(id: string) {
  return request<string>(`/contacts/disable/${id}`, { method: "PUT" });
}

export function reactivateContact(contact: Contact) {
  return updateContact(contact.id, {
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    category: contact.category,
    active: true,
  });
}

export function toggleFavoriteContact(id: string) {
  return request<Contact>(`/contacts/favorite/${id}`, { method: "PUT" });
}
