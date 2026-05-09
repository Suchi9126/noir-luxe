"use client";
import { useEffect, useRef, useState } from "react";

const experiences = [
  { number: "01", title: "The Tasting Menu", tag: "7 Courses", desc: "A seasonal progression through textures, temperatures, and techniques. Chef Arnav's tasting menu changes with the harvest — never the same twice, always unforgettable.", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80" },
  { number: "02", title: "Private Dining", tag: "Up to 20 Guests", desc: "Exclusive rooms for intimate celebrations. Bespoke menus crafted around your occasion. Every anniversary, proposal, and milestone deserves a stage this extraordinary.", image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=900&q=80" },
  { number: "03", title: "The Wine Journey", tag: "400+ Labels", desc: "A curated cellar assembled over a decade. Our sommelier pairs each course with a wine that transforms the meal into a dialogue between land, vintage, and palate.", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80" },
  { number: "04", title: "Chef's Table", tag: "4 Seats Only", desc: "Seated at the pass. Watch every plate leave the kitchen. A 10-course omakase experience that is entirely personal, entirely unrepeatable.", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80" },
];

export default function DiningExperience() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % experiences.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        .exp-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        @media (max-width: 900px) { .exp-layout { grid-template-columns: 1fr; gap: 2.5rem; } }
        .exp-section { padding: 6rem 2rem; }
        @media (min-width: 768px) { .exp-section { padding: 8rem 4rem; } }
      `}</style>
      <section ref={ref} className="exp-section" style={{ background: "#0A0A0A" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "4rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease" }}>
            <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Experiences</p>
            <h2 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 300 }}>
              Every Visit,<br /><em style={{ color: "#C9A96E" }}>Unforgettable</em>
            </h2>
          </div>
          <div className="exp-layout">
            <div>
              {experiences.map((exp, i) => (
                <div key={exp.number} onClick={() => setActive(i)} style={{ padding: "1.75rem 0", borderBottom: "1px solid rgba(201,169,110,0.08)", cursor: "pointer", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)", transition: `all 0.7s ease ${i * 0.12 + 0.3}s` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <span style={{ color: active === i ? "#C9A96E" : "rgba(201,169,110,0.2)", fontFamily: "Georgia, serif", fontSize: "0.85rem", transition: "color 0.4s", flexShrink: 0 }}>{exp.number}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: active === i ? "0.75rem" : "0", transition: "margin 0.3s" }}>
                        <p style={{ color: active === i ? "#F5F0E8" : "rgba(245,240,232,0.4)", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.15rem", fontWeight: 300, transition: "color 0.4s" }}>{exp.title}</p>
                        {active === i && <span style={{ color: "#C9A96E", border: "1px solid rgba(201,169,110,0.35)", padding: "0.1rem 0.55rem", fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", flexShrink: 0 }}>{exp.tag}</span>}
                      </div>
                      <p style={{ color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.82rem", lineHeight: 1.8, maxHeight: active === i ? "80px" : "0", overflow: "hidden", opacity: active === i ? 1 : 0, transition: "max-height 0.5s ease, opacity 0.4s ease" }}>{exp.desc}</p>
                    </div>
                    <span style={{ color: "#C9A96E", transform: active === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.4s", flexShrink: 0, fontSize: "1.1rem" }}>+</span>
                  </div>
                  {active === i && <div style={{ height: "2px", background: "linear-gradient(to right, #C9A96E, transparent)", marginTop: "1.2rem", animation: "expandBar 5s linear" }} />}
                </div>
              ))}
            </div>
            <div style={{ position: "relative", overflow: "hidden", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)", transition: "all 1s ease 0.5s" }}>
              <img key={active} src={experiences[active].image} alt={experiences[active].title}
                style={{ width: "100%", height: "520px", objectFit: "cover", animation: "fadeIn 0.6s ease" }} />
              <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem" }}>
                <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>{experiences[active].tag}</p>
                <p style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.4rem", fontWeight: 300 }}>{experiences[active].title}</p>
              </div>
              <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", display: "flex", gap: "0.5rem" }}>
                {experiences.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? "24px" : "8px", height: "8px", borderRadius: "4px", background: i === active ? "#C9A96E" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.4s ease", padding: 0 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes expandBar { from { width: 0; } to { width: 100%; } }
          @keyframes fadeIn { from { opacity: 0; transform: scale(1.02); } to { opacity: 1; transform: scale(1); } }
        `}</style>
      </section>
    </>
  );
}
