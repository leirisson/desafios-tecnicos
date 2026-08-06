import { getTasks } from "@/lib/api";
import CalendarGrid from "@/components/calendar/CalendarGrid";

export default async function CalendarPage() {
  const tasks = await getTasks();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold text-text-primary">Calendário</h1>
        <p className="text-sm text-text-secondary">
          Visualização das tarefas organizadas por data de vencimento.
        </p>
      </header>

      <CalendarGrid tasks={tasks} />
    </div>
  );
}
