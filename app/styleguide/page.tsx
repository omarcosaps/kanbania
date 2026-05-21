import { ColorScale } from "./_components/color-scale";
import { ComponentsIndex } from "./_components/components-index";
import { FoundationLinks } from "./_components/foundation-links";
import { InteractiveStatesDemo } from "./_components/interactive-states-demo";
import { MotionDemo } from "./_components/motion-demo";
import { RadiusDemo } from "./_components/radius-demo";
import { Section } from "./_components/section";
import { ShadowDemo } from "./_components/shadow-demo";
import { SpacingDemo } from "./_components/spacing-demo";
import { ThemeToggle } from "./_components/theme-toggle";
import { TokenSwatch } from "./_components/token-swatch";
import { TypeScaleDemo } from "./_components/type-scale-demo";
import { TypographySample } from "./_components/typography-sample";

const SEMANTIC_TOKENS = [
  {
    name: "Background",
    variable: "--background",
    className: "bg-background",
  },
  {
    name: "Foreground",
    variable: "--foreground",
    className: "bg-foreground",
  },
  {
    name: "Card / Surface",
    variable: "--card",
    className: "bg-card",
  },
  {
    name: "Primary",
    variable: "--primary",
    className: "bg-primary",
  },
  {
    name: "Primary Foreground",
    variable: "--primary-foreground",
    className: "bg-primary-foreground",
  },
  {
    name: "Secondary",
    variable: "--secondary",
    className: "bg-secondary",
  },
  {
    name: "Muted Foreground",
    variable: "--muted-foreground",
    className: "bg-muted-foreground",
  },
  {
    name: "Border",
    variable: "--border",
    className: "bg-border",
  },
  {
    name: "Secondary Foreground",
    variable: "--secondary-foreground",
    className: "bg-secondary-foreground",
  },
  {
    name: "Priority High",
    variable: "--priority-high",
    className: "bg-priority-high",
  },
  {
    name: "Priority Med",
    variable: "--priority-med",
    className: "bg-priority-med",
  },
  {
    name: "Priority Low",
    variable: "--priority-low",
    className: "bg-priority-low",
  },
] as const;

export default function StyleguidePage() {
  return (
    <div className="p-8 md:p-12">
      <header className="mb-10 flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Design Tokens</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Referência visual dos tokens do Kanbania — acento indigo, fonte Inter
            e neutros zinc para cores, tipografia, radius e sombras.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <FoundationLinks />

      <Section
        title="Cores do tema"
        description="Variáveis CSS usadas na interface do produto."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SEMANTIC_TOKENS.map((token) => (
            <TokenSwatch key={token.variable} {...token} />
          ))}
        </div>
      </Section>

      <Section
        title="Escala Primary"
        description="Escala indigo — o tom principal está em --primary-600."
      >
        <ColorScale prefix="primary" title="Primary (Indigo)" />
      </Section>

      <Section title="Escala Gray" description="Escala zinc para neutros.">
        <ColorScale prefix="gray" title="Gray (Zinc)" />
      </Section>

      <Section
        title="Escala Tailwind"
        description="Inter — escala de 8 tamanhos (12px–36px), mapeada para text-xs até text-4xl."
      >
        <TypeScaleDemo />
      </Section>

      <Section
        title="Roles semânticos"
        description="Utilitários text-display, text-heading, text-body, text-caption, text-tag."
      >
        <TypographySample />
      </Section>

      <Section
        title="Motion"
        description="Durações e easing padrão para estados interativos."
      >
        <MotionDemo />
      </Section>

      <Section
        title="Estados interativos"
        description="Contrato hover, focus, active e disabled (sem tokens por estado)."
      >
        <InteractiveStatesDemo />
      </Section>

      <Section
        title="Spacing scale"
        description="Escala base 4px — tokens --space-N mapeados para utilitários Tailwind (p-N, gap-N, m-N)."
      >
        <SpacingDemo />
      </Section>

      <Section
        title="Border radius"
        description="Escala — sm 4px, md 8px, lg 12px, xl 24px."
      >
        <RadiusDemo />
      </Section>

      <Section
        title="Sombras"
        description="shadow-card (task cards) e shadow-elevated (auth card, modais leves)."
      >
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
