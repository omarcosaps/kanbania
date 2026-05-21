import { WorkspaceTabs } from "@/components/workspace-tabs";

import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";

const TABS = [
  { id: "roadmap", label: "Roadmap Q3" },
  { id: "sprint", label: "Sprint 24" },
  { id: "archive", label: "Archive" },
];

export default function WorkspaceTabsPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Workspace Tabs"
        description="Abas do workspace com variant line e indicador primary."
      />

      <ComponentDemo title="Padrão">
        <WorkspaceTabs tabs={TABS} defaultValue="roadmap" />
      </ComponentDemo>
    </div>
  );
}
