"use client";

import { useEffect } from "react";

import { useWorkspace } from "@/features/workspace/store";

export function WorkspaceBoardSync({ boardId }: { boardId: string }) {
  const { state, setActiveBoard } = useWorkspace();

  useEffect(() => {
    if (!state.boards[boardId]) {
      return;
    }

    if (state.activeBoardId !== boardId) {
      setActiveBoard(boardId);
    }
  }, [boardId, setActiveBoard, state.activeBoardId, state.boards]);

  return null;
}
