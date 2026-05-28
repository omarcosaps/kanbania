"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { logoutAction } from "@/features/auth/services/actions";
import { createClient } from "@/services/supabase/client";
import type { AuthUser } from "./types";

interface AuthContextValue {
  user: AuthUser | null;
  isReady: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: AuthUser | null;
}) {
  const [user, setUser] = useState<AuthUser | null>(initialUser ?? null);
  const [isReady, setIsReady] = useState(initialUser !== undefined);

  useEffect(() => {
    const supabase = createClient();

    if (initialUser === undefined) {
      void supabase.auth.getUser().then(({ data }) => {
        const authUser = data.user;
        if (!authUser) {
          setUser(null);
          setIsReady(true);
          return;
        }

        void supabase
          .from("profiles")
          .select("name")
          .eq("id", authUser.id)
          .single()
          .then(({ data: profile }) => {
            setUser({
              id: authUser.id,
              name: profile?.name ?? authUser.email?.split("@")[0] ?? "User",
              email: authUser.email ?? "",
            });
            setIsReady(true);
          });
      });
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUser(null);
        return;
      }

      void supabase
        .from("profiles")
        .select("name")
        .eq("id", session.user.id)
        .single()
        .then(({ data: profile }) => {
          setUser({
            id: session.user.id,
            name: profile?.name ?? session.user.email?.split("@")[0] ?? "User",
            email: session.user.email ?? "",
          });
        });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [initialUser]);

  const logout = useCallback(async () => {
    await logoutAction();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      logout,
    }),
    [user, isReady, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
