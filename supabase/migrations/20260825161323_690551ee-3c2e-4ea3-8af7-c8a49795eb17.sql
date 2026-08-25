UPDATE public.tracks
SET audio_url = regexp_replace(audio_url, '^.*/storage/v1/object/public/media/', '/api/public/media/')
WHERE audio_url LIKE '%/storage/v1/object/public/media/%';

UPDATE public.tracks
SET cover_url = regexp_replace(cover_url, '^.*/storage/v1/object/public/media/', '/api/public/media/')
WHERE cover_url LIKE '%/storage/v1/object/public/media/%';

UPDATE public.works
SET image_url = regexp_replace(image_url, '^.*/storage/v1/object/public/media/', '/api/public/media/')
WHERE image_url LIKE '%/storage/v1/object/public/media/%';