import { describe, expect, it } from "vitest";

import { INITIAL_WORKSPACE_STATE } from "./mocks";
import { workspaceReducer } from "./store";

describe("workspaceReducer REORDER_COLUMNS", () => {
  it("reordena columnIds do board", () => {
    const original = INITIAL_WORKSPACE_STATE.boards["board-1"].columnIds;
    const reordered = [...original].reverse();

    const next = workspaceReducer(INITIAL_WORKSPACE_STATE, {
      type: "REORDER_COLUMNS",
      input: { boardId: "board-1", columnIds: reordered },
    });

    expect(next.boards["board-1"].columnIds).toEqual(reordered);
    expect(next.boards["board-2"].columnIds).toEqual(
      INITIAL_WORKSPACE_STATE.boards["board-2"].columnIds
    );
  });

  it("rejeita IDs de outro board", () => {
    const board2ColumnIds = INITIAL_WORKSPACE_STATE.boards["board-2"].columnIds;

    const next = workspaceReducer(INITIAL_WORKSPACE_STATE, {
      type: "REORDER_COLUMNS",
      input: { boardId: "board-1", columnIds: board2ColumnIds },
    });

    expect(next).toBe(INITIAL_WORKSPACE_STATE);
  });

  it("rejeita array com IDs faltando ou extras", () => {
    const original = INITIAL_WORKSPACE_STATE.boards["board-1"].columnIds;
    const missingOne = original.slice(0, -1);
    const withExtra = [...original, "col-unknown"];

    const nextMissing = workspaceReducer(INITIAL_WORKSPACE_STATE, {
      type: "REORDER_COLUMNS",
      input: { boardId: "board-1", columnIds: missingOne },
    });

    const nextExtra = workspaceReducer(INITIAL_WORKSPACE_STATE, {
      type: "REORDER_COLUMNS",
      input: { boardId: "board-1", columnIds: withExtra },
    });

    expect(nextMissing).toBe(INITIAL_WORKSPACE_STATE);
    expect(nextExtra).toBe(INITIAL_WORKSPACE_STATE);
  });

  it("no-op quando ordem igual", () => {
    const columnIds = INITIAL_WORKSPACE_STATE.boards["board-1"].columnIds;

    const next = workspaceReducer(INITIAL_WORKSPACE_STATE, {
      type: "REORDER_COLUMNS",
      input: { boardId: "board-1", columnIds },
    });

    expect(next).toBe(INITIAL_WORKSPACE_STATE);
  });
});

describe("workspaceReducer HYDRATE", () => {
  it("substitui o estado completo", () => {
    const next = workspaceReducer(INITIAL_WORKSPACE_STATE, {
      type: "HYDRATE",
      state: {
        boards: {},
        columns: {},
        tasks: {},
        activeBoardId: "",
        taskCounter: 0,
        boardOrder: [],
      },
    });

    expect(next.boardOrder).toEqual([]);
    expect(Object.keys(next.boards)).toHaveLength(0);
  });
});
