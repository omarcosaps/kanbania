import type { Metadata } from "next";

import { AuthLayout } from "@/features/auth/components/auth-layout";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Entrar — KanbanIA",
  description: "Acesse seu workspace no KanbanIA",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Bem-vindo de volta"
      subtitle="Informe seus dados para acessar seu workspace."
      footerText="Não tem uma conta?"
      footerLinkText="Cadastre-se"
      footerHref="/signup"
    >
      <LoginForm />
    </AuthLayout>
  );
}
