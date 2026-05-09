"use client";
import { useState, useEffect } from "react";

const categories = ["All", "Starters", "Mains", "Desserts", "Cocktails", "Chef's Specials"];
const categoryMap: Record<string, string> = { "Starters": "starters", "Mains": "mains", "Desserts": "desserts", "Cocktails": "cocktails", "Chef's Specials": "specials" };
const tagColors: Record<string, string> = { "Signature": "#C9A96E", "Chef's Pick": "#9B7FD4", "Vegetarian": "#4CAF8A", "Seasonal": "#E8A87C", "Must Try": "#C9A96E", "Exclusive": "#C9A96E" };

export default function MenuClient({ initialItems }: { initialItems: any[] }) {
  const [active, setActive] = useState("All");
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [items, setItems] = useState(initialItems);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  useEffect(() => {
    if (active === "All") { setItems(initialItems); return; }
    const cat = categoryMap[active];
    setItems(initialItems.filter((i: any) => i.category === cat));
  }, [active, initialItems]);

  const displayItems = items.length > 0 ? items : initialItems.filter((i: any) =>
    active === "All" ? true : i.category === categoryMap[active]
  );

  return (
    <>
      <section style={{ position: "relative", height: "40vh", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80" alt="Menu" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.3)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem", opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.3s" }}>Noir & Co.</p>
          <h1 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 300, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 1s ease 0.5s" }}>Our Menu</h1>
        </div>
      </section>

      <section style={{ background: "#0D0D0D", padding: "2.5rem 2rem", borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{ background: active === cat ? "rgba(201,169,110,0.1)" : "transparent", border: `1px solid ${active === cat ? "#C9A96E" : "rgba(201,169,110,0.2)"}`, color: active === cat ? "#C9A96E" : "rgba(245,240,232,0.4)", padding: "0.6rem 1.5rem", fontFamily: "sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s ease" }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <style>{`
          .menu-grid { grid-template-columns: repeat(2, 1fr); }
          @media (max-width: 700px) { .menu-grid { grid-template-columns: 1fr; } }
        `}</style>
        <div className="menu-grid" style={{ display: "grid", gap: "1.5px", background: "rgba(201,169,110,0.06)" }}>
          {displayItems.map((item: any, i: number) => (
            <div key={item.id || item.name} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ display: "flex", gap: "1.5rem", padding: "1.75rem", background: hovered === i ? "#141414" : "#0D0D0D", transition: "background 0.3s ease", borderBottom: "1px solid rgba(201,169,110,0.06)" }}>
              <div style={{ width: "85px", height: "85px", flexShrink: 0, overflow: "hidden" }}>
                <img src={item.image_url || item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered === i ? "scale(1.1)" : "scale(1)", transition: "transform 0.5s ease" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.35rem" }}>
                  <p style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.1rem" }}>{item.name}</p>
                  <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.88rem", flexShrink: 0, marginLeft: "1rem" }}>₹{Number(item.price).toLocaleString()}</p>
                </div>
                <p style={{ color: "rgba(245,240,232,0.38)", fontFamily: "sans-serif", fontSize: "0.78rem", lineHeight: 1.7, marginBottom: "0.5rem" }}>{item.description || item.desc}</p>
                {item.tag && <span style={{ color: tagColors[item.tag] || "#C9A96E", border: `1px solid ${tagColors[item.tag] || "#C9A96E"}`, padding: "0.15rem 0.55rem", fontFamily: "sans-serif", fontSize: "0.54rem", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.85 }}>{item.tag}</span>}
              </div>
            </div>
          ))}
        </div>
        {displayItems.length === 0 && <p style={{ textAlign: "center", color: "rgba(245,240,232,0.2)", fontFamily: "sans-serif", padding: "4rem", fontSize: "0.85rem" }}>No items found in this category.</p>}
        <p style={{ textAlign: "center", color: "rgba(245,240,232,0.2)", fontFamily: "sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", marginTop: "2.5rem", lineHeight: 1.8 }}>All prices inclusive of taxes · Menu subject to seasonal changes · Please inform us of allergies</p>
      </section>
    </>
  );
}
