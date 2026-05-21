"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { DEFAULT_BOARD_ID } from "@/features/workspace/mocks";
import { useWorkspace } from "@/features/workspace/store";

export function WorkspaceBoardSync({ boardId }: { boardId: string }) {
  const router = useRouter();
  const { state, setActiveBoard } = useWorkspace();

  useEffect(() => {
    if (state.boards[boardId]) {
      setActiveBoard(boardId);
      return;
    }

    if (state.boards[DEFAULT_BOARD_ID]) {
      router.replace(`/workspace/${DEFAULT_BOARD_ID}`);
    }
  }, [boardId, router, setActiveBoard, state.boards]);

  return null;
}
