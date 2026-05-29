"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { BoardHeader } from "@/features/workspace/components/board-header";
import { KanbanBoard } from "@/features/workspace/components/kanban-board";
import { WorkspaceEmptyState } from "@/features/workspace/components/workspace-empty-state";
import { WorkspaceNav } from "@/features/workspace/components/workspace-nav";
import { useWorkspace } from "@/features/workspace/store";

export function WorkspacePageContent() {
  const params = useParams<{ boardId: string }>();
  const boardId = params.boardId;
  const { state, activeBoard, getBoardColumns } = useWorkspace();
  const [newTaskColumnId, setNewTaskColumnId] = useState<string | null>(null);
  const [createBoardOpen, setCreateBoardOpen] = useState(false);

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
        <WorkspaceNav
          createBoardOpen={createBoardOpen}
          onCreateBoardOpenChange={setCreateBoardOpen}
        />
        <main className="flex flex-1 flex-col">
          {hasOtherBoards ? null : (
            <WorkspaceEmptyState onCreateBoard={() => setCreateBoardOpen(true)} />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      <WorkspaceNav
        createBoardOpen={createBoardOpen}
        onCreateBoardOpenChange={setCreateBoardOpen}
      />
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
