import type { DragEndEvent } from "@dnd-kit/core";

import { getPositionForIndex } from "@/features/workspace/lib/task-position";
import { parseColumnDropId } from "@/features/workspace/lib/column-drop-id";
import type { Task } from "@/features/workspace/types";

export interface TaskCardRect {
  id: string;
  top: number;
  bottom: number;
}

export interface ComputeTaskInsertIndexInput {
  /** IDs ordenados na coluna destino, sem o card arrastado */
  orderedIds: string[];
  overTaskId?: string | null;
  pointerY?: number;
  cardRects?: TaskCardRect[];
  appendToEnd?: boolean;
}

export interface ComputeTaskMoveInput {
  activeTask: Task;
  targetColumnId: string;
  getColumnTasks: (columnId: string) => Task[];
  overTaskId?: string | null;
  pointerY?: number;
  cardRects?: TaskCardRect[];
  appendToEnd?: boolean;
}

export interface TaskMoveResult {
  columnId: string;
  position: number;
}

/** Índice de inserção (0..n) na lista destino sem o card ativo. */
export function computeTaskInsertIndex(
  input: ComputeTaskInsertIndexInput
): number {
  const { orderedIds, overTaskId, pointerY, cardRects = [], appendToEnd } =
    input;
  const n = orderedIds.length;

  if (n === 0) {
    return 0;
  }

  const rectsForOrdered = orderedIds
    .map((id) => cardRects.find((rect) => rect.id === id))
    .filter((rect): rect is TaskCardRect => rect !== undefined);

  if (
    pointerY !== undefined &&
    rectsForOrdered.length === orderedIds.length &&
    rectsForOrdered.length > 0
  ) {
    for (let i = 0; i < rectsForOrdered.length; i++) {
      const mid = (rectsForOrdered[i].top + rectsForOrdered[i].bottom) / 2;
      if (pointerY < mid) {
        return i;
      }
    }
    return n;
  }

  if (overTaskId) {
    const overIndex = orderedIds.indexOf(overTaskId);
    if (overIndex < 0) {
      return appendToEnd ? n : 0;
    }

    const rect = cardRects.find((item) => item.id === overTaskId);
    if (pointerY !== undefined && rect) {
      const mid = (rect.top + rect.bottom) / 2;
      return pointerY >= mid ? overIndex + 1 : overIndex;
    }

    return overIndex;
  }

  return appendToEnd ? n : 0;
}

export function resolveTargetColumnId(
  overId: string,
  getTaskById: (id: string) => Task | undefined,
  hasColumn: (columnId: string) => boolean
): string | null {
  const overTask = getTaskById(overId);
  if (overTask) {
    return overTask.columnId;
  }

  const dropColumnId = parseColumnDropId(overId);
  if (dropColumnId) {
    return dropColumnId;
  }

  if (hasColumn(overId)) {
    return overId;
  }

  return null;
}

export function computeTaskMove(
  input: ComputeTaskMoveInput
): TaskMoveResult | null {
  const {
    activeTask,
    targetColumnId,
    getColumnTasks,
    overTaskId,
    pointerY,
    cardRects,
    appendToEnd,
  } = input;

  const columnTasks = getColumnTasks(targetColumnId);
  const orderedIds = columnTasks
    .filter((task) => task.id !== activeTask.id)
    .map((task) => task.id);

  const insertIndex = computeTaskInsertIndex({
    orderedIds,
    overTaskId,
    pointerY,
    cardRects,
    appendToEnd,
  });

  const newOrder = [...orderedIds];
  newOrder.splice(insertIndex, 0, activeTask.id);

  const currentIndex = columnTasks.findIndex(
    (task) => task.id === activeTask.id
  );
  const newIndex = newOrder.indexOf(activeTask.id);

  if (activeTask.columnId === targetColumnId && currentIndex === newIndex) {
    return null;
  }

  const tasksWithoutActive = columnTasks.filter(
    (task) => task.id !== activeTask.id
  );
  const position = getPositionForIndex(tasksWithoutActive, insertIndex);

  return { columnId: targetColumnId, position };
}

/** Prefere o card sob o ponteiro em vez da área column-drop. */
export function resolveTaskDropOverId(
  event: DragEndEvent,
  getTaskById: (id: string) => Task | undefined
): string | null {
  const activeId = String(event.active.id);

  for (const collision of event.collisions ?? []) {
    const id = String(collision.id);
    if (id === activeId) {
      continue;
    }
    if (parseColumnDropId(id)) {
      continue;
    }
    if (getTaskById(id)) {
      return id;
    }
  }

  if (!event.over) {
    return null;
  }

  const overId = String(event.over.id);
  if (overId === activeId) {
    return null;
  }

  return overId;
}

/** Apenas para reordenação de colunas (permite over em card → coluna do card). */
export function resolveColumnIdFromColumnDrag(
  overId: string,
  getTaskById: (id: string) => Task | undefined,
  hasColumn: (columnId: string) => boolean
): string | null {
  if (hasColumn(overId)) {
    return overId;
  }

  const dropColumnId = parseColumnDropId(overId);
  if (dropColumnId) {
    return dropColumnId;
  }

  const overTask = getTaskById(overId);
  if (overTask) {
    return overTask.columnId;
  }

  return null;
}

export function getDragPointerY(event: DragEndEvent): number | undefined {
  const activator = event.activatorEvent;
  if (activator && "clientY" in activator) {
    return (activator as PointerEvent).clientY + event.delta.y;
  }
  return undefined;
}

export function getColumnTaskCardRects(columnId: string): TaskCardRect[] {
  if (typeof document === "undefined") {
    return [];
  }

  const columnEl = document.querySelector(`[data-column-id="${columnId}"]`);
  if (!columnEl) {
    return [];
  }

  const cards = columnEl.querySelectorAll("[data-task-id]");
  return Array.from(cards).map((element) => {
    const rect = element.getBoundingClientRect();
    return {
      id: element.getAttribute("data-task-id") ?? "",
      top: rect.top,
      bottom: rect.bottom,
    };
  });
}
