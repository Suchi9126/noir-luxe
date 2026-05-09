"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <>
      <style>{`
        .hero-title { font-size: clamp(2.8rem, 8vw, 7rem); }
        .hero-subtitle { font-size: clamp(0.8rem, 2vw, 1rem); }
        .hero-btns { flex-direction: row; }
        .hero-stats { gap: 3rem; }
        .hero-stat-num { font-size: 1.8rem; }
        @media (max-width: 600px) {
          .hero-btns { flex-direction: column; align-items: center; }
          .hero-stats { gap: 1.5rem; }
          .hero-stat-num { font-size: 1.4rem; }
        }
      `}</style>
      <section style={{ position: "relative", height: "100vh", width: "100%", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury dining"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transform: loaded ? "scale(1.03)" : "scale(1.1)", transition: "transform 8s ease-out" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.75) 100%)" }} />

        <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 1s ease 0.2s", marginBottom: "1.5rem" }}>
            <div style={{ width: "30px", height: "1px", background: "#C9A96E" }} />
            <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Fine Dining · Est. 2012</p>
            <div style={{ width: "30px", height: "1px", background: "#C9A96E" }} />
          </div>

          <h1 className="hero-title" style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontWeight: 300, letterSpacing: "0.04em", lineHeight: 1.1, marginBottom: "1.5rem", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 1.2s ease 0.4s", textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}>
            An Experience<br /><em style={{ color: "#C9A96E", fontStyle: "italic" }}>Beyond</em> Dining
          </h1>

          <p className="hero-subtitle" style={{ color: "rgba(245,240,232,0.7)", fontFamily: "sans-serif", letterSpacing: "0.12em", fontWeight: 300, marginBottom: "3rem", maxWidth: "480px", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 1s ease 0.7s" }}>
            Tasting menus crafted with intention.<br />Every detail, deliberate.
          </p>

          <div className="hero-btns" style={{ display: "flex", gap: "1rem", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 1s ease 0.9s" }}>
            <Link href="/reservations" style={{ color: "#0A0A0A", background: "#C9A96E", padding: "1rem 2.2rem", fontFamily: "sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textDecoration: "none", textTransform: "uppercase", transition: "background 0.3s ease" }}
              onMouseEnter={e => e.currentTarget.style.background = "#E8D5B0"}
              onMouseLeave={e => e.currentTarget.style.background = "#C9A96E"}>
              Reserve a Table
            </Link>
            <Link href="/menu" style={{ color: "#F5F0E8", background: "transparent", border: "1px solid rgba(245,240,232,0.4)", padding: "1rem 2.2rem", fontFamily: "sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textDecoration: "none", textTransform: "uppercase", transition: "all 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.color = "#C9A96E"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,240,232,0.4)"; e.currentTarget.style.color = "#F5F0E8"; }}>
              Explore Menu
            </Link>
          </div>

          <div className="hero-stats" style={{ position: "absolute", bottom: "2.5rem", display: "flex", opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.2s" }}>
            {[["12", "Years of Excellence"], ["3", "Michelin Stars"], ["200+", "Signature Dishes"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center", padding: "0 1.5rem", borderRight: "1px solid rgba(201,169,110,0.15)" }}>
                <p className="hero-stat-num" style={{ color: "#C9A96E", fontFamily: "Cormorant Garamond, Georgia, serif", fontWeight: 300, letterSpacing: "0.05em" }}>{num}</p>
                <p style={{ color: "rgba(245,240,232,0.45)", fontFamily: "sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
