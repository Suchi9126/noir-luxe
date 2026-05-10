import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const TIME_SLOTS = ["7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM","10:00 PM","10:30 PM"];
const MAX_PER_SLOT = 6;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, date, time_slot, guest_count, special_requests, brand_slug: brandSlug } = body;
    if (!brandSlug) return NextResponse.json({ error: "brand_slug is required" }, { status: 400 });

    // Validation
    if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!email?.match(/^[^@]+@[^@]+\.[^@]+$/)) return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    if (!phone?.match(/^[0-9+\-\s]{8,15}$/)) return NextResponse.json({ error: "Valid phone required" }, { status: 400 });
    if (!date) return NextResponse.json({ error: "Date is required" }, { status: 400 });
    if (new Date(date) < new Date(new Date().toDateString())) return NextResponse.json({ error: "Date cannot be in the past" }, { status: 400 });
    if (!TIME_SLOTS.includes(time_slot)) return NextResponse.json({ error: "Invalid time slot" }, { status: 400 });
    if (!guest_count || guest_count < 1 || guest_count > 20) return NextResponse.json({ error: "Guest count must be 1–20" }, { status: 400 });

    // Check slot capacity
    const { count } = await supabase
      .from("reservations")
      .select("*", { count: "exact", head: true })
      .eq("brand_slug", brandSlug)
      .eq("date", date)
      .eq("time_slot", time_slot)
      .neq("status", "rejected")
      .neq("status", "cancelled");

    if ((count ?? 0) >= MAX_PER_SLOT) {
      return NextResponse.json({ error: "This time slot is fully booked. Please choose another time." }, { status: 409 });
    }

    // Insert reservation
    const { data, error } = await supabase
      .from("reservations")
      .insert({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), date, time_slot, guest_count: Number(guest_count), special_requests: special_requests?.trim() || "", brand_slug: brandSlug })
      .select("id, name, date, time_slot, guest_count")
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, reservation: data }, { status: 201 });
  } catch (err) {
    console.error("Reservation error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);
  const status = searchParams.get("status");
  const brandSlug = searchParams.get("brand_slug");
  if (!brandSlug) return NextResponse.json({ error: "brand_slug is required" }, { status: 400 });

  let query = supabase
    .from("reservations")
    .select("*", { count: "exact" })
    .eq("brand_slug", brandSlug)
    .order("date", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);
  if (status) query = query.eq("status", status);

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, total: count, page, limit });
}
