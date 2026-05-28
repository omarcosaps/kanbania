-- KanbanIA triggers

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_workspace_id uuid;
  v_board_id uuid;
  v_profile_name text;
BEGIN
  v_profile_name := COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'name'), ''), 'User');

  INSERT INTO public.profiles (id, name)
  VALUES (NEW.id, v_profile_name);

  INSERT INTO public.workspaces (user_id)
  VALUES (NEW.id)
  RETURNING id INTO v_workspace_id;

  INSERT INTO public.boards (workspace_id, name, position, task_counter)
  VALUES (v_workspace_id, 'My Board', 1, 0)
  RETURNING id INTO v_board_id;

  INSERT INTO public.columns (board_id, name, position)
  VALUES
    (v_board_id, 'Backlog', 1),
    (v_board_id, 'Todo', 2),
    (v_board_id, 'In Progress', 3),
    (v_board_id, 'Done', 4);

  UPDATE public.profiles
  SET last_board_id = v_board_id
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.assign_kan_number()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_next_number integer;
BEGIN
  UPDATE public.boards
  SET task_counter = task_counter + 1
  WHERE id = NEW.board_id
  RETURNING task_counter INTO v_next_number;

  IF v_next_number IS NULL THEN
    RAISE EXCEPTION 'Board % not found', NEW.board_id;
  END IF;

  NEW.kan_number := v_next_number;
  RETURN NEW;
END;
$$;

CREATE TRIGGER assign_task_kan_number
  BEFORE INSERT ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_kan_number();
