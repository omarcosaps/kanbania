"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { TaskCard } from "@/components/task-card";
import {
  priorityToTaskCardPriority,
} from "@/features/workspace/store";
import type { Task } from "@/features/workspace/types";
import { cn } from "@/lib/utils";

interface SortableTaskCardProps {
  task: Task;
  onTaskClick: (task: Task) => void;
}

export function SortableTaskCard({ task, onTaskClick }: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 150ms ease",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && "opacity-40")}
      {...attributes}
      {...listeners}
    >
      <TaskCard
        title={task.title}
        taskId={task.taskId}
        tag={task.tag}
        priority={priorityToTaskCardPriority(task.priority)}
        isDragging={isDragging}
        onClick={() => onTaskClick(task)}
      />
    </div>
  );
}
