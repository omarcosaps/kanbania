"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/layout/logo";
import { UserMenu } from "@/features/auth/components/user-menu";
import { Button } from "@/components/ui/button";
import { CreateBoardDialog } from "@/features/workspace/components/create-board-dialog";
import { SortableBoardTab } from "@/features/workspace/components/sortable-board-tab";
import { useUrlBoardId } from "@/features/workspace/hooks/use-url-board-id";
import { useWorkspace } from "@/features/workspace/store";
import { Plus } from "@/lib/icons";

interface WorkspaceNavProps {
  createBoardOpen?: boolean;
  onCreateBoardOpenChange?: (open: boolean) => void;
}

export function WorkspaceNav({
  createBoardOpen: controlledOpen,
  onCreateBoardOpenChange,
}: WorkspaceNavProps) {
  const router = useRouter();
  const urlBoardId = useUrlBoardId();
  const { state, deleteBoard, reorderBoards } = useWorkspace();
  const [internalOpen, setInternalOpen] = useState(false);
  const newBoardOpen = controlledOpen ?? internalOpen;

  const setNewBoardOpen = (open: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(open);
    }
    onCreateBoardOpenChange?.(open);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  useEffect(() => {
    if (state.boardOrder.length === 0) {
      setNewBoardOpen(true);
    }
  }, [state.boardOrder.length]);

  const openCreateDialog = () => {
    setNewBoardOpen(true);
  };

  const handleBoardChange = (boardId: string) => {
    if (boardId !== urlBoardId) {
      router.push(`/workspace/${boardId}`);
    }
  };

  const handleBoardCreated = (boardId: string) => {
    router.push(`/workspace/${boardId}`);
    router.refresh();
  };

  const handleDeleteBoard = async (boardId: string) => {
    const nextBoardId = await deleteBoard(boardId);
    if (nextBoardId) {
      router.push(`/workspace/${nextBoardId}`);
    } else {
      router.push("/workspace");
    }
    router.refresh();
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = state.boardOrder.indexOf(String(active.id));
    const newIndex = state.boardOrder.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const nextOrder = arrayMove(state.boardOrder, oldIndex, newIndex);
    void reorderBoards({ boardIds: nextOrder });
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={state.boardOrder}
                strategy={horizontalListSortingStrategy}
              >
                <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {state.boardOrder.map((boardId) => {
                    const board = state.boards[boardId];
                    if (!board) {
                      return null;
                    }

                    return (
                      <SortableBoardTab
                        key={boardId}
                        board={board}
                        isActive={boardId === urlBoardId}
                        onSelect={() => handleBoardChange(boardId)}
                        onDelete={() => handleDeleteBoard(boardId)}
                      />
                    );
                  })}

                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="shrink-0 text-muted-foreground"
                    onClick={openCreateDialog}
                    aria-label="Add board"
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </SortableContext>
            </DndContext>
          </nav>

          <div className="shrink-0">
            <UserMenu />
          </div>
        </div>
      </header>

      <CreateBoardDialog
        open={newBoardOpen}
        onOpenChange={setNewBoardOpen}
        onCreated={handleBoardCreated}
      />
    </>
  );
}
