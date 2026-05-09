"use client";
const actions = [
  { label: "Book a table for tonight", emoji: "🍽️" },
  { label: "Private dining enquiry", emoji: "🕯️" },
  { label: "Corporate event booking", emoji: "🏢" },
  { label: "View menu", emoji: "👨‍🍳" },
];
export default function WhatsAppActions() {
  return (
    <section style={{ padding: "5rem 0", background: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,.05)" }}>
      <div style={{ width: "min(1180px, calc(100% - 2rem))", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
        <div>
          <p style={{ color: "#D4AF37", textTransform: "uppercase", letterSpacing: ".18em", fontSize: ".78rem", fontWeight: 700 }}>WhatsApp Smart Actions</p>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff", margin: ".6rem 0 1rem", lineHeight: 1.1 }}>One message. Instant response.</h2>
          <p style={{ color: "rgba(255,255,255,.5)" }}>Every button pre-fills a WhatsApp message so your customers reach you in one tap.</p>
        </div>
        <div style={{ display: "grid", gap: ".85rem" }}>
          {actions.map(a => (
            <a key={a.label} href={"https://wa.me/?text=" + encodeURIComponent(a.label)} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.1rem 1.25rem", borderRadius: "16px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", color: "#fff", textDecoration: "none" }}>
              <span style={{ fontSize: "1.5rem" }}>{a.emoji}</span>
              <span>{a.label}</span>
              <span style={{ marginLeft: "auto", color: "#25D366" }}>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
