"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "Ambience", "Dishes", "Events", "Interior"];

const images = [
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80", category: "Ambience", caption: "The Main Dining Hall" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80", category: "Interior", caption: "Private Dining Suite" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", category: "Dishes", caption: "Lobster Bisque" },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80", category: "Dishes", caption: "Duck Breast en Croûte" },
  { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=80", category: "Dishes", caption: "Black Truffle Risotto" },
  { src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=800&q=80", category: "Ambience", caption: "Evening Service" },
  { src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=800&q=80", category: "Events", caption: "Private Celebration" },
  { src: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80", category: "Interior", caption: "The Wine Cellar" },
  { src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80", category: "Ambience", caption: "Candlelit Dinner" },
  { src: "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?auto=format&fit=crop&w=800&q=80", category: "Dishes", caption: "Seasonal Tasting Plate" },
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80", category: "Dishes", caption: "Seared Wagyu Tenderloin" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80", category: "Dishes", caption: "Chocolate Soufflé" },
  { src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80", category: "Events", caption: "Wine Pairing Dinner" },
  { src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80", category: "Events", caption: "Chef's Table Evening" },
  { src: "https://images.unsplash.com/photo-1428515613728-6b4607e44363?auto=format&fit=crop&w=800&q=80", category: "Interior", caption: "The Bar Lounge" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(i => i !== null ? Math.min(filtered.length - 1, i + 1) : null);
      if (e.key === "ArrowLeft") setLightbox(i => i !== null ? Math.max(0, i - 1) : null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  const filtered = active === "All" ? images : images.filter(i => i.category === active);

  return (
    <main style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Banner */}
      <section style={{ position: "relative", height: "40vh", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=1920&q=80"
          alt="Gallery" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.3)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem", opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.3s" }}>Noir & Co.</p>
          <h1 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 300, letterSpacing: "0.05em", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 1s ease 0.5s" }}>Gallery</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem", opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.7s" }}>
            <div style={{ width: "40px", height: "1px", background: "#C9A96E" }} />
            <p style={{ color: "rgba(245,240,232,0.5)", fontFamily: "sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em" }}>Moments Worth Remembering</p>
            <div style={{ width: "40px", height: "1px", background: "#C9A96E" }} />
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ background: "#0D0D0D", padding: "2.5rem 2rem", borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              background: active === cat ? "rgba(201,169,110,0.1)" : "transparent",
              border: `1px solid ${active === cat ? "#C9A96E" : "rgba(201,169,110,0.2)"}`,
              color: active === cat ? "#C9A96E" : "rgba(245,240,232,0.4)",
              padding: "0.6rem 1.6rem", fontFamily: "sans-serif", fontSize: "0.68rem",
              letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s ease"
            }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section style={{ padding: "4rem 2rem", maxWidth: "1300px", margin: "0 auto" }}>
        <style>{`
          .masonry { columns: 3 300px; column-gap: 12px; }
          @media (max-width: 700px) { .masonry { columns: 2 160px; } }
          @media (max-width: 400px) { .masonry { columns: 1; } }
          .masonry-item { break-inside: avoid; margin-bottom: 12px; cursor: pointer; overflow: hidden; position: relative; }
          .masonry-item img { display: block; width: 100%; transition: transform 0.6s ease; }
          .masonry-item:hover img { transform: scale(1.05); }
          .masonry-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0); transition: background 0.4s ease; display: flex; align-items: flex-end; padding: 1.2rem; }
          .masonry-item:hover .masonry-overlay { background: rgba(0,0,0,0.55); }
          .masonry-caption { color: #F5F0E8; fontFamily: sans-serif; font-size: 0.78rem; letter-spacing: 0.1em; opacity: 0; transform: translateY(8px); transition: all 0.3s ease; }
          .masonry-item:hover .masonry-caption { opacity: 1; transform: translateY(0); }
        `}</style>
        <div className="masonry">
          {filtered.map((img, i) => (
            <div key={img.src + i} className="masonry-item" onClick={() => setLightbox(i)}>
              <img src={img.src} alt={img.caption} loading="lazy" />
              <div className="masonry-overlay">
                <div>
                  <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{img.category}</p>
                  <p className="masonry-caption">{img.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", color: "#C9A96E", background: "none", border: "1px solid rgba(201,169,110,0.3)", width: "44px", height: "44px", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
          <button onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? Math.max(0, i - 1) : null); }}
            style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", color: "#C9A96E", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(201,169,110,0.3)", width: "44px", height: "44px", fontSize: "1.4rem", cursor: "pointer" }}>‹</button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: "900px", width: "100%", textAlign: "center" }}>
            <img src={filtered[lightbox]?.src} alt={filtered[lightbox]?.caption}
              style={{ width: "100%", maxHeight: "75vh", objectFit: "contain" }} />
            <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "1rem" }}>{filtered[lightbox]?.caption}</p>
            <p style={{ color: "rgba(245,240,232,0.3)", fontFamily: "sans-serif", fontSize: "0.62rem", marginTop: "0.5rem" }}>{lightbox + 1} / {filtered.length}</p>
          </div>
          <button onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? Math.min(filtered.length - 1, i + 1) : null); }}
            style={{ position: "absolute", right: "1.5rem", top: "50%", transform: "translateY(-50%)", color: "#C9A96E", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(201,169,110,0.3)", width: "44px", height: "44px", fontSize: "1.4rem", cursor: "pointer" }}>›</button>
        </div>
      )}

      <Footer />
    </main>
  );
}
