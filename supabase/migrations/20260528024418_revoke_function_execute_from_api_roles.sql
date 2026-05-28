-- Prevent direct RPC execution of internal trigger/helper functions

REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.assign_kan_number() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_workspace_owner(uuid) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.user_owns_board(uuid) FROM anon, authenticated;
