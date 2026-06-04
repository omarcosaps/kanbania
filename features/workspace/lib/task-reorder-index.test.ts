import { describe, expect, it } from "vitest";

import type { Task } from "@/features/workspace/types";

import type { DragEndEvent } from "@dnd-kit/core";

import {
  computeTaskInsertIndex,
  computeTaskMove,
  resolveTargetColumnId,
  resolveTaskDropOverId,
} from "./task-reorder-index";

function makeTask(id: string, columnId: string, position: number): Task {
  return {
    id,
    taskId: id,
    title: id,
    columnId,
    position,
    priority: null,
  };
}

function makeRects(
  ids: string[],
  height = 40,
  gap = 8
): { id: string; top: number; bottom: number }[] {
  let y = 0;
  return ids.map((id) => {
    const top = y;
    const bottom = y + height;
    y = bottom + gap;
    return { id, top, bottom };
  });
}

function applyMove(
  sourceTasks: Task[],
  activeId: string,
  targetColumnId: string,
  options: {
    overTaskId?: string | null;
    pointerY?: number;
    cardRects?: ReturnType<typeof makeRects>;
    appendToEnd?: boolean;
  }
): string[] {
  const activeTask = sourceTasks.find((t) => t.id === activeId);
  if (!activeTask) {
    return sourceTasks.map((t) => t.id);
  }

  const getColumnTasks = (columnId: string) =>
    sourceTasks
      .filter((t) => t.columnId === columnId)
      .sort((a, b) => a.position - b.position);

  const result = computeTaskMove({
    activeTask,
    targetColumnId,
    getColumnTasks,
    ...options,
  });

  if (!result) {
    return getColumnTasks(activeTask.columnId).map((t) => t.id);
  }

  const updated = sourceTasks.map((t) =>
    t.id === activeId
      ? { ...t, columnId: result.columnId, position: result.position }
      : t
  );

  return updated
    .filter((t) => t.columnId === result.columnId)
    .sort((a, b) => a.position - b.position)
    .map((t) => t.id);
}

describe("computeTaskInsertIndex", () => {
  const orderedIds = ["A", "B", "C"];

  it("pointer above first card inserts at 0", () => {
    const rects = makeRects(orderedIds);
    expect(
      computeTaskInsertIndex({
        orderedIds,
        pointerY: rects[0].top - 1,
        cardRects: rects,
      })
    ).toBe(0);
  });

  it("pointer below last card inserts at end", () => {
    const rects = makeRects(orderedIds);
    expect(
      computeTaskInsertIndex({
        orderedIds,
        pointerY: rects[2].bottom + 1,
        cardRects: rects,
      })
    ).toBe(3);
  });

  it("pointer in lower half of B inserts after B", () => {
    const rects = makeRects(orderedIds);
    const mid = (rects[1].top + rects[1].bottom) / 2;
    expect(
      computeTaskInsertIndex({
        orderedIds,
        pointerY: mid + 1,
        cardRects: rects,
      })
    ).toBe(2);
  });

  it("overTaskId with pointer in upper half inserts before", () => {
    const rects = makeRects(orderedIds);
    const mid = (rects[2].top + rects[2].bottom) / 2;
    expect(
      computeTaskInsertIndex({
        orderedIds,
        overTaskId: "C",
        pointerY: mid - 1,
        cardRects: rects,
      })
    ).toBe(2);
  });

  it("appendToEnd without pointer appends", () => {
    expect(
      computeTaskInsertIndex({
        orderedIds,
        appendToEnd: true,
      })
    ).toBe(3);
  });
});

describe("resolveTaskDropOverId", () => {
  const col = "col-1";
  const tasks = [makeTask("t1", col, 1), makeTask("t2", col, 2)];
  const getTaskById = (id: string) => tasks.find((t) => t.id === id);

  function makeDragEndEvent(
    activeId: string,
    over: { id: string } | null,
    collisions: { id: string }[] = []
  ): DragEndEvent {
    return {
      active: { id: activeId },
      over,
      collisions,
    } as DragEndEvent;
  }

  it("returns null when over is the active task and collisions are empty", () => {
    expect(
      resolveTaskDropOverId(
        makeDragEndEvent("t1", { id: "t1" }, []),
        getTaskById
      )
    ).toBeNull();
  });

  it("skips active task in collisions and returns another task", () => {
    expect(
      resolveTaskDropOverId(
        makeDragEndEvent("t1", { id: "t1" }, [{ id: "t1" }, { id: "t2" }]),
        getTaskById
      )
    ).toBe("t2");
  });

  it("returns over task when it is not the active task", () => {
    expect(
      resolveTaskDropOverId(
        makeDragEndEvent("t1", { id: "t2" }, []),
        getTaskById
      )
    ).toBe("t2");
  });

  it("returns column-drop id when over is not a task", () => {
    expect(
      resolveTaskDropOverId(
        makeDragEndEvent("t1", { id: "column-drop:col-1" }, []),
        getTaskById
      )
    ).toBe("column-drop:col-1");
  });
});

describe("resolveTargetColumnId", () => {
  const col = "col-1";
  const tasks = [makeTask("t1", col, 1)];

  it("resolves task id to column", () => {
    expect(
      resolveTargetColumnId(
        "t1",
        (id) => tasks.find((t) => t.id === id),
        (id) => id === col
      )
    ).toBe(col);
  });

  it("resolves column-drop prefix", () => {
    expect(
      resolveTargetColumnId(
        "column-drop:col-1",
        () => undefined,
        () => false
      )
    ).toBe(col);
  });
});

describe("same-column reorder (A, B, C)", () => {
  const col = "col-1";
  const tasks = [
    makeTask("A", col, 1),
    makeTask("B", col, 2),
    makeTask("C", col, 3),
  ];
  const rects = makeRects(["A", "B", "C"]);

  it("move A between B and C via pointer", () => {
    const gapBetweenBAndC = rects[1].bottom + 1;
    const result = applyMove(tasks, "A", col, {
      pointerY: gapBetweenBAndC,
      cardRects: rects,
    });
    expect(result).toEqual(["B", "A", "C"]);
  });

  it("move C between A and B via pointer on A lower half", () => {
    const midA = (rects[0].top + rects[0].bottom) / 2;
    const result = applyMove(tasks, "C", col, {
      overTaskId: "A",
      pointerY: midA + 1,
      cardRects: rects,
    });
    expect(result).toEqual(["A", "C", "B"]);
  });

  it("move A to end via append zone", () => {
    const result = applyMove(tasks, "A", col, { appendToEnd: true });
    expect(result).toEqual(["B", "C", "A"]);
  });

  it("no-op when dropping on same position", () => {
    const result = applyMove(tasks, "B", col, {
      overTaskId: "B",
      pointerY: (rects[1].top + rects[1].bottom) / 2,
      cardRects: rects,
    });
    expect(result).toEqual(["A", "B", "C"]);
  });
});

describe("cross-column move", () => {
  const colX = "col-x";
  const colY = "col-y";
  const tasks = [
    makeTask("A", colX, 1),
    makeTask("B", colX, 2),
    makeTask("C", colY, 1),
    makeTask("D", colY, 2),
  ];
  const rectsY = makeRects(["C", "D"]);

  it("move A to start of column Y", () => {
    const result = applyMove(tasks, "A", colY, {
      pointerY: rectsY[0].top - 1,
      cardRects: rectsY,
    });
    expect(result).toEqual(["A", "C", "D"]);
  });

  it("move A between C and D in column Y", () => {
    const midC = (rectsY[0].top + rectsY[0].bottom) / 2;
    const result = applyMove(tasks, "A", colY, {
      pointerY: midC + 1,
      cardRects: rectsY,
    });
    expect(result).toEqual(["C", "A", "D"]);
  });

  it("move A to empty column Z", () => {
    const colZ = "col-z";
    const withZ = [...tasks, makeTask("E", colX, 3)];
    const result = applyMove(withZ, "E", colZ, { appendToEnd: true });
    expect(result).toEqual(["E"]);
  });
});

describe("insert index range n=3", () => {
  it("pointer and append produce indices 0 through n", () => {
    const orderedIds = ["B", "C"];
    const rects = makeRects(["B", "C"]);
    const indices = new Set<number>();

    indices.add(
      computeTaskInsertIndex({ orderedIds, pointerY: rects[0].top - 1, cardRects: rects })
    );
    indices.add(
      computeTaskInsertIndex({
        orderedIds,
        pointerY: (rects[0].top + rects[0].bottom) / 2 + 1,
        cardRects: rects,
      })
    );
    indices.add(
      computeTaskInsertIndex({
        orderedIds,
        pointerY: rects[1].bottom + 1,
        cardRects: rects,
      })
    );
    indices.add(computeTaskInsertIndex({ orderedIds, appendToEnd: true }));

    expect(indices).toEqual(new Set([0, 1, 2]));
  });
});
