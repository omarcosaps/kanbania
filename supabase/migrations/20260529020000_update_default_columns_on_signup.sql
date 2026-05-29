-- Update default columns created on signup to Portuguese names (Fazer, Fazendo, Feito)

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
    (v_board_id, 'Fazer', 1),
    (v_board_id, 'Fazendo', 2),
    (v_board_id, 'Feito', 3);

  UPDATE public.profiles
  SET last_board_id = v_board_id
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$;
