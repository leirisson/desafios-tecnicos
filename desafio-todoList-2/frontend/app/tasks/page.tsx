import { getCategories, getTasks } from "@/lib/api";
import { Priority, Status, Task } from "@/types/task";
import TaskFilterBar from "@/components/tasks/TaskFilterBar";
import TaskCard from "@/components/tasks/TaskCard";
import CreateTaskButton from "@/components/tasks/CreateTaskButton";

interface TasksPageProps {
  searchParams: Promise<{
    categoryId?: string;
    priority?: string;
    status?: string;
  }>;
}

const UNCATEGORIZED_KEY = "__uncategorized__";

export default async function TasksPage({ searchParams }: TasksPageProps) {
  const params = await searchParams;

  const [tasks, categories] = await Promise.all([
    getTasks({
      categoryId: params.categoryId,
      priority: params.priority as Priority | undefined,
      status: params.status as Status | undefined,
    }),
    getCategories(),
  ]);

  const tasksByCategory = new Map<string, Task[]>();
  for (const task of tasks) {
    const key = task.categoryId ?? UNCATEGORIZED_KEY;
    const group = tasksByCategory.get(key);
    if (group) {
      group.push(task);
    } else {
      tasksByCategory.set(key, [task]);
    }
  }

  const groups = categories
    .filter((category) => tasksByCategory.has(category.id))
    .map((category) => ({
      key: category.id,
      name: category.name,
      tasks: tasksByCategory.get(category.id)!,
    }));

  if (tasksByCategory.has(UNCATEGORIZED_KEY)) {
    groups.push({
      key: UNCATEGORIZED_KEY,
      name: "Sem categoria",
      tasks: tasksByCategory.get(UNCATEGORIZED_KEY)!,
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Minhas Tarefas</h1>
          <p className="text-sm text-text-secondary">
            Gerencie e acompanhe suas entregas.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <TaskFilterBar categories={categories} />
          <CreateTaskButton />
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-text-tertiary">Nenhuma tarefa encontrada.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {groups.map((group) => (
            <section key={group.key} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-text-primary">{group.name}</h2>
                <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-semibold text-text-tertiary">
                  {group.tasks.length}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {group.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
