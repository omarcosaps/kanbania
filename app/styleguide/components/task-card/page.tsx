import { TaskCard } from "@/components/task-card";

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
        description="Card de tarefa do board Kanban. Composto sobre shadcn Card + Badge com tokens (borda secondary, shadow-card, prioridades text-priority-*). Referência: Figma node 8001:9418."
      />

      <ComponentDemo title="Padrão" description="Uso típico no quadro Backlog / Todo.">
        <TaskCard
          title="Update dependencies to latest versions"
          taskId="KAN-12"
          tag="tech-debt"
          priority="high"
        />
      </ComponentDemo>

      <ComponentDemo
        title="Prioridades"
        description="high → Priority High · medium → Priority Med · low → Primary."
      >
        <div className="flex flex-wrap gap-6">
          <TaskCard
            title="Design new onboarding flow"
            taskId="KAN-13"
            tag="design"
            priority="high"
          />
          <TaskCard
            title="Refactor API error handling"
            taskId="KAN-15"
            tag="feature"
            priority="medium"
          />
          <TaskCard
            title="Document release checklist"
            taskId="KAN-18"
            tag="docs"
            priority="low"
          />
        </div>
      </ComponentDemo>

      <Section title="Uso" description="Import e props principais.">
        <CodeExample code={IMPORT_CODE} />
        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium">title</dt>
            <dd className="text-muted-foreground">Título da tarefa (string)</dd>
          </div>
          <div>
            <dt className="font-medium">taskId</dt>
            <dd className="text-muted-foreground">ID ex.: KAN-12</dd>
          </div>
          <div>
            <dt className="font-medium">tag</dt>
            <dd className="text-muted-foreground">Categoria ex.: tech-debt</dd>
          </div>
          <div>
            <dt className="font-medium">priority</dt>
            <dd className="text-muted-foreground">
              &quot;high&quot; | &quot;medium&quot; | &quot;low&quot; (default: high)
            </dd>
          </div>
        </dl>
      </Section>

      <Section title="Acessibilidade">
        <p className="text-sm text-muted-foreground">
          O ícone de prioridade inclui <code className="text-foreground">aria-label</code>{" "}
          descritivo (Alta, Média, Baixa). O card é um container estático; ações de
          arrastar ou abrir detalhes serão adicionadas no Prompt 3.
        </p>
      </Section>
    </div>
  );
}
