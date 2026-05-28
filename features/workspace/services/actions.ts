"use server";

import { revalidatePath } from "next/cache";

import {
  mapBoardRow,
  mapColumnRow,
  mapTaskRow,
} from "@/features/workspace/services/mappers";
import type { TaskPriority } from "@/features/workspace/types";
import { DEFAULT_COLUMN_NAMES } from "@/features/workspace/types";
import type { Database } from "@/lib/database.types";
import { createClient } from "@/services/supabase/server";
import {
  boardNameSchema,
  columnNameSchema,
  createTaskSchema,
  moveTaskSchema,
  reorderColumnsSchema,
  updateTaskSchema,
} from "@/validations/workspace";

export type WorkspaceActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

async function getUserWorkspaceId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, workspaceId: null };
  }

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("id")
    .eq("user_id", user.id)
    .single();

  return { supabase, user, workspaceId: workspace?.id ?? null };
}

function revalidateWorkspace(boardId?: string) {
  revalidatePath("/workspace");
  if (boardId) {
    revalidatePath(`/workspace/${boardId}`);
  }
}

export async function setLastBoardAction(boardId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await supabase
    .from("profiles")
    .update({ last_board_id: boardId })
    .eq("id", user.id);
}

export async function createBoardAction(
  name: string
): Promise<
  WorkspaceActionResult<{
    board: ReturnType<typeof mapBoardRow>;
    columns: ReturnType<typeof mapColumnRow>[];
  }>
> {
  const parsed = boardNameSchema.safeParse({ name });
  if (!parsed.success) {
    return { success: false, error: "Board name is required." };
  }

  const { supabase, workspaceId } = await getUserWorkspaceId();
  if (!workspaceId) {
    return { success: false, error: "Workspace not found." };
  }

  const { data: existingBoards } = await supabase
    .from("boards")
    .select("position")
    .eq("workspace_id", workspaceId)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition =
    existingBoards && existingBoards.length > 0
      ? existingBoards[0].position + 1
      : 1;

  const { data: board, error } = await supabase
    .from("boards")
    .insert({
      workspace_id: workspaceId,
      name: parsed.data.name,
      position: nextPosition,
      task_counter: 0,
    })
    .select("*")
    .single();

  if (error || !board) {
    return { success: false, error: "Failed to create board." };
  }

  const columnRows = DEFAULT_COLUMN_NAMES.map((columnName, index) => ({
    board_id: board.id,
    name: columnName,
    position: index + 1,
  }));

  const { data: columns, error: columnsError } = await supabase
    .from("columns")
    .insert(columnRows)
    .select("*");

  if (columnsError || !columns) {
    return { success: false, error: "Failed to create default columns." };
  }

  await setLastBoardAction(board.id);
  revalidateWorkspace(board.id);

  const mappedColumns = columns.map(mapColumnRow);

  return {
    success: true,
    data: {
      board: mapBoardRow(
        board,
        mappedColumns.map((column) => column.id)
      ),
      columns: mappedColumns,
    },
  };
}

export async function renameBoardAction(boardId: string, name: string) {
  const parsed = boardNameSchema.safeParse({ name });
  if (!parsed.success) {
    return { success: false, error: "Board name is required." };
  }

  const { supabase } = await getUserWorkspaceId();
  const { error } = await supabase
    .from("boards")
    .update({ name: parsed.data.name })
    .eq("id", boardId);

  if (error) {
    return { success: false, error: "Failed to rename board." };
  }

  revalidateWorkspace(boardId);
  return { success: true, data: { boardId, name: parsed.data.name } };
}

export async function createColumnAction(
  boardId: string,
  name: string
): Promise<WorkspaceActionResult<ReturnType<typeof mapColumnRow>>> {
  const parsed = columnNameSchema.safeParse({ name });
  if (!parsed.success) {
    return { success: false, error: "Column name is required." };
  }

  const { supabase } = await getUserWorkspaceId();
  const { data: existingColumns } = await supabase
    .from("columns")
    .select("position")
    .eq("board_id", boardId)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition =
    existingColumns && existingColumns.length > 0
      ? existingColumns[0].position + 1
      : 1;

  const { data: column, error } = await supabase
    .from("columns")
    .insert({
      board_id: boardId,
      name: parsed.data.name,
      position: nextPosition,
    })
    .select("*")
    .single();

  if (error || !column) {
    return { success: false, error: "Failed to create column." };
  }

  revalidateWorkspace(boardId);
  return { success: true, data: mapColumnRow(column) };
}

export async function renameColumnAction(columnId: string, name: string) {
  const parsed = columnNameSchema.safeParse({ name });
  if (!parsed.success) {
    return { success: false, error: "Column name is required." };
  }

  const { supabase } = await getUserWorkspaceId();
  const { data: column, error } = await supabase
    .from("columns")
    .update({ name: parsed.data.name })
    .eq("id", columnId)
    .select("board_id")
    .single();

  if (error || !column) {
    return { success: false, error: "Failed to rename column." };
  }

  revalidateWorkspace(column.board_id);
  return { success: true, data: { columnId, name: parsed.data.name } };
}

export async function deleteColumnAction(columnId: string) {
  const { supabase } = await getUserWorkspaceId();
  const { data: column, error } = await supabase
    .from("columns")
    .delete()
    .eq("id", columnId)
    .select("board_id")
    .single();

  if (error || !column) {
    return { success: false, error: "Failed to delete column." };
  }

  revalidateWorkspace(column.board_id);
  return { success: true, data: { columnId } };
}

export async function reorderColumnsAction(
  boardId: string,
  columnIds: string[]
) {
  const parsed = reorderColumnsSchema.safeParse({ boardId, columnIds });
  if (!parsed.success) {
    return { success: false, error: "Invalid column order." };
  }

  const { supabase } = await getUserWorkspaceId();
  const updates = parsed.data.columnIds.map((columnId, index) =>
    supabase
      .from("columns")
      .update({ position: index + 1 })
      .eq("id", columnId)
      .eq("board_id", parsed.data.boardId)
  );

  const results = await Promise.all(updates);
  const failed = results.find((result) => result.error);
  if (failed?.error) {
    return { success: false, error: "Failed to reorder columns." };
  }

  revalidateWorkspace(boardId);
  return { success: true, data: { boardId, columnIds: parsed.data.columnIds } };
}

export async function createTaskAction(input: {
  title: string;
  columnId: string;
  boardId: string;
  tag?: string;
  priority?: TaskPriority;
  description?: string;
}): Promise<WorkspaceActionResult<ReturnType<typeof mapTaskRow>>> {
  const parsed = createTaskSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Task title is required." };
  }

  const { supabase } = await getUserWorkspaceId();
  const { data: columnTasks } = await supabase
    .from("tasks")
    .select("position")
    .eq("column_id", parsed.data.columnId)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition =
    columnTasks && columnTasks.length > 0 ? columnTasks[0].position + 1 : 1;

  const { data: task, error } = await supabase
    .from("tasks")
    .insert({
      board_id: parsed.data.boardId,
      column_id: parsed.data.columnId,
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      tag: parsed.data.tag ?? null,
      priority: parsed.data.priority ?? null,
      position: nextPosition,
      kan_number: 0,
    })
    .select("*")
    .single();

  if (error || !task) {
    return { success: false, error: "Failed to save task. Please try again." };
  }

  revalidateWorkspace(parsed.data.boardId);
  return { success: true, data: mapTaskRow(task) };
}

export async function updateTaskAction(input: {
  id: string;
  title?: string;
  description?: string | null;
  tag?: string | null;
  priority?: TaskPriority | null;
  columnId?: string;
  position?: number;
}): Promise<WorkspaceActionResult<ReturnType<typeof mapTaskRow>>> {
  const parsed = updateTaskSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid task data." };
  }

  const { supabase } = await getUserWorkspaceId();
  const updatePayload: Database["public"]["Tables"]["tasks"]["Update"] = {};

  if (parsed.data.title !== undefined) {
    updatePayload.title = parsed.data.title;
  }
  if (parsed.data.description !== undefined) {
    updatePayload.description = parsed.data.description;
  }
  if (parsed.data.tag !== undefined) {
    updatePayload.tag = parsed.data.tag;
  }
  if (parsed.data.priority !== undefined) {
    updatePayload.priority = parsed.data.priority;
  }
  if (parsed.data.columnId !== undefined) {
    updatePayload.column_id = parsed.data.columnId;
  }
  if (parsed.data.position !== undefined) {
    updatePayload.position = parsed.data.position;
  }

  const { data: task, error } = await supabase
    .from("tasks")
    .update(updatePayload)
    .eq("id", parsed.data.id)
    .select("*")
    .single();

  if (error || !task) {
    return { success: false, error: "Failed to update task." };
  }

  revalidateWorkspace(task.board_id);
  return { success: true, data: mapTaskRow(task) };
}

export async function moveTaskAction(input: {
  taskId: string;
  columnId: string;
  position: number;
}): Promise<WorkspaceActionResult<ReturnType<typeof mapTaskRow>>> {
  const parsed = moveTaskSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid move data." };
  }

  const { supabase } = await getUserWorkspaceId();
  const { data: task, error } = await supabase
    .from("tasks")
    .update({
      column_id: parsed.data.columnId,
      position: parsed.data.position,
    })
    .eq("id", parsed.data.taskId)
    .select("*")
    .single();

  if (error || !task) {
    return { success: false, error: "Failed to move task." };
  }

  revalidateWorkspace(task.board_id);
  return { success: true, data: mapTaskRow(task) };
}

export async function deleteTaskAction(taskId: string) {
  const { supabase } = await getUserWorkspaceId();
  const { data: task, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .select("board_id")
    .single();

  if (error || !task) {
    return { success: false, error: "Failed to delete task." };
  }

  revalidateWorkspace(task.board_id);
  return { success: true, data: { taskId } };
}
