"use client";

import { Circle } from "lucide-react";
import { useEffect, useState } from "react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useWorkspace } from "@/features/workspace/store";
import type { Task, TaskPriority } from "@/features/workspace/types";
import { TASK_TAGS } from "@/features/workspace/types";
import { Flag, Tag } from "lucide-react";

interface TaskModalProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export function TaskModal({ task, open, onOpenChange }: TaskModalProps) {
  const { activeBoard, getBoardColumns, updateTask, deleteTask } =
    useWorkspace();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [columnId, setColumnId] = useState("");
  const [tag, setTag] = useState<string | undefined>();
  const [priority, setPriority] = useState<TaskPriority>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const columns = activeBoard ? getBoardColumns(activeBoard.id) : [];

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description ?? "");
      setColumnId(task.columnId);
      setTag(task.tag);
      setPriority(task.priority);
    }
  }, [task]);

  if (!task || !activeBoard) {
    return null;
  }

  const handleSave = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    updateTask({
      id: task.id,
      title: trimmed,
      description: description.trim() || undefined,
      columnId,
      tag,
      priority,
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setDeleteConfirmOpen(false);
    onOpenChange(false);
  };

  const columnName =
    columns.find((column) => column.id === columnId)?.name ?? "Todo";

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-2xl">
          <div className="flex items-start justify-start border-b px-4 pb-4 pt-4 pr-12">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-secondary px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                {task.taskId}
              </span>
              <span className="text-muted-foreground" aria-hidden>
                ›
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {activeBoard.name}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-6 py-5">
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="h-auto border-0 bg-transparent px-0 text-2xl font-medium leading-8 shadow-none focus-visible:ring-0"
            />

            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center gap-6">
                <div className="flex w-32 shrink-0 items-center gap-2 text-sm text-muted-foreground">
                  <Circle className="size-3.5" />
                  Status
                </div>
                <Select
                  value={columnId}
                  onValueChange={(value) => {
                    if (value) {
                      setColumnId(value);
                    }
                  }}
                >
                  <SelectTrigger className="h-8 w-auto gap-1.5 rounded-lg border-border bg-secondary px-2.5">
                    <SelectValue>{columnName}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map((column) => (
                      <SelectItem key={column.id} value={column.id}>
                        {column.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex w-32 shrink-0 items-center gap-2 text-sm text-muted-foreground">
                  <Flag className="size-3.5" />
                  Priority
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2.5 text-muted-foreground"
                      />
                    }
                  >
                    {priority
                      ? PRIORITY_OPTIONS.find((p) => p.value === priority)
                          ?.label
                      : "+ Set priority"}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {PRIORITY_OPTIONS.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setPriority(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem onClick={() => setPriority(null)}>
                      Clear
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex w-32 shrink-0 items-center gap-2 text-sm text-muted-foreground">
                  <Tag className="size-3.5" />
                  Labels
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2.5 text-muted-foreground"
                      />
                    }
                  >
                    {tag ?? "+ Add label"}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {TASK_TAGS.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => setTag(option)}
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem onClick={() => setTag(undefined)}>
                      Clear
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="py-2">
              <Separator />
            </div>

            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add a description..."
              className="min-h-[100px] resize-none border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </div>

          <DialogFooter className="mx-0 mb-0 flex-row items-center justify-between gap-2 rounded-none border-t bg-muted/30 px-4 pb-3 pt-3">
            <Button
              variant="outline"
              className="text-destructive hover:text-destructive"
              onClick={() => setDeleteConfirmOpen(true)}
            >
              Delete
            </Button>
            <Button onClick={handleSave} disabled={!title.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-2">
            <h2 className="text-base font-semibold">Delete this task?</h2>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
            >
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
