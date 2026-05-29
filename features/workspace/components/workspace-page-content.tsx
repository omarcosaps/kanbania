"use client";

import { useEffect, useState } from "react";

import { BoardHeader } from "@/features/workspace/components/board-header";
import { KanbanBoard } from "@/features/workspace/components/kanban-board";
import { WorkspaceEmptyState } from "@/features/workspace/components/workspace-empty-state";
import { WorkspaceNav } from "@/features/workspace/components/workspace-nav";
import { useUrlBoardId } from "@/features/workspace/hooks/use-url-board-id";
import { useWorkspace } from "@/features/workspace/store";

export function WorkspacePageContent() {
  const boardId = useUrlBoardId();
  const { state, getBoardColumns } = useWorkspace();
  const [newTaskColumnId, setNewTaskColumnId] = useState<string | null>(null);
  const [createBoardOpen, setCreateBoardOpen] = useState(false);

  useEffect(() => {
    setNewTaskColumnId(null);
  }, [boardId]);

  if (!boardId) {
    return null;
  }

  const boardExists = Boolean(state.boards[boardId]);

  const handleNewTask = () => {
    const columns = getBoardColumns(boardId);
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
      <BoardHeader boardId={boardId} onNewTask={handleNewTask} />
      <main className="flex flex-1 flex-col">
        <KanbanBoard
          key={boardId}
          boardId={boardId}
          newTaskColumnId={newTaskColumnId}
          onNewTaskColumnChange={setNewTaskColumnId}
        />
      </main>
    </div>
  );
}
