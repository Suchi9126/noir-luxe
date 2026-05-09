import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client for browser use
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side API routes only
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// TypeScript types
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "starters" | "mains" | "desserts" | "cocktails" | "specials";
  image_url: string;
  tag: string;
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
};

export type Reservation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time_slot: string;
  guest_count: number;
  special_requests: string;
  status: "pending" | "confirmed" | "rejected" | "cancelled";
  created_at: string;
};

export type GalleryItem = {
  id: string;
  image_url: string;
  caption: string;
  category: string;
  created_at: string;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  location: string;
  review: string;
  rating: number;
  is_visible: boolean;
  created_at: string;
};
