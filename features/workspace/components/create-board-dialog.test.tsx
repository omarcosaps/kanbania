import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CreateBoardDialog } from "./create-board-dialog";

const createBoard = vi.fn();

vi.mock("@/features/workspace/store", () => ({
  useWorkspace: () => ({
    createBoard,
  }),
}));

describe("CreateBoardDialog", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    createBoard.mockReset();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    document.body.innerHTML = "";
  });

  it("renders title and input when open", () => {
    act(() => {
      root.render(
        <CreateBoardDialog open onOpenChange={() => {}} />
      );
    });

    expect(document.body.textContent).toContain("Create new board");
    expect(document.body.querySelector("input")).not.toBeNull();
  });

  it("disables create button when name is empty", () => {
    act(() => {
      root.render(
        <CreateBoardDialog open onOpenChange={() => {}} />
      );
    });

    const buttons = document.body.querySelectorAll("button");
    const createButton = Array.from(buttons).find((button) =>
      button.textContent?.includes("Create")
    );

    expect(createButton).not.toBeNull();
    expect(createButton?.disabled).toBe(true);
  });

  it("calls createBoard with trimmed name on submit", async () => {
    createBoard.mockResolvedValue("board-new");
    const onCreated = vi.fn();

    act(() => {
      root.render(
        <CreateBoardDialog
          open
          onOpenChange={() => {}}
          onCreated={onCreated}
        />
      );
    });

    const input = document.body.querySelector("input");
    expect(input).not.toBeNull();

    await act(async () => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeInputValueSetter?.call(input, "  Sprint Board  ");
      input!.dispatchEvent(new Event("input", { bubbles: true }));
    });

    const buttons = document.body.querySelectorAll("button");
    const createButton = Array.from(buttons).find((button) =>
      button.textContent?.includes("Create")
    );

    await act(async () => {
      createButton?.click();
    });

    expect(createBoard).toHaveBeenCalledWith("Sprint Board");
    expect(onCreated).toHaveBeenCalledWith("board-new");
  });
});
