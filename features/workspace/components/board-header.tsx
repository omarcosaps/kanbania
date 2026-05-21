"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/features/workspace/store";
import { LayoutGrid, Lock, Plus } from "@/lib/icons";

interface BoardHeaderProps {
  onNewTask: () => void;
}

export function BoardHeader({ onNewTask }: BoardHeaderProps) {
  const { activeBoard } = useWorkspace();

  if (!activeBoard) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b border-border bg-card px-6 py-4">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold tracking-tight">
          {activeBoard.name}
        </h1>
        <Badge variant="secondary" className="gap-1 font-normal">
          <Lock className="size-3" />
          Private
        </Badge>
        <Badge variant="secondary" className="gap-1 font-normal">
          <LayoutGrid className="size-3" />
          View
        </Badge>
      </div>

      <Button size="sm" className="gap-1.5" onClick={onNewTask}>
        <Plus className="size-3.5" />
        New Task
      </Button>
    </div>
  );
}
