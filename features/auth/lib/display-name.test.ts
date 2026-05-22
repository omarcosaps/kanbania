import { describe, expect, it } from "vitest";

import { displayNameFromEmail, initialsFromName } from "./display-name";

describe("displayNameFromEmail", () => {
  it("capitaliza a parte local do email", () => {
    expect(displayNameFromEmail("joao@empresa.com")).toBe("Joao");
  });

  it("funciona com email curto", () => {
    expect(displayNameFromEmail("a@b.co")).toBe("A");
  });
});

describe("initialsFromName", () => {
  it("usa primeira e última palavra", () => {
    expect(initialsFromName("Maria Silva")).toBe("MS");
  });

  it("usa duas letras para nome único", () => {
    expect(initialsFromName("Ana")).toBe("AN");
  });

  it("retorna fallback para nome vazio", () => {
    expect(initialsFromName("")).toBe("?");
  });
});
