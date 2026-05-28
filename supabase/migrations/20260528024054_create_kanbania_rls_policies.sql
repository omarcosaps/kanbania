-- KanbanIA RLS policies

CREATE OR REPLACE FUNCTION public.is_workspace_owner(p_workspace_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.workspaces
    WHERE id = p_workspace_id
      AND user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.user_owns_board(p_board_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.boards b
    JOIN public.workspaces w ON w.id = b.workspace_id
    WHERE b.id = p_board_id
      AND w.user_id = auth.uid()
  );
$$;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "workspaces_select_own"
  ON public.workspaces
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "workspaces_insert_own"
  ON public.workspaces
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "workspaces_update_own"
  ON public.workspaces
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "workspaces_delete_own"
  ON public.workspaces
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "boards_select_own"
  ON public.boards
  FOR SELECT
  TO authenticated
  USING (public.is_workspace_owner(workspace_id));

CREATE POLICY "boards_insert_own"
  ON public.boards
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_workspace_owner(workspace_id));

CREATE POLICY "boards_update_own"
  ON public.boards
  FOR UPDATE
  TO authenticated
  USING (public.is_workspace_owner(workspace_id))
  WITH CHECK (public.is_workspace_owner(workspace_id));

CREATE POLICY "boards_delete_own"
  ON public.boards
  FOR DELETE
  TO authenticated
  USING (public.is_workspace_owner(workspace_id));

CREATE POLICY "columns_select_own"
  ON public.columns
  FOR SELECT
  TO authenticated
  USING (public.user_owns_board(board_id));

CREATE POLICY "columns_insert_own"
  ON public.columns
  FOR INSERT
  TO authenticated
  WITH CHECK (public.user_owns_board(board_id));

CREATE POLICY "columns_update_own"
  ON public.columns
  FOR UPDATE
  TO authenticated
  USING (public.user_owns_board(board_id))
  WITH CHECK (public.user_owns_board(board_id));

CREATE POLICY "columns_delete_own"
  ON public.columns
  FOR DELETE
  TO authenticated
  USING (public.user_owns_board(board_id));

CREATE POLICY "tasks_select_own"
  ON public.tasks
  FOR SELECT
  TO authenticated
  USING (public.user_owns_board(board_id));

CREATE POLICY "tasks_insert_own"
  ON public.tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (
    public.user_owns_board(board_id)
    AND EXISTS (
      SELECT 1
      FROM public.columns c
      WHERE c.id = column_id
        AND c.board_id = board_id
    )
  );

CREATE POLICY "tasks_update_own"
  ON public.tasks
  FOR UPDATE
  TO authenticated
  USING (public.user_owns_board(board_id))
  WITH CHECK (
    public.user_owns_board(board_id)
    AND EXISTS (
      SELECT 1
      FROM public.columns c
      WHERE c.id = column_id
        AND c.board_id = board_id
    )
  );

CREATE POLICY "tasks_delete_own"
  ON public.tasks
  FOR DELETE
  TO authenticated
  USING (public.user_owns_board(board_id));
