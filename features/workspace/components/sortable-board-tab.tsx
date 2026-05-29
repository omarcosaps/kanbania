"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

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
import type { Board } from "@/features/workspace/types";
import { MoreHorizontal } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface SortableBoardTabProps {
  board: Board;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => Promise<void>;
}

export function SortableBoardTab({
  board,
  isActive,
  onSelect,
  onDelete,
}: SortableBoardTabProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: board.id,
    data: { type: "board-tab", board },
  });

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 150ms ease",
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete();
    setIsDeleting(false);
    setDeleteOpen(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "group relative inline-flex h-12 shrink-0 items-center",
          isDragging && "z-10 opacity-60"
        )}
      >
        <button
          type="button"
          onClick={onSelect}
          className={cn(
            "relative inline-flex h-12 items-center px-3 text-sm font-medium transition-colors",
            isActive
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
          {...attributes}
          {...listeners}
        >
          {board.name}
          {isActive ? (
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
          ) : null}
        </button>

        {isActive ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="mr-1 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 data-popup-open:opacity-100"
                  aria-label={`${board.name} options`}
                  onPointerDown={(event) => event.stopPropagation()}
                />
              }
            >
              <MoreHorizontal className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDeleteOpen(true)}
              >
                Delete board
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-2">
            <h2 className="text-base font-semibold">Delete this board?</h2>
            <p className="text-sm text-muted-foreground">
              &ldquo;{board.name}&rdquo; and all of its columns and tasks will
              be permanently removed.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => void handleDelete()}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
