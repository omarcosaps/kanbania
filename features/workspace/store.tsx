"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import { INITIAL_WORKSPACE_STATE } from "./mocks";
import type {
  Board,
  Column,
  CreateTaskInput,
  Task,
  TaskPriority,
  UpdateTaskInput,
  WorkspaceState,
} from "./types";
import { DEFAULT_COLUMN_NAMES } from "./types";

type WorkspaceAction =
  | { type: "SET_ACTIVE_BOARD"; boardId: string }
  | { type: "CREATE_BOARD"; name: string; boardId: string }
  | { type: "CREATE_COLUMN"; boardId: string; name: string }
  | { type: "RENAME_COLUMN"; columnId: string; name: string }
  | { type: "DELETE_COLUMN"; columnId: string }
  | { type: "CREATE_TASK"; input: CreateTaskInput }
  | { type: "UPDATE_TASK"; input: UpdateTaskInput }
  | { type: "DELETE_TASK"; taskId: string };

function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

function getNextTaskNumber(state: WorkspaceState) {
  return state.taskCounter + 1;
}

function getTasksForColumn(state: WorkspaceState, columnId: string) {
  return Object.values(state.tasks)
    .filter((task) => task.columnId === columnId)
    .sort((a, b) => a.position - b.position);
}

function getNextPosition(state: WorkspaceState, columnId: string) {
  const tasks = getTasksForColumn(state, columnId);
  if (tasks.length === 0) {
    return 1;
  }
  return Math.max(...tasks.map((task) => task.position)) + 1;
}

function workspaceReducer(
  state: WorkspaceState,
  action: WorkspaceAction
): WorkspaceState {
  switch (action.type) {
    case "SET_ACTIVE_BOARD":
      return { ...state, activeBoardId: action.boardId };

    case "CREATE_BOARD": {
      const boardId = action.boardId;
      const columnIds = DEFAULT_COLUMN_NAMES.map(() => createId("col"));

      const columns = { ...state.columns };
      columnIds.forEach((columnId, index) => {
        columns[columnId] = {
          id: columnId,
          name: DEFAULT_COLUMN_NAMES[index],
          boardId,
        };
      });

      return {
        ...state,
        boardOrder: [...state.boardOrder, boardId],
        activeBoardId: boardId,
        boards: {
          ...state.boards,
          [boardId]: {
            id: boardId,
            name: action.name,
            columnIds,
          },
        },
        columns,
      };
    }

    case "CREATE_COLUMN": {
      const columnId = createId("col");
      const board = state.boards[action.boardId];
      if (!board) {
        return state;
      }

      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: {
            id: columnId,
            name: action.name,
            boardId: action.boardId,
          },
        },
        boards: {
          ...state.boards,
          [action.boardId]: {
            ...board,
            columnIds: [...board.columnIds, columnId],
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

    case "CREATE_TASK": {
      const nextNumber = getNextTaskNumber(state);
      const id = createId("task");
      const task: Task = {
        id,
        taskId: `KAN-${nextNumber}`,
        title: action.input.title,
        description: action.input.description,
        tag: action.input.tag,
        priority: action.input.priority ?? null,
        columnId: action.input.columnId,
        position: getNextPosition(state, action.input.columnId),
      };

      return {
        ...state,
        taskCounter: nextNumber,
        tasks: { ...state.tasks, [id]: task },
      };
    }

    case "UPDATE_TASK": {
      const existing = state.tasks[action.input.id];
      if (!existing) {
        return state;
      }

      const updated: Task = {
        ...existing,
        ...action.input,
        id: existing.id,
        taskId: existing.taskId,
      };

      if (
        action.input.columnId &&
        action.input.columnId !== existing.columnId
      ) {
        updated.position = getNextPosition(
          { ...state, tasks: { ...state.tasks, [existing.id]: updated } },
          action.input.columnId
        );
      }

      return {
        ...state,
        tasks: { ...state.tasks, [existing.id]: updated },
      };
    }

    case "DELETE_TASK": {
      const { [action.taskId]: _removed, ...remainingTasks } = state.tasks;
      return { ...state, tasks: remainingTasks };
    }

    default:
      return state;
  }
}

interface WorkspaceContextValue {
  state: WorkspaceState;
  activeBoard: Board | undefined;
  setActiveBoard: (boardId: string) => void;
  createBoard: (name: string) => string;
  createColumn: (boardId: string, name: string) => void;
  renameColumn: (columnId: string, name: string) => void;
  deleteColumn: (columnId: string) => void;
  createTask: (input: CreateTaskInput) => void;
  updateTask: (input: UpdateTaskInput) => void;
  deleteTask: (taskId: string) => void;
  getBoardColumns: (boardId: string) => Column[];
  getColumnTasks: (columnId: string) => Task[];
  getTaskById: (taskId: string) => Task | undefined;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(workspaceReducer, INITIAL_WORKSPACE_STATE);

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

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      state,
      activeBoard,
      setActiveBoard: (boardId) =>
        dispatch({ type: "SET_ACTIVE_BOARD", boardId }),
      createBoard: (name) => {
        const boardId = createId("board");
        dispatch({ type: "CREATE_BOARD", name, boardId });
        return boardId;
      },
      createColumn: (boardId, name) =>
        dispatch({ type: "CREATE_COLUMN", boardId, name }),
      renameColumn: (columnId, name) =>
        dispatch({ type: "RENAME_COLUMN", columnId, name }),
      deleteColumn: (columnId) =>
        dispatch({ type: "DELETE_COLUMN", columnId }),
      createTask: (input) => dispatch({ type: "CREATE_TASK", input }),
      updateTask: (input) => dispatch({ type: "UPDATE_TASK", input }),
      deleteTask: (taskId) => dispatch({ type: "DELETE_TASK", taskId }),
      getBoardColumns,
      getColumnTasks,
      getTaskById,
    }),
    [state, activeBoard, getBoardColumns, getColumnTasks, getTaskById]
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
