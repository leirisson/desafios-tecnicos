export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type Status = "PENDING" | "COMPLETED";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: Priority;
  dueDate: string | null;
  status: Status;
  categoryId: string | null;
  overdue: boolean;
  completedAt: string | null;
}

export interface CreateTaskInput {
  title: string;
  description: string | null;
  priority: Priority;
  duDate: string | null;
  categoryId: string | null;
}

export interface TaskFilters {
  categoryId?: string;
  priority?: Priority;
  status?: Status;
}