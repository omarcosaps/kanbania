"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "@/lib/icons";

interface WorkspaceEmptyStateProps {
  onCreateBoard: () => void;
}

const GHOST_TABS = ["Board 1", "Board 2", "Board 3"] as const;

export function WorkspaceEmptyState({ onCreateBoard }: WorkspaceEmptyStateProps) {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-50"
        aria-hidden
      >
        <div className="flex items-end gap-6 border-b border-border/60 pb-3">
          {GHOST_TABS.map((label, index) => (
            <div
              key={label}
              className={`h-3 rounded bg-muted/40 ${index === 0 ? "w-20" : "w-16"}`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <h2 className="text-lg font-semibold tracking-tight">No boards yet</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Create your first board to start organizing tasks in columns and
          tracking your progress.
        </p>
        <Button size="sm" className="gap-1.5" onClick={onCreateBoard}>
          <Plus className="size-3.5" />
          New Board
        </Button>
      </div>
    </div>
  );
}
