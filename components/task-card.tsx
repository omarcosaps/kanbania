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
  tag: string;
  priority?: TaskPriority;
  className?: string;
}

export function TaskCard({
  title,
  taskId,
  tag,
  priority = "high",
  className,
}: TaskCardProps) {
  const { icon: PriorityIcon, className: priorityClassName, label } =
    PRIORITY_CONFIG[priority];

  return (
    <Card
      className={cn(
        "shadow-card w-full max-w-[280px] gap-0 rounded-lg border-secondary py-0 ring-0",
        className
      )}
      size="sm"
    >
      <CardContent className="flex flex-col gap-2 p-3">
        <p className="text-body">{title}</p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="text-caption font-mono text-muted-foreground">
              {taskId}
            </span>
            <PriorityIcon
              className={cn("size-3.5", priorityClassName)}
              aria-label={label}
            />
          </div>
          <Badge variant="secondary" size="tag">
            {tag}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
