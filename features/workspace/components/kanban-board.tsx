"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { TaskCard } from "@/components/task-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getPositionForIndex } from "@/features/workspace/lib/task-position";
import { parseColumnDropId } from "@/features/workspace/lib/column-drop-id";
import {
  priorityToTaskCardPriority,
  useWorkspace,
} from "@/features/workspace/store";
import type { Column, Task, TaskPriority } from "@/features/workspace/types";
import { Plus } from "@/lib/icons";

import { SortableKanbanColumn } from "./sortable-kanban-column";
import { TaskModal } from "./task-modal";

interface KanbanBoardProps {
  newTaskColumnId: string | null;
  onNewTaskColumnChange: (columnId: string | null) => void;
}

export function KanbanBoard({
  newTaskColumnId,
  onNewTaskColumnChange,
}: KanbanBoardProps) {
  const {
    state,
    activeBoard,
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  if (!activeBoard) {
    return null;
  }

  const columns = getBoardColumns(activeBoard.id);

  const resolveColumnIdFromOver = (overId: string): string | null => {
    if (state.columns[overId]) {
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
  };

  const handleCreateTask = async (
    columnId: string,
    data: { title: string; tag?: string; priority?: TaskPriority }
  ): Promise<boolean> => {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 400);
    });

    if (data.title.trim().toLowerCase() === "fail") {
      toast.error("Failed to save. Please try again.");
      return false;
    }

    createTask({
      title: data.title,
      columnId,
      tag: data.tag,
      priority: data.priority,
    });
    onNewTaskColumnChange(null);
    return true;
  };

  const handleTaskClick = (task: Task) => {
    if (wasDraggingRef.current) {
      return;
    }
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDragStart = (event: DragStartEvent) => {
    wasDraggingRef.current = true;
    const dragType = event.active.data.current?.type;

    // #region agent log
    fetch('http://127.0.0.1:7900/ingest/3c014148-ec67-4e67-8fe1-dc36ef123a7f',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'d858df'},body:JSON.stringify({sessionId:'d858df',location:'kanban-board.tsx:handleDragStart',message:'drag start',data:{activeId:String(event.active.id),dragType,rect:event.active.rect.current.translated},timestamp:Date.now(),hypothesisId:'B-D'})}).catch(()=>{});
    // #endregion

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragTask(null);
    setActiveDragColumn(null);

    window.setTimeout(() => {
      wasDraggingRef.current = false;
    }, 0);

    if (!over) {
      return;
    }

    const dragType = active.data.current?.type;

    if (dragType === "column") {
      const activeId = String(active.id);
      const overId = String(over.id);
      const resolvedOverColumnId = resolveColumnIdFromOver(overId);

      const columnIds = activeBoard.columnIds;
      const oldIndex = columnIds.indexOf(activeId);
      const newIndex = resolvedOverColumnId
        ? columnIds.indexOf(resolvedOverColumnId)
        : -1;

      // #region agent log
      fetch('http://127.0.0.1:7900/ingest/3c014148-ec67-4e67-8fe1-dc36ef123a7f',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'d858df'},body:JSON.stringify({sessionId:'d858df',runId:'post-fix',location:'kanban-board.tsx:handleDragEnd:column',message:'column drag end',data:{activeId,overId,resolvedOverColumnId,oldIndex,newIndex,columnIds,willReorder:oldIndex>=0&&newIndex>=0&&activeId!==resolvedOverColumnId},timestamp:Date.now(),hypothesisId:'C-E'})}).catch(()=>{});
      // #endregion

      if (!resolvedOverColumnId || activeId === resolvedOverColumnId) {
        return;
      }

      if (oldIndex < 0 || newIndex < 0) {
        return;
      }

      const reordered = arrayMove(columnIds, oldIndex, newIndex);

      reorderColumns({ boardId: activeBoard.id, columnIds: reordered });
      return;
    }

    if (dragType !== "task") {
      return;
    }

    const activeId = String(active.id);
    const overId = String(over.id);
    const activeTask = getTaskById(activeId);

    if (!activeTask || activeId === overId) {
      return;
    }

    let targetColumnId: string;
    let overIndex: number;

    if (state.columns[overId]) {
      targetColumnId = overId;
      overIndex = getColumnTasks(overId)
        .filter((task) => task.id !== activeId)
        .length;
    } else {
      const dropColumnId = resolveColumnIdFromOver(overId);
      if (dropColumnId) {
        targetColumnId = dropColumnId;
        overIndex = getColumnTasks(dropColumnId).filter(
          (task) => task.id !== activeId
        ).length;
      } else {
      const overTask = getTaskById(overId);
      if (!overTask) {
        return;
      }
      targetColumnId = overTask.columnId;
      overIndex = getColumnTasks(targetColumnId).findIndex(
        (task) => task.id === overId
      );
      if (overIndex < 0) {
        overIndex = getColumnTasks(targetColumnId).filter(
          (task) => task.id !== activeId
        ).length;
      }
      }
    }

    const sourceColumnId = activeTask.columnId;
    const sourceTasks = getColumnTasks(sourceColumnId);
    const activeIndex = sourceTasks.findIndex((task) => task.id === activeId);

    if (sourceColumnId === targetColumnId) {
      if (activeIndex === overIndex) {
        return;
      }

      const reordered = arrayMove(sourceTasks, activeIndex, overIndex);
      const newIndex = reordered.findIndex((task) => task.id === activeId);
      const withoutActive = sourceTasks.filter((task) => task.id !== activeId);
      const position = getPositionForIndex(withoutActive, newIndex);

      moveTask({ taskId: activeId, columnId: targetColumnId, position });
      return;
    }

    const targetTasks = getColumnTasks(targetColumnId).filter(
      (task) => task.id !== activeId
    );
    const position = getPositionForIndex(targetTasks, overIndex);

    moveTask({ taskId: activeId, columnId: targetColumnId, position });
  };

  const handleAddColumn = () => {
    const trimmed = newColumnName.trim();
    if (!trimmed) {
      return;
    }
    createColumn(activeBoard.id, trimmed);
    setNewColumnName("");
    setAddColumnOpen(false);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
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
