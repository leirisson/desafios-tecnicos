import Link from "next/link";
import { ChevronRight, Calendar, FileText } from "lucide-react";
import { getCategories, getTaskById } from "@/lib/api";
import { OverdueBadge, StatusBadge, PriorityBadge, CategoryBadge } from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import TaskActionsPanel from "@/components/tasks/TaskActionsPanel";

interface TaskDetailsPageProps {
  params: Promise<{ id: string }>;
}

function formatDate(dueDate: string | null): string {
  if (!dueDate) return "Sem prazo definido";
  const date = new Date(`${dueDate}T00:00:00`);
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function TaskDetailsPage({ params }: TaskDetailsPageProps) {
  const { id } = await params;
  const [task, categories] = await Promise.all([getTaskById(id), getCategories()]);
  const categoryName = categories.find((category) => category.id === task.categoryId)?.name;
  const completed = task.status === "COMPLETED";

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-1.5 text-sm text-text-tertiary">
        <Link href="/tasks" className="hover:text-primary-600 hover:underline">
          Tarefas
        </Link>
        {categoryName && (
          <>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>{categoryName}</span>
          </>
        )}
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-text-secondary">{task.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {task.overdue && <OverdueBadge />}
              <StatusBadge status={task.status} />
              {categoryName && <CategoryBadge name={categoryName} />}
            </div>
            <h1
              className={`text-2xl font-bold text-text-primary ${completed ? "line-through opacity-60" : ""}`}
            >
              {task.title}
            </h1>
          </Card>

          <Card>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
              <FileText className="h-4 w-4" />
              Descrição
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {task.description || "Nenhuma descrição fornecida."}
            </p>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-tertiary">
              Detalhes da Tarefa
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <p className="mb-1.5 text-xs text-text-tertiary">Prioridade</p>
                <PriorityBadge priority={task.priority} />
              </div>

              <div>
                <p className="mb-1.5 text-xs text-text-tertiary">Data de Vencimento</p>
                <div
                  className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium ${
                    task.overdue
                      ? "border-danger-500 bg-danger-50 text-danger-600"
                      : "border-border text-text-primary"
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  {formatDate(task.dueDate)}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-tertiary">
              Ações
            </p>
            <TaskActionsPanel taskId={task.id} completed={completed} />
          </Card>
        </div>
      </div>
    </div>
  );
}
