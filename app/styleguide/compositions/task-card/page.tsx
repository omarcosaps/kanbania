import { TaskCard } from "@/components/task-card";

import {
  AntiPatternsSection,
  TokensUsedSection,
} from "../../_components/component-doc-sections";
import { CodeExample } from "../../_components/code-example";
import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";
import { Section } from "../../_components/section";

const IMPORT_CODE = `import { TaskCard } from "@/components/task-card"

<TaskCard
  title="Update dependencies to latest versions"
  taskId="KAN-12"
  tag="tech-debt"
  priority="high"
/>`;

export default function TaskCardPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Task Card"
        description="Card de tarefa do board Kanban. Compõe Card, Badge size tag e ícones de prioridade."
      />

      <ComponentDemo title="Padrão">
        <TaskCard
          title="Update dependencies to latest versions"
          taskId="KAN-12"
          tag="tech-debt"
          priority="high"
        />
      </ComponentDemo>

      <ComponentDemo title="Prioridades">
        <div className="flex flex-wrap gap-6">
          <TaskCard title="Design flow" taskId="KAN-13" tag="design" priority="high" />
          <TaskCard title="API refactor" taskId="KAN-15" tag="feature" priority="medium" />
          <TaskCard title="Release docs" taskId="KAN-18" tag="docs" priority="low" />
        </div>
      </ComponentDemo>

      <Section title="Uso">
        <CodeExample code={IMPORT_CODE} />
      </Section>

      <TokensUsedSection
        items={[
          "shadow-card, rounded-lg, border-secondary, p-3",
          "text-body (título), text-caption (taskId)",
          "Badge size=tag, text-priority-*",
        ]}
      />

      <AntiPatternsSection
        items={[
          "Não duplicar estilos de Badge com span",
          "Não usar Card cru no board",
        ]}
      />
    </div>
  );
}
