"use client";
import { useEffect, useRef, useState } from "react";

export default function ChefSpotlight() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "#111", padding: "8rem 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem", alignItems: "center" }}>

        {/* Image Side */}
        <div style={{
          position: "relative",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-60px)",
          transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s"
        }}>
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=700&h=850&q=80"
            alt="Chef Arnav Mehta"
            style={{ width: "100%", height: "620px", objectFit: "cover", objectPosition: "center top", display: "block" }}
          />
          {/* Gold frame accent */}
          <div style={{
            position: "absolute", top: "2rem", left: "2rem", right: "-2rem", bottom: "-2rem",
            border: "1px solid rgba(201,169,110,0.25)", zIndex: -1
          }} />
          {/* Floating award badge */}
          <div style={{
            position: "absolute", bottom: "3rem", right: "-3rem",
            background: "#C9A96E", color: "#0A0A0A",
            padding: "2rem", textAlign: "center", width: "130px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) rotate(-3deg)" : "translateY(20px)",
            transition: "all 1s ease 0.8s"
          }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "2.5rem", fontWeight: 700, lineHeight: 1 }}>3</p>
            <p style={{ fontFamily: "sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.4rem" }}>Michelin Stars</p>
          </div>

          {/* Decorative vertical text */}
          <p style={{
            position: "absolute", top: "50%", left: "-3.5rem",
            transform: "translateY(-50%) rotate(-90deg)",
            color: "rgba(201,169,110,0.3)", fontFamily: "sans-serif",
            fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase",
            whiteSpace: "nowrap"
          }}>
            Executive Chef · Since 2012
          </p>
        </div>

        {/* Text Side */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(60px)",
          transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s"
        }}>
          <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Meet the Chef
          </p>

          <h2 style={{
            color: "#F5F0E8", fontFamily: "Georgia, serif",
            fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)", fontWeight: 300,
            lineHeight: 1.15, marginBottom: "0.5rem"
          }}>
            Chef Arnav<br />
            <em style={{ color: "#C9A96E", fontStyle: "italic" }}>Mehta</em>
          </h2>

          <p style={{
            color: "rgba(245,240,232,0.35)", fontFamily: "sans-serif",
            fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "2.5rem"
          }}>
            Executive Chef & Culinary Director
          </p>

          <div style={{ width: "50px", height: "1px", background: "#C9A96E", marginBottom: "2.5rem" }} />

          <p style={{
            color: "rgba(245,240,232,0.7)", fontFamily: "sans-serif",
            fontSize: "0.95rem", lineHeight: 2, marginBottom: "1.5rem", maxWidth: "460px"
          }}>
            Born in Jaipur, trained in the kitchens of Lyon and refined across three continents — Chef Arnav's cuisine is a love letter to Indian spice told through French discipline.
          </p>

          <p style={{
            color: "rgba(245,240,232,0.45)", fontFamily: "sans-serif",
            fontSize: "0.9rem", lineHeight: 1.9, marginBottom: "3rem", maxWidth: "460px"
          }}>
            Every plate that leaves his kitchen is a statement: that restraint is the highest form of expression, and that simplicity earned through mastery is the rarest luxury.
          </p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginBottom: "3rem" }}>
            {[["18+", "Years"], ["Lyon", "Trained"], ["320+", "Recipes"]].map(([num, label]) => (
              <div key={label} style={{ borderLeft: "1px solid rgba(201,169,110,0.2)", paddingLeft: "1.2rem" }}>
                <p style={{ color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 300 }}>{num}</p>
                <p style={{ color: "rgba(245,240,232,0.35)", fontFamily: "sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.3rem" }}>{label}</p>
              </div>
            ))}
          </div>

          <a href="/about" style={{
            color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.75rem",
            letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: "0.75rem",
            borderBottom: "1px solid rgba(201,169,110,0.3)", paddingBottom: "0.3rem",
            transition: "all 0.3s ease"
          }}
            onMouseEnter={e => { e.currentTarget.style.gap = "1.5rem"; e.currentTarget.style.borderColor = "#C9A96E"; }}
            onMouseLeave={e => { e.currentTarget.style.gap = "0.75rem"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"; }}>
            Chef's Story <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
