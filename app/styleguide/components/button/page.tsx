import { Plus } from "@/lib/icons";

import { Button } from "@/components/ui/button";

import {
  AntiPatternsSection,
  ProductCompositionSection,
  TokensUsedSection,
} from "../../_components/component-doc-sections";
import { CodeExample } from "../../_components/code-example";
import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";
import { Section } from "../../_components/section";

const IMPORT_CODE = `import { Button } from "@/components/ui/button"

<Button variant="default">New Task</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>`;

export default function ButtonPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Button"
        description="Botões shadcn/base-ui com variantes e tamanhos. Primário via token --primary."
      />

      <ComponentDemo title="Variantes">
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </ComponentDemo>

      <ComponentDemo title="Primário com ícone (Figma)" description="Botão New Task do header do projeto.">
        <Button>
          <Plus data-icon="inline-start" />
          New Task
        </Button>
      </ComponentDemo>

      <ComponentDemo title="Tamanhos">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </ComponentDemo>

      <ComponentDemo title="Estado desabilitado">
        <Button disabled>Disabled</Button>
      </ComponentDemo>

      <Section title="Uso">
        <CodeExample code={IMPORT_CODE} />
        <p className="mt-4 text-sm text-muted-foreground">
          Variantes: <code className="text-foreground">default</code>,{" "}
          <code className="text-foreground">secondary</code>,{" "}
          <code className="text-foreground">outline</code>,{" "}
          <code className="text-foreground">ghost</code>,{" "}
          <code className="text-foreground">destructive</code>,{" "}
          <code className="text-foreground">link</code>. Tamanhos:{" "}
          <code className="text-foreground">xs</code>,{" "}
          <code className="text-foreground">sm</code>,{" "}
          <code className="text-foreground">default</code>,{" "}
          <code className="text-foreground">lg</code>,{" "}
          <code className="text-foreground">icon</code>.
        </p>
      </Section>

      <TokensUsedSection
        items={[
          "Cores: bg-primary, bg-secondary, border-border, etc.",
          "Radius: rounded-md (--radius-md) no tamanho default",
          "Foco: ring-ring / border-ring",
        ]}
      />

      <ProductCompositionSection description="Header do board e CTAs de tarefa (ex.: New Task com ícone Plus de @/lib/icons)." />

      <AntiPatternsSection
        items={[
          "Não usar hex literal para cor de botão",
          "Não copiar classes do Figma MCP",
          "Ícones via @/lib/icons, não lucide-react direto",
        ]}
      />

      <Section title="Acessibilidade">
        <p className="text-sm text-muted-foreground">
          Foco visível via <code className="text-foreground">focus-visible:ring-ring</code>.
          Botões desabilitados não recebem interação. Use texto descritivo ou{" "}
          <code className="text-foreground">aria-label</code> em botões apenas com ícone.
        </p>
      </Section>
    </div>
  );
}
