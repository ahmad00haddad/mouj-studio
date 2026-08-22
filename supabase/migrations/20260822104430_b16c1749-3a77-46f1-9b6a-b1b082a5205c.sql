BEGIN;

-- 1) Rewrite admin policies to inline the role-membership check against user_roles
--    (user_roles RLS already restricts visibility to the caller's own rows),
--    removing the dependency on the SECURITY DEFINER has_role() function.

DROP POLICY IF EXISTS "admin write works" ON public.works;
CREATE POLICY "admin write works" ON public.works
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role));

DROP POLICY IF EXISTS "admin write services" ON public.services;
CREATE POLICY "admin write services" ON public.services
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role));

DROP POLICY IF EXISTS "admin write site_content" ON public.site_content;
CREATE POLICY "admin write site_content" ON public.site_content
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role));

DROP POLICY IF EXISTS "admin write testimonials" ON public.testimonials;
CREATE POLICY "admin write testimonials" ON public.testimonials
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role));

DROP POLICY IF EXISTS "admin write tracks" ON public.tracks;
CREATE POLICY "admin write tracks" ON public.tracks
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins read contact messages" ON public.contact_messages;
CREATE POLICY "admins read contact messages" ON public.contact_messages
FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins update contact messages" ON public.contact_messages;
CREATE POLICY "admins update contact messages" ON public.contact_messages
FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins delete contact messages" ON public.contact_messages;
CREATE POLICY "admins delete contact messages" ON public.contact_messages
FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role));

-- 2) The SECURITY DEFINER has_role() is no longer referenced by any policy and
--    must not be callable by API roles.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

-- 3) Privilege-escalation hardening: block any direct writes to user_roles from
--    API roles at the table-privilege level (RLS already default-denies this;
--    this makes it explicit and resilient to future policy changes).
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated;

COMMIT;