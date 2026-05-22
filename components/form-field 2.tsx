"use client";

import * as React from "react";

import { Eye, EyeOff } from "@/lib/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactElement;
}

export function FormField({
  id,
  label,
  error,
  className,
  children,
}: FormFieldProps) {
  const control = React.cloneElement(children, {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {control}
      {error ? (
        <p id={`${id}-error`} className="text-caption text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

export function PasswordField({
  id,
  label,
  placeholder = "••••••••",
  error,
  className,
}: PasswordFieldProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          variant="filled"
          placeholder={placeholder}
          className="pr-10"
          autoComplete="current-password"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-interactive hover:text-foreground"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        >
          {visible ? (
            <EyeOff className="size-4" aria-hidden />
          ) : (
            <Eye className="size-4" aria-hidden />
          )}
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-caption text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
