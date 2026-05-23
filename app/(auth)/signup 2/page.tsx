import type { Metadata } from "next";

import { AuthLayout } from "@/features/auth/components/auth-layout";
import { SignupForm } from "@/features/auth/components/signup-form";

export const metadata: Metadata = {
  title: "Sign up — KanbanIA",
  description: "Create your KanbanIA workspace",
};

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your workspace"
      subtitle="Join thousands of teams managing their work with clarity."
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerHref="/login"
    >
      <SignupForm />
    </AuthLayout>
  );
}
