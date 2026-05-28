import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { getCurrentUser } from "@/features/auth/services/actions";

export const metadata: Metadata = {
  title: "Redefinir senha — KanbanIA",
  description: "Defina uma nova senha para sua conta",
};

export default async function ResetPasswordPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/forgot-password");
  }

  return (
    <AuthLayout
      title="Defina uma nova senha"
      subtitle="Escolha uma senha segura com pelo menos 8 caracteres."
      footerText="Precisa de ajuda?"
      footerLinkText="Solicitar novo link"
      footerHref="/forgot-password"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
