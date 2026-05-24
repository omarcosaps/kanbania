const COLUMN_ORDER_KEY = "kanbania:column-order";

export function loadColumnOrders(): Record<string, string[]> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = localStorage.getItem(COLUMN_ORDER_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    const result: Record<string, string[]> = {};
    for (const [boardId, columnIds] of Object.entries(parsed)) {
      if (
        typeof boardId === "string" &&
        Array.isArray(columnIds) &&
        columnIds.every((id) => typeof id === "string")
      ) {
        result[boardId] = columnIds;
      }
    }

    return result;
  } catch {
    return {};
  }
}

export function saveColumnOrder(boardId: string, columnIds: string[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const existing = loadColumnOrders();
    localStorage.setItem(
      COLUMN_ORDER_KEY,
      JSON.stringify({ ...existing, [boardId]: columnIds })
    );
  } catch {
    throw new Error("Failed to save column order");
  }
}

export function applySavedColumnOrders<T extends { boards: Record<string, { id: string; columnIds: string[] }> }>(
  state: T,
  savedOrders: Record<string, string[]>
): T {
  const boards = { ...state.boards };

  for (const [boardId, savedColumnIds] of Object.entries(savedOrders)) {
    const board = boards[boardId];
    if (!board) {
      continue;
    }

    const currentSet = new Set(board.columnIds);
    const isValid =
      savedColumnIds.length === board.columnIds.length &&
      savedColumnIds.every((id) => currentSet.has(id));

    if (!isValid) {
      continue;
    }

    boards[boardId] = { ...board, columnIds: savedColumnIds };
  }

  return { ...state, boards };
}
