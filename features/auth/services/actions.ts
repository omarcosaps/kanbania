"use server";

import { redirect } from "next/navigation";

import { loginSchema, signupSchema } from "@/features/auth/schemas";
import type { AuthUser } from "@/features/auth/types";
import { createClient } from "@/services/supabase/server";

export type AuthActionResult =
  | { success: true; user: AuthUser; redirectTo: string }
  | { success: false; error: string };

export async function signupAction(
  formData: FormData
): Promise<AuthActionResult> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid form data.";
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
        error: "This email is already in use. Please log in.",
      };
    }
    return { success: false, error: error.message };
  }

  if (!data.user) {
    return { success: false, error: "Unable to create account. Try again." };
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
    const firstError = parsed.error.issues[0]?.message ?? "Invalid form data.";
    return { success: false, error: firstError };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return { success: false, error: "Email or password is incorrect." };
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
    name: profile?.name ?? user.email?.split("@")[0] ?? "User",
    email: user.email ?? "",
  };
}
