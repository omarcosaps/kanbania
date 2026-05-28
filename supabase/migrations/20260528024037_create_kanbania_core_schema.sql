-- KanbanIA core schema

CREATE TYPE public.task_priority AS ENUM ('high', 'medium', 'low');

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  name text NOT NULL,
  last_board_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.boards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces (id) ON DELETE CASCADE,
  name text NOT NULL,
  position double precision NOT NULL DEFAULT 1,
  task_counter integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_last_board_id_fkey
  FOREIGN KEY (last_board_id) REFERENCES public.boards (id) ON DELETE SET NULL;

CREATE TABLE public.columns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id uuid NOT NULL REFERENCES public.boards (id) ON DELETE CASCADE,
  name text NOT NULL,
  position double precision NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id uuid NOT NULL REFERENCES public.boards (id) ON DELETE CASCADE,
  column_id uuid NOT NULL REFERENCES public.columns (id) ON DELETE CASCADE,
  kan_number integer NOT NULL,
  title text NOT NULL,
  description text,
  tag text,
  priority public.task_priority,
  position double precision NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT tasks_board_kan_number_unique UNIQUE (board_id, kan_number)
);

CREATE INDEX workspaces_user_id_idx ON public.workspaces (user_id);
CREATE INDEX boards_workspace_id_idx ON public.boards (workspace_id);
CREATE INDEX boards_workspace_id_position_idx ON public.boards (workspace_id, position);
CREATE INDEX columns_board_id_idx ON public.columns (board_id);
CREATE INDEX columns_board_id_position_idx ON public.columns (board_id, position);
CREATE INDEX tasks_board_id_idx ON public.tasks (board_id);
CREATE INDEX tasks_column_id_idx ON public.tasks (column_id);
CREATE INDEX tasks_column_id_position_idx ON public.tasks (column_id, position);

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_workspaces_updated_at
  BEFORE UPDATE ON public.workspaces
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_boards_updated_at
  BEFORE UPDATE ON public.boards
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_columns_updated_at
  BEFORE UPDATE ON public.columns
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
