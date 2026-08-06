"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { Task, Priority } from "@/types/task";
import { PriorityBadge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const WEEKDAY_LABELS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

const PRIORITY_DOT_CLASSES: Record<Priority, string> = {
  LOW: "bg-info-500",
  MEDIUM: "bg-warning-500",
  HIGH: "bg-danger-500",
};

const PRIORITY_CHIP_CLASSES: Record<Priority, string> = {
  LOW: "bg-info-50 text-info-600",
  MEDIUM: "bg-warning-50 text-warning-600",
  HIGH: "bg-danger-50 text-danger-600",
};

const PRIORITY_BORDER_CLASSES: Record<Priority, string> = {
  LOW: "border-l-info-500",
  MEDIUM: "border-l-warning-500",
  HIGH: "border-l-danger-500",
};

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildMonthGrid(monthDate: Date): Date[] {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);

  const totalCells = 42;
  return Array.from({ length: totalCells }, (_, i) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    return date;
  });
}

interface CalendarGridProps {
  tasks: Task[];
}

export default function CalendarGrid({ tasks }: CalendarGridProps) {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(today));

  const tasksByDate = useMemo(() => {
    const map = new Map<string, Task[]>();
    for (const task of tasks) {
      if (!task.dueDate) continue;
      const key = task.dueDate.slice(0, 10);
      const bucket = map.get(key);
      if (bucket) {
        bucket.push(task);
      } else {
        map.set(key, [task]);
      }
    }
    return map;
  }, [tasks]);

  const days = useMemo(() => buildMonthGrid(cursor), [cursor]);
  const todayKey = toDateKey(today);
  const monthLabel = cursor.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  function goToMonth(offset: number) {
    setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  }

  function goToToday() {
    setCursor(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(todayKey);
  }

  const selectedTasks = tasksByDate.get(selectedDate) ?? [];
  const selectedDateLabel = new Date(`${selectedDate}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1 rounded-lg border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold capitalize text-text-primary">{monthLabel}</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToToday}>
              Hoje
            </Button>
            <div className="flex items-center rounded-md border border-border">
              <button
                type="button"
                aria-label="Mês anterior"
                onClick={() => goToMonth(-1)}
                className="flex h-8 w-8 items-center justify-center text-text-secondary hover:bg-surface-muted"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="h-4 w-px bg-border" />
              <button
                type="button"
                aria-label="Próximo mês"
                onClick={() => goToMonth(1)}
                className="flex h-8 w-8 items-center justify-center text-text-secondary hover:bg-surface-muted"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-md border border-border bg-border">
          {WEEKDAY_LABELS.map((label) => (
            <div
              key={label}
              className="bg-surface-muted py-2 text-center text-xs font-semibold text-text-tertiary"
            >
              {label}
            </div>
          ))}

          {days.map((date) => {
            const key = toDateKey(date);
            const dayTasks = tasksByDate.get(key) ?? [];
            const isCurrentMonth = date.getMonth() === cursor.getMonth();
            const isToday = key === todayKey;
            const isSelected = key === selectedDate;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedDate(key)}
                className={`flex min-h-24 flex-col items-start gap-1 bg-surface p-2 text-left transition-colors hover:bg-surface-muted ${
                  isCurrentMonth ? "" : "opacity-40"
                } ${isSelected ? "ring-2 ring-inset ring-primary-500" : ""}`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    isToday
                      ? "bg-primary-500 text-white"
                      : "text-text-secondary"
                  }`}
                >
                  {date.getDate()}
                </span>
                <div className="flex w-full flex-col gap-1">
                  {dayTasks.slice(0, 2).map((task) => (
                    <span
                      key={task.id}
                      className={`truncate rounded px-1.5 py-0.5 text-[11px] font-medium ${PRIORITY_CHIP_CLASSES[task.priority]}`}
                      title={task.title}
                    >
                      {task.title}
                    </span>
                  ))}
                  {dayTasks.length > 2 && (
                    <span className="text-[11px] font-medium text-text-tertiary">
                      +{dayTasks.length - 2} mais
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <aside className="flex w-full flex-col gap-4 rounded-lg border border-border bg-surface p-5 shadow-[var(--shadow-card)] lg:w-80 lg:shrink-0">
        <div>
          <div className="flex items-center gap-2 text-text-primary">
            <CalendarDays className="h-5 w-5 text-primary-500" />
            <h3 className="text-lg font-semibold">Agenda do dia</h3>
          </div>
          <p className="text-sm text-text-tertiary capitalize">{selectedDateLabel}</p>
        </div>

        {selectedTasks.length === 0 ? (
          <p className="text-sm text-text-tertiary">Nenhuma tarefa para este dia.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {selectedTasks.map((task) => (
              <Link
                key={task.id}
                href={`/tasks/${task.id}`}
                className={`flex flex-col gap-2 rounded-lg border-l-4 border-y border-r border-border p-3 transition-colors hover:border-primary-500 ${
                  task.status === "COMPLETED" ? "border-l-border opacity-60" : PRIORITY_BORDER_CLASSES[task.priority]
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${PRIORITY_DOT_CLASSES[task.priority]}`} />
                  <PriorityBadge priority={task.priority} className="px-2 py-0.5 text-xs" />
                </div>
                <p
                  className={`text-sm font-semibold text-text-primary ${task.status === "COMPLETED" ? "line-through" : ""}`}
                >
                  {task.title}
                </p>
                {task.description && (
                  <p className="line-clamp-2 text-xs text-text-secondary">{task.description}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}
