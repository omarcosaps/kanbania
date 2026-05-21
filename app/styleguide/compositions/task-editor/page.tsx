import { TaskEditor } from "@/components/task-editor";

import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";

export default function TaskEditorPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Task Editor"
        description="Card inline para criar tarefa com Textarea e ações Save/Cancel."
      />

      <ComponentDemo title="Padrão">
        <TaskEditor className="max-w-[280px]" />
      </ComponentDemo>
    </div>
  );
}
