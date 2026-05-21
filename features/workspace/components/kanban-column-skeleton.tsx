import { Skeleton } from "@/components/ui/skeleton";

interface KanbanColumnSkeletonProps {
  cardCount?: number;
}

export function KanbanColumnSkeleton({
  cardCount = 3,
}: KanbanColumnSkeletonProps) {
  return (
    <div className="flex w-[280px] shrink-0 flex-col">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="size-7 rounded-md" />
          <Skeleton className="size-7 rounded-md" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {Array.from({ length: cardCount }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-[72px] w-full rounded-md"
          />
        ))}
      </div>
    </div>
  );
}
