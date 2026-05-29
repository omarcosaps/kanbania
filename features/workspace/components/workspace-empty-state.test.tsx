import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { WorkspaceEmptyState } from "./workspace-empty-state";

describe("WorkspaceEmptyState", () => {
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

  it("renders title, description, and New Board button", () => {
    act(() => {
      root.render(<WorkspaceEmptyState onCreateBoard={() => {}} />);
    });

    expect(container.textContent).toContain("No boards yet");
    expect(container.textContent).toContain(
      "Create your first board to start organizing tasks in columns and tracking your progress."
    );
    expect(container.textContent).toContain("New Board");
  });

  it("calls onCreateBoard when the button is clicked", () => {
    const onCreateBoard = vi.fn();

    act(() => {
      root.render(<WorkspaceEmptyState onCreateBoard={onCreateBoard} />);
    });

    const button = container.querySelector("button");
    expect(button).not.toBeNull();

    act(() => {
      button?.click();
    });

    expect(onCreateBoard).toHaveBeenCalledOnce();
  });

  it("renders ghost illustration with aria-hidden", () => {
    act(() => {
      root.render(<WorkspaceEmptyState onCreateBoard={() => {}} />);
    });

    const ghostIllustration = container.querySelector('[aria-hidden="true"]');
    expect(ghostIllustration).not.toBeNull();
  });
});
