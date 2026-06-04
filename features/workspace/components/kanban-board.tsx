"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useMemo, useRef, useState } from "react";

import { TaskCard } from "@/components/task-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { shouldShowBoardEmptyState } from "@/features/workspace/lib/board-empty-state-visibility";
import { createTaskCollisionDetection } from "@/features/workspace/lib/get-task-collision-detection";
import { parseColumnDropId } from "@/features/workspace/lib/column-drop-id";
import {
  computeTaskMove,
  getColumnTaskCardRects,
  getDragPointerY,
  resolveColumnIdFromColumnDrag,
  resolveTargetColumnId,
  resolveTaskDropOverId,
} from "@/features/workspace/lib/task-reorder-index";
import {
  priorityToTaskCardPriority,
  useWorkspace,
} from "@/features/workspace/store";
import type { Column, Task, TaskPriority } from "@/features/workspace/types";
import { Plus } from "@/lib/icons";

import { BoardEmptyState } from "./board-empty-state";
import { SortableKanbanColumn } from "./sortable-kanban-column";
import { TaskModal } from "./task-modal";

interface KanbanBoardProps {
  boardId: string;
  newTaskColumnId: string | null;
  onNewTaskColumnChange: (columnId: string | null) => void;
}

export function KanbanBoard({
  boardId,
  newTaskColumnId,
  onNewTaskColumnChange,
}: KanbanBoardProps) {
  const {
    state,
    getBoardColumns,
    getColumnTasks,
    getTaskById,
    createTask,
    createColumn,
    moveTask,
    reorderColumns,
  } = useWorkspace();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addColumnOpen, setAddColumnOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [activeDragTask, setActiveDragTask] = useState<Task | null>(null);
  const [activeDragColumn, setActiveDragColumn] = useState<Column | null>(null);
  const wasDraggingRef = useRef(false);
  const lastOverTaskIdRef = useRef<string | null>(null);
  const lastOverColumnIdRef = useRef<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const taskCollisionDetection = useMemo(
    () => createTaskCollisionDetection(getTaskById),
    [getTaskById]
  );

  const board = state.boards[boardId];

  if (!board) {
    return null;
  }

  const columns = getBoardColumns(board.id);
  const hasTasks = columns.some((col) => getColumnTasks(col.id).length > 0);
  const showEmptyState = shouldShowBoardEmptyState(
    hasTasks,
    newTaskColumnId,
    columns.length > 0
  );

  if (showEmptyState) {
    const firstColumn = columns[0];

    return (
      <BoardEmptyState
        onNewTask={() => {
          if (firstColumn) {
            onNewTaskColumnChange(firstColumn.id);
          }
        }}
      />
    );
  }

  const hasColumn = (columnId: string) => Boolean(state.columns[columnId]);

  const handleCreateTask = async (
    columnId: string,
    data: { title: string; tag?: string; priority?: TaskPriority }
  ): Promise<boolean> => {
    const saved = await createTask({
      title: data.title,
      columnId,
      tag: data.tag,
      priority: data.priority,
    });

    if (saved) {
      onNewTaskColumnChange(null);
    }

    return saved;
  };

  const handleTaskClick = (task: Task) => {
    if (wasDraggingRef.current) {
      return;
    }
    setSelectedTask(task);
    setModalOpen(true);
  };

  const resetTaskDragRefs = () => {
    lastOverTaskIdRef.current = null;
    lastOverColumnIdRef.current = null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    wasDraggingRef.current = true;
    resetTaskDragRefs();
    const dragType = event.active.data.current?.type;

    if (dragType === "column") {
      const column = state.columns[String(event.active.id)];
      setActiveDragColumn(column ?? null);
      setActiveDragTask(null);
      return;
    }

    const task = getTaskById(String(event.active.id));
    setActiveDragTask(task ?? null);
    setActiveDragColumn(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || active.data.current?.type !== "task") {
      return;
    }

    const overId = String(over.id);
    const overTask = getTaskById(overId);

    if (overTask) {
      lastOverTaskIdRef.current = overId;
      lastOverColumnIdRef.current = overTask.columnId;
      return;
    }

    const dropColumnId = parseColumnDropId(overId);
    if (dropColumnId) {
      lastOverColumnIdRef.current = dropColumnId;
      return;
    }

    if (hasColumn(overId)) {
      lastOverColumnIdRef.current = overId;
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragTask(null);
    setActiveDragColumn(null);

    window.setTimeout(() => {
      wasDraggingRef.current = false;
    }, 0);

    if (!over) {
      resetTaskDragRefs();
      return;
    }

    const dragType = active.data.current?.type;

    if (dragType === "column") {
      const activeId = String(active.id);
      const overId = String(over.id);
      const resolvedOverColumnId = resolveColumnIdFromColumnDrag(
        overId,
        getTaskById,
        hasColumn
      );

      const columnIds = board.columnIds;
      const oldIndex = columnIds.indexOf(activeId);
      const newIndex = resolvedOverColumnId
        ? columnIds.indexOf(resolvedOverColumnId)
        : -1;

      resetTaskDragRefs();

      if (!resolvedOverColumnId || activeId === resolvedOverColumnId) {
        return;
      }

      if (oldIndex < 0 || newIndex < 0) {
        return;
      }

      const reordered = arrayMove(columnIds, oldIndex, newIndex);

      reorderColumns({ boardId: board.id, columnIds: reordered });
      return;
    }

    if (dragType !== "task") {
      resetTaskDragRefs();
      return;
    }

    const activeId = String(active.id);
    const activeTask = getTaskById(activeId);
    const resolvedOverId = resolveTaskDropOverId(event, getTaskById);

    if (!activeTask) {
      resetTaskDragRefs();
      return;
    }

    if (!resolvedOverId || activeId === resolvedOverId) {
      resetTaskDragRefs();
      return;
    }

    let targetColumnId = resolveTargetColumnId(
      resolvedOverId,
      getTaskById,
      hasColumn
    );

    if (!targetColumnId) {
      targetColumnId = lastOverColumnIdRef.current;
    }

    if (!targetColumnId) {
      resetTaskDragRefs();
      return;
    }

    const isColumnDrop =
      Boolean(parseColumnDropId(resolvedOverId)) || hasColumn(resolvedOverId);

    let overTaskId: string | null = getTaskById(resolvedOverId)
      ? resolvedOverId
      : null;

    if (!overTaskId && lastOverTaskIdRef.current) {
      const lastTask = getTaskById(lastOverTaskIdRef.current);
      if (lastTask && lastTask.columnId === targetColumnId) {
        overTaskId = lastOverTaskIdRef.current;
      }
    }

    const appendToEnd = isColumnDrop && !overTaskId;
    const pointerY = getDragPointerY(event);
    const cardRects = getColumnTaskCardRects(targetColumnId);

    const moveResult = computeTaskMove({
      activeTask,
      targetColumnId,
      getColumnTasks,
      overTaskId,
      pointerY,
      cardRects,
      appendToEnd,
    });

    resetTaskDragRefs();

    if (!moveResult) {
      return;
    }

    moveTask({
      taskId: activeId,
      columnId: moveResult.columnId,
      position: moveResult.position,
    });
  };

  const handleAddColumn = async () => {
    const trimmed = newColumnName.trim();
    if (!trimmed) {
      return;
    }
    await createColumn(board.id, trimmed);
    setNewColumnName("");
    setAddColumnOpen(false);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={taskCollisionDetection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto px-6 pt-8 pb-8">
          <SortableContext
            items={columns.map((column) => column.id)}
            strategy={horizontalListSortingStrategy}
          >
            {columns.map((column) => (
              <SortableKanbanColumn
                key={column.id}
                column={column}
                tasks={getColumnTasks(column.id)}
                isCreating={newTaskColumnId === column.id}
                onStartCreate={() => onNewTaskColumnChange(column.id)}
                onCancelCreate={() => onNewTaskColumnChange(null)}
                onCreateTask={(data) => handleCreateTask(column.id, data)}
                onTaskClick={handleTaskClick}
              />
            ))}
          </SortableContext>

          <button
            type="button"
            onClick={() => setAddColumnOpen(true)}
            className="flex h-[120px] w-[280px] shrink-0 items-center justify-center gap-2 rounded-lg border border-dashed border-border text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <Plus className="size-4" />
            Add Column
          </button>
        </div>

        <DragOverlay dropAnimation={{ duration: 150 }}>
          {activeDragTask ? (
            <TaskCard
              title={activeDragTask.title}
              taskId={activeDragTask.taskId}
              tag={activeDragTask.tag}
              priority={priorityToTaskCardPriority(activeDragTask.priority)}
              isDragging
              className="shadow-md"
            />
          ) : activeDragColumn ? (
            <div className="flex w-[280px] shrink-0 cursor-grabbing flex-col rounded-lg border border-border bg-background shadow-lg">
              <div className="mb-3 flex items-center justify-between px-1 pt-1">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-sm font-medium">
                    {activeDragColumn.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {getColumnTasks(activeDragColumn.id).length}
                  </span>
                </div>
              </div>
              <div className="min-h-[240px] rounded-lg bg-muted/20" />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskModal
        boardId={boardId}
        task={selectedTask}
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) {
            setSelectedTask(null);
          }
        }}
      />

      <Dialog open={addColumnOpen} onOpenChange={setAddColumnOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-2">
            <h2 className="text-base font-semibold">Add column</h2>
            <Input
              placeholder="Column name"
              value={newColumnName}
              onChange={(event) => setNewColumnName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAddColumn();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddColumnOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddColumn} disabled={!newColumnName.trim()}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
