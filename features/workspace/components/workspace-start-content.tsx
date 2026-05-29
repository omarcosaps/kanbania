"use client";

import { WorkspaceNav } from "@/features/workspace/components/workspace-nav";

export function WorkspaceStartContent() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <WorkspaceNav />
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="max-w-md space-y-2 text-center">
          <h2 className="text-lg font-semibold tracking-tight">No boards yet</h2>
          <p className="text-sm text-muted-foreground">
            Create your first board to start organizing tasks in columns.
          </p>
        </div>
      </main>
    </div>
  );
}
