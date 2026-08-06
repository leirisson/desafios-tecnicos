export const CATEGORY_COLORS = [
  "#2e5cf6",
  "#dc2626",
  "#16a34a",
  "#d97706",
  "#7c3aed",
  "#db2777",
] as const;

export const CATEGORY_ICONS = ["folder", "star", "briefcase", "home", "user"] as const;

export type CategoryIconName = (typeof CATEGORY_ICONS)[number];

export interface CategoryAppearance {
  color: string;
  icon: CategoryIconName;
}

const STORAGE_KEY = "category-appearance";
const DEFAULT_APPEARANCE: CategoryAppearance = { color: CATEGORY_COLORS[0], icon: "folder" };

function readStore(): Record<string, CategoryAppearance> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, CategoryAppearance>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getCategoryAppearance(categoryId: string): CategoryAppearance {
  const store = readStore();
  if (store[categoryId]) return store[categoryId];

  let hash = 0;
  for (let i = 0; i < categoryId.length; i++) {
    hash = (hash * 31 + categoryId.charCodeAt(i)) >>> 0;
  }
  return { ...DEFAULT_APPEARANCE, color: CATEGORY_COLORS[hash % CATEGORY_COLORS.length] };
}

export function setCategoryAppearance(categoryId: string, appearance: CategoryAppearance) {
  const store = readStore();
  store[categoryId] = appearance;
  writeStore(store);
}

export function removeCategoryAppearance(categoryId: string) {
  const store = readStore();
  delete store[categoryId];
  writeStore(store);
}
