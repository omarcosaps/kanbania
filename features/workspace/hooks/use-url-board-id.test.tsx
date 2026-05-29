import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  useBoardFromUrl,
  useUrlBoardId,
} from "@/features/workspace/hooks/use-url-board-id";
import { INITIAL_WORKSPACE_STATE } from "@/features/workspace/mocks";

vi.mock("next/navigation", () => ({
  useParams: () => ({ boardId: "board-2" }),
}));

vi.mock("@/features/workspace/store", () => ({
  useWorkspace: () => ({
    state: INITIAL_WORKSPACE_STATE,
  }),
}));

function UrlBoardProbe() {
  const boardId = useUrlBoardId();
  const board = useBoardFromUrl();

  return (
    <div>
      <span data-testid="board-id">{boardId}</span>
      <span data-testid="board-name">{board?.name}</span>
    </div>
  );
}

describe("useUrlBoardId", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("returns boardId from route params", () => {
    act(() => {
      root.render(<UrlBoardProbe />);
    });

    expect(container.querySelector('[data-testid="board-id"]')?.textContent).toBe(
      "board-2"
    );
  });

  it("returns board from workspace state for URL boardId", () => {
    act(() => {
      root.render(<UrlBoardProbe />);
    });

    expect(container.querySelector('[data-testid="board-name"]')?.textContent).toBe(
      "Design System"
    );
  });
});
