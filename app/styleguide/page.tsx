import { ColorScale } from "./_components/color-scale";
import { FoundationLinks } from "./_components/foundation-links";
import { ComponentsIndex } from "./_components/components-index";
import { FigmaVariablesGrid } from "./_components/figma-variables-grid";
import { RadiusDemo } from "./_components/radius-demo";
import { Section } from "./_components/section";
import { ShadowDemo } from "./_components/shadow-demo";
import { ThemeToggle } from "./_components/theme-toggle";
import { TokenSwatch } from "./_components/token-swatch";
import { TypographySample } from "./_components/typography-sample";
import { FIGMA_VARIABLES } from "./figma-tokens";

const SEMANTIC_TOKENS = [
  {
    name: "Background",
    variable: "--background",
    className: "bg-background",
    figmaName: "Background",
    hex: FIGMA_VARIABLES.Background,
  },
  {
    name: "Foreground",
    variable: "--foreground",
    className: "bg-foreground",
    figmaName: "Foreground",
    hex: FIGMA_VARIABLES.Foreground,
  },
  {
    name: "Card / Surface",
    variable: "--card",
    className: "bg-card",
    figmaName: "Surface",
    hex: FIGMA_VARIABLES.Surface,
  },
  {
    name: "Primary",
    variable: "--primary",
    className: "bg-primary",
    figmaName: "Primary",
    hex: FIGMA_VARIABLES.Primary,
  },
  {
    name: "Primary Foreground",
    variable: "--primary-foreground",
    className: "bg-primary-foreground",
    hex: "#ffffff",
  },
  {
    name: "Secondary",
    variable: "--secondary",
    className: "bg-secondary",
    figmaName: "Secondary",
    hex: FIGMA_VARIABLES.Secondary,
  },
  {
    name: "Muted Foreground",
    variable: "--muted-foreground",
    className: "bg-muted-foreground",
    figmaName: "Muted Foreground",
    hex: FIGMA_VARIABLES["Muted Foreground"],
  },
  {
    name: "Border",
    variable: "--border",
    className: "bg-border",
    figmaName: "Border",
    hex: FIGMA_VARIABLES.Border,
  },
  {
    name: "Secondary Foreground",
    variable: "--secondary-foreground",
    className: "bg-secondary-foreground",
    figmaName: "Secondary Foreground",
    hex: FIGMA_VARIABLES["Secondary Foreground"],
  },
] as const;

const PRIORITY_TOKENS = [
  {
    name: "Alta",
    variable: "--priority-high",
    className: "bg-priority-high",
    figmaName: "Priority High",
    hex: FIGMA_VARIABLES["Priority High"],
  },
  {
    name: "Média",
    variable: "--priority-med",
    className: "bg-priority-med",
    figmaName: "Priority Med",
    hex: FIGMA_VARIABLES["Priority Med"],
  },
  {
    name: "Baixa",
    variable: "--priority-low",
    className: "bg-priority-low",
    figmaName: "Primary",
    hex: FIGMA_VARIABLES.Primary,
  },
] as const;

export default function StyleguidePage() {
  return (
    <div className="p-8 md:p-12">
      <header className="mb-10 flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Design System</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Styleguide sincronizado com o arquivo Figma{" "}
            <span className="font-medium text-foreground">KanbanIA</span> — acento
            indigo{" "}
            <span className="font-mono text-foreground">
              {FIGMA_VARIABLES.Primary}
            </span>
            , fonte Inter e neutros zinc.
          </p>
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Primary (Figma)</dt>
              <dd className="font-medium">{FIGMA_VARIABLES.Primary} — Indigo 600</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Border radius</dt>
              <dd className="font-medium">8px cards/tags · 4px badges</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Font</dt>
              <dd className="font-medium">Inter</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Fonte</dt>
              <dd className="font-medium">Figma node 8001:9301</dd>
            </div>
          </dl>
        </div>
        <ThemeToggle />
      </header>

      <FoundationLinks />

      <Section
        title="Variáveis Figma"
        description="Tokens exportados via Figma MCP (get_variable_defs) do frame Workspace."
      >
        <FigmaVariablesGrid />
      </Section>

      <Section
        title="Cores semânticas"
        description="Mapeamento Figma → variáveis CSS do projeto."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SEMANTIC_TOKENS.map((token) => (
            <TokenSwatch key={token.variable} {...token} />
          ))}
        </div>
      </Section>

      <Section
        title="Escala Primary"
        description="Indigo — Primary Figma em --primary-600 (#4f46e5)."
      >
        <ColorScale prefix="primary" title="Primary (Indigo)" />
      </Section>

      <Section title="Escala Gray" description="Zinc — neutros do Figma.">
        <ColorScale prefix="gray" title="Gray (Zinc)" />
      </Section>

      <Section
        title="Prioridade"
        description="Priority High / Priority Med do Figma; baixa usa Primary."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PRIORITY_TOKENS.map((token) => (
            <div key={token.variable} className="flex flex-col gap-2">
              <TokenSwatch
                name={token.name}
                variable={token.variable}
                className={token.className}
                figmaName={token.figmaName}
                hex={token.hex}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Tipografia"
        description="Inter — tamanhos extraídos do design context Figma."
      >
        <TypographySample />
      </Section>

      <Section title="Border radius" description="--radius: 0.5rem (8px) no Figma.">
        <RadiusDemo />
      </Section>

      <Section title="Sombras" description="Overlay+Shadow dos cards de tarefa.">
        <ShadowDemo />
      </Section>

      <Section
        title="Componentes"
        description="Documentação detalhada de cada componente do design system."
      >
        <ComponentsIndex />
      </Section>
    </div>
  );
}
