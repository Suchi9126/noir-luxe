"use client";
import { useEffect, useRef } from "react";
const qrActions = [
  { label: "Book a Table", icon: "📅", msg: "I would like to book a table at Noir Luxe." },
  { label: "WhatsApp Us", icon: "💬", msg: "Hi, I have a question about Noir Luxe." },
  { label: "View Menu", icon: "🍽️", msg: "Can you share the menu?" },
  { label: "Get Directions", icon: "📍", msg: "How do I get to Noir Luxe?" },
  { label: "Leave a Review", icon: "⭐", msg: "I would like to share my experience." },
  { label: "Private Dining", icon: "🕯️", msg: "I am interested in private dining." },
];
export default function QRActionCenter() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("qr-visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".qr-card").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={ref} style={{ padding: "6rem 0", background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ width: "min(1180px, calc(100% - 2rem))", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#D4AF37", textTransform: "uppercase", letterSpacing: ".18em", fontSize: ".78rem", fontWeight: 700 }}>QR Action Center</p>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff", margin: ".6rem 0 1rem", lineHeight: 1.1 }}>One tap. Every action.</h2>
          <p style={{ color: "rgba(255,255,255,.5)", maxWidth: "52ch", margin: "0 auto" }}>Each action auto-fills a WhatsApp message — no friction for your customers.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px,100%), 1fr))", gap: "1rem" }}>
          {qrActions.map((action) => (
            <a key={action.label} href={"https://wa.me/?text=" + encodeURIComponent(action.msg)} target="_blank" rel="noopener noreferrer"
              className="qr-card qr-btn"
              style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem 1.4rem", borderRadius: "18px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", color: "#fff", textDecoration: "none", cursor: "pointer", transition: "background .18s, border-color .18s, transform .18s" }}>
              <span style={{ fontSize: "1.8rem" }}>{action.icon}</span>
              <div>
                <strong style={{ display: "block", fontSize: ".98rem" }}>{action.label}</strong>
                <span style={{ color: "rgba(255,255,255,.45)", fontSize: ".82rem" }}>{action.msg}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
