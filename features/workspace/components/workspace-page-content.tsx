"use client";

import { useState } from "react";

import { BoardHeader } from "@/features/workspace/components/board-header";
import { KanbanBoard } from "@/features/workspace/components/kanban-board";
import { WorkspaceNav } from "@/features/workspace/components/workspace-nav";
import { useWorkspace } from "@/features/workspace/store";

export function WorkspacePageContent() {
  const { activeBoard, getBoardColumns } = useWorkspace();
  const [newTaskColumnId, setNewTaskColumnId] = useState<string | null>(null);

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
