"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ReservationCTA() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1920&q=80"
        alt="Private dining" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)" }} />
      <div style={{ position: "relative", zIndex: 10, padding: "10rem 4rem", textAlign: "center" }}>
        <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "2rem", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>Reservations</p>
        <h2 style={{ color: "#F5F0E8", fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, lineHeight: 1.2, marginBottom: "1.5rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 1s ease 0.2s" }}>
          Reserve Your<br /><em style={{ color: "#C9A96E" }}>Table Tonight</em>
        </h2>
        <p style={{ color: "rgba(245,240,232,0.6)", fontFamily: "sans-serif", fontSize: "0.9rem", letterSpacing: "0.1em", marginBottom: "3rem", opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.4s" }}>
          Tuesday through Sunday · Lunch 12–3 PM · Dinner 7–11 PM
        </p>
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.6s" }}>
          <Link href="/reservations" style={{ color: "#0A0A0A", background: "#C9A96E", padding: "1.1rem 3rem", fontFamily: "sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textDecoration: "none", textTransform: "uppercase", transition: "all 0.3s ease" }}
            onMouseEnter={e => e.currentTarget.style.background = "#E8D5B0"}
            onMouseLeave={e => e.currentTarget.style.background = "#C9A96E"}>
            Book a Table
          </Link>
          <a href="tel:+919876543210" style={{ color: "#F5F0E8", background: "transparent", border: "1px solid rgba(245,240,232,0.4)", padding: "1.1rem 3rem", fontFamily: "sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textDecoration: "none", textTransform: "uppercase", transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.color = "#C9A96E"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,240,232,0.4)"; e.currentTarget.style.color = "#F5F0E8"; }}>
            Call +91 98765 43210
          </a>
        </div>
      </div>
    </section>
  );
}
