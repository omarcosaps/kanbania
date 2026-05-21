"use client";

import { Flag, Tag } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { TaskPriority } from "@/features/workspace/types";
import { TASK_TAGS } from "@/features/workspace/types";
import { cn } from "@/lib/utils";

interface TaskCardInlineProps {
  onSave: (data: {
    title: string;
    tag?: string;
    priority?: TaskPriority;
  }) => void | Promise<void>;
  onCancel: () => void;
  className?: string;
}

const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export function TaskCardInline({
  onSave,
  onCancel,
  className,
}: TaskCardInlineProps) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState<string | undefined>();
  const [priority, setPriority] = useState<TaskPriority>(null);

  useEffect(() => {
    const input = document.getElementById("inline-task-title");
    input?.focus();
  }, []);

  const handleSave = async () => {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }
    await onSave({ title: trimmed, tag, priority: priority ?? undefined });
  };

  return (
    <Card
      className={cn(
        "w-full max-w-[280px] gap-0 rounded-md border-secondary py-0 shadow-card ring-0",
        className
      )}
      size="sm"
    >
      <CardContent className="flex flex-col gap-2 p-2">
        <div className="rounded-md border border-secondary bg-secondary px-2 py-1.5">
          <Input
            id="inline-task-title"
            placeholder="Task title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSave();
              }
              if (event.key === "Escape") {
                onCancel();
              }
            }}
            className="h-auto border-0 bg-transparent px-0 py-0 text-sm shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground"
                    aria-label="Add tag"
                  />
                }
              >
                <Tag className="size-3.5" />
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
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground"
                    aria-label="Set priority"
                  />
                }
              >
                <Flag className="size-3.5" />
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="xs" onClick={onCancel}>
              Cancel
            </Button>
            <Button size="xs" onClick={handleSave} disabled={!title.trim()}>
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
