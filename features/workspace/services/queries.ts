import { createClient } from "@/services/supabase/server";

import {
  buildWorkspaceState,
  createEmptyWorkspaceState,
} from "./mappers";

export async function fetchWorkspaceState(activeBoardId?: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { state: createEmptyWorkspaceState(), lastBoardId: null as string | null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("last_board_id")
    .eq("id", user.id)
    .single();

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!workspace) {
    return {
      state: createEmptyWorkspaceState(),
      lastBoardId: profile?.last_board_id ?? null,
    };
  }

  const { data: boards } = await supabase
    .from("boards")
    .select("*")
    .eq("workspace_id", workspace.id)
    .order("position", { ascending: true });

  if (!boards?.length) {
    return {
      state: createEmptyWorkspaceState(),
      lastBoardId: profile?.last_board_id ?? null,
    };
  }

  const boardIds = boards.map((board) => board.id);

  const [{ data: columns }, { data: tasks }] = await Promise.all([
    supabase
      .from("columns")
      .select("*")
      .in("board_id", boardIds)
      .order("position", { ascending: true }),
    supabase
      .from("tasks")
      .select("*")
      .in("board_id", boardIds)
      .order("position", { ascending: true }),
  ]);

  return {
    state: buildWorkspaceState({
      boards,
      columns: columns ?? [],
      tasks: tasks ?? [],
      lastBoardId: profile?.last_board_id ?? null,
      activeBoardId,
    }),
    lastBoardId: profile?.last_board_id ?? null,
  };
}

export async function resolveDefaultBoardRedirect() {
  const { state, lastBoardId } = await fetchWorkspaceState();

  if (lastBoardId && state.boards[lastBoardId]) {
    return `/workspace/${lastBoardId}`;
  }

  if (state.boardOrder[0]) {
    return `/workspace/${state.boardOrder[0]}`;
  }

  return null;
}
