import Link from "next/link";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { getCategories, getTasks } from "@/lib/api";
import StatCard from "@/components/dashboard/StatCard";
import WeeklyProgressCard from "@/components/dashboard/WeeklyProgressCard";
import TaskGlanceItem from "@/components/dashboard/TaskGlanceItem";

export default async function DashboardPage() {
  const [tasks, categories] = await Promise.all([getTasks(), getCategories()]);
  const categoryNameById = new Map(categories.map((category) => [category.id, category.name]));

  const overdueCount = tasks.filter((task) => task.overdue).length;
  const pendingCount = tasks.filter((task) => task.status === "PENDING").length;
  const completedCount = tasks.filter((task) => task.status === "COMPLETED").length;

  const atAGlance = tasks
    .filter((task) => task.status !== "COMPLETED")
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-semibold text-text-primary">Bom dia</h1>
        <p className="text-sm text-text-secondary">
          Veja o que está acontecendo com suas tarefas hoje.
        </p>
      </header>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Atrasadas"
            value={overdueCount}
            icon={AlertCircle}
            dotColor="bg-danger-500"
            valueColor="text-danger-600"
            iconBg="bg-danger-50"
          />
          <StatCard
            label="Pendentes"
            value={pendingCount}
            icon={Clock}
            dotColor="bg-text-tertiary"
            valueColor="text-text-primary"
            iconBg="bg-surface-muted"
          />
          <StatCard
            label="Concluídas"
            value={completedCount}
            icon={CheckCircle2}
            dotColor="bg-success-500"
            valueColor="text-success-600"
            iconBg="bg-success-50"
          />
        </div>
        <WeeklyProgressCard tasks={tasks} />
      </div>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Resumo</h2>
          <Link
            href="/tasks"
            className="text-sm font-medium text-primary-600 hover:underline"
          >
            Ver todas
          </Link>
        </div>

        {atAGlance.length === 0 ? (
          <p className="text-sm text-text-tertiary">Nenhuma tarefa pendente.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {atAGlance.map((task) => (
              <TaskGlanceItem
                key={task.id}
                task={task}
                categoryName={task.categoryId ? categoryNameById.get(task.categoryId) : undefined}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
