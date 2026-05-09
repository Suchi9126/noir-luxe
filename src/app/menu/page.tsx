"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "Starters", "Mains", "Desserts", "Cocktails", "Chef's Specials"];

const menuItems = [
  { name: "Burrata & Heirloom Tomato", desc: "Buffalo burrata, heirloom tomatoes, aged balsamic, micro basil", price: "₹950", category: "Starters", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80", tag: "Vegetarian" },
  { name: "Seared Scallops", desc: "Pan-seared king scallops, cauliflower purée, crispy capers, brown butter", price: "₹1,400", category: "Starters", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=400&q=80", tag: "Chef's Pick" },
  { name: "Lobster Bisque", desc: "Slow-cooked bisque, cognac cream, chive oil, toasted brioche", price: "₹1,200", category: "Starters", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", tag: "" },
  { name: "Truffle Arancini", desc: "Arborio rice, black truffle, parmesan foam, truffle oil drizzle", price: "₹850", category: "Starters", image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=400&q=80", tag: "Vegetarian" },
  { name: "Seared Wagyu Tenderloin", desc: "200g A5 Wagyu, bone marrow jus, pomme purée, seasonal greens", price: "₹3,200", category: "Mains", image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80", tag: "Signature" },
  { name: "Pan Seared Duck Breast", desc: "Duck breast, cherry jus, spiced lentil, wilted spinach", price: "₹2,400", category: "Mains", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80", tag: "" },
  { name: "Black Truffle Risotto", desc: "Carnaroli rice, black truffle, aged parmesan, truffle butter", price: "₹1,800", category: "Mains", image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=400&q=80", tag: "Vegetarian" },
  { name: "Butter Poached Lobster", desc: "Atlantic lobster tail, saffron beurre blanc, asparagus, caviar", price: "₹3,600", category: "Mains", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=80", tag: "Chef's Pick" },
  { name: "Dark Chocolate Soufflé", desc: "Valrhona dark chocolate, vanilla crème anglaise, gold leaf", price: "₹900", category: "Desserts", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80", tag: "Signature" },
  { name: "Crème Brûlée", desc: "Madagascar vanilla bean custard, caramelised sugar crust, fresh berries", price: "₹750", category: "Desserts", image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=400&q=80", tag: "" },
  { name: "Mango Panna Cotta", desc: "Alphonso mango, coconut panna cotta, passion fruit gel, sesame tuile", price: "₹700", category: "Desserts", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80", tag: "Seasonal" },
  { name: "The Noir Martini", desc: "Grey Goose vodka, black sesame, activated charcoal, smoked salt rim", price: "₹1,100", category: "Cocktails", image: "https://images.unsplash.com/photo-1543253687-c931c8e01820?auto=format&fit=crop&w=400&q=80", tag: "Signature" },
  { name: "Saffron Old Fashioned", desc: "Bourbon, saffron syrup, orange bitters, smoked rosemary", price: "₹1,000", category: "Cocktails", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80", tag: "" },
  { name: "Rose & Lychee Spritz", desc: "Hendricks gin, lychee liqueur, rose water, elderflower tonic", price: "₹950", category: "Cocktails", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=400&q=80", tag: "" },
  { name: "7-Course Tasting Menu", desc: "Chef Arnav's seasonal progression. Proteins, vegetables, sea, earth — a complete journey.", price: "₹6,500", category: "Chef's Specials", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80", tag: "Must Try" },
  { name: "Chef's Table Experience", desc: "Private 4-seat counter, 10-course omakase. Personalised. Exclusive. Book 7 days in advance.", price: "₹12,000", category: "Chef's Specials", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80", tag: "Exclusive" },
];

const tagColors: Record<string, string> = {
  "Signature": "#C9A96E",
  "Chef's Pick": "#9B7FD4",
  "Vegetarian": "#4CAF8A",
  "Seasonal": "#E8A87C",
  "Must Try": "#C9A96E",
  "Exclusive": "#C9A96E",
};

export default function MenuPage() {
  const [active, setActive] = useState("All");
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const filtered = active === "All" ? menuItems : menuItems.filter(i => i.category === active);

  return (
    <main style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Banner */}
      <section style={{ position: "relative", height: "40vh", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80"
          alt="Menu" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem", opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.3s" }}>Noir & Co.</p>
          <h1 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 300, letterSpacing: "0.05em", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 1s ease 0.5s" }}>Our Menu</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem", opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.7s" }}>
            <div style={{ width: "40px", height: "1px", background: "#C9A96E" }} />
            <p style={{ color: "rgba(245,240,232,0.5)", fontFamily: "sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em" }}>Crafted with Intention</p>
            <div style={{ width: "40px", height: "1px", background: "#C9A96E" }} />
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ background: "#0D0D0D", padding: "3rem 4rem", borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              background: "transparent", border: `1px solid ${active === cat ? "#C9A96E" : "rgba(201,169,110,0.2)"}`,
              color: active === cat ? "#C9A96E" : "rgba(245,240,232,0.4)",
              padding: "0.6rem 1.8rem", fontFamily: "sans-serif", fontSize: "0.7rem",
              letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer",
              transition: "all 0.3s ease",
              ...(active === cat ? { background: "rgba(201,169,110,0.08)" } : {})
            }}
              onMouseEnter={e => { if (active !== cat) { e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)"; e.currentTarget.style.color = "rgba(245,240,232,0.7)"; }}}
              onMouseLeave={e => { if (active !== cat) { e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)"; e.currentTarget.style.color = "rgba(245,240,232,0.4)"; }}}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Grid */}
      <section ref={ref} style={{ padding: "5rem 4rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5px", background: "rgba(201,169,110,0.08)" }}>
          {filtered.map((item, i) => (
            <div key={item.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex", gap: "1.5rem", padding: "2rem",
                background: hovered === i ? "#141414" : "#0D0D0D",
                transition: "background 0.3s ease", cursor: "default",
                borderBottom: "1px solid rgba(201,169,110,0.06)"
              }}>
              <div style={{ width: "90px", height: "90px", flexShrink: 0, overflow: "hidden" }}>
                <img src={item.image} alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered === i ? "scale(1.1)" : "scale(1)", transition: "transform 0.5s ease" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                  <p style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.15rem", fontWeight: 400 }}>{item.name}</p>
                  <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.9rem", flexShrink: 0, marginLeft: "1rem" }}>{item.price}</p>
                </div>
                <p style={{ color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.8rem", lineHeight: 1.7, marginBottom: "0.6rem" }}>{item.desc}</p>
                {item.tag && (
                  <span style={{
                    color: tagColors[item.tag] || "#C9A96E",
                    border: `1px solid ${tagColors[item.tag] || "#C9A96E"}`,
                    padding: "0.15rem 0.6rem", fontFamily: "sans-serif",
                    fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase",
                    opacity: 0.8
                  }}>{item.tag}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p style={{ textAlign: "center", color: "rgba(245,240,232,0.25)", fontFamily: "sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", marginTop: "3rem", lineHeight: 1.8 }}>
          All prices are inclusive of taxes. Menu is subject to seasonal changes.<br />
          Please inform us of any allergies or dietary requirements.
        </p>
      </section>

      <Footer />
    </main>
  );
}
