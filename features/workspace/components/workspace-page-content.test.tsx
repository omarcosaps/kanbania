import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { INITIAL_WORKSPACE_STATE } from "@/features/workspace/mocks";

const kanbanBoardSpy = vi.fn((_props: { boardId: string }) => null);

vi.mock("next/navigation", () => ({
  useParams: () => ({ boardId: "board-2" }),
}));

vi.mock("@/features/workspace/store", () => ({
  useWorkspace: () => ({
    state: INITIAL_WORKSPACE_STATE,
    getBoardColumns: () => [],
  }),
}));

vi.mock("@/features/workspace/components/workspace-nav", () => ({
  WorkspaceNav: () => <div data-testid="workspace-nav" />,
}));

vi.mock("@/features/workspace/components/board-header", () => ({
  BoardHeader: () => <div data-testid="board-header" />,
}));

vi.mock("@/features/workspace/components/kanban-board", () => ({
  KanbanBoard: (props: { boardId: string }) => {
    kanbanBoardSpy(props);
    return <div data-testid="kanban-board" data-board-id={props.boardId} />;
  },
}));

import { WorkspacePageContent } from "./workspace-page-content";

describe("WorkspacePageContent", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    kanbanBoardSpy.mockClear();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("passes URL boardId to KanbanBoard", () => {
    act(() => {
      root.render(<WorkspacePageContent />);
    });

    expect(kanbanBoardSpy).toHaveBeenCalledWith(
      expect.objectContaining({ boardId: "board-2" })
    );
  });
});
