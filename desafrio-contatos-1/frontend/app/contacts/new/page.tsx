import { AppShell } from "@/components/layout/AppShell";
import { ContactForm } from "@/components/contacts/ContactForm";

export default function NewContactPage() {
  return (
    <AppShell>
      <div className="flex justify-center">
        <ContactForm />
      </div>
    </AppShell>
  );
}
