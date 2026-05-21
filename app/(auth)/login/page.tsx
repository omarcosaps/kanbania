import type { Metadata } from "next";

import { AuthLayout } from "@/features/auth/components/auth-layout";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Log in — KanbanIA",
  description: "Access your KanbanIA workspace",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your details to access your workspace."
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerHref="/signup"
    >
      <LoginForm />
    </AuthLayout>
  );
}
