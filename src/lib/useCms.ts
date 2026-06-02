import { useEffect, useState } from "react";
import {
  fetchSiteContent, fetchWorks, fetchServices, fetchTestimonials,
  type Work, type Service, type Testimonial,
} from "./cms";

type Content = Record<string, Record<string, unknown>>;
type Cache = { content: Content; works: Work[]; services: Service[]; testimonials: Testimonial[] };

let cache: Cache = { content: {}, works: [], services: [], testimonials: [] };
let loaded = false;
let loading = false;
const listeners = new Set<() => void>();

async function loadAll() {
  if (loading || loaded) return;
  loading = true;
  try {
    const [content, works, services, testimonials] = await Promise.all([
      fetchSiteContent().catch(() => ({})),
      fetchWorks().catch(() => []),
      fetchServices().catch(() => []),
      fetchTestimonials().catch(() => []),
    ]);
    cache = { content: content as Content, works, services, testimonials };
    loaded = true;
  } finally {
    loading = false;
    listeners.forEach((l) => l());
  }
}

export function useCms(): Cache & { loaded: boolean } {
  const [, force] = useState(0);
  useEffect(() => {
    const cb = () => force((x) => x + 1);
    listeners.add(cb);
    if (!loaded) loadAll();
    return () => { listeners.delete(cb); };
  }, []);
  return { ...cache, loaded };
}

export function s(content: Content | undefined, key: string, field: string, fallback: string): string {
  const v = content?.[key]?.[field];
  return typeof v === "string" && v.trim() ? v : fallback;
}

export function list<T = unknown>(content: Content | undefined, key: string, field: string, fallback: T[]): T[] {
  const v = content?.[key]?.[field];
  return Array.isArray(v) && v.length ? (v as T[]) : fallback;
}