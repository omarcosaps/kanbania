import * as React from "react";

import { AuthForm, AuthHeader } from "@/components/auth-form";
import { cn } from "@/lib/utils";

export interface CenteredAuthLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export function CenteredAuthLayout({
  children,
  className,
}: CenteredAuthLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-full flex-col items-center justify-center bg-background px-4 py-12 sm:px-6",
        className
      )}
    >
      <div className="flex w-full max-w-md flex-col gap-8">
        <AuthHeader />
        {children ?? <AuthForm />}
      </div>
    </div>
  );
}
