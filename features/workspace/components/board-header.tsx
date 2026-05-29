"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/features/workspace/store";
import { Plus } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface BoardHeaderProps {
  onNewTask: () => void;
}

export function BoardHeader({ onNewTask }: BoardHeaderProps) {
  const { activeBoard, renameBoard } = useWorkspace();
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeBoard) {
      setDraftName(activeBoard.name);
    }
  }, [activeBoard]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  if (!activeBoard) {
    return null;
  }

  const saveTitle = async () => {
    const trimmed = draftName.trim();
    if (trimmed && trimmed !== activeBoard.name) {
      await renameBoard(activeBoard.id, trimmed);
    } else {
      setDraftName(activeBoard.name);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraftName(activeBoard.name);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-border bg-card px-6 py-4">
      <div className="flex items-center gap-3">
        {isEditing ? (
          <Input
            ref={inputRef}
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            onBlur={saveTitle}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                saveTitle();
              }
              if (event.key === "Escape") {
                cancelEdit();
              }
            }}
            className={cn(
              "h-auto w-auto min-w-[120px] max-w-[320px] border-0 bg-transparent px-0 py-0",
              "text-xl font-semibold tracking-tight shadow-none focus-visible:ring-0"
            )}
            aria-label="Board name"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-left text-xl font-semibold tracking-tight transition-colors hover:text-foreground/80"
          >
            {activeBoard.name}
          </button>
        )}
      </div>

      <Button size="sm" className="gap-1.5" onClick={onNewTask}>
        <Plus className="size-3.5" />
        New Task
      </Button>
    </div>
  );
}
