"use client";

import { useState } from "react";

import { WorkspaceEmptyState } from "@/features/workspace/components/workspace-empty-state";
import { WorkspaceNav } from "@/features/workspace/components/workspace-nav";

export function WorkspaceStartContent() {
  const [createBoardOpen, setCreateBoardOpen] = useState(false);

  return (
    <div className="flex min-h-full flex-col bg-background">
      <WorkspaceNav
        createBoardOpen={createBoardOpen}
        onCreateBoardOpenChange={setCreateBoardOpen}
      />
      <main className="flex flex-1 flex-col">
        <WorkspaceEmptyState onCreateBoard={() => setCreateBoardOpen(true)} />
      </main>
    </div>
  );
}
