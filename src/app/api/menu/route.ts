import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function isAdmin(req: NextRequest) {
  return req.headers.get("authorization") === `Bearer ${process.env.ADMIN_SECRET}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  let query = supabaseAdmin.from("menu_items").select("*").eq("is_available", true).order("created_at", { ascending: true });
  if (category) query = query.eq("category", category);
  if (featured === "true") query = query.eq("is_featured", true);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { name, description, price, category, image_url, tag } = body;
  if (!name || !price || !category) return NextResponse.json({ error: "Name, price, category required" }, { status: 400 });

  const { data, error } = await supabaseAdmin.from("menu_items").insert({ name, description, price: Number(price), category, image_url, tag: tag || "" }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}
