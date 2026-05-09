"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem; }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; } }
        @media (max-width: 500px) { .footer-grid { grid-template-columns: 1fr; gap: 2.5rem; } }
        .footer-bottom { flex-direction: row; }
        @media (max-width: 600px) { .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; } }
        .footer-section { padding: 4rem 2rem 2rem; }
        @media (min-width: 768px) { .footer-section { padding: 5rem 4rem 2rem; } }
      `}</style>
      <footer className="footer-section" style={{ background: "#080808", borderTop: "1px solid rgba(201,169,110,0.12)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", marginBottom: "3rem" }}>
            <div>
              <p style={{ color: "#C9A96E", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.4rem", letterSpacing: "0.3em", marginBottom: "1rem" }}>NOIR & CO.</p>
              <p style={{ color: "rgba(245,240,232,0.35)", fontFamily: "sans-serif", fontSize: "0.82rem", lineHeight: 1.9, maxWidth: "260px", marginBottom: "1.5rem" }}>
                A sanctuary of fine dining where every meal becomes a memory, and every guest becomes part of our story.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {["Instagram", "Facebook", "Twitter"].map((s) => (
                  <a key={s} href="#" style={{ color: "rgba(201,169,110,0.5)", fontFamily: "sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", textDecoration: "none", border: "1px solid rgba(201,169,110,0.15)", padding: "0.4rem 0.75rem", transition: "all 0.3s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#C9A96E"; e.currentTarget.style.borderColor = "#C9A96E"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(201,169,110,0.5)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.15)"; }}>
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Explore</p>
              {["Menu", "About", "Gallery", "Reservations", "Contact"].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} style={{ display: "block", color: "rgba(245,240,232,0.35)", fontFamily: "sans-serif", fontSize: "0.82rem", textDecoration: "none", marginBottom: "0.7rem", transition: "color 0.3s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.35)")}>
                  {item}
                </Link>
              ))}
            </div>

            <div>
              <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Hours</p>
              {[["Tue – Thu", "7 PM – 11 PM"], ["Fri – Sat", "12 PM – 11 PM"], ["Sunday", "12 PM – 9 PM"], ["Monday", "Closed"]].map(([day, time]) => (
                <div key={day} style={{ marginBottom: "0.8rem" }}>
                  <p style={{ color: "rgba(245,240,232,0.55)", fontFamily: "sans-serif", fontSize: "0.8rem" }}>{day}</p>
                  <p style={{ color: "rgba(245,240,232,0.25)", fontFamily: "sans-serif", fontSize: "0.75rem" }}>{time}</p>
                </div>
              ))}
            </div>

            <div>
              <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Contact</p>
              <p style={{ color: "rgba(245,240,232,0.45)", fontFamily: "sans-serif", fontSize: "0.82rem", lineHeight: 1.8, marginBottom: "0.8rem" }}>12 Lavelle Road<br />Bengaluru 560001</p>
              <p style={{ color: "rgba(245,240,232,0.45)", fontFamily: "sans-serif", fontSize: "0.82rem", marginBottom: "0.4rem" }}>+91 98765 43210</p>
              <p style={{ color: "rgba(245,240,232,0.45)", fontFamily: "sans-serif", fontSize: "0.82rem" }}>hello@noirandco.in</p>
            </div>
          </div>

          <div className="footer-bottom" style={{ borderTop: "1px solid rgba(201,169,110,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ color: "rgba(245,240,232,0.18)", fontFamily: "sans-serif", fontSize: "0.72rem" }}>© 2026 Noir & Co. All rights reserved.</p>
            <p style={{ color: "rgba(245,240,232,0.18)", fontFamily: "sans-serif", fontSize: "0.72rem" }}>Crafted with intention.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
