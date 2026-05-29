"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

import { useWorkspace } from "@/features/workspace/store";

export function WorkspaceBoardSync({ boardId }: { boardId: string }) {
  const router = useRouter();
  const { state, syncActiveBoard, persistLastBoard } = useWorkspace();

  useLayoutEffect(() => {
    if (state.boardOrder.length === 0) {
      router.replace("/workspace");
      return;
    }

    if (state.boards[boardId]) {
      if (state.activeBoardId !== boardId) {
        syncActiveBoard(boardId);
        persistLastBoard(boardId);
      }
      return;
    }

    const fallbackBoardId = state.boardOrder[0];
    if (fallbackBoardId) {
      router.replace(`/workspace/${fallbackBoardId}`);
    }
  }, [
    boardId,
    router,
    syncActiveBoard,
    persistLastBoard,
    state.activeBoardId,
    state.boardOrder,
    state.boards,
  ]);

  return null;
}
