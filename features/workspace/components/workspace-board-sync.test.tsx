import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { INITIAL_WORKSPACE_STATE } from "@/features/workspace/mocks";
import type { WorkspaceState } from "@/features/workspace/types";

import { WorkspaceBoardSync } from "./workspace-board-sync";

const replace = vi.fn();
const syncActiveBoard = vi.fn();
const persistLastBoard = vi.fn();

let mockState: WorkspaceState = INITIAL_WORKSPACE_STATE;

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}));

vi.mock("@/features/workspace/store", () => ({
  useWorkspace: () => ({
    state: mockState,
    syncActiveBoard,
    persistLastBoard,
  }),
}));

describe("WorkspaceBoardSync", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    mockState = { ...INITIAL_WORKSPACE_STATE };
    replace.mockReset();
    syncActiveBoard.mockReset();
    persistLastBoard.mockReset();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("syncs store and persists when URL board differs from active board", () => {
    mockState = {
      ...INITIAL_WORKSPACE_STATE,
      activeBoardId: "board-1",
    };

    act(() => {
      root.render(<WorkspaceBoardSync boardId="board-2" />);
    });

    expect(syncActiveBoard).toHaveBeenCalledWith("board-2");
    expect(persistLastBoard).toHaveBeenCalledWith("board-2");
    expect(replace).not.toHaveBeenCalled();
  });

  it("does not sync when URL board is already active", () => {
    mockState = {
      ...INITIAL_WORKSPACE_STATE,
      activeBoardId: "board-2",
    };

    act(() => {
      root.render(<WorkspaceBoardSync boardId="board-2" />);
    });

    expect(syncActiveBoard).not.toHaveBeenCalled();
    expect(persistLastBoard).not.toHaveBeenCalled();
    expect(replace).not.toHaveBeenCalled();
  });

  it("redirects to fallback when boardId is invalid", () => {
    act(() => {
      root.render(<WorkspaceBoardSync boardId="missing-board" />);
    });

    expect(replace).toHaveBeenCalledWith("/workspace/board-1");
    expect(syncActiveBoard).not.toHaveBeenCalled();
  });

  it("redirects to workspace index when there are no boards", () => {
    mockState = {
      ...INITIAL_WORKSPACE_STATE,
      boardOrder: [],
      boards: {},
      activeBoardId: "",
    };

    act(() => {
      root.render(<WorkspaceBoardSync boardId="board-1" />);
    });

    expect(replace).toHaveBeenCalledWith("/workspace");
    expect(syncActiveBoard).not.toHaveBeenCalled();
  });
});
