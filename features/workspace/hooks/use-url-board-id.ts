"use client";

import { useParams } from "next/navigation";

import { useWorkspace } from "@/features/workspace/store";
import type { Board } from "@/features/workspace/types";

export function useUrlBoardId(): string | undefined {
  const params = useParams<{ boardId?: string }>();
  return params.boardId;
}

export function useBoardFromUrl(): Board | undefined {
  const boardId = useUrlBoardId();
  const { state } = useWorkspace();

  if (!boardId) {
    return undefined;
  }

  return state.boards[boardId];
}
