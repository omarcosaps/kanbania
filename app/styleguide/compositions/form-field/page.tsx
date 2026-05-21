import { FormField, PasswordField } from "@/components/form-field";
import { Input } from "@/components/ui/input";

import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";

export default function FormFieldPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Form Field"
        description="Label + controle + mensagem de erro. PasswordField inclui toggle de visibilidade."
      />

      <ComponentDemo title="Campo de texto">
        <div className="max-w-sm">
          <FormField id="name-demo" label="Name">
            <Input variant="filled" placeholder="Your name" />
          </FormField>
        </div>
      </ComponentDemo>

      <ComponentDemo title="Senha">
        <div className="max-w-sm">
          <PasswordField id="password-demo" label="Password" />
        </div>
      </ComponentDemo>
    </div>
  );
}
