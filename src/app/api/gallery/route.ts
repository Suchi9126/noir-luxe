import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const brandSlug = searchParams.get("brand_slug");
  if (!brandSlug) {
    return NextResponse.json({ error: "brand_slug is required" }, { status: 400 });
  }
  let query = supabase
    .from("gallery_items")
    .select("*")
    .eq("brand_slug", brandSlug)
    .order("created_at", { ascending: false });
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data ?? [] });
}
