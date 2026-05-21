import { Skeleton } from "@/components/ui/skeleton";

import { KanbanColumnSkeleton } from "./kanban-column-skeleton";

export function KanbanBoardSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto px-6 pt-8 pb-8">
      <KanbanColumnSkeleton cardCount={2} />
      <KanbanColumnSkeleton cardCount={3} />
      <KanbanColumnSkeleton cardCount={1} />
      <KanbanColumnSkeleton cardCount={2} />

      <Skeleton className="h-[120px] w-[280px] shrink-0 rounded-lg" />
    </div>
  );
}
