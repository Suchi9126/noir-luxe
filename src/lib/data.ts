import { supabaseAdmin } from "./supabase";

export async function getMenuItems(brandSlug: string, category?: string, featured?: boolean) {
  if (!brandSlug) return [];
  let query = supabaseAdmin
    .from("menu_items")
    .select("*")
    .eq("brand_slug", brandSlug)
    .eq("is_available", true)
    .order("created_at", { ascending: true });

  if (category) query = query.eq("category", category);
  if (featured) query = query.eq("is_featured", true);

  const { data, error } = await query;
  if (error) { console.error("getMenuItems error:", error); return []; }
  return data || [];
}

export async function getTestimonials(brandSlug: string) {
  if (!brandSlug) return [];
  const { data, error } = await supabaseAdmin
    .from("testimonials")
    .select("*")
    .eq("brand_slug", brandSlug)
    .eq("is_visible", true)
    .order("created_at", { ascending: false });
  if (error) { console.error("getTestimonials error:", error); return []; }
  return data || [];
}

export async function getGalleryItems(brandSlug: string, category?: string) {
  if (!brandSlug) return [];
  let query = supabaseAdmin
    .from("gallery_items")
    .select("*")
    .eq("brand_slug", brandSlug)
    .order("created_at", { ascending: false });
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  if (error) { console.error("getGalleryItems error:", error); return []; }
  return data || [];
}

export async function getReservations(brandSlug: string, status?: string) {
  if (!brandSlug) return [];
  let query = supabaseAdmin
    .from("reservations")
    .select("*")
    .eq("brand_slug", brandSlug)
    .order("date", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) { console.error("getReservations error:", error); return []; }
  return data || [];
}

export async function getStats(brandSlug: string) {
  if (!brandSlug) {
    return { totalReservations: 0, totalMenuItems: 0, upcomingReservations: 0 };
  }
  const [reservations, menu, upcoming] = await Promise.all([
    supabaseAdmin.from("reservations").select("*", { count: "exact", head: true }).eq("brand_slug", brandSlug),
    supabaseAdmin.from("menu_items").select("*", { count: "exact", head: true }).eq("brand_slug", brandSlug).eq("is_available", true),
    supabaseAdmin.from("reservations").select("*", { count: "exact", head: true })
      .eq("brand_slug", brandSlug)
      .gte("date", new Date().toISOString().split("T")[0]).neq("status", "cancelled"),
  ]);
  return {
    totalReservations: reservations.count || 0,
    totalMenuItems: menu.count || 0,
    upcomingReservations: upcoming.count || 0,
  };
}
