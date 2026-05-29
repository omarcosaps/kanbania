import { describe, expect, it } from "vitest";

import { shouldShowBoardEmptyState } from "./board-empty-state-visibility";

describe("shouldShowBoardEmptyState", () => {
  it("returns false when board has columns", () => {
    expect(shouldShowBoardEmptyState(false, null, true)).toBe(false);
  });

  it("returns true when board has no columns, no tasks, and no inline create", () => {
    expect(shouldShowBoardEmptyState(false, null, false)).toBe(true);
  });

  it("returns false when creating a task inline and no columns", () => {
    expect(shouldShowBoardEmptyState(false, "col-1", false)).toBe(false);
  });

  it("returns false when board has tasks", () => {
    expect(shouldShowBoardEmptyState(true, null, false)).toBe(false);
  });

  it("returns false when board has tasks and inline create is active", () => {
    expect(shouldShowBoardEmptyState(true, "col-1", false)).toBe(false);
  });
});
