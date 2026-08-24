import { createFileRoute } from "@tanstack/react-router";

/**
 * Public read-only streaming proxy for the private "media" storage bucket.
 * Public buckets are disabled for this workspace, so site assets (track audio,
 * cover art, CMS images) are served through this route instead.
 *
 * Security: read-only, GET/HEAD only, no user data, path is sanitised to stay
 * inside the bucket, and only known media extensions are served.
 */
const ALLOWED: Record<string, string> = {
  mp3: "audio/mpeg",
  wav: "audio/wav",
  m4a: "audio/mp4",
  ogg: "audio/ogg",
  webm: "video/webm",
  mp4: "video/mp4",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  avif: "image/avif",
};

function safePath(raw: string | undefined): string | null {
  if (!raw) return null;
  const path = decodeURIComponent(raw).replace(/^\/+/, "");
  if (!path || path.includes("..") || path.startsWith("/")) return null;
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED[ext]) return null;
  return path;
}

async function serve(path: string, request: Request) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const ext = path.split(".").pop()!.toLowerCase();

  // Signed URL keeps the bucket private while allowing browser range requests
  const { data, error } = await supabaseAdmin.storage
    .from("media")
    .createSignedUrl(path, 60 * 60);

  if (error || !data?.signedUrl) {
    return new Response("Not found", { status: 404 });
  }

  const range = request.headers.get("range");
  const upstream = await fetch(data.signedUrl, {
    headers: range ? { Range: range } : undefined,
    method: request.method === "HEAD" ? "GET" : request.method,
  });

  if (!upstream.ok && upstream.status !== 206) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", ALLOWED[ext]);
  headers.set("Cache-Control", "public, max-age=86400, s-maxage=604800");
  headers.set("Accept-Ranges", "bytes");
  for (const h of ["content-length", "content-range", "etag"]) {
    const v = upstream.headers.get(h);
    if (v) headers.set(h, v);
  }

  if (request.method === "HEAD") {
    return new Response(null, { status: upstream.status, headers });
  }
  return new Response(upstream.body, { status: upstream.status, headers });
}

export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const path = safePath((params as { _splat?: string })._splat);
        if (!path) return new Response("Bad request", { status: 400 });
        return serve(path, request);
      },
      HEAD: async ({ request, params }) => {
        const path = safePath((params as { _splat?: string })._splat);
        if (!path) return new Response("Bad request", { status: 400 });
        return serve(path, request);
      },
    },
  },
});
