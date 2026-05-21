"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BoardHeader } from "@/features/workspace/components/board-header";
import { KanbanBoard } from "@/features/workspace/components/kanban-board";
import { WorkspaceNav } from "@/features/workspace/components/workspace-nav";
import { WorkspacePageSkeleton } from "@/features/workspace/components/workspace-page-skeleton";
import { useWorkspace } from "@/features/workspace/store";

export function WorkspacePageContent() {
  const params = useParams<{ boardId: string }>();
  const boardId = params.boardId;
  const { state, activeBoard, getBoardColumns } = useWorkspace();
  const [newTaskColumnId, setNewTaskColumnId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const boardExists = Boolean(state.boards[boardId]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [boardId]);

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

  if (isLoading) {
    return <WorkspacePageSkeleton />;
  }

  if (!boardExists) {
    return (
      <div className="flex min-h-full flex-col bg-background">
        <WorkspaceNav />
        <main className="flex flex-1 items-center justify-center p-6">
          <Alert variant="destructive" className="max-w-md">
            <AlertTitle>Board not found</AlertTitle>
            <AlertDescription>
              This board does not exist or may have been removed. Select another
              board from the tabs above.
            </AlertDescription>
          </Alert>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      <WorkspaceNav />
      <BoardHeader onNewTask={handleNewTask} />
      <main className="flex-1">
        <KanbanBoard
          newTaskColumnId={newTaskColumnId}
          onNewTaskColumnChange={setNewTaskColumnId}
        />
      </main>
    </div>
  );
}
