import { KanbanColumn, type KanbanColumnProps } from "@/components/kanban-column";
import { cn } from "@/lib/utils";

export interface KanbanBoardProps {
  columns: Omit<KanbanColumnProps, "className">[];
  className?: string;
}

export function KanbanBoard({ columns, className }: KanbanBoardProps) {
  return (
    <div
      className={cn(
        "flex gap-6 overflow-x-auto pb-4",
        className
      )}
      role="region"
      aria-label="Quadro Kanban"
    >
      {columns.map((column) => (
        <KanbanColumn key={column.title} {...column} />
      ))}
    </div>
  );
}
