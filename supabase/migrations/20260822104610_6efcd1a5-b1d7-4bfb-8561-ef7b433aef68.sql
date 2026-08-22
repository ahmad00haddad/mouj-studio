REVOKE ALL PRIVILEGES ON public.user_roles FROM anon, authenticated;
GRANT SELECT ON public.user_roles TO authenticated;