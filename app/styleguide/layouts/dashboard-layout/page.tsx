import { DashboardLayout } from "@/components/dashboard-layout";
import { KanbanBoard } from "@/components/kanban-board";

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
    ],
  },
];

export default function DashboardLayoutPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Dashboard Layout"
        description="Shell do board: WorkspaceTabs, BoardToolbar e área de conteúdo."
      />

      <div className="overflow-hidden rounded-xl border border-border">
        <div className="max-h-[560px] overflow-y-auto">
          <DashboardLayout boardTitle="Roadmap Q3">
            <KanbanBoard columns={COLUMNS} />
          </DashboardLayout>
        </div>
      </div>
    </div>
  );
}
