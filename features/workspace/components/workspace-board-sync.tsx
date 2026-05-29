"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useWorkspace } from "@/features/workspace/store";

export function WorkspaceBoardSync({ boardId }: { boardId: string }) {
  const router = useRouter();
  const { state, setActiveBoard } = useWorkspace();

  useEffect(() => {
    if (state.boardOrder.length === 0) {
      router.replace("/workspace");
      return;
    }

    if (state.boards[boardId]) {
      if (state.activeBoardId !== boardId) {
        setActiveBoard(boardId);
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
    setActiveBoard,
    state.activeBoardId,
    state.boardOrder,
    state.boards,
  ]);

  return null;
}
