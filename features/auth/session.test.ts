import { afterEach, describe, expect, it } from "vitest";

import { clearSession, getSession, setSession } from "./session";

const SESSION_KEY = "kanbania:session";

describe("session", () => {
  afterEach(() => {
    sessionStorage.clear();
  });

  it("persiste e recupera usuário válido", () => {
    setSession({ name: "Maria", email: "maria@example.com" });
    expect(getSession()).toEqual({
      name: "Maria",
      email: "maria@example.com",
    });
  });

  it("retorna null após clearSession", () => {
    setSession({ name: "Maria", email: "maria@example.com" });
    clearSession();
    expect(getSession()).toBeNull();
    expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
  });

  it("rejeita JSON inválido", () => {
    sessionStorage.setItem(SESSION_KEY, "not-json");
    expect(getSession()).toBeNull();
  });

  it("rejeita sessão sem nome", () => {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ name: "", email: "a@b.com" })
    );
    expect(getSession()).toBeNull();
  });
});
