import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/send-email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const form = await request.formData();
          const name = String(form.get("name") || "").trim();
          const email = String(form.get("email") || "").trim();
          const message = String(form.get("message") || "").trim();
          if (!name || !email || !message) return new Response("error", { status: 400 });
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return new Response("error", { status: 400 });
          if (name.length > 200 || email.length > 255 || message.length > 5000) {
            return new Response("error", { status: 400 });
          }
          // Email delivery requires a provider integration; log for now.
          console.log("[contact] new message", { name, email, message });
          return new Response("success");
        } catch {
          return new Response("error", { status: 500 });
        }
      },
    },
  },
});
