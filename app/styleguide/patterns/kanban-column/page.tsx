import { KanbanColumn } from "@/components/kanban-column";

import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";

const TASKS = [
  {
    title: "Update dependencies to latest versions",
    taskId: "KAN-12",
    tag: "tech-debt",
    priority: "high" as const,
  },
  {
    title: "Design new onboarding flow",
    taskId: "KAN-13",
    tag: "design",
    priority: "medium" as const,
  },
];

export default function KanbanColumnPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Kanban Column"
        description="Coluna vertical: ColumnHeader + lista de TaskCards."
      />

      <ComponentDemo title="Backlog">
        <KanbanColumn title="Backlog" tasks={TASKS} />
      </ComponentDemo>
    </div>
  );
}
