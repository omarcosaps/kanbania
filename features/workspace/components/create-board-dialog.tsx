"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/features/workspace/store";

interface CreateBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (boardId: string) => void;
}

export function CreateBoardDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateBoardDialogProps) {
  const { createBoard } = useWorkspace();
  const [boardName, setBoardName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!open) {
      setBoardName("");
      setIsCreating(false);
    }
  }, [open]);

  const handleCreate = async () => {
    const name = boardName.trim();
    if (!name || isCreating) {
      return;
    }

    setIsCreating(true);
    const boardId = await createBoard(name);
    setIsCreating(false);

    if (!boardId) {
      return;
    }

    setBoardName("");
    onOpenChange(false);
    onCreated?.(boardId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new board</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Board name"
          value={boardName}
          onChange={(event) => setBoardName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void handleCreate();
            }
          }}
          autoFocus
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => void handleCreate()}
            disabled={!boardName.trim() || isCreating}
          >
            {isCreating ? "Creating…" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
