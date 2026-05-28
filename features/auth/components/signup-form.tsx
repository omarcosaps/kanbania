"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupAction } from "@/features/auth/services/actions";
import {
  signupSchema,
  type SignupFormValues,
} from "@/features/auth/schemas";

import { PasswordInput } from "./password-input";

export function SignupForm() {
  const router = useRouter();
  const [signupError, setSignupError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setSignupError(null);

    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("password", values.password);

    const result = await signupAction(formData);

    if (!result.success) {
      setSignupError(result.error);
      return;
    }

    router.push(result.redirectTo);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {signupError ? (
        <p className="text-sm text-destructive">{signupError}</p>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          placeholder="Maria Silva"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name ? (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="voce@exemplo.com"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
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
        {isSubmitting ? "Criando conta…" : "Criar conta"}
      </Button>
    </form>
  );
}
