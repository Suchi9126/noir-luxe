import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const brandSlug = searchParams.get("brand_slug");
  if (!brandSlug) return NextResponse.json({ error: "brand_slug is required" }, { status: 400 });
  const { data, error } = await supabaseAdmin
    .from("testimonials")
    .select("*")
    .eq("brand_slug", brandSlug)
    .eq("is_visible", true)
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
