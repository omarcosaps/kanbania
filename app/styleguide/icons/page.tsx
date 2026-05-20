import { Icon } from "@/components/icon";
import {
  getIconsByGroup,
  ICON_GROUPS,
  LayoutGrid,
  Lock,
  Plus,
  User,
} from "@/lib/icons";

import { CodeExample } from "../_components/code-example";
import { ComponentPageHeader } from "../_components/component-page-header";
import { IconGridItem } from "../_components/icon-grid-item";
import { Section } from "../_components/section";

const LAYOUT_IMPORT_CODE = `import { Plus, Lock, LayoutGrid, User } from "@/lib/icons"
import { Icon } from "@/components/icon"

// Ícone decorativo no botão
<Button>
  <Icon icon={Plus} size="md" />
  New Task
</Button>`;

export default function IconsPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Icons"
        description="Catálogo Lucide centralizado para o layout Kanban. Tamanhos xs (12px), sm (14px) e md (16px) alinhados ao Figma. Importe de @/lib/icons no Prompt 3."
      />

      <Section
        title="Uso no layout"
        description="Exemplo estático do header — ícones do catálogo."
      >
        <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-muted/30 p-6">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Icon icon={Plus} size="sm" className="text-foreground" />
            <span className="text-muted-foreground">Workspace</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-secondary px-2 py-1 text-xs text-muted-foreground">
            <Icon icon={Lock} size="xs" />
            Private
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-secondary bg-card px-2 py-1.5 text-xs text-muted-foreground shadow-[var(--shadow-card)]">
            <Icon icon={LayoutGrid} size="sm" />
            View
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
            <Icon icon={Plus} size="md" className="text-primary-foreground" />
            New Task
          </div>
          <div className="flex size-8 items-center justify-center rounded-full bg-secondary">
            <Icon icon={User} size="sm" className="text-muted-foreground" />
          </div>
        </div>
        <div className="mt-4">
          <CodeExample code={LAYOUT_IMPORT_CODE} />
        </div>
      </Section>

      {ICON_GROUPS.map((group) => (
        <Section
          key={group.id}
          title={group.title}
          description={group.description}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getIconsByGroup(group.id).map((entry) => (
              <IconGridItem key={entry.id} entry={entry} />
            ))}
          </div>
        </Section>
      ))}

      <Section title="Tamanhos" description="Mapa ICON_SIZES em lib/icons.ts">
        <dl className="grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-mono font-medium">xs</dt>
            <dd className="text-muted-foreground">12px · size-3</dd>
          </div>
          <div>
            <dt className="font-mono font-medium">sm</dt>
            <dd className="text-muted-foreground">14px · size-3.5 (padrão board)</dd>
          </div>
          <div>
            <dt className="font-mono font-medium">md</dt>
            <dd className="text-muted-foreground">16px · size-4 (CTAs)</dd>
          </div>
        </dl>
      </Section>

      <Section title="Acessibilidade">
        <p className="text-sm text-muted-foreground">
          Ícones puramente decorativos devem usar{" "}
          <code className="text-foreground">aria-hidden</code> (padrão do componente{" "}
          <code className="text-foreground">Icon</code>). Botões e links com apenas ícone
          precisam de <code className="text-foreground">aria-label</code> no elemento
          interativo pai. Prioridade na task card: o significado fica no{" "}
          <code className="text-foreground">aria-label</code> do ícone ou do card.
        </p>
      </Section>
    </div>
  );
}
