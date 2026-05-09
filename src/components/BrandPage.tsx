"use client";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/brands/noir-luxe";

const toRgba = (hex: string, alpha: number) => {
  const cleaned = hex.replace("#", "");
  const full = cleaned.length === 3
    ? cleaned.split("").map((c) => c + c).join("")
    : cleaned;
  const int = Number.parseInt(full, 16);
  if (Number.isNaN(int) || full.length !== 6) return `rgba(0, 0, 0, ${alpha})`;
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function BrandPage({ brand }: { brand: Brand }) {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const refs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisible(prev => new Set([...prev, e.target.id]));
      }),
      { threshold: 0.1 }
    );
    refs.current.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const reg = (id: string) => (el: HTMLElement | null) => {
    if (el) { el.id = id; refs.current.set(id, el); }
  };

  const rv = (id: string, delay = 0): React.CSSProperties => ({
    opacity: visible.has(id) ? 1 : 0,
    transform: visible.has(id) ? "translateY(0)" : "translateY(28px)",
    transition: `opacity .7s ${delay}s cubic-bezier(.16,1,.3,1), transform .7s ${delay}s cubic-bezier(.16,1,.3,1)`,
  });

  const share = async () => {
    if (navigator.share) await navigator.share({ title: brand.name, text: brand.tagline, url: window.location.href });
    else { await navigator.clipboard.writeText(window.location.href); alert("Link copied!"); }
  };

  const ac = brand.accentColor;
  const wrap: React.CSSProperties = { width: "min(1100px, calc(100% - 3rem))", margin: "0 auto" };

  const mainStyle = {
    background: brand.bgColor,
    minHeight: "100vh",
    color: "#fff",
    overflowX: "hidden",
    ["--brand-accent" as any]: ac,
    ["--brand-accent-55" as any]: toRgba(ac, 0.33),
  } as React.CSSProperties;

  return (
    <main className="brand-page" suppressHydrationWarning style={mainStyle}>

      {/* Offer Banner */}
      <div style={{ background: `linear-gradient(90deg,${ac},${brand.accentColorDark})`, padding: ".85rem 1.5rem", textAlign: "center", color: "#0A0A0A", fontWeight: 700, fontSize: "clamp(.8rem,2vw,.92rem)", letterSpacing: ".04em" }}>
        {brand.offerBanner}
      </div>

      {/* Sticky Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(20px)", background: "rgba(10,10,10,.88)", borderBottom: "1px solid rgba(255,255,255,.07)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", letterSpacing: ".06em" }}>{brand.name}</span>
        <a href={"https://wa.me/" + brand.phone.replace(/\D/g, "")} target="_blank" rel="noopener noreferrer"
          style={{ background: ac, color: "#0A0A0A", padding: ".65rem 1.5rem", borderRadius: "999px", fontWeight: 700, fontSize: ".85rem", transition: "opacity .2s" }}>
          Book Now
        </a>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", height: "95vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src={brand.heroImage} alt={brand.name} width={1800} height={1000} loading="eager" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.3)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${brand.bgColor} 0%, transparent 55%)` }} />
        <div ref={reg("hero")} style={{ position: "relative", textAlign: "center", padding: "0 2rem", ...rv("hero") }}>
          <p style={{ color: ac, textTransform: "uppercase", letterSpacing: ".25em", fontSize: ".75rem", fontWeight: 700, marginBottom: "1.2rem" }}>
            {brand.type} · {brand.location}
          </p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(3.5rem,10vw,9rem)", lineHeight: .95, marginBottom: "1.5rem", fontWeight: 300 }}>
            {brand.name}
          </h1>
          <p style={{ color: "rgba(255,255,255,.6)", fontSize: "clamp(1rem,2vw,1.3rem)", maxWidth: "46ch", margin: "0 auto 2.5rem", fontStyle: "italic", fontFamily: "Cormorant Garamond, serif" }}>
            {brand.tagline}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={"https://wa.me/" + brand.phone.replace(/\D/g, "")} target="_blank" rel="noopener noreferrer"
              style={{ background: ac, color: "#0A0A0A", padding: "1rem 2.5rem", borderRadius: "999px", fontWeight: 700, fontSize: ".95rem", transition: "transform .2s, box-shadow .2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${ac}44`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              Reserve a Table
            </a>
            <a href="#gallery"
              style={{ border: `1px solid ${ac}77`, color: ac, padding: "1rem 2.5rem", borderRadius: "999px", fontWeight: 600, fontSize: ".95rem", transition: "background .2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = `${ac}15`)}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              View Gallery
            </a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", animation: "float 2.2s ease-in-out infinite" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ac} strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ overflow: "hidden", borderTop: `1px solid ${ac}22`, borderBottom: `1px solid ${ac}22`, padding: ".9rem 0", background: "rgba(255,255,255,.018)" }}>
        <div style={{ display: "flex", animation: "marquee 22s linear infinite", whiteSpace: "nowrap" }}>
          {[...brand.marqueeItems, ...brand.marqueeItems, ...brand.marqueeItems, ...brand.marqueeItems].map((item, i) => (
            <span key={i} style={{ color: ac, fontSize: ".78rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", padding: "0 2.5rem" }}>
              {item}<span style={{ opacity: .35, marginLeft: "2.5rem" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: "2.5rem", textAlign: "center" }}>
          {brand.stats.map((s, i) => (
            <div key={s.label} ref={reg(`stat-${i}`)} style={rv(`stat-${i}`, i * 0.1)}>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2.5rem,5vw,3.8rem)", color: ac, lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,.45)", fontSize: ".78rem", marginTop: ".5rem", letterSpacing: ".1em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Highlights */}
      <section style={{ padding: "5rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={wrap}>
          <div ref={reg("menu-hd")} style={{ marginBottom: "3rem", ...rv("menu-hd") }}>
            <p style={{ color: ac, textTransform: "uppercase", letterSpacing: ".18em", fontSize: ".75rem", fontWeight: 700, marginBottom: ".5rem" }}>Menu Highlights</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300 }}>Crafted with Passion</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px,100%),1fr))", gap: "1.5rem" }}>
            {brand.menuHighlights.map((item, i) => (
              <div key={item.name} ref={reg(`menu-${i}`)} className="card hov-lift" style={rv(`menu-${i}`, i * 0.1)}>
                <img src={item.image} alt={item.name} width={600} height={300} loading="lazy" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: ".5rem" }}>
                    <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", fontWeight: 400 }}>{item.name}</h3>
                    <span style={{ color: ac, fontWeight: 700, fontSize: "1rem", whiteSpace: "nowrap" }}>{item.price}</span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".88rem", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" style={{ padding: "5rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={wrap}>
          <div ref={reg("gal-hd")} style={{ marginBottom: "3rem", ...rv("gal-hd") }}>
            <p style={{ color: ac, textTransform: "uppercase", letterSpacing: ".18em", fontSize: ".75rem", fontWeight: 700, marginBottom: ".5rem" }}>Gallery</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300 }}>The Experience in Pictures</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px,100%),1fr))", gap: "1rem" }}>
            {brand.galleryImages.map((img, i) => (
              <div key={i} ref={reg(`gal-${i}`)} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "4/3", ...rv(`gal-${i}`, i * 0.07) }} onClick={() => setActiveImg(img)}>
                <img src={img} alt={`Gallery ${i + 1}`} width={800} height={600} loading="lazy" className="gal-img" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeImg && (
        <div onClick={() => setActiveImg(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.93)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeup .2s ease", padding: "2rem" }}>
          <img src={activeImg} alt="Enlarged" style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: "16px", objectFit: "contain" }} />
          <button onClick={() => setActiveImg(null)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(255,255,255,.12)", border: "none", color: "#fff", width: "44px", height: "44px", borderRadius: "50%", fontSize: "1.1rem", cursor: "pointer" }}>✕</button>
        </div>
      )}

      {/* WhatsApp Actions */}
      <section style={{ padding: "5rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ ...wrap, maxWidth: "680px" }}>
          <div ref={reg("wa-hd")} style={{ marginBottom: "2.5rem", ...rv("wa-hd") }}>
            <p style={{ color: ac, textTransform: "uppercase", letterSpacing: ".18em", fontSize: ".75rem", fontWeight: 700, marginBottom: ".5rem" }}>Quick Actions</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300 }}>We respond in minutes.</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
            {brand.whatsappActions.map((a, i) => (
              <a key={a.label} ref={reg(`wa-${i}`)} href={"https://wa.me/?text=" + encodeURIComponent(a.label)} target="_blank" rel="noopener noreferrer" className="wa-row" style={rv(`wa-${i}`, i * 0.08)}>
                <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>{a.emoji}</span>
                <span style={{ fontSize: ".97rem", color: "#fff" }}>{a.label}</span>
                <span style={{ marginLeft: "auto", color: "#25D366", fontSize: "1.1rem" }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "5rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)", background: "rgba(255,255,255,.015)" }}>
        <div style={wrap}>
          <div ref={reg("test-hd")} style={{ marginBottom: "3rem", textAlign: "center", ...rv("test-hd") }}>
            <p style={{ color: ac, textTransform: "uppercase", letterSpacing: ".18em", fontSize: ".75rem", fontWeight: 700, marginBottom: ".5rem" }}>Testimonials</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300 }}>What Our Guests Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px,100%),1fr))", gap: "1.5rem" }}>
            {brand.testimonials.map((t, i) => (
              <div key={t.name} ref={reg(`test-${i}`)} className="card" style={{ padding: "2rem", ...rv(`test-${i}`, i * 0.1) }}>
                <div style={{ color: ac, fontSize: "1rem", marginBottom: "1rem", letterSpacing: ".1em" }}>{"★".repeat(t.rating)}</div>
                <p style={{ color: "rgba(255,255,255,.72)", lineHeight: 1.75, marginBottom: "1.5rem", fontStyle: "italic", fontFamily: "Cormorant Garamond, serif", fontSize: "1.05rem" }}>"{t.text}"</p>
                <p style={{ color: ac, fontWeight: 600, fontSize: ".85rem" }}>— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Card */}
      <section style={{ padding: "5rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: "460px", margin: "0 auto", textAlign: "center" }}>
          <div ref={reg("card-hd")} style={{ marginBottom: "2rem", ...rv("card-hd") }}>
            <p style={{ color: ac, textTransform: "uppercase", letterSpacing: ".18em", fontSize: ".75rem", fontWeight: 700, marginBottom: ".5rem" }}>Digital Card</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 300 }}>Share with a tap</h2>
          </div>
          <div ref={reg("card-body")} className="card" style={{ padding: "2.5rem", ...rv("card-body", .1) }}>
            <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300, marginBottom: ".3rem" }}>{brand.name}</h3>
            <p style={{ color: ac, letterSpacing: ".14em", fontSize: ".75rem", marginBottom: "1.8rem", textTransform: "uppercase" }}>{brand.type}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: ".55rem", color: "rgba(255,255,255,.55)", fontSize: ".9rem", marginBottom: "2rem" }}>
              <span>📍 {brand.location}</span>
              <span>📞 {brand.phone}</span>
              <span>🌐 {brand.website}</span>
              <span>📸 {brand.instagram}</span>
            </div>
            <button onClick={share} style={{ background: ac, color: "#0A0A0A", border: "none", borderRadius: "999px", padding: ".95rem 2rem", fontWeight: 700, cursor: "pointer", width: "100%", fontSize: ".95rem", transition: "opacity .2s" }}>
              Share this page
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "3rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)", textAlign: "center" }}>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", marginBottom: ".4rem" }}>{brand.name}</p>
        <p style={{ color: "rgba(255,255,255,.35)", fontSize: ".82rem" }}>{brand.location} · {brand.website}</p>
        <p style={{ color: "rgba(255,255,255,.18)", fontSize: ".75rem", marginTop: "2rem" }}>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
      </footer>

      {/* Floating WhatsApp */}
      <a href={"https://wa.me/" + brand.phone.replace(/\D/g, "")} target="_blank" rel="noopener noreferrer"
        style={{ position: "fixed", bottom: "2rem", right: "2rem", width: "58px", height: "58px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(37,211,102,.45)", zIndex: 99, textDecoration: "none", transition: "transform .2s" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.12)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </main>
  );
}
