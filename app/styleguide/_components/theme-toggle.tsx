"use client";

import { Moon, Sun } from "@/lib/icons";
import { useEffect, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    applyTheme(isDark);
  }, []);

  function toggle() {
    applyTheme(!dark);
  }

  return (
    <Button variant="outline" size="sm" onClick={toggle}>
      {dark ? (
        <>
          <Sun className="size-4" />
          Modo claro
        </>
      ) : (
        <>
          <Moon className="size-4" />
          Modo escuro
        </>
      )}
    </Button>
  );
}
