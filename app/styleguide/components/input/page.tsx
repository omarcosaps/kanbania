import { FormField } from "@/components/form-field";
import { Input } from "@/components/ui/input";

import {
  AntiPatternsSection,
  TokensUsedSection,
} from "../../_components/component-doc-sections";
import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";
import { Section } from "../../_components/section";

export default function InputPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Input"
        description="Campo de texto com variantes default (borda) e filled (superfície --surface-input)."
      />

      <ComponentDemo title="Variantes">
        <div className="flex max-w-sm flex-col gap-4">
          <FormField id="default" label="Default">
            <Input placeholder="Placeholder" />
          </FormField>
          <FormField id="filled" label="Filled">
            <Input variant="filled" placeholder="Placeholder" />
          </FormField>
        </div>
      </ComponentDemo>

      <TokensUsedSection
        items={[
          "text-body, rounded-md, transition-interactive",
          "filled: bg-surface-input (--surface-input)",
          "focus: ring-ring/50",
        ]}
      />

      <AntiPatternsSection
        items={[
          "Não usar bg-gray-100 ou hex em campos",
          "Auth: preferir variant filled via FormField",
        ]}
      />
    </div>
  );
}
