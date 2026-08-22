// ============================================================
// Cinematic motion layer — scroll reveals, magnetic buttons,
// hero parallax and UI hover sounds. Progressive enhancement:
// everything is applied from JS, so no-JS / SSR stays clean.
// ============================================================
import { tick, unlockAudio } from "./player";

const REVEAL_SEL =
  ".section-head,.page-head,.stat-card,.svc,.work,.track,.testi,.gear-card,.process-step,.pillar,.faq-item,.contact-info,.contact-form,.cta-block,.hero .bento,.stats-grid,.clients,.gear,.process,.pillars";

const MAGNETIC_SEL = ".btn,.nav-cta,.track-play,.pp-play";
const HOVER_SOUND_SEL = "a,button,.track,.svc,.work";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fine = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches;

let io: IntersectionObserver | null = null;

function setupReveals(root: ParentNode) {
  if (reduced()) return;
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("rev-in");
            io?.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
  }
  root.querySelectorAll<HTMLElement>(REVEAL_SEL).forEach((el) => {
    if (el.dataset.rev) return;
    el.dataset.rev = "1";
    // stagger siblings
    const sibs = el.parentElement
      ? Array.from(el.parentElement.querySelectorAll(":scope > " + el.tagName.toLowerCase() + REVEAL_SEL.split(",").map(() => ""))
      )
      : [];
    void sibs; // sibling math kept simple below
    const idx = el.parentElement
      ? Array.from(el.parentElement.children).filter((c) =>
          (c as HTMLElement).dataset?.rev,
        ).length
      : 0;
    el.style.setProperty("--rd", `${Math.min(idx, 7) * 70}ms`);
    el.classList.add("rev");
    io!.observe(el);
  });
}

function setupMagnetic(root: ParentNode) {
  if (reduced() || !fine()) return;
  root.querySelectorAll<HTMLElement>(MAGNETIC_SEL).forEach((el) => {
    if (el.dataset.mag) return;
    el.dataset.mag = "1";
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.translate = `${Math.max(-6, Math.min(6, dx * 0.18))}px ${Math.max(
        -5,
        Math.min(5, dy * 0.22),
      )}px`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.translate = "0px 0px";
    });
  });
}

let parallaxBound = false;
function setupParallax() {
  if (parallaxBound || reduced() || !fine()) return;
  parallaxBound = true;
  let raf = 0;
  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const y = window.scrollY;
      document
        .querySelectorAll<HTMLElement>("[data-parallax]")
        .forEach((el) => {
          const f = parseFloat(el.dataset.parallax || "0.08");
          const r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return;
          el.style.translate = `0 ${y * f}px`;
        });
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

let soundBound = false;
function setupHoverSounds() {
  if (soundBound || !fine()) return;
  soundBound = true;
  document.addEventListener(
    "pointerover",
    (e) => {
      const el = (e.target as HTMLElement).closest?.(HOVER_SOUND_SEL);
      if (!el) return;
      // only when entering from outside the matched element
      const from = (e as PointerEvent).relatedTarget as HTMLElement | null;
      if (from && el.contains(from)) return;
      tick("hover");
    },
    { passive: true },
  );
  document.addEventListener(
    "pointerdown",
    (e) => {
      unlockAudio();
      if ((e.target as HTMLElement).closest?.(HOVER_SOUND_SEL)) tick("tap");
    },
    { passive: true },
  );
}

/** Idempotent — call after every route render / CMS content load. */
export function initCinematic(root: ParentNode = document) {
  if (typeof window === "undefined") return;
  setupReveals(root);
  setupMagnetic(root);
  setupParallax();
  setupHoverSounds();
}
