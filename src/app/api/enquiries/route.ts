import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const ALLOWED_BRANDS = ["noir-luxe", "salon-aurora"];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { brand_slug, name, phone, service, message } = body;

    if (!brand_slug || !name || !phone) {
      return NextResponse.json(
        { error: "brand_slug, name, and phone are required" },
        { status: 400 }
      );
    }

    if (!ALLOWED_BRANDS.includes(brand_slug)) {
      return NextResponse.json(
        { error: "Unknown brand" },
        { status: 403 }
      );
    }

    const { error } = await supabase.from("enquiries").insert([
      {
        brand_slug,
        name,
        phone,
        service: service || null,
        message: message || null,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
