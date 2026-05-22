import * as React from "react";

import { cn } from "@/lib/utils";

export interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "shadow-elevated w-full max-w-md rounded-xl border border-border bg-card p-8 sm:p-10",
        className
      )}
    >
      {children}
    </div>
  );
}
