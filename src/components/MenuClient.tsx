"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const categories = ["All","Starters","Mains","Desserts","Cocktails","Chef's Specials"];
const categoryMap: Record<string, string> = {
  "Starters": "starters", "Mains": "mains",
  "Desserts": "desserts", "Cocktails": "cocktails", "Chef's Specials": "specials"
};
const tagColors: Record<string, string> = {
  "Signature": "#C9A96E", "Chef's Pick": "#9B7FD4",
  "Vegetarian": "#5DB888", "Seasonal": "#E8A87C",
  "Must Try": "#C9A96E", "Exclusive": "#C9A96E"
};

export default function MenuClient({ initialItems }: { initialItems: any[] }) {
  const [active, setActive] = useState("All");
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const displayItems = active === "All"
    ? initialItems
    : initialItems.filter((i) => i.category === categoryMap[active]);

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", height: "40vh", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80"
          alt="Menu" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.3)" }}
        />
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <p style={{ color:"#C9A96E", fontFamily:"sans-serif", fontSize:"0.7rem", letterSpacing:"0.4em", textTransform:"uppercase", marginBottom:"1rem", opacity: visible ? 1 : 0, transition:"opacity 1s ease 0.3s" }}>
            Noir & Co.
          </p>
          <h1 style={{ color:"#F5F0E8", fontFamily:"Cormorant Garamond, Georgia, serif", fontSize:"clamp(3rem,6vw,5rem)", fontWeight:300, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition:"all 1s ease 0.5s" }}>
            Our Menu
          </h1>
        </div>
      </section>

      {/* Filters */}
      <section style={{ background:"#0D0D0D", padding:"2.5rem 2rem", borderBottom:"1px solid rgba(201,169,110,0.1)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", gap:"0.5rem", flexWrap:"wrap", justifyContent:"center" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              background: active === cat ? "rgba(201,169,110,0.1)" : "transparent",
              border: `1px solid ${active === cat ? "#C9A96E" : "rgba(201,169,110,0.2)"}`,
              color: active === cat ? "#C9A96E" : "rgba(245,240,232,0.4)",
              padding:"0.6rem 1.5rem", fontFamily:"sans-serif", fontSize:"0.68rem",
              letterSpacing:"0.2em", textTransform:"uppercase", cursor:"pointer",
              transition:"all 0.3s ease"
            }}>{cat}</button>
          ))}
        </div>
      </section>

      {/* Menu Grid */}
      <section style={{ padding:"4rem 2rem", maxWidth:"1200px", margin:"0 auto" }}>
        {displayItems.length === 0 ? (
          <div style={{ textAlign:"center", padding:"5rem 2rem" }}>
            <p style={{ color:"rgba(201,169,110,0.4)", fontFamily:"Cormorant Garamond,Georgia,serif", fontSize:"1.5rem", fontWeight:300, marginBottom:"0.75rem" }}>
              No items in this category
            </p>
            <p style={{ color:"rgba(245,240,232,0.2)", fontFamily:"sans-serif", fontSize:"0.78rem" }}>
              Check back soon — our menu changes with the season.
            </p>
          </div>
        ) : (
          <div className="menu-grid" style={{ display:"grid", gap:"1px", background:"rgba(201,169,110,0.07)" }}>
            {displayItems.map((item: any, i: number) => (
              <div key={item.id || i} className="menu-item-row" style={{
                display:"flex", gap:"1.4rem", padding:"1.75rem",
                background: hovered === i ? "#141414" : "#0D0D0D",
                transition:"background 0.3s ease", cursor:"default"
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              >
                <div style={{ width:"80px", height:"80px", flexShrink:0, overflow:"hidden", background:"#1A1A1A" }}>
                  {item.image_url ? (
                    <img
                      src={item.image_url} alt={item.name}
                      className="menu-item-img"
                      style={{ width:"100%", height:"100%", objectFit:"cover" }}
                      loading="lazy"
                      onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : (
                    <div style={{ width:"100%", height:"100%", background:"#1A1A1A", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ color:"rgba(201,169,110,0.2)", fontSize:"1.5rem" }}>✦</span>
                    </div>
                  )}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"1rem", marginBottom:"0.35rem" }}>
                    <p style={{ color:"#F5F0E8", fontFamily:"Cormorant Garamond,Georgia,serif", fontSize:"1.08rem", lineHeight:1.3 }}>
                      {item.name}
                    </p>
                    <p style={{ color:"#C9A96E", fontFamily:"sans-serif", fontSize:"0.88rem", fontWeight:500, flexShrink:0 }}>
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <p style={{ color:"rgba(245,240,232,0.38)", fontFamily:"sans-serif", fontSize:"0.78rem", lineHeight:1.75, marginBottom:"0.5rem", overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" as any }}>
                    {item.description}
                  </p>
                  {item.tag && (
                    <span style={{
                      color: tagColors[item.tag] || "#C9A96E",
                      border: `1px solid ${tagColors[item.tag] || "#C9A96E"}`,
                      padding:"0.12rem 0.5rem", fontFamily:"sans-serif",
                      fontSize:"0.54rem", letterSpacing:"0.15em", textTransform:"uppercase", opacity:0.8
                    }}>{item.tag}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer note */}
        <div style={{ textAlign:"center", marginTop:"3rem", paddingTop:"2rem", borderTop:"1px solid rgba(201,169,110,0.08)" }}>
          <p style={{ color:"rgba(245,240,232,0.18)", fontFamily:"sans-serif", fontSize:"0.68rem", letterSpacing:"0.1em", lineHeight:2 }}>
            All prices are inclusive of taxes · Menu subject to seasonal change<br />
            Please inform your server of any dietary requirements or allergies
          </p>
          <Link href="/reservations" style={{ display:"inline-block", marginTop:"2rem", color:"#C9A96E", border:"1px solid #C9A96E", padding:"0.85rem 2.5rem", fontFamily:"sans-serif", fontSize:"0.7rem", letterSpacing:"0.25em", textTransform:"uppercase", textDecoration:"none", transition:"all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#C9A96E"; e.currentTarget.style.color = "#0A0A0A"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C9A96E"; }}>
            Reserve a Table →
          </Link>
        </div>
      </section>
    </>
  );
}
