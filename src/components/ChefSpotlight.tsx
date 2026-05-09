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
    <>
      <style>{`
        .chef-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7rem; align-items: center; }
        .chef-badge { right: -3rem; }
        @media (max-width: 900px) {
          .chef-grid { grid-template-columns: 1fr; gap: 3rem; }
          .chef-badge { right: 1rem; }
        }
        .chef-section { padding: 6rem 2rem; }
        @media (min-width: 768px) { .chef-section { padding: 8rem 4rem; } }
      `}</style>
      <section ref={ref} className="chef-section" style={{ background: "#111", overflow: "hidden" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="chef-grid">
            <div style={{ position: "relative", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-60px)", transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
              <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=700&h=850&q=80"
                alt="Chef Arnav Mehta" style={{ width: "100%", height: "580px", objectFit: "cover", objectPosition: "center top", display: "block" }} />
              <div style={{ position: "absolute", top: "2rem", left: "2rem", right: "-2rem", bottom: "-2rem", border: "1px solid rgba(201,169,110,0.2)", zIndex: -1 }} />
              <div className="chef-badge" style={{ position: "absolute", bottom: "3rem", background: "#C9A96E", color: "#0A0A0A", padding: "1.5rem", textAlign: "center", width: "120px", opacity: visible ? 1 : 0, transform: visible ? "rotate(-3deg)" : "translateY(20px) rotate(-3deg)", transition: "all 1s ease 0.8s" }}>
                <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "2.2rem", fontWeight: 700, lineHeight: 1 }}>3</p>
                <p style={{ fontFamily: "sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.3rem" }}>Michelin Stars</p>
              </div>
            </div>

            <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(60px)", transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s" }}>
              <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Meet the Chef</p>
              <h2 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: "0.5rem" }}>
                Chef Arnav<br /><em style={{ color: "#C9A96E" }}>Mehta</em>
              </h2>
              <p style={{ color: "rgba(245,240,232,0.3)", fontFamily: "sans-serif", fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "2rem" }}>Executive Chef & Culinary Director</p>
              <div style={{ width: "45px", height: "1px", background: "#C9A96E", marginBottom: "2rem" }} />
              <p style={{ color: "rgba(245,240,232,0.7)", fontFamily: "sans-serif", fontSize: "0.92rem", lineHeight: 2, marginBottom: "1.5rem" }}>
                Born in Jaipur, trained in the kitchens of Lyon — Chef Arnav's cuisine is a love letter to Indian spice told through French discipline.
              </p>
              <p style={{ color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.88rem", lineHeight: 1.9, marginBottom: "2.5rem" }}>
                Every plate is a statement: that restraint is the highest form of expression, and simplicity earned through mastery is the rarest luxury.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "2.5rem" }}>
                {[["18+", "Years"], ["Lyon", "Trained"], ["320+", "Recipes"]].map(([num, label]) => (
                  <div key={label} style={{ borderLeft: "1px solid rgba(201,169,110,0.2)", paddingLeft: "1rem" }}>
                    <p style={{ color: "#C9A96E", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.5rem", fontWeight: 300 }}>{num}</p>
                    <p style={{ color: "rgba(245,240,232,0.3)", fontFamily: "sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.3rem" }}>{label}</p>
                  </div>
                ))}
              </div>
              <a href="/about" style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid rgba(201,169,110,0.3)", paddingBottom: "0.3rem", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.gap = "1.5rem"; e.currentTarget.style.borderColor = "#C9A96E"; }}
                onMouseLeave={e => { e.currentTarget.style.gap = "0.75rem"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"; }}>
                Chef's Story <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
