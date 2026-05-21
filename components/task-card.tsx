import { ArrowDown, ArrowUp, Minus } from "@/lib/icons";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type TaskPriority = "high" | "medium" | "low";

const PRIORITY_CONFIG = {
  high: {
    icon: ArrowUp,
    className: "text-priority-high",
    label: "Alta",
  },
  medium: {
    icon: Minus,
    className: "text-priority-med",
    label: "Média",
  },
  low: {
    icon: ArrowDown,
    className: "text-priority-low",
    label: "Baixa",
  },
} as const;

export interface TaskCardProps {
  title: string;
  taskId: string;
  tag?: string;
  priority?: TaskPriority;
  className?: string;
  onClick?: () => void;
}

export function TaskCard({
  title,
  taskId,
  tag,
  priority,
  className,
  onClick,
}: TaskCardProps) {
  const priorityConfig = priority ? PRIORITY_CONFIG[priority] : null;

  return (
    <Card
      className={cn(
        "w-full max-w-[280px] gap-0 rounded-md border-secondary shadow-card ring-0",
        onClick && "cursor-pointer transition-shadow hover:shadow-md",
        className
      )}
      size="sm"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <CardContent className="flex flex-col gap-2">
        <p className="text-sm font-medium leading-snug">{title}</p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">
              {taskId}
            </span>
            {priorityConfig ? (
              <priorityConfig.icon
                className={cn("size-3.5", priorityConfig.className)}
                aria-label={priorityConfig.label}
              />
            ) : null}
          </div>
          {tag ? <Badge variant="secondary">{tag}</Badge> : null}
        </div>
      </CardContent>
    </Card>
  );
}
