"use client";
import { useState, useEffect } from "react";

const categories = ["All","Ambience","Dishes","Events","Interior"];

const fallbackItems = [
  { id:"1", src:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", image_url:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", category:"Ambience", caption:"The Main Dining Hall" },
  { id:"2", src:"https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", image_url:"https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", category:"Interior", caption:"Private Dining Suite" },
  { id:"3", src:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", image_url:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", category:"Dishes", caption:"Lobster Bisque" },
  { id:"4", src:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80", image_url:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80", category:"Dishes", caption:"Duck Breast" },
  { id:"5", src:"https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80", image_url:"https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80", category:"Events", caption:"Private Celebration" },
  { id:"6", src:"https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", image_url:"https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80", category:"Interior", caption:"The Wine Cellar" },
  { id:"7", src:"https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80", image_url:"https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80", category:"Dishes", caption:"Seared Wagyu" },
  { id:"8", src:"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80", image_url:"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80", category:"Events", caption:"Wine Pairing Dinner" },
];

import AnimatedSection from "@/components/AnimatedSection";
export default function GalleryClient({ initialItems }: { initialItems: any[] }) {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const items = initialItems.length > 0 ? initialItems : fallbackItems;

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(i => i !== null ? Math.min(filtered.length - 1, i + 1) : null);
      if (e.key === "ArrowLeft") setLightbox(i => i !== null ? Math.max(0, i - 1) : null);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lightbox]);

  const filtered = active === "All" ? items : items.filter((i: any) => i.category === active);

  return (
    <>
      {/* Hero */}
      <section style={{ position:"relative", height:"40vh", overflow:"hidden" }}>
        <img src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=1920&q=80"
          alt="Gallery" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.3)" }} />
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <p style={{ color:"#C9A96E", fontFamily:"sans-serif", fontSize:"0.7rem", letterSpacing:"0.4em", textTransform:"uppercase", marginBottom:"1rem", opacity: visible ? 1 : 0, transition:"opacity 1s ease 0.3s" }}>Noir & Co.</p>
          <h1 style={{ color:"#F5F0E8", fontFamily:"Cormorant Garamond,Georgia,serif", fontSize:"clamp(3rem,6vw,5rem)", fontWeight:300, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition:"all 1s ease 0.5s" }}>Gallery</h1>
        </div>
        </AnimatedSection>
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
              letterSpacing:"0.2em", textTransform:"uppercase", cursor:"pointer", transition:"all 0.3s ease"
            }}>{cat}</button>
          ))}
        </div>
        </AnimatedSection>
      </section>

      {/* Masonry */}
      <section style={{ padding:"4rem 2rem", maxWidth:"1300px", margin:"0 auto" }}>
        <div className="masonry">
          {filtered.map((img: any, i: number) => (
            <div key={img.id || i} className="m-item" onClick={() => setLightbox(i)}>
              <img src={img.image_url || img.src} alt={img.caption} loading="lazy"
                onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=60"; }} />
              <div className="m-overlay">
                <div>
                  <p style={{ color:"#C9A96E", fontSize:"0.55rem", letterSpacing:"0.2em", textTransform:"uppercase", fontFamily:"sans-serif", marginBottom:"0.2rem" }}>{img.category}</p>
                  <p className="m-caption">{img.caption}</p>
                </div>
        </AnimatedSection>
              </div>
        </AnimatedSection>
            </div>
        </AnimatedSection>
          ))}
        </div>
        </AnimatedSection>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.96)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem" }}>
          <button onClick={() => setLightbox(null)} style={{ position:"absolute", top:"1.5rem", right:"1.5rem", color:"#C9A96E", background:"none", border:"1px solid rgba(201,169,110,0.3)", width:"44px", height:"44px", fontSize:"1.1rem", cursor:"pointer" }}>✕</button>
          <button onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? Math.max(0, i-1) : null); }}
            style={{ position:"absolute", left:"1rem", top:"50%", transform:"translateY(-50%)", color:"#C9A96E", background:"rgba(0,0,0,0.5)", border:"1px solid rgba(201,169,110,0.3)", width:"44px", height:"44px", fontSize:"1.4rem", cursor:"pointer" }}>‹</button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth:"900px", width:"100%", textAlign:"center" }}>
            <img src={filtered[lightbox]?.image_url || filtered[lightbox]?.src} alt={filtered[lightbox]?.caption}
              style={{ width:"100%", maxHeight:"75vh", objectFit:"contain" }} />
            <p style={{ color:"#C9A96E", fontFamily:"sans-serif", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", marginTop:"1rem" }}>{filtered[lightbox]?.caption}</p>
            <p style={{ color:"rgba(245,240,232,0.25)", fontSize:"0.62rem", fontFamily:"sans-serif", marginTop:"0.4rem" }}>{lightbox+1} / {filtered.length}</p>
          </div>
        </AnimatedSection>
          <button onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? Math.min(filtered.length-1, i+1) : null); }}
            style={{ position:"absolute", right:"1rem", top:"50%", transform:"translateY(-50%)", color:"#C9A96E", background:"rgba(0,0,0,0.5)", border:"1px solid rgba(201,169,110,0.3)", width:"44px", height:"44px", fontSize:"1.4rem", cursor:"pointer" }}>›</button>
        </div>
        </AnimatedSection>
      )}
    </>
  );
}
