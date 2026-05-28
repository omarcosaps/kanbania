-- Harden function permissions and search_path

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.assign_kan_number() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_workspace_owner(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.user_owns_board(uuid) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.set_updated_at() TO postgres, service_role;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres, service_role;
GRANT EXECUTE ON FUNCTION public.assign_kan_number() TO postgres, service_role;
GRANT EXECUTE ON FUNCTION public.is_workspace_owner(uuid) TO postgres, service_role;
GRANT EXECUTE ON FUNCTION public.user_owns_board(uuid) TO postgres, service_role;
