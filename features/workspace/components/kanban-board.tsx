"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/features/workspace/store";
import type { Task, TaskPriority } from "@/features/workspace/types";
import { Plus } from "@/lib/icons";

import { KanbanColumn } from "./kanban-column";
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
    activeBoard,
    getBoardColumns,
    getColumnTasks,
    createTask,
    createColumn,
  } = useWorkspace();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addColumnOpen, setAddColumnOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  if (!activeBoard) {
    return null;
  }

  const columns = getBoardColumns(activeBoard.id);

  const handleCreateTask = (
    columnId: string,
    data: { title: string; tag?: string; priority?: TaskPriority }
  ) => {
    createTask({
      title: data.title,
      columnId,
      tag: data.tag,
      priority: data.priority,
    });
    onNewTaskColumnChange(null);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setModalOpen(true);
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
      <div className="flex gap-4 overflow-x-auto px-6 pt-8 pb-8">
        {columns.map((column) => (
          <KanbanColumn
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

        <button
          type="button"
          onClick={() => setAddColumnOpen(true)}
          className="flex h-[120px] w-[280px] shrink-0 items-center justify-center gap-2 rounded-lg border border-dashed border-border text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <Plus className="size-4" />
          Add Column
        </button>
      </div>

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
