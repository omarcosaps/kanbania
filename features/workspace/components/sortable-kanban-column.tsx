"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Column, Task, TaskPriority } from "@/features/workspace/types";
import { cn } from "@/lib/utils";

import { KanbanColumn } from "./kanban-column";

interface SortableKanbanColumnProps {
  column: Column;
  tasks: Task[];
  isCreating: boolean;
  onStartCreate: () => void;
  onCancelCreate: () => void;
  onCreateTask: (data: {
    title: string;
    tag?: string;
    priority?: TaskPriority;
  }) => Promise<boolean>;
  onTaskClick: (task: Task) => void;
}

export function SortableKanbanColumn(props: SortableKanbanColumnProps) {
  const { column } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "column", column },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 150ms ease",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && "opacity-0")}
    >
      <KanbanColumn
        {...props}
        dragHandleRef={setActivatorNodeRef}
        dragHandleListeners={listeners}
        dragHandleAttributes={attributes}
        isColumnDragging={isDragging}
      />
    </div>
  );
}
