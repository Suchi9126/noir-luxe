import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function isAdmin(req: NextRequest) {
  return req.headers.get("authorization") === `Bearer ${process.env.ADMIN_SECRET}`;
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const brandSlug = searchParams.get("brand_slug");
  if (!brandSlug) return NextResponse.json({ error: "brand_slug is required" }, { status: 400 });
  const body = await req.json();
  const { brand_slug: _ignored, ...updates } = body;
  const { data, error } = await supabaseAdmin
    .from("menu_items")
    .update(updates)
    .eq("id", params.id)
    .eq("brand_slug", brandSlug)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const brandSlug = searchParams.get("brand_slug");
  if (!brandSlug) return NextResponse.json({ error: "brand_slug is required" }, { status: 400 });
  const { error } = await supabaseAdmin
    .from("menu_items")
    .update({ is_available: false })
    .eq("id", params.id)
    .eq("brand_slug", brandSlug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
