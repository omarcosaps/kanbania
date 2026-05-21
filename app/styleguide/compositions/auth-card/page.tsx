import { AuthCard } from "@/components/auth-card";

import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";

export default function AuthCardPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Auth Card"
        description="Container branco com shadow-elevated e padding generoso para fluxos de auth."
      />

      <ComponentDemo title="Padrão">
        <AuthCard>
          <p className="text-body">Conteúdo do formulário ou mensagem.</p>
        </AuthCard>
      </ComponentDemo>
    </div>
  );
}
