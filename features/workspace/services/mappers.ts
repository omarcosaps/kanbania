import type { Database } from "@/lib/database.types";
import type {
  Board,
  Column,
  Task,
  TaskPriority,
  WorkspaceState,
} from "@/features/workspace/types";

type BoardRow = Database["public"]["Tables"]["boards"]["Row"];
type ColumnRow = Database["public"]["Tables"]["columns"]["Row"];
type TaskRow = Database["public"]["Tables"]["tasks"]["Row"];

export function mapTaskRow(row: TaskRow): Task {
  return {
    id: row.id,
    taskId: `KAN-${row.kan_number}`,
    title: row.title,
    description: row.description ?? undefined,
    tag: row.tag ?? undefined,
    priority: (row.priority as TaskPriority | null) ?? null,
    columnId: row.column_id,
    position: row.position,
  };
}

export function mapColumnRow(row: ColumnRow): Column {
  return {
    id: row.id,
    name: row.name,
    boardId: row.board_id,
  };
}

export function mapBoardRow(row: BoardRow, columnIds: string[]): Board {
  return {
    id: row.id,
    name: row.name,
    columnIds,
  };
}

export function buildWorkspaceState(input: {
  boards: BoardRow[];
  columns: ColumnRow[];
  tasks: TaskRow[];
  lastBoardId: string | null;
  activeBoardId?: string;
}): WorkspaceState {
  const boardOrder = [...input.boards]
    .sort((a, b) => a.position - b.position)
    .map((board) => board.id);

  const columnsByBoard = new Map<string, ColumnRow[]>();
  for (const column of [...input.columns].sort(
    (a, b) => a.position - b.position
  )) {
    const list = columnsByBoard.get(column.board_id) ?? [];
    list.push(column);
    columnsByBoard.set(column.board_id, list);
  }

  const boards: Record<string, Board> = {};
  for (const boardRow of input.boards) {
    const boardColumns = columnsByBoard.get(boardRow.id) ?? [];
    boards[boardRow.id] = mapBoardRow(
      boardRow,
      boardColumns.map((column) => column.id)
    );
  }

  const columns: Record<string, Column> = {};
  for (const columnRow of input.columns) {
    columns[columnRow.id] = mapColumnRow(columnRow);
  }

  const tasks: Record<string, Task> = {};
  for (const taskRow of input.tasks) {
    tasks[taskRow.id] = mapTaskRow(taskRow);
  }

  const activeBoardId =
    input.activeBoardId &&
    boards[input.activeBoardId]
      ? input.activeBoardId
      : input.lastBoardId && boards[input.lastBoardId]
        ? input.lastBoardId
        : boardOrder[0] ?? "";

  const activeBoard = boards[activeBoardId];
  const taskCounter = activeBoard
    ? (input.boards.find((board) => board.id === activeBoardId)?.task_counter ??
      0)
    : 0;

  return {
    boards,
    columns,
    tasks,
    activeBoardId,
    taskCounter,
    boardOrder,
  };
}

export function createEmptyWorkspaceState(): WorkspaceState {
  return {
    boards: {},
    columns: {},
    tasks: {},
    activeBoardId: "",
    taskCounter: 0,
    boardOrder: [],
  };
}
