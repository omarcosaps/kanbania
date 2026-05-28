"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/layout/logo";
import { UserMenu } from "@/features/auth/components/user-menu";
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
import { Plus } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function WorkspaceNav() {
  const router = useRouter();
  const { state, activeBoard, setActiveBoard, createBoard } = useWorkspace();
  const [newBoardOpen, setNewBoardOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleBoardChange = (boardId: string) => {
    setActiveBoard(boardId);
    router.push(`/workspace/${boardId}`);
  };

  const handleCreateBoard = async () => {
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
    setNewBoardOpen(false);
    router.push(`/workspace/${boardId}`);
    router.refresh();
  };

  return (
    <>
      <header className="border-b border-border bg-card">
        <div className="flex h-12 items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="text-sm font-medium">Workspace</span>
          </div>

          <nav className="flex min-w-0 flex-1 items-center overflow-hidden">
            <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {state.boardOrder.map((boardId) => {
              const board = state.boards[boardId];
              if (!board) {
                return null;
              }

              const isActive = boardId === activeBoard?.id;

              return (
                <button
                  key={boardId}
                  type="button"
                  onClick={() => handleBoardChange(boardId)}
                  className={cn(
                    "relative inline-flex h-12 items-center px-3 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {board.name}
                  {isActive ? (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
                  ) : null}
                </button>
              );
            })}

            <Button
              variant="ghost"
              size="icon-sm"
              className="shrink-0 text-muted-foreground"
              onClick={() => setNewBoardOpen(true)}
              aria-label="Add board"
            >
              <Plus className="size-4" />
            </Button>
            </div>
          </nav>

          <div className="shrink-0">
            <UserMenu />
          </div>
        </div>
      </header>

      <Dialog open={newBoardOpen} onOpenChange={setNewBoardOpen}>
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
                void handleCreateBoard();
              }
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewBoardOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => void handleCreateBoard()}
              disabled={!boardName.trim() || isCreating}
            >
              {isCreating ? "Creating…" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
