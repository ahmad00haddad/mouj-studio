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
  const { data, error } = await supabase.from("works" as never).select("*").eq("published", true).order("sort_order");
  if (error) throw error;
  return (data ?? []) as unknown as Work[];
}
export async function fetchAllWorks(): Promise<Work[]> {
  const { data, error } = await supabase.from("works" as never).select("*").order("sort_order");
  if (error) throw error;
  return (data ?? []) as unknown as Work[];
}
export async function fetchServices(): Promise<Service[]> {
  const { data, error } = await supabase.from("services" as never).select("*").eq("published", true).order("sort_order");
  if (error) throw error;
  return (data ?? []) as unknown as Service[];
}
export async function fetchAllServices(): Promise<Service[]> {
  const { data, error } = await supabase.from("services" as never).select("*").order("sort_order");
  if (error) throw error;
  return (data ?? []) as unknown as Service[];
}
export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase.from("testimonials" as never).select("*").eq("published", true).order("sort_order");
  if (error) throw error;
  return (data ?? []) as unknown as Testimonial[];
}
export async function fetchAllTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase.from("testimonials" as never).select("*").order("sort_order");
  if (error) throw error;
  return (data ?? []) as unknown as Testimonial[];
}
export async function fetchSiteContent(): Promise<Record<string, Record<string, unknown>>> {
  const { data, error } = await supabase.from("site_content" as never).select("*");
  if (error) throw error;
  const out: Record<string, Record<string, unknown>> = {};
  for (const r of (data ?? []) as unknown as SiteContentRow[]) out[r.key] = r.value ?? {};
  return out;
}