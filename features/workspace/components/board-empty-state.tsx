import { Button } from "@/components/ui/button";
import { Plus } from "@/lib/icons";

interface BoardEmptyStateProps {
  onNewTask: () => void;
}

const GHOST_COLUMNS = [
  { cardHeights: ["h-[72px]", "h-[56px]"] },
  { cardHeights: ["h-[64px]"] },
  { cardHeights: ["h-[72px]", "h-[48px]"] },
] as const;

function GhostColumnIllustration({
  cardHeights,
}: {
  cardHeights: readonly string[];
}) {
  return (
    <div className="flex w-[280px] shrink-0 flex-col gap-3 rounded-lg border border-dashed border-border/60 bg-muted/10 p-3">
      <div className="flex items-center gap-2">
        <div className="h-3 w-16 rounded bg-muted/40" />
        <div className="size-3 rounded bg-muted/30" />
      </div>
      <div className="flex flex-col gap-2">
        {cardHeights.map((heightClass, index) => (
          <div
            key={index}
            className={`w-full rounded-md bg-muted/30 ${heightClass}`}
          />
        ))}
      </div>
    </div>
  );
}

export function BoardEmptyState({ onNewTask }: BoardEmptyStateProps) {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-50"
        aria-hidden
      >
        <div className="flex gap-4">
          {GHOST_COLUMNS.map((column, index) => (
            <GhostColumnIllustration
              key={index}
              cardHeights={column.cardHeights}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <h2 className="text-lg font-semibold tracking-tight">
          No tasks on this board yet
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Create your first task to start organizing work in columns and
          tracking your progress.
        </p>
        <Button size="sm" className="gap-1.5" onClick={onNewTask}>
          <Plus className="size-3.5" />
          New Task
        </Button>
      </div>
    </div>
  );
}
