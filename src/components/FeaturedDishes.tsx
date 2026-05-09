"use client";
import { useEffect, useRef, useState } from "react";

const dishes = [
  { name: "Seared Wagyu Tenderloin", category: "Chef's Special", price: "₹3,200", image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80" },
  { name: "Truffle Risotto", category: "Signature", price: "₹1,800", image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=600&q=80" },
  { name: "Lobster Bisque", category: "Starter", price: "₹1,200", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" },
  { name: "Dark Chocolate Soufflé", category: "Dessert", price: "₹900", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80" },
  { name: "Pan Seared Duck Breast", category: "Main Course", price: "₹2,400", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80" },
  { name: "Burrata & Heirloom Tomato", category: "Starter", price: "₹950", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80" },
];

export default function FeaturedDishes() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .dishes-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) { .dishes-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .dishes-grid { grid-template-columns: 1fr; } }
        .dishes-section { padding: 6rem 2rem; }
        @media (min-width: 768px) { .dishes-section { padding: 8rem 4rem; } }
      `}</style>
      <section ref={ref} className="dishes-section" style={{ background: "#0D0D0D" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>Signature Dishes</p>
          <div style={{ width: "50px", height: "1px", background: "#C9A96E", margin: "0 auto 1.5rem", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }} />
          <h2 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.3s" }}>Crafted with Precision</h2>
        </div>

        <div className="dishes-grid" style={{ display: "grid", gap: "1.5px", maxWidth: "1200px", margin: "0 auto" }}>
          {dishes.map((dish, i) => (
            <div key={dish.name} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3", cursor: "pointer", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `all 0.7s ease ${0.1 * i + 0.3}s` }}>
              <img src={dish.image} alt={dish.name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered === i ? "scale(1.08)" : "scale(1)", transition: "transform 0.6s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: hovered === i ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0.25)", transition: "background 0.4s ease", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.5rem" }}>
                <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.3rem", opacity: hovered === i ? 1 : 0, transition: "opacity 0.3s ease" }}>{dish.category}</p>
                <p style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.1rem", fontWeight: 400, marginBottom: "0.3rem", transform: hovered === i ? "translateY(0)" : "translateY(10px)", transition: "transform 0.3s ease" }}>{dish.name}</p>
                <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.85rem", opacity: hovered === i ? 1 : 0, transition: "opacity 0.3s ease 0.1s" }}>{dish.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <a href="/menu" style={{ color: "#C9A96E", border: "1px solid #C9A96E", padding: "1rem 2.5rem", fontFamily: "sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textDecoration: "none", textTransform: "uppercase", display: "inline-block", transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#C9A96E"; e.currentTarget.style.color = "#0A0A0A"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C9A96E"; }}>
            View Full Menu
          </a>
        </div>
      </section>
    </>
  );
}
