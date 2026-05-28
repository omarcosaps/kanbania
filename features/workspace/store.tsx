"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import {
  createBoardAction,
  createColumnAction,
  createTaskAction,
  deleteColumnAction,
  deleteTaskAction,
  moveTaskAction,
  renameBoardAction,
  renameColumnAction,
  reorderColumnsAction,
  setLastBoardAction,
  updateTaskAction,
} from "@/features/workspace/services/actions";
import { createEmptyWorkspaceState } from "@/features/workspace/services/mappers";
import type {
  Board,
  Column,
  CreateTaskInput,
  MoveTaskInput,
  ReorderColumnsInput,
  Task,
  TaskPriority,
  UpdateTaskInput,
  WorkspaceState,
} from "./types";

type WorkspaceAction =
  | { type: "HYDRATE"; state: WorkspaceState }
  | { type: "SET_ACTIVE_BOARD"; boardId: string }
  | { type: "CREATE_BOARD"; board: Board; columns: Column[] }
  | { type: "RENAME_BOARD"; boardId: string; name: string }
  | { type: "CREATE_COLUMN"; column: Column }
  | { type: "RENAME_COLUMN"; columnId: string; name: string }
  | { type: "DELETE_COLUMN"; columnId: string }
  | { type: "CREATE_TASK"; task: Task }
  | { type: "UPDATE_TASK"; task: Task }
  | { type: "MOVE_TASK"; input: MoveTaskInput }
  | { type: "DELETE_TASK"; taskId: string }
  | { type: "REORDER_COLUMNS"; input: ReorderColumnsInput };

function getTasksForColumn(state: WorkspaceState, columnId: string) {
  return Object.values(state.tasks)
    .filter((task) => task.columnId === columnId)
    .sort((a, b) => a.position - b.position);
}

function isValidColumnReorder(
  state: WorkspaceState,
  boardId: string,
  columnIds: string[]
) {
  const board = state.boards[boardId];
  if (!board) {
    return false;
  }

  if (columnIds.length !== board.columnIds.length) {
    return false;
  }

  const currentSet = new Set(board.columnIds);
  return columnIds.every((id) => {
    const column = state.columns[id];
    return column?.boardId === boardId && currentSet.has(id);
  });
}

export function workspaceReducer(
  state: WorkspaceState,
  action: WorkspaceAction
): WorkspaceState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;

    case "SET_ACTIVE_BOARD":
      if (state.activeBoardId === action.boardId) {
        return state;
      }
      return { ...state, activeBoardId: action.boardId };

    case "CREATE_BOARD": {
      const columns = { ...state.columns };
      action.columns.forEach((column) => {
        columns[column.id] = column;
      });

      return {
        ...state,
        boardOrder: [...state.boardOrder, action.board.id],
        activeBoardId: action.board.id,
        boards: {
          ...state.boards,
          [action.board.id]: action.board,
        },
        columns,
      };
    }

    case "RENAME_BOARD": {
      const board = state.boards[action.boardId];
      if (!board) {
        return state;
      }

      return {
        ...state,
        boards: {
          ...state.boards,
          [action.boardId]: { ...board, name: action.name },
        },
      };
    }

    case "CREATE_COLUMN": {
      const board = state.boards[action.column.boardId];
      if (!board) {
        return state;
      }

      return {
        ...state,
        columns: {
          ...state.columns,
          [action.column.id]: action.column,
        },
        boards: {
          ...state.boards,
          [action.column.boardId]: {
            ...board,
            columnIds: [...board.columnIds, action.column.id],
          },
        },
      };
    }

    case "RENAME_COLUMN": {
      const column = state.columns[action.columnId];
      if (!column) {
        return state;
      }

      return {
        ...state,
        columns: {
          ...state.columns,
          [action.columnId]: { ...column, name: action.name },
        },
      };
    }

    case "DELETE_COLUMN": {
      const column = state.columns[action.columnId];
      if (!column) {
        return state;
      }

      const board = state.boards[column.boardId];
      if (!board) {
        return state;
      }

      const { [action.columnId]: _removed, ...remainingColumns } = state.columns;
      const remainingTasks = Object.fromEntries(
        Object.entries(state.tasks).filter(
          ([, task]) => task.columnId !== action.columnId
        )
      );

      return {
        ...state,
        columns: remainingColumns,
        tasks: remainingTasks,
        boards: {
          ...state.boards,
          [column.boardId]: {
            ...board,
            columnIds: board.columnIds.filter((id) => id !== action.columnId),
          },
        },
      };
    }

    case "CREATE_TASK":
      return {
        ...state,
        tasks: { ...state.tasks, [action.task.id]: action.task },
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: action.task,
        },
      };

    case "MOVE_TASK": {
      const existing = state.tasks[action.input.taskId];
      if (!existing) {
        return state;
      }

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.input.taskId]: {
            ...existing,
            columnId: action.input.columnId,
            position: action.input.position,
          },
        },
      };
    }

    case "DELETE_TASK": {
      const { [action.taskId]: _removed, ...remainingTasks } = state.tasks;
      return { ...state, tasks: remainingTasks };
    }

    case "REORDER_COLUMNS": {
      const { boardId, columnIds } = action.input;
      const board = state.boards[boardId];
      if (!board || !isValidColumnReorder(state, boardId, columnIds)) {
        return state;
      }

      if (
        board.columnIds.length === columnIds.length &&
        board.columnIds.every((id, index) => id === columnIds[index])
      ) {
        return state;
      }

      return {
        ...state,
        boards: {
          ...state.boards,
          [boardId]: { ...board, columnIds },
        },
      };
    }

    default:
      return state;
  }
}

interface WorkspaceContextValue {
  state: WorkspaceState;
  activeBoard: Board | undefined;
  setActiveBoard: (boardId: string) => void;
  createBoard: (name: string) => Promise<string | null>;
  renameBoard: (boardId: string, name: string) => Promise<void>;
  createColumn: (boardId: string, name: string) => Promise<void>;
  renameColumn: (columnId: string, name: string) => Promise<void>;
  deleteColumn: (columnId: string) => Promise<void>;
  reorderColumns: (input: ReorderColumnsInput) => Promise<void>;
  createTask: (input: CreateTaskInput) => Promise<boolean>;
  updateTask: (input: UpdateTaskInput) => Promise<boolean>;
  moveTask: (input: MoveTaskInput) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  getBoardColumns: (boardId: string) => Column[];
  getColumnTasks: (columnId: string) => Task[];
  getTaskById: (taskId: string) => Task | undefined;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: WorkspaceState;
}) {
  const [state, dispatch] = useReducer(
    workspaceReducer,
    initialState ?? createEmptyWorkspaceState()
  );

  const activeBoard = state.boards[state.activeBoardId];

  const getBoardColumns = useCallback(
    (boardId: string) => {
      const board = state.boards[boardId];
      if (!board) {
        return [];
      }
      return board.columnIds
        .map((id) => state.columns[id])
        .filter(Boolean);
    },
    [state.boards, state.columns]
  );

  const getColumnTasks = useCallback(
    (columnId: string) => getTasksForColumn(state, columnId),
    [state]
  );

  const getTaskById = useCallback(
    (taskId: string) => state.tasks[taskId],
    [state.tasks]
  );

  const setActiveBoard = useCallback((boardId: string) => {
    dispatch({ type: "SET_ACTIVE_BOARD", boardId });
    void setLastBoardAction(boardId);
  }, []);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      state,
      activeBoard,
      setActiveBoard,
      createBoard: async (name) => {
        const result = await createBoardAction(name);
        if (!result.success) {
          toast.error(result.error);
          return null;
        }

        dispatch({
          type: "CREATE_BOARD",
          board: result.data.board,
          columns: result.data.columns,
        });
        return result.data.board.id;
      },
      renameBoard: async (boardId, name) => {
        const previous = state.boards[boardId]?.name;
        dispatch({ type: "RENAME_BOARD", boardId, name });
        const result = await renameBoardAction(boardId, name);
        if (!result.success) {
          if (previous) {
            dispatch({ type: "RENAME_BOARD", boardId, name: previous });
          }
          toast.error(result.error);
        }
      },
      createColumn: async (boardId, name) => {
        const result = await createColumnAction(boardId, name);
        if (!result.success) {
          toast.error(result.error);
          return;
        }
        dispatch({ type: "CREATE_COLUMN", column: result.data });
      },
      renameColumn: async (columnId, name) => {
        const previous = state.columns[columnId]?.name;
        dispatch({ type: "RENAME_COLUMN", columnId, name });
        const result = await renameColumnAction(columnId, name);
        if (!result.success) {
          if (previous) {
            dispatch({ type: "RENAME_COLUMN", columnId, name: previous });
          }
          toast.error(result.error);
        }
      },
      deleteColumn: async (columnId) => {
        const result = await deleteColumnAction(columnId);
        if (!result.success) {
          toast.error(result.error);
          return;
        }
        dispatch({ type: "DELETE_COLUMN", columnId });
      },
      reorderColumns: async (input) => {
        const board = state.boards[input.boardId];
        const previous = board?.columnIds;
        dispatch({ type: "REORDER_COLUMNS", input });
        const result = await reorderColumnsAction(input.boardId, input.columnIds);
        if (!result.success && previous) {
          dispatch({
            type: "REORDER_COLUMNS",
            input: { boardId: input.boardId, columnIds: previous },
          });
          toast.error(result.error);
        }
      },
      createTask: async (input) => {
        const boardId = state.columns[input.columnId]?.boardId;
        if (!boardId) {
          toast.error("Failed to save. Please try again.");
          return false;
        }

        const result = await createTaskAction({
          title: input.title,
          columnId: input.columnId,
          boardId,
          tag: input.tag,
          priority: input.priority ?? undefined,
          description: input.description,
        });

        if (!result.success) {
          toast.error(result.error);
          return false;
        }

        dispatch({ type: "CREATE_TASK", task: result.data });
        return true;
      },
      updateTask: async (input) => {
        const existing = state.tasks[input.id];
        if (!existing) {
          return false;
        }

        const optimistic: Task = {
          ...existing,
          ...input,
          id: existing.id,
          taskId: existing.taskId,
        };

        if (input.columnId && input.columnId !== existing.columnId) {
          optimistic.position =
            getTasksForColumn(state, input.columnId).length + 1;
        }

        dispatch({ type: "UPDATE_TASK", task: optimistic });

        const result = await updateTaskAction({
          id: input.id,
          title: input.title,
          description: input.description,
          tag: input.tag,
          priority: input.priority,
          columnId: input.columnId,
          position: optimistic.position,
        });

        if (!result.success) {
          dispatch({ type: "UPDATE_TASK", task: existing });
          toast.error(result.error);
          return false;
        }

        dispatch({ type: "UPDATE_TASK", task: result.data });
        return true;
      },
      moveTask: async (input) => {
        const existing = state.tasks[input.taskId];
        if (!existing) {
          return;
        }

        dispatch({ type: "MOVE_TASK", input });
        const result = await moveTaskAction(input);
        if (!result.success) {
          dispatch({
            type: "MOVE_TASK",
            input: {
              taskId: existing.id,
              columnId: existing.columnId,
              position: existing.position,
            },
          });
          toast.error(result.error);
        }
      },
      deleteTask: async (taskId) => {
        const existing = state.tasks[taskId];
        const result = await deleteTaskAction(taskId);
        if (!result.success) {
          toast.error(result.error);
          return;
        }
        dispatch({ type: "DELETE_TASK", taskId });
        if (existing) {
          void existing;
        }
      },
      getBoardColumns,
      getColumnTasks,
      getTaskById,
    }),
    [
      state,
      activeBoard,
      setActiveBoard,
      getBoardColumns,
      getColumnTasks,
      getTaskById,
    ]
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }
  return context;
}

export function priorityToTaskCardPriority(
  priority: TaskPriority
): "high" | "medium" | "low" | undefined {
  if (!priority) {
    return undefined;
  }
  return priority;
}
