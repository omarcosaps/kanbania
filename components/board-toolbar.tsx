import { Plus } from "@/lib/icons";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface BoardToolbarProps {
  title: string;
  onNewTask?: () => void;
  className?: string;
}

export function BoardToolbar({ title, onNewTask, className }: BoardToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <h1 className="text-display">{title}</h1>
      <Button type="button" onClick={onNewTask}>
        <Plus data-icon="inline-start" />
        New Task
      </Button>
    </div>
  );
}
