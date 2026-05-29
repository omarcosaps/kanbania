"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { BoardHeader } from "@/features/workspace/components/board-header";
import { KanbanBoard } from "@/features/workspace/components/kanban-board";
import { WorkspaceNav } from "@/features/workspace/components/workspace-nav";
import { useWorkspace } from "@/features/workspace/store";

export function WorkspacePageContent() {
  const params = useParams<{ boardId: string }>();
  const boardId = params.boardId;
  const { state, activeBoard, getBoardColumns } = useWorkspace();
  const [newTaskColumnId, setNewTaskColumnId] = useState<string | null>(null);

  const boardExists = Boolean(state.boards[boardId]);

  const handleNewTask = () => {
    if (!activeBoard) {
      return;
    }
    const columns = getBoardColumns(activeBoard.id);
    const firstColumn = columns[0];
    if (firstColumn) {
      setNewTaskColumnId(firstColumn.id);
    }
  };

  if (!boardExists) {
    const hasOtherBoards = state.boardOrder.length > 0;

    return (
      <div className="flex min-h-full flex-col bg-background">
        <WorkspaceNav />
        <main className="flex flex-1 items-center justify-center p-6">
          {hasOtherBoards ? null : (
            <div className="max-w-md space-y-2 text-center">
              <h2 className="text-lg font-semibold tracking-tight">
                No boards yet
              </h2>
              <p className="text-sm text-muted-foreground">
                Create your first board to start organizing tasks in columns.
              </p>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      <WorkspaceNav />
      <BoardHeader onNewTask={handleNewTask} />
      <main className="flex flex-1 flex-col">
        <KanbanBoard
          newTaskColumnId={newTaskColumnId}
          onNewTaskColumnChange={setNewTaskColumnId}
        />
      </main>
    </div>
  );
}
