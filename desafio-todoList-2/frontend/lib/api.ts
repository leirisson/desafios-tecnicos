import { CreateTaskInput, Task, TaskFilters } from "@/types/task";
import { Category, CreateCategoryInput } from "@/types/category";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8080";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(response.status, body?.message ?? "Erro ao comunicar com a API");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export function getTasks(filters?: TaskFilters): Promise<Task[]> {
  const params = new URLSearchParams();
  if (filters?.categoryId) params.set("categoryId", filters.categoryId);
  if (filters?.priority) params.set("priority", filters.priority);
  if (filters?.status) params.set("status", filters.status);

  const query = params.toString();
  return apiFetch<Task[]>(`/tasks${query ? `?${query}` : ""}`);
}

export function getTaskById(id: string): Promise<Task> {
  return apiFetch<Task>(`/tasks/${id}`);
}

export function createTask(input: CreateTaskInput): Promise<Task> {
  return apiFetch<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateTask(id: string, input: CreateTaskInput): Promise<Task> {
  return apiFetch<Task>(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export function completeTask(id: string): Promise<Task> {
  return apiFetch<Task>(`/tasks/complete/${id}`, { method: "PATCH" });
}

export function deleteTask(id: string): Promise<void> {
  return apiFetch<void>(`/tasks/${id}`, { method: "DELETE" });
}

export function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/category");
}

export function createCategory(input: CreateCategoryInput): Promise<Category> {
  return apiFetch<Category>("/category", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateCategory(id: string, input: CreateCategoryInput): Promise<Category> {
  return apiFetch<Category>(`/category/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export function deleteCategory(id: string): Promise<void> {
  return apiFetch<void>(`/category/${id}`, { method: "DELETE" });
}
