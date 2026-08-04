"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { IconMail, IconPerson, IconPhone, IconSave } from "@/components/ui/icons";
import { createContact, updateContact } from "@/lib/api";
import { Contact, ContactCategory } from "@/lib/types";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  category: ContactCategory | "";
}

interface FormErrors {
  name?: string;
  email?: string;
  category?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ contact }: { contact?: Contact }) {
  const router = useRouter();
  const isEditing = Boolean(contact);
  const [values, setValues] = useState<FormValues>({
    name: contact?.name ?? "",
    phone: contact?.phone ?? "",
    email: contact?.email ?? "",
    category: contact?.category ?? "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validate(current: FormValues): FormErrors {
    const nextErrors: FormErrors = {};
    if (!current.name.trim()) {
      nextErrors.name = "Nome é obrigatório";
    }
    if (current.email.trim() && !EMAIL_REGEX.test(current.email.trim())) {
      nextErrors.email = "Formato de e-mail inválido.";
    }
    if (!current.category) {
      nextErrors.category = "Categoria é obrigatória";
    }
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      const input = {
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim() || null,
        category: values.category as ContactCategory,
        active: true,
      };
      if (isEditing && contact) {
        await updateContact(contact.id, input);
      } else {
        await createContact(input);
      }
      router.push("/");
      router.refresh();
    } catch {
      setSubmitError("Não foi possível salvar o contato. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-2xl rounded-xl border border-border bg-surface p-6 shadow-sm"
    >
      <h1 className="text-xl font-semibold text-text-primary">
        {isEditing ? "Editar Contato" : "Cadastrar Novo Contato"}
      </h1>
      <p className="mt-1 text-sm text-text-secondary">
        {isEditing
          ? "Atualize as informações do contato."
          : "Preencha as informações abaixo para adicionar um novo registro."}
      </p>

      <div className="mt-5 flex flex-col gap-4 border-t border-border pt-5">
        <FormField label="Nome" required>
          <Input
            icon={<IconPerson className="h-4 w-4" />}
            placeholder="Ex: João da Silva"
            value={values.name}
            error={errors.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          />
        </FormField>

        <FormField label="Telefone" required>
          <Input
            icon={<IconPhone className="h-4 w-4" />}
            placeholder="(99) 99999-9999"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          />
        </FormField>

        <FormField label="E-mail">
          <Input
            type="email"
            icon={<IconMail className="h-4 w-4" />}
            placeholder="joao.silva@email.com"
            value={values.email}
            error={errors.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          />
        </FormField>

        <FormField label="Categoria" required>
          <Select
            value={values.category}
            error={errors.category}
            onChange={(e) =>
              setValues((v) => ({
                ...v,
                category: e.target.value as ContactCategory | "",
              }))
            }
          >
            <option value="">Selecione uma categoria</option>
            <option value="PERSONAL">Pessoal</option>
            <option value="WORK">Trabalho</option>
            <option value="OTHER">Outro</option>
          </Select>
        </FormField>
      </div>

      {submitError && (
        <p className="mt-4 text-sm text-danger" role="alert">
          {submitError}
        </p>
      )}

      <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-5">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/")}
          disabled={submitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={submitting}>
          <IconSave className="h-4 w-4" />
          {submitting ? "Salvando..." : "Salvar Contato"}
        </Button>
      </div>
    </form>
  );
}
