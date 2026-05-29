export type TaskPriority = "high" | "medium" | "low" | null;

export interface Task {
  id: string;
  taskId: string;
  title: string;
  description?: string;
  tag?: string;
  priority: TaskPriority;
  columnId: string;
  position: number;
}

export interface Column {
  id: string;
  name: string;
  boardId: string;
}

export interface Board {
  id: string;
  name: string;
  columnIds: string[];
}

export interface WorkspaceState {
  boards: Record<string, Board>;
  columns: Record<string, Column>;
  tasks: Record<string, Task>;
  activeBoardId: string;
  taskCounter: number;
  boardOrder: string[];
}

export interface CreateTaskInput {
  title: string;
  columnId: string;
  tag?: string;
  priority?: TaskPriority;
  description?: string;
}

export interface UpdateTaskInput {
  id: string;
  title?: string;
  description?: string;
  tag?: string;
  priority?: TaskPriority;
  columnId?: string;
}

export interface MoveTaskInput {
  taskId: string;
  columnId: string;
  position: number;
}

export interface ReorderColumnsInput {
  boardId: string;
  columnIds: string[];
}

export interface ReorderBoardsInput {
  boardIds: string[];
}

export const TASK_TAGS = [
  "tech-debt",
  "design",
  "feature",
  "bug",
  "a11y",
  "frontend",
] as const;

export type TaskTag = (typeof TASK_TAGS)[number];

export const DEFAULT_COLUMN_NAMES = [
  "Backlog",
  "Todo",
  "In Progress",
  "Done",
] as const;
