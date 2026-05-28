"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "@/features/auth/schemas";
import type { AuthUser } from "@/features/auth/types";
import { createClient } from "@/services/supabase/server";

export type AuthActionResult =
  | { success: true; user: AuthUser; redirectTo: string }
  | { success: false; error: string };

export type MessageActionResult =
  | { success: true; message: string }
  | { success: false; error: string };

async function getSiteOrigin(): Promise<string> {
  const headersList = await headers();
  const origin = headersList.get("origin");
  if (origin) {
    return origin;
  }

  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  if (host) {
    return `${protocol}://${host}`;
  }

  return "http://localhost:3000";
}

export async function signupAction(
  formData: FormData
): Promise<AuthActionResult> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    return { success: false, error: firstError };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { name: parsed.data.name },
    },
  });

  if (error) {
    if (error.message.toLowerCase().includes("already registered")) {
      return {
        success: false,
        error: "Este e-mail já está em uso. Faça login.",
      };
    }
    return { success: false, error: error.message };
  }

  if (!data.user) {
    return { success: false, error: "Não foi possível criar a conta. Tente novamente." };
  }

  if (!data.session) {
    return {
      success: false,
      error:
        "Cadastro incompleto. Verifique se a confirmação de e-mail está desabilitada no Supabase.",
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, last_board_id")
    .eq("id", data.user.id)
    .single();

  const redirectTo = profile?.last_board_id
    ? `/workspace/${profile.last_board_id}`
    : "/workspace";

  return {
    success: true,
    user: {
      id: data.user.id,
      name: profile?.name ?? parsed.data.name,
      email: parsed.data.email,
    },
    redirectTo,
  };
}

export async function loginAction(formData: FormData): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    return { success: false, error: firstError };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return { success: false, error: "E-mail ou senha incorretos." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, last_board_id")
    .eq("id", data.user.id)
    .single();

  const redirectTo = profile?.last_board_id
    ? `/workspace/${profile.last_board_id}`
    : "/workspace";

  return {
    success: true,
    user: {
      id: data.user.id,
      name: profile?.name ?? parsed.data.email.split("@")[0],
      email: parsed.data.email,
    },
    redirectTo,
  };
}

export async function forgotPasswordAction(
  formData: FormData
): Promise<MessageActionResult> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    return { success: false, error: firstError };
  }

  const origin = await getSiteOrigin();
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    message:
      "Se existir uma conta com este e-mail, enviamos um link para redefinir a senha.",
  };
}

export async function resetPasswordAction(
  formData: FormData
): Promise<AuthActionResult> {
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    return { success: false, error: firstError };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "Sessão expirada. Solicite um novo link de redefinição de senha.",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, last_board_id")
    .eq("id", user.id)
    .single();

  const redirectTo = profile?.last_board_id
    ? `/workspace/${profile.last_board_id}`
    : "/workspace";

  return {
    success: true,
    user: {
      id: user.id,
      name: profile?.name ?? user.email?.split("@")[0] ?? "Usuário",
      email: user.email ?? "",
    },
    redirectTo,
  };
}

export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    name: profile?.name ?? user.email?.split("@")[0] ?? "Usuário",
    email: user.email ?? "",
  };
}
