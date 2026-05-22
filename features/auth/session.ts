import type { AuthUser } from "./types";

const SESSION_KEY = "kanbania:session";

export function getSession(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as AuthUser;
    if (
      typeof parsed.name !== "string" ||
      typeof parsed.email !== "string" ||
      !parsed.name.trim() ||
      !parsed.email.trim()
    ) {
      return null;
    }

    return {
      name: parsed.name.trim(),
      email: parsed.email.trim(),
    };
  } catch {
    return null;
  }
}

export function setSession(user: AuthUser): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
