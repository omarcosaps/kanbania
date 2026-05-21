import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { TokensUsedSection } from "../../_components/component-doc-sections";
import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";

export default function LabelPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Label"
        description="Rótulo de formulário com tipografia text-heading."
      />

      <ComponentDemo title="Com input">
        <div className="flex max-w-sm flex-col gap-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" variant="filled" type="email" />
        </div>
      </ComponentDemo>

      <TokensUsedSection items={["text-heading", "Associar htmlFor ao id do controle"]} />
    </div>
  );
}
