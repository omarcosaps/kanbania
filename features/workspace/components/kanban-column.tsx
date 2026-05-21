"use client";

import { useState } from "react";

import { TaskCard } from "@/components/task-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  priorityToTaskCardPriority,
  useWorkspace,
} from "@/features/workspace/store";
import type { Column, Task, TaskPriority } from "@/features/workspace/types";
import { MoreHorizontal, Plus } from "@/lib/icons";

import { TaskCardInline } from "./task-card-inline";

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  isCreating: boolean;
  onStartCreate: () => void;
  onCancelCreate: () => void;
  onCreateTask: (data: {
    title: string;
    tag?: string;
    priority?: TaskPriority;
  }) => void;
  onTaskClick: (task: Task) => void;
}

export function KanbanColumn({
  column,
  tasks,
  isCreating,
  onStartCreate,
  onCancelCreate,
  onCreateTask,
  onTaskClick,
}: KanbanColumnProps) {
  const { renameColumn, deleteColumn } = useWorkspace();
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [columnName, setColumnName] = useState(column.name);

  const handleRename = () => {
    const trimmed = columnName.trim();
    if (!trimmed) {
      return;
    }
    renameColumn(column.id, trimmed);
    setRenameOpen(false);
  };

  const handleDelete = () => {
    deleteColumn(column.id);
    setDeleteOpen(false);
  };

  const requestDelete = () => {
    if (tasks.length > 0) {
      setDeleteOpen(true);
      return;
    }
    deleteColumn(column.id);
  };

  return (
    <>
      <div className="flex w-[280px] shrink-0 flex-col">
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-medium">{column.name}</h2>
            <span className="text-sm text-muted-foreground">{tasks.length}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground"
              onClick={onStartCreate}
              aria-label={`Add task to ${column.name}`}
            >
              <Plus className="size-3.5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground"
                    aria-label={`${column.name} options`}
                  />
                }
              >
                <MoreHorizontal className="size-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setRenameOpen(true)}>
                  Rename column
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={requestDelete}>
                  Delete column
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {isCreating ? (
            <TaskCardInline
              onSave={(data) => {
                onCreateTask(data);
                onCancelCreate();
              }}
              onCancel={onCancelCreate}
            />
          ) : null}

          {tasks.length === 0 && !isCreating ? (
            <p className="px-1 py-6 text-center text-xs text-muted-foreground">
              No tasks yet
            </p>
          ) : null}

          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              taskId={task.taskId}
              tag={task.tag}
              priority={priorityToTaskCardPriority(task.priority)}
              onClick={() => onTaskClick(task)}
            />
          ))}
        </div>
      </div>

      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-2">
            <h2 className="text-base font-semibold">Rename column</h2>
            <Input
              value={columnName}
              onChange={(event) => setColumnName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleRename();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRename} disabled={!columnName.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-2">
            <h2 className="text-base font-semibold">Delete this column?</h2>
            <p className="text-sm text-muted-foreground">
              This column has {tasks.length} task
              {tasks.length === 1 ? "" : "s"}. All tasks will be permanently
              removed.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
