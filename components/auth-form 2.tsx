"use client";

import Link from "next/link";

import { AuthCard } from "@/components/auth-card";
import { FormField, PasswordField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface AuthFormProps {
  className?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function AuthForm({ className, onSubmit }: AuthFormProps) {
  return (
    <AuthCard className={className}>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(e);
        }}
      >
        <FormField id="name" label="Name">
          <Input variant="filled" placeholder="Your name" autoComplete="name" />
        </FormField>

        <FormField id="email" label="Email address">
          <Input
            type="email"
            variant="filled"
            placeholder="you@company.com"
            autoComplete="email"
          />
        </FormField>

        <PasswordField id="password" label="Password" />

        <Button type="submit" size="lg" className="mt-1 w-full">
          Create account
        </Button>
      </form>

      <p className="text-caption mt-6 text-center text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground transition-interactive hover:text-primary"
        >
          Log in
        </Link>
      </p>
    </AuthCard>
  );
}

export interface AuthHeaderProps {
  title?: string;
  description?: string;
  className?: string;
}

export function AuthHeader({
  title = "Create your workspace",
  description = "Join thousands of teams using Kanbania to ship faster.",
  className,
}: AuthHeaderProps) {
  return (
    <div className={cn("flex flex-col items-center gap-6 text-center", className)}>
      <div
        className="flex size-10 items-center justify-center rounded-md bg-primary text-lg font-semibold text-primary-foreground"
        aria-hidden
      >
        K
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-display">{title}</h1>
        <p className="text-caption max-w-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
