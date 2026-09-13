import { supabase } from "@/integrations/supabase/client";

export type Work = {
  id: string;
  title: string;
  client: string | null;
  role: string | null;
  year: string | null;
  image_url: string | null;
  tags: string[];
  sort_order: number;
  published: boolean;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  icon: string | null;
  description: string | null;
  features: string[];
  wide: boolean;
  sort_order: number;
  published: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string | null;
  sort_order: number;
  published: boolean;
};

export type SiteContentRow = { key: string; value: Record<string, unknown> };

export async function fetchWorks(): Promise<Work[]> {
  try {
    const { data, error } = await supabase.from("works" as never).select("*").eq("published", true).order("sort_order");
    if (!error && data && data.length > 0) return data as unknown as Work[];
  } catch (e) {}
  return [];
}
export async function fetchAllWorks(): Promise<Work[]> {
  try {
    const { data, error } = await supabase.from("works" as never).select("*").order("sort_order");
    if (!error && data && data.length > 0) return data as unknown as Work[];
  } catch (e) {}
  return [];
}
export async function fetchServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase.from("services" as never).select("*").eq("published", true).order("sort_order");
    if (!error && data && data.length > 0) return data as unknown as Service[];
  } catch (e) {}
  return [];
}
export async function fetchAllServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase.from("services" as never).select("*").order("sort_order");
    if (!error && data && data.length > 0) return data as unknown as Service[];
  } catch (e) {}
  return [];
}
export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase.from("testimonials" as never).select("*").eq("published", true).order("sort_order");
    if (!error && data && data.length > 0) return data as unknown as Testimonial[];
  } catch (e) {}
  return [];
}
export async function fetchAllTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase.from("testimonials" as never).select("*").order("sort_order");
    if (!error && data && data.length > 0) return data as unknown as Testimonial[];
  } catch (e) {}
  return [];
}
export async function fetchSiteContent(): Promise<Record<string, Record<string, unknown>>> {
  try {
    const { data, error } = await supabase.from("site_content" as never).select("*");
    if (!error && data) {
      const out: Record<string, Record<string, unknown>> = {};
      for (const r of data as unknown as SiteContentRow[]) out[r.key] = r.value ?? {};
      return out;
    }
  } catch (e) {}
  return {};
}
export type Track = {
  id: string;
  title: string;
  artist: string | null;
  role: string | null;
  cover_url: string | null;
  audio_url: string | null;
  external_url: string | null;
  tags: string[];
  sort_order: number;
  published: boolean;
};

export async function fetchTracks(): Promise<Track[]> {
  return [
    {
      id: "rahtelhaqni",
      title: "Rah Telhaqni (راح تلحقني)",
      artist: "MOUJE feat. Desana",
      cover_url: "https://img.youtube.com/vi/qGzOumAFimA/hqdefault.jpg",
      audio_url: "/assets/audio/rahtelhaqni.mp3",
      link_url: "https://www.youtube.com/watch?v=qGzOumAFimA",
      duration: 180,
      sort_order: 1,
      published: true
    },
    {
      id: "saken",
      title: "Saken (ساكن)",
      artist: "MOUJE",
      cover_url: "https://img.youtube.com/vi/uzZFOYXfDnA/hqdefault.jpg",
      audio_url: "/assets/audio/saken.mp3",
      link_url: "https://www.youtube.com/watch?v=uzZFOYXfDnA",
      duration: 161,
      sort_order: 2,
      published: true
    },
    {
      id: "dream",
      title: "Dream Dream Dream (Acapella Cover)",
      artist: "MOUJE",
      cover_url: "https://img.youtube.com/vi/ivWObD7kW_c/hqdefault.jpg",
      audio_url: "/assets/audio/dream.mp3",
      link_url: "https://www.youtube.com/watch?v=ivWObD7kW_c",
      duration: 130,
      sort_order: 3,
      published: true
    },
    {
      id: "amal",
      title: "Amal (أمل)",
      artist: "MOUJE",
      cover_url: "https://img.youtube.com/vi/FvUKmQ-7yYA/hqdefault.jpg",
      audio_url: "/assets/audio/amal.mp3",
      link_url: "https://www.youtube.com/watch?v=FvUKmQ-7yYA",
      duration: 215,
      sort_order: 4,
      published: true
    }
  ];
}
export async function fetchAllTracks(): Promise<Track[]> {
  return fetchTracks();
}
