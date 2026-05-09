import { supabaseAdmin } from "./supabase";

export async function getMenuItems(category?: string, featured?: boolean) {
  let query = supabaseAdmin
    .from("menu_items")
    .select("*")
    .eq("is_available", true)
    .order("created_at", { ascending: true });

  if (category) query = query.eq("category", category);
  if (featured) query = query.eq("is_featured", true);

  const { data, error } = await query;
  if (error) { console.error("getMenuItems error:", error); return []; }
  return data || [];
}

export async function getTestimonials() {
  const { data, error } = await supabaseAdmin
    .from("testimonials")
    .select("*")
    .eq("is_visible", true)
    .order("created_at", { ascending: false });
  if (error) { console.error("getTestimonials error:", error); return []; }
  return data || [];
}

export async function getGalleryItems(category?: string) {
  let query = supabaseAdmin
    .from("gallery_items")
    .select("*")
    .order("created_at", { ascending: false });
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  if (error) { console.error("getGalleryItems error:", error); return []; }
  return data || [];
}

export async function getReservations(status?: string) {
  let query = supabaseAdmin
    .from("reservations")
    .select("*")
    .order("date", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) { console.error("getReservations error:", error); return []; }
  return data || [];
}

export async function getStats() {
  const [reservations, menu, upcoming] = await Promise.all([
    supabaseAdmin.from("reservations").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("menu_items").select("*", { count: "exact", head: true }).eq("is_available", true),
    supabaseAdmin.from("reservations").select("*", { count: "exact", head: true })
      .gte("date", new Date().toISOString().split("T")[0]).neq("status", "cancelled"),
  ]);
  return {
    totalReservations: reservations.count || 0,
    totalMenuItems: menu.count || 0,
    upcomingReservations: upcoming.count || 0,
  };
}
