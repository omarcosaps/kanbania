import type { Metadata } from "next";

import { AuthLayout } from "@/features/auth/components/auth-layout";
import { SignupForm } from "@/features/auth/components/signup-form";

export const metadata: Metadata = {
  title: "Cadastro — KanbanIA",
  description: "Crie seu workspace no KanbanIA",
};

export default function SignupPage() {
  return (
    <AuthLayout
      title="Crie seu workspace"
      subtitle="Organize seu trabalho com clareza e simplicidade."
      footerText="Já tem uma conta?"
      footerLinkText="Entrar"
      footerHref="/login"
    >
      <SignupForm />
    </AuthLayout>
  );
}
