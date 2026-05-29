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

describe("workspaceReducer CREATE_BOARD", () => {
  it("adiciona board, colunas e define como ativo", () => {
    const emptyState = {
      boards: {},
      columns: {},
      tasks: {},
      activeBoardId: "",
      taskCounter: 0,
      boardOrder: [],
    };

    const next = workspaceReducer(emptyState, {
      type: "CREATE_BOARD",
      board: {
        id: "board-new",
        name: "New Board",
        columnIds: ["col-1", "col-2"],
      },
      columns: [
        { id: "col-1", name: "Backlog", boardId: "board-new" },
        { id: "col-2", name: "Todo", boardId: "board-new" },
      ],
    });

    expect(next.boardOrder).toEqual(["board-new"]);
    expect(next.activeBoardId).toBe("board-new");
    expect(next.boards["board-new"].name).toBe("New Board");
    expect(Object.keys(next.columns)).toHaveLength(2);
  });
});

describe("workspaceReducer DELETE_BOARD", () => {
  it("remove board, colunas e tasks associadas", () => {
    const next = workspaceReducer(INITIAL_WORKSPACE_STATE, {
      type: "DELETE_BOARD",
      boardId: "board-1",
    });

    expect(next.boards["board-1"]).toBeUndefined();
    expect(next.boardOrder).toEqual(["board-2"]);
    expect(next.activeBoardId).toBe("board-2");
    expect(Object.values(next.columns).every((col) => col.boardId !== "board-1")).toBe(
      true
    );
    expect(
      Object.values(next.tasks).every(
        (task) => !INITIAL_WORKSPACE_STATE.columns[task.columnId] ||
          INITIAL_WORKSPACE_STATE.columns[task.columnId].boardId !== "board-1"
      )
    ).toBe(true);
  });

  it("define activeBoardId vazio ao deletar ultimo board", () => {
    const singleBoardState = {
      ...INITIAL_WORKSPACE_STATE,
      boardOrder: ["board-1"],
      activeBoardId: "board-1",
      boards: {
        "board-1": INITIAL_WORKSPACE_STATE.boards["board-1"],
      },
      columns: Object.fromEntries(
        Object.entries(INITIAL_WORKSPACE_STATE.columns).filter(
          ([, col]) => col.boardId === "board-1"
        )
      ),
      tasks: Object.fromEntries(
        Object.entries(INITIAL_WORKSPACE_STATE.tasks).filter(
          ([, task]) =>
            INITIAL_WORKSPACE_STATE.columns[task.columnId]?.boardId === "board-1"
        )
      ),
    };

    const next = workspaceReducer(singleBoardState, {
      type: "DELETE_BOARD",
      boardId: "board-1",
    });

    expect(next.boardOrder).toEqual([]);
    expect(next.activeBoardId).toBe("");
    expect(Object.keys(next.boards)).toHaveLength(0);
  });

  it("no-op para board inexistente", () => {
    const next = workspaceReducer(INITIAL_WORKSPACE_STATE, {
      type: "DELETE_BOARD",
      boardId: "board-unknown",
    });

    expect(next).toBe(INITIAL_WORKSPACE_STATE);
  });
});

describe("workspaceReducer REORDER_BOARDS", () => {
  it("reordena boardOrder", () => {
    const reordered = [...INITIAL_WORKSPACE_STATE.boardOrder].reverse();

    const next = workspaceReducer(INITIAL_WORKSPACE_STATE, {
      type: "REORDER_BOARDS",
      boardIds: reordered,
    });

    expect(next.boardOrder).toEqual(reordered);
  });

  it("rejeita IDs invalidos", () => {
    const next = workspaceReducer(INITIAL_WORKSPACE_STATE, {
      type: "REORDER_BOARDS",
      boardIds: ["board-1"],
    });

    expect(next).toBe(INITIAL_WORKSPACE_STATE);
  });

  it("no-op quando ordem igual", () => {
    const next = workspaceReducer(INITIAL_WORKSPACE_STATE, {
      type: "REORDER_BOARDS",
      boardIds: INITIAL_WORKSPACE_STATE.boardOrder,
    });

    expect(next).toBe(INITIAL_WORKSPACE_STATE);
  });
});
