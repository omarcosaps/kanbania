import { afterEach, describe, expect, it } from "vitest";

import { INITIAL_WORKSPACE_STATE } from "../mocks";
import {
  applySavedColumnOrders,
  loadColumnOrders,
  saveColumnOrder,
} from "./column-order-storage";

const COLUMN_ORDER_KEY = "kanbania:column-order";

describe("column-order-storage", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("persiste e recupera ordem por board", () => {
    const columnIds = ["col-done", "col-backlog", "col-todo", "col-progress"];
    saveColumnOrder("board-1", columnIds);

    expect(loadColumnOrders()).toEqual({ "board-1": columnIds });
  });

  it("ignora JSON inválido", () => {
    localStorage.setItem(COLUMN_ORDER_KEY, "not-json");
    expect(loadColumnOrders()).toEqual({});
  });

  it("applySavedColumnOrders ignora entradas inválidas", () => {
    const original = INITIAL_WORKSPACE_STATE.boards["board-1"].columnIds;
    const saved = [...original].reverse();

    const valid = applySavedColumnOrders(INITIAL_WORKSPACE_STATE, {
      "board-1": saved,
      "board-1-invalid": ["col-unknown"],
      "board-unknown": original,
    });

    expect(valid.boards["board-1"].columnIds).toEqual(saved);
    expect(valid.boards["board-2"].columnIds).toEqual(
      INITIAL_WORKSPACE_STATE.boards["board-2"].columnIds
    );
  });
});
