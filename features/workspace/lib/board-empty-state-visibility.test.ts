import { describe, expect, it } from "vitest";

import { shouldShowBoardEmptyState } from "./board-empty-state-visibility";

describe("shouldShowBoardEmptyState", () => {
  it("returns true when board has no tasks and no inline create is active", () => {
    expect(shouldShowBoardEmptyState(false, null)).toBe(true);
  });

  it("returns false when creating a task inline", () => {
    expect(shouldShowBoardEmptyState(false, "col-1")).toBe(false);
  });

  it("returns false when board has tasks", () => {
    expect(shouldShowBoardEmptyState(true, null)).toBe(false);
  });

  it("returns false when board has tasks and inline create is active", () => {
    expect(shouldShowBoardEmptyState(true, "col-1")).toBe(false);
  });
});
