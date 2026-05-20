import { Badge } from "@/components/ui/badge";

import {
  AntiPatternsSection,
  ProductCompositionSection,
  TokensUsedSection,
} from "../../_components/component-doc-sections";
import { CodeExample } from "../../_components/code-example";
import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";
import { Section } from "../../_components/section";

const BOARD_TAGS = ["design", "tech-debt", "a11y", "feature"] as const;

const IMPORT_CODE = `import { Badge } from "@/components/ui/badge"

<Badge variant="secondary" size="tag">tech-debt</Badge>`;

export default function BadgePage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Badge"
        description="Etiquetas de categoria. Tags de board usam variant secondary + size tag (tokens --text-tag-*, --spacing-tag-*)."
      />

      <ComponentDemo title="Variantes (size default)">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </div>
      </ComponentDemo>

      <ComponentDemo
        title="Tags do board"
        description='Contrato oficial: variant="secondary" size="tag". Mesma API usada em TaskCard.'
      >
        <div className="flex flex-wrap gap-2">
          {BOARD_TAGS.map((tag) => (
            <Badge key={tag} variant="secondary" size="tag">
              {tag}
            </Badge>
          ))}
        </div>
      </ComponentDemo>

      <Section title="Uso">
        <CodeExample code={IMPORT_CODE} />
      </Section>

      <TokensUsedSection
        items={[
          "Cores: bg-secondary, text-secondary-foreground",
          "Tipografia: text-tag (--text-tag-size, --text-tag-leading)",
          "Espaçamento: --spacing-tag-x, --spacing-tag-y",
          "Radius: rounded-md (--radius-md) no size tag",
        ]}
      />

      <ProductCompositionSection description='TaskCard renderiza a categoria com Badge variant="secondary" size="tag". Não duplique estilos com <span>.' />

      <AntiPatternsSection
        items={[
          "Não usar <span> com bg-secondary e text-[10px] para tags de board",
          "Não usar Badge size default para tags de coluna Kanban",
          "Não copiar classes do output do Figma MCP",
        ]}
      />

      <Section title="Acessibilidade">
        <p className="text-sm text-muted-foreground">
          Badges informativos devem estar próximos ao conteúdo que rotulam. Para tags
          no card, o contexto do título da tarefa já comunica o significado.
        </p>
      </Section>
    </div>
  );
}
