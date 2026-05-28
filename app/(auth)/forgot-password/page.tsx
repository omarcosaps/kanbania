import type { Metadata } from "next";

import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export const metadata: Metadata = {
  title: "Esqueci a senha — KanbanIA",
  description: "Redefina sua senha no KanbanIA",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Esqueceu a senha?"
      subtitle="Informe seu e-mail e enviaremos um link para redefinir sua senha."
      footerText="Lembrou a senha?"
      footerLinkText="Voltar ao login"
      footerHref="/login"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
