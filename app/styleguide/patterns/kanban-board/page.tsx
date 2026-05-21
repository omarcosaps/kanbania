import { KanbanBoard } from "@/components/kanban-board";

import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";

const COLUMNS = [
  {
    title: "Backlog",
    tasks: [
      {
        title: "Update dependencies",
        taskId: "KAN-12",
        tag: "tech-debt",
        priority: "high" as const,
      },
    ],
  },
  {
    title: "Todo",
    tasks: [
      {
        title: "Design onboarding",
        taskId: "KAN-13",
        tag: "design",
        priority: "medium" as const,
      },
      {
        title: "Fix login bug",
        taskId: "KAN-14",
        tag: "bug",
        priority: "high" as const,
      },
    ],
  },
  {
    title: "In Progress",
    tasks: [],
  },
];

export default function KanbanBoardPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Kanban Board"
        description="Layout horizontal scrollável de colunas Kanban."
      />

      <ComponentDemo title="Preview">
        <KanbanBoard columns={COLUMNS} />
      </ComponentDemo>
    </div>
  );
}
