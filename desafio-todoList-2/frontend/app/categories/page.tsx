import { getCategories, getTasks } from "@/lib/api";
import CreateCategoryForm from "@/components/categories/CreateCategoryForm";
import CategoryRow from "@/components/categories/CategoryRow";

export default async function CategoriesPage() {
  const [categories, tasks] = await Promise.all([getCategories(), getTasks()]);

  const taskCountByCategory = new Map<string, number>();
  for (const task of tasks) {
    if (!task.categoryId) continue;
    taskCountByCategory.set(
      task.categoryId,
      (taskCountByCategory.get(task.categoryId) ?? 0) + 1
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Categorias</h1>
        <p className="text-sm text-text-secondary">
          Gerencie e organize suas áreas de foco.
        </p>
      </div>

      <CreateCategoryForm />

      {categories.length === 0 ? (
        <p className="text-sm text-text-tertiary">Nenhuma categoria cadastrada.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-[var(--shadow-card)]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-muted text-xs font-semibold uppercase tracking-wide text-text-tertiary">
                <th className="px-5 py-3 font-semibold">Categoria</th>
                <th className="px-4 py-3 font-semibold">Tarefas Vinculadas</th>
                <th className="px-4 py-3 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <CategoryRow
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  taskCount={taskCountByCategory.get(category.id) ?? 0}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
