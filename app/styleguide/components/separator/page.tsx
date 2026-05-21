import { Separator } from "@/components/ui/separator";

import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";

export default function SeparatorPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Separator"
        description="Divisor horizontal ou vertical com border-border."
      />

      <ComponentDemo title="Horizontal">
        <div className="flex w-full max-w-md flex-col gap-4">
          <p className="text-body">Seção superior</p>
          <Separator />
          <p className="text-body">Seção inferior</p>
        </div>
      </ComponentDemo>
    </div>
  );
}
