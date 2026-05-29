import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BoardEmptyState } from "./board-empty-state";

describe("BoardEmptyState", () => {
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

  it("renders title, description, and New Task button", () => {
    act(() => {
      root.render(<BoardEmptyState onNewTask={() => {}} />);
    });

    expect(container.textContent).toContain("No tasks on this board yet");
    expect(container.textContent).toContain(
      "Create your first task to start organizing work in columns and tracking your progress."
    );
    expect(container.textContent).toContain("New Task");
  });

  it("calls onNewTask when the button is clicked", () => {
    const onNewTask = vi.fn();

    act(() => {
      root.render(<BoardEmptyState onNewTask={onNewTask} />);
    });

    const button = container.querySelector("button");
    expect(button).not.toBeNull();

    act(() => {
      button?.click();
    });

    expect(onNewTask).toHaveBeenCalledOnce();
  });

  it("renders ghost illustration with aria-hidden", () => {
    act(() => {
      root.render(<BoardEmptyState onNewTask={() => {}} />);
    });

    const ghostIllustration = container.querySelector('[aria-hidden="true"]');
    expect(ghostIllustration).not.toBeNull();
  });
});
