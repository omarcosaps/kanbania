import { Badge } from "@/components/ui/badge";

import { CodeExample } from "../../_components/code-example";
import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";
import { Section } from "../../_components/section";

const BOARD_TAGS = ["design", "tech-debt", "a11y", "feature"] as const;

const IMPORT_CODE = `import { Badge } from "@/components/ui/badge"

<Badge variant="secondary">design</Badge>`;

export default function BadgePage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Badge"
        description="Etiquetas de categoria nas task cards. No Figma, tags usam secondary + texto secondary-foreground em 10px."
      />

      <ComponentDemo title="Variantes">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </div>
      </ComponentDemo>

      <ComponentDemo
        title="Tags do board (Figma)"
        description="variant=&quot;secondary&quot; alinhado ao pill das task cards."
      >
        <div className="flex flex-wrap gap-2">
          {BOARD_TAGS.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </ComponentDemo>

      <Section title="Uso">
        <CodeExample code={IMPORT_CODE} />
      </Section>

      <Section title="Acessibilidade">
        <p className="text-sm text-muted-foreground">
          Badges informativos devem estar próximos ao conteúdo que rotulam. Para tags
          puramente decorativas no card, o contexto do título da tarefa já comunica o
          significado.
        </p>
      </Section>
    </div>
  );
}
