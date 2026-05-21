import { TaskEditor } from "@/components/task-editor";
import { Textarea } from "@/components/ui/textarea";

import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";

export default function TextareaPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Textarea"
        description="Área de texto multilinha; usada no TaskEditor inline."
      />

      <ComponentDemo title="Padrão">
        <Textarea placeholder="Task title..." className="max-w-sm" />
      </ComponentDemo>

      <ComponentDemo title="Task Editor (composição)">
        <TaskEditor className="max-w-sm" />
      </ComponentDemo>
    </div>
  );
}
