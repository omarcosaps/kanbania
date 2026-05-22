"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { displayNameFromEmail } from "@/features/auth/lib/display-name";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas";
import { setSession } from "@/features/auth/session";

import { PasswordInput } from "./password-input";

const MOCK_DELAY_MS = 600;

function delay(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function LoginForm() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setAuthError(null);
    await delay(MOCK_DELAY_MS);

    if (values.email === "taken@example.com") {
      setAuthError("Email or password is incorrect.");
      return;
    }

    setSession({
      name: displayNameFromEmail(values.email),
      email: values.email,
    });
    router.push("/workspace");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {authError ? (
        <p className="text-sm text-destructive">{authError}</p>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={(event) => event.preventDefault()}
          >
            Forgot password?
          </Link>
        </div>
        <PasswordInput
          id="password"
          placeholder="••••••••"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        ) : null}
      </div>

      <Button type="submit" className="mt-2 h-10 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Logging in…" : "Log in"}
      </Button>
    </form>
  );
}
