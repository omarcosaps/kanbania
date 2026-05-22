import { ColumnHeader } from "@/components/column-header";
import { TaskCard, type TaskCardProps } from "@/components/task-card";
import { cn } from "@/lib/utils";

export interface KanbanColumnProps {
  title: string;
  tasks: TaskCardProps[];
  onAddTask?: () => void;
  onMore?: () => void;
  className?: string;
}

export function KanbanColumn({
  title,
  tasks,
  onAddTask,
  onMore,
  className,
}: KanbanColumnProps) {
  return (
    <section
      className={cn(
        "flex w-72 shrink-0 flex-col gap-3",
        className
      )}
      aria-label={`Coluna ${title}`}
    >
      <ColumnHeader
        title={title}
        count={tasks.length}
        onAddTask={onAddTask}
        onMore={onMore}
      />
      <ul className="flex flex-col gap-3">
        {tasks.map((task) => (
          <li key={task.taskId}>
            <TaskCard {...task} />
          </li>
        ))}
      </ul>
    </section>
  );
}
