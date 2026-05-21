import { BoardToolbar } from "@/components/board-toolbar";

import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";

export default function BoardToolbarPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Board Toolbar"
        description="Título do board (text-display) e CTA New Task."
      />

      <ComponentDemo title="Padrão">
        <BoardToolbar title="Roadmap Q3" />
      </ComponentDemo>
    </div>
  );
}
