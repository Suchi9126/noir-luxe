"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#080808", borderTop: "1px solid rgba(201,169,110,0.15)", padding: "5rem 4rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "4rem", marginBottom: "4rem" }}>

        {/* Brand */}
        <div>
          <p style={{ color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "1.5rem", letterSpacing: "0.3em", marginBottom: "1rem" }}>NOIR & CO.</p>
          <p style={{ color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.85rem", lineHeight: 1.8, maxWidth: "280px", marginBottom: "2rem" }}>
            A sanctuary of fine dining where every meal becomes a memory, and every guest becomes part of our story.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            {["Instagram", "Facebook", "Twitter"].map((s) => (
              <a key={s} href="#" style={{ color: "rgba(201,169,110,0.6)", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", textDecoration: "none", border: "1px solid rgba(201,169,110,0.2)", padding: "0.4rem 0.8rem", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#C9A96E"; e.currentTarget.style.borderColor = "#C9A96E"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(201,169,110,0.6)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)"; }}>
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div>
          <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Explore</p>
          {["Menu", "About", "Gallery", "Reservations", "Contact"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} style={{ display: "block", color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.75rem", transition: "color 0.3s ease" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.4)")}>
              {item}
            </Link>
          ))}
        </div>

        {/* Hours */}
        <div>
          <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Hours</p>
          {[["Tue – Thu", "7 PM – 11 PM"], ["Fri – Sat", "12 PM – 11 PM"], ["Sunday", "12 PM – 9 PM"], ["Monday", "Closed"]].map(([day, time]) => (
            <div key={day} style={{ marginBottom: "0.75rem" }}>
              <p style={{ color: "rgba(245,240,232,0.6)", fontFamily: "sans-serif", fontSize: "0.8rem" }}>{day}</p>
              <p style={{ color: "rgba(245,240,232,0.3)", fontFamily: "sans-serif", fontSize: "0.75rem" }}>{time}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Contact</p>
          <p style={{ color: "rgba(245,240,232,0.5)", fontFamily: "sans-serif", fontSize: "0.85rem", lineHeight: 1.8, marginBottom: "1rem" }}>12 Lavelle Road, Bengaluru, Karnataka 560001</p>
          <p style={{ color: "rgba(245,240,232,0.5)", fontFamily: "sans-serif", fontSize: "0.85rem", marginBottom: "0.5rem" }}>+91 98765 43210</p>
          <p style={{ color: "rgba(245,240,232,0.5)", fontFamily: "sans-serif", fontSize: "0.85rem" }}>hello@noirandco.in</p>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(201,169,110,0.1)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ color: "rgba(245,240,232,0.2)", fontFamily: "sans-serif", fontSize: "0.75rem" }}>© 2026 Noir & Co. All rights reserved.</p>
        <p style={{ color: "rgba(245,240,232,0.2)", fontFamily: "sans-serif", fontSize: "0.75rem" }}>Crafted with intention.</p>
      </div>
    </footer>
  );
}
