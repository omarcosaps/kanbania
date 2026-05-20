"use client";

import { ArrowDown, ArrowUp, Minus } from "@/lib/icons";
import { useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { CodeExample } from "../../_components/code-example";
import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";
import { Section } from "../../_components/section";

const IMPORT_CODE = `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="medium">
  <label className="flex items-center gap-2">
    <RadioGroupItem value="high" />
    Alta
  </label>
</RadioGroup>`;

const PRIORITIES = [
  { value: "high", label: "Alta", icon: ArrowUp, color: "text-priority-high" },
  { value: "medium", label: "Média", icon: Minus, color: "text-priority-med" },
  { value: "low", label: "Baixa", icon: ArrowDown, color: "text-priority-low" },
] as const;

export default function RadioGroupPage() {
  const [priority, setPriority] = useState<string>("medium");

  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Radio Group"
        description="Seleção única de prioridade ao criar ou editar tarefas. Cores mapeadas para --priority-high, --priority-med e --priority-low."
      />

      <ComponentDemo
        title="Prioridade da tarefa"
        description={`Selecionado: ${priority}`}
      >
        <RadioGroup
          value={priority}
          onValueChange={setPriority}
          className="max-w-xs"
          aria-label="Prioridade da tarefa"
        >
          {PRIORITIES.map(({ value, label, icon: Icon, color }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <RadioGroupItem value={value} />
              <Icon className={`size-4 ${color}`} aria-hidden />
              {label}
            </label>
          ))}
        </RadioGroup>
      </ComponentDemo>

      <Section title="Uso">
        <CodeExample code={IMPORT_CODE} />
      </Section>

      <Section title="Acessibilidade">
        <p className="text-sm text-muted-foreground">
          Agrupe opções com <code className="text-foreground">aria-label</code> no{" "}
          <code className="text-foreground">RadioGroup</code>. Cada opção usa{" "}
          <code className="text-foreground">&lt;label&gt;</code> associado ao item para
          clique e foco por teclado (setas no grupo, conforme Base UI).
        </p>
      </Section>
    </div>
  );
}
