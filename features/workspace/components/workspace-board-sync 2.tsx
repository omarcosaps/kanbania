"use client";

import { useEffect } from "react";

import { useWorkspace } from "@/features/workspace/store";

export function WorkspaceBoardSync({ boardId }: { boardId: string }) {
  const { state, setActiveBoard } = useWorkspace();

  useEffect(() => {
    if (state.boards[boardId]) {
      setActiveBoard(boardId);
    }
  }, [boardId, setActiveBoard, state.boards]);

  return null;
}
