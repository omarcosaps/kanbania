import { MoreHorizontal, Plus } from "@/lib/icons";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ColumnHeaderProps {
  title: string;
  count: number;
  onAddTask?: () => void;
  onMore?: () => void;
  className?: string;
}

export function ColumnHeader({
  title,
  count,
  onAddTask,
  onMore,
  className,
}: ColumnHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 px-1 py-2",
        className
      )}
    >
      <div className="flex min-w-0 items-baseline gap-2">
        <h2 className="text-heading truncate">{title}</h2>
        <span className="text-caption shrink-0 text-muted-foreground">{count}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onAddTask}
          aria-label={`Adicionar tarefa em ${title}`}
        >
          <Plus aria-hidden />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onMore}
          aria-label={`Mais opções para ${title}`}
        >
          <MoreHorizontal aria-hidden />
        </Button>
      </div>
    </div>
  );
}
