import { AuthForm, AuthHeader } from "@/components/auth-form";

import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";

export default function AuthFormPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Auth Form"
        description="Formulário de criação de workspace com AuthCard, FormField e PasswordField."
      />

      <ComponentDemo title="Completo">
        <div className="mx-auto flex w-full max-w-md flex-col gap-8">
          <AuthHeader />
          <AuthForm />
        </div>
      </ComponentDemo>
    </div>
  );
}
