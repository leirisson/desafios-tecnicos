import { Task } from "@/types/task";

const WEEKDAY_LABELS = ["D", "S", "T", "Q", "Q", "S", "S"];

function getWeekDays(): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

interface WeeklyProgressCardProps {
  tasks: Task[];
}

export default function WeeklyProgressCard({ tasks }: WeeklyProgressCardProps) {
  const weekDays = getWeekDays();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedDates = tasks
    .filter((task) => task.completedAt)
    .map((task) => new Date(task.completedAt as string));

  const counts = weekDays.map(
    (day) => completedDates.filter((date) => isSameDay(date, day)).length
  );
  const maxCount = Math.max(...counts, 1);
  const weekTotal = counts.reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex w-72 shrink-0 flex-col gap-1 rounded-xl border border-border bg-gradient-to-br from-primary-50 to-surface p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-2">
        <p className="whitespace-nowrap text-base font-semibold text-text-primary">
          Progresso Semanal
        </p>
        <div className="flex shrink-0 items-baseline gap-1 rounded-full bg-surface px-2 py-1 shadow-[var(--shadow-card)]">
          <span className="text-sm font-bold text-primary-600">{weekTotal}</span>
          <span className="text-[11px] font-medium text-text-tertiary">na semana</span>
        </div>
      </div>
      <p className="text-xs text-text-tertiary">Taxa de conclusão de tarefas</p>

      <div className="mt-5 flex flex-1 items-end justify-between gap-2.5">
        {weekDays.map((day, index) => {
          const isToday = isSameDay(day, today);
          const count = counts[index];
          const heightPct = count === 0 ? 0 : Math.max((count / maxCount) * 100, 12);

          return (
            <div key={index} className="flex flex-1 flex-col items-center gap-1.5">
              <span
                className={`text-[11px] font-semibold tabular-nums ${
                  count > 0 ? "text-text-secondary" : "text-transparent"
                }`}
              >
                {count}
              </span>
              <div className="flex h-24 w-full items-end">
                {count === 0 ? (
                  <div className="h-1 w-full rounded-full bg-border" />
                ) : (
                  <div
                    className={`w-full rounded-md transition-all ${
                      isToday
                        ? "bg-primary-500 shadow-[0_2px_8px_-2px_var(--color-primary-500)]"
                        : "bg-primary-200"
                    }`}
                    style={{ height: `${heightPct}%` }}
                    title={`${count} concluída(s)`}
                  />
                )}
              </div>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${
                  isToday
                    ? "bg-primary-500 text-white"
                    : "text-text-tertiary"
                }`}
              >
                {WEEKDAY_LABELS[index]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
