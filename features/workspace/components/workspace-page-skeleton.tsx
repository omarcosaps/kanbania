import { Skeleton } from "@/components/ui/skeleton";

import { KanbanBoardSkeleton } from "./kanban-board-skeleton";

export function WorkspacePageSkeleton() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="flex h-12 items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-20" />
          </div>

          <nav className="flex flex-1 items-center gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-28" />
            <Skeleton className="size-7 rounded-md" />
          </nav>

          <Skeleton className="size-7 rounded-full" />
        </div>
      </header>

      <div className="flex items-center justify-between gap-4 border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      <main className="flex-1">
        <KanbanBoardSkeleton />
      </main>
    </div>
  );
}
