CREATE TABLE public.tracks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  artist text,
  role text,
  cover_url text,
  audio_url text,
  external_url text,
  tags text[] NOT NULL DEFAULT '{}'::text[],
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.tracks TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tracks TO authenticated;
GRANT ALL ON public.tracks TO service_role;

ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read tracks" ON public.tracks FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin write tracks" ON public.tracks FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER tracks_touch_updated_at BEFORE UPDATE ON public.tracks
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.tracks (title, artist, role, external_url, tags, sort_order) VALUES
('Rah Telhaqni (راح تلحقني)', 'MOUJE feat. Desana', 'Composition · Production · Mix', 'https://www.youtube.com/results?search_query=mouje+rah+telhaqni', ARRAY['original','electronic'], 10),
('Saken (ساكن)', 'MOUJE', 'Original · Electronic Synthpop', 'https://www.youtube.com/results?search_query=mouje+saken', ARRAY['original','synthpop'], 20),
('Dream Dream Dream (Acapella Cover)', 'MOUJE', 'Arrangement · Vocals · Mix — endorsed by Madeon', 'https://www.youtube.com/results?search_query=madeon+dream+dream+dream+acapella+cover', ARRAY['cover','acapella'], 30),
('Ertidad — Debut Album', 'Ertidad', 'Production · Mix · Master · Keys', NULL, ARRAY['album','band'], 40),
('Youm Jadeed — Podcast Theme', 'Sowt × Mouje', 'Sound Design · Score', NULL, ARRAY['podcast','score'], 50),
('Jawaker World Cup Radio — Bed & Stings', 'Jawaker', 'Audio Direction · Live Broadcast', NULL, ARRAY['games','broadcast'], 60);