"use client";

import Link from "next/link";

import { PasswordInput } from "@/components/password-input";
import { Label } from "@/components/ui/label";

export function PasswordInputDemo() {
  return (
    <PasswordInput
      id="styleguide-password"
      placeholder="••••••••"
      autoComplete="off"
    />
  );
}

export function PasswordFieldCompositionDemo() {
  return (
    <div className="max-w-sm space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="styleguide-password-composed">Senha</Label>
        <Link
          href="/forgot-password"
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Esqueceu a senha?
        </Link>
      </div>
      <PasswordInput
        id="styleguide-password-composed"
        placeholder="••••••••"
        aria-invalid
        autoComplete="off"
      />
      <p className="text-sm text-destructive">Senha é obrigatória</p>
    </div>
  );
}
