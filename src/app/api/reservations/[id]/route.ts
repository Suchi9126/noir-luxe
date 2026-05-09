import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const brandSlug = searchParams.get("brand_slug");
  if (!brandSlug) return NextResponse.json({ error: "brand_slug is required" }, { status: 400 });
  const { status } = await req.json();
  const validStatuses = ["pending", "confirmed", "rejected", "cancelled"];
  if (!validStatuses.includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("reservations")
    .update({ status })
    .eq("id", params.id)
    .eq("brand_slug", brandSlug)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
