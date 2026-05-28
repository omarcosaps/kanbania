import { z } from "zod";

import { TASK_TAGS } from "@/features/workspace/types";

export const boardNameSchema = z.object({
  name: z.string().trim().min(1, "Board name is required"),
});

export const columnNameSchema = z.object({
  name: z.string().trim().min(1, "Column name is required"),
});

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Task title is required"),
  columnId: z.string().uuid(),
  boardId: z.string().uuid(),
  tag: z.string().optional(),
  priority: z.enum(["high", "medium", "low"]).nullable().optional(),
  description: z.string().optional(),
});

export const updateTaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(1).optional(),
  description: z.string().nullable().optional(),
  tag: z.string().nullable().optional(),
  priority: z.enum(["high", "medium", "low"]).nullable().optional(),
  columnId: z.string().uuid().optional(),
  position: z.number().optional(),
});

export const moveTaskSchema = z.object({
  taskId: z.string().uuid(),
  columnId: z.string().uuid(),
  position: z.number(),
});

export const reorderColumnsSchema = z.object({
  boardId: z.string().uuid(),
  columnIds: z.array(z.string().uuid()).min(1),
});

export const taskTagSchema = z.enum(TASK_TAGS);

export type CreateTaskPayload = z.infer<typeof createTaskSchema>;
export type UpdateTaskPayload = z.infer<typeof updateTaskSchema>;
export type MoveTaskPayload = z.infer<typeof moveTaskSchema>;
export type ReorderColumnsPayload = z.infer<typeof reorderColumnsSchema>;
