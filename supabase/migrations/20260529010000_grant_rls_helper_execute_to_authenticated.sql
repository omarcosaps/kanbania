-- RLS policies invoke these helpers on every boards/columns/tasks query.
-- authenticated must be able to EXECUTE them; revoking broke INSERT/SELECT via PostgREST.

GRANT EXECUTE ON FUNCTION public.is_workspace_owner(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.user_owns_board(uuid) TO authenticated;
