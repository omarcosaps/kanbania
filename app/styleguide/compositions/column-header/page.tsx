import { ColumnHeader } from "@/components/column-header";

import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";

export default function ColumnHeaderPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Column Header"
        description="Título da coluna, contador e ações + / ⋯."
      />

      <ComponentDemo title="Backlog">
        <ColumnHeader title="Backlog" count={3} />
      </ComponentDemo>
    </div>
  );
}
