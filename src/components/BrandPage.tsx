"use client";
import { useEffect, useRef, useState } from "react";
import type { Brand } from "@/types/brand";

const getAccentContrast = (hex: string) => {
  const cleaned = hex.replace("#", "");
  const full = cleaned.length === 3
    ? cleaned.split("").map((c) => c + c).join("")
    : cleaned;
  const int = Number.parseInt(full, 16);
  if (Number.isNaN(int) || full.length !== 6) return "rgb(255 255 255)";
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6 ? "rgb(13 13 13)" : "rgb(255 255 255)";
};

export default function BrandPage({ brand }: { brand: Brand }) {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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

  const theme = brand.theme;
  const spacingMap = {
    compact: { lg: "clamp(2.25rem, 5vw, 4.5rem)", md: "clamp(2rem, 4vw, 4rem)" },
    balanced: { lg: "clamp(2.75rem, 6vw, 5.5rem)", md: "clamp(2.25rem, 5vw, 4.5rem)" },
    spacious: { lg: "clamp(3rem, 8vw, 7rem)", md: "clamp(2.5rem, 6vw, 5.5rem)" },
    generous: { lg: "clamp(3.5rem, 9vw, 8rem)", md: "clamp(3rem, 7vw, 6.5rem)" },
  };
  const spacingKey = theme.sectionSpacing ?? "spacious";
  const spacingScale = spacingMap[spacingKey] ?? spacingMap.spacious;
  const sectionPadLg = spacingScale.lg;
  const sectionPadMd = spacingScale.md;
  const wrapWide: React.CSSProperties = { width: "min(72rem, calc(100% - 3rem))", margin: "0 auto" };
  const wrapNarrow: React.CSSProperties = { width: "min(48rem, calc(100% - 3rem))", margin: "0 auto" };
  const navItems = [
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "Actions", href: "#actions" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  const heroMeta = [brand.location, brand.website].filter(Boolean);

  const mainStyle = {
    background: "var(--color-bg)",
    minHeight: "100vh",
    color: "var(--color-text)",
    overflowX: "hidden",
    ["--color-bg" as any]: theme.backgroundColor,
    ["--color-surface" as any]: theme.surfaceColor,
    ["--color-accent" as any]: theme.accentColor,
    ["--color-accent-dark" as any]: theme.accentColorDark,
    ["--color-text" as any]: theme.textColor,
    ["--color-text-muted" as any]: theme.textMuted,
    ["--font-display" as any]: theme.fontDisplay,
    ["--font-body" as any]: theme.fontBody,
    ["--color-accent-contrast" as any]: getAccentContrast(theme.accentColor),
  } as React.CSSProperties;

  const heroOverlay = `${theme.heroOverlay}, linear-gradient(180deg, transparent 0%, var(--color-bg) 100%)`;

  return (
    <main className="brand-page" suppressHydrationWarning style={mainStyle}>
      {brand.offerBanner && (
        <div className="offer-banner">{brand.offerBanner}</div>
      )}

      <nav className={`brand-nav${scrolled ? " is-scrolled" : ""}`}>
        <span className="brand-mark">{brand.name}</span>
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.href} className="nav-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <a
          className="btn btn-primary"
          href={`https://wa.me/${brand.phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book Now
        </a>
      </nav>

      <section
        className="hero"
        style={{ backgroundImage: `url(${brand.heroImage})` }}
      >
        <div className="hero-overlay" style={{ background: heroOverlay }} />
        <div style={wrapWide} className="hero-content">
          <div ref={reg("hero")} style={rv("hero")}>
            <p className="hero-kicker">{brand.type} - {brand.location}</p>
            <h1 className="hero-title">{brand.name}</h1>
            <p className="hero-tagline">{brand.tagline}</p>
            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href={`https://wa.me/${brand.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Reserve a Table
              </a>
              <a className="btn btn-outline" href="#gallery">View Gallery</a>
            </div>
            <div className="hero-meta">
              {heroMeta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="scroll-indicator" aria-hidden="true">
          <span />
        </div>
      </section>

      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid color-mix(in oklch, var(--color-text) 12%, transparent)",
          borderBottom: "1px solid color-mix(in oklch, var(--color-text) 12%, transparent)",
          padding: "0.9rem 0",
          background: "var(--color-bg)",
        }}
      >
        <div style={{ display: "flex", animation: "marquee 22s linear infinite", whiteSpace: "nowrap" }}>
          {[...brand.marqueeItems, ...brand.marqueeItems, ...brand.marqueeItems, ...brand.marqueeItems].map((item, i) => (
            <span
              key={i}
              style={{
                color: "var(--color-accent)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0 2.5rem",
              }}
            >
              {item}<span style={{ opacity: 0.4, marginLeft: "2.5rem" }}>*</span>
            </span>
          ))}
        </div>
      </div>

      <section id="stats" className="section section--surface" style={{ padding: `${sectionPadMd} 0` }}>
        <div ref={reg("stats")} style={{ ...wrapWide, ...rv("stats"), display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: "2.5rem" }}>
          {brand.stats.map((s, i) => (
            <div key={s.label} ref={reg(`stat-${i}`)} style={rv(`stat-${i}`, i * 0.1)}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,5vw,3.6rem)", color: "var(--color-accent)", lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)", marginTop: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="menu" className="section section--bg" style={{ padding: `${sectionPadLg} 0` }}>
        <div ref={reg("menu")} style={{ ...wrapNarrow, ...rv("menu") }}>
          <div className="section-heading">
            <p className="section-eyebrow">Menu Highlights</p>
            <h2 className="section-title">Crafted with Passion</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: "1.5rem" }}>
            {brand.menuHighlights.map((item, i) => (
              <div key={item.name} ref={reg(`menu-${i}`)} className="card card--media" style={rv(`menu-${i}`, i * 0.1)}>
                <img src={item.image} alt={item.name} width={600} height={300} loading="lazy" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                <div className="card-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 400 }}>{item.name}</h3>
                    <span style={{ color: "var(--color-accent)", fontWeight: 600, fontSize: "var(--text-sm)", whiteSpace: "nowrap" }}>{item.price}</span>
                  </div>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="section section--surface" style={{ padding: `${sectionPadLg} 0` }}>
        <div ref={reg("gallery")} style={{ ...wrapWide, ...rv("gallery") }}>
          <div className="section-heading">
            <p className="section-eyebrow">Gallery</p>
            <h2 className="section-title">The Experience in Pictures</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: "1rem" }}>
            {brand.galleryImages.map((img, i) => (
              <div key={i} ref={reg(`gal-${i}`)} className="card card--media" style={{ ...rv(`gal-${i}`, i * 0.07), aspectRatio: "4/3" }} onClick={() => setActiveImg(img)}>
                <img src={img} alt={`Gallery ${i + 1}`} width={800} height={600} loading="lazy" className="gal-img" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeImg && (
        <div
          onClick={() => setActiveImg(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "color-mix(in oklch, var(--color-bg) 80%, black)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeup .2s ease",
            padding: "2rem",
          }}
        >
          <img src={activeImg} alt="Enlarged" style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: "var(--radius-md)", objectFit: "contain" }} />
          <button
            onClick={() => setActiveImg(null)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "color-mix(in oklch, var(--color-surface) 80%, transparent)",
              border: "1px solid color-mix(in oklch, var(--color-text) 15%, transparent)",
              color: "var(--color-text)",
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-full)",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
          >
            x
          </button>
        </div>
      )}

      <section id="actions" className="section section--bg" style={{ padding: `${sectionPadMd} 0` }}>
        <div ref={reg("actions")} style={{ ...wrapNarrow, ...rv("actions") }}>
          <div className="section-heading">
            <p className="section-eyebrow">Quick Actions</p>
            <h2 className="section-title">We respond in minutes.</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {brand.whatsappActions.map((a, i) => (
              <a key={a.label} ref={reg(`wa-${i}`)} href={`https://wa.me/?text=${encodeURIComponent(a.label)}`} target="_blank" rel="noopener noreferrer" className="wa-row" style={rv(`wa-${i}`, i * 0.08)}>
                <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{a.emoji}</span>
                <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }}>{a.label}</span>
                <span style={{ marginLeft: "auto", color: "var(--color-accent)", fontSize: "1.1rem" }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="section section--surface" style={{ padding: `${sectionPadLg} 0` }}>
        <div ref={reg("testimonials")} style={{ ...wrapWide, ...rv("testimonials") }}>
          <div className="section-heading">
            <p className="section-eyebrow">Testimonials</p>
            <h2 className="section-title">What Our Guests Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: "1.5rem" }}>
            {brand.testimonials.map((t, i) => (
              <div key={t.name} ref={reg(`test-${i}`)} className="card" style={rv(`test-${i}`, i * 0.1)}>
                <div style={{ color: "var(--color-accent)", fontSize: "var(--text-sm)", marginBottom: "1rem", letterSpacing: "0.1em" }}>{"★".repeat(t.rating)}</div>
                <p style={{ color: "var(--color-text)", lineHeight: 1.75, marginBottom: "1.5rem", fontFamily: "var(--font-display)", fontSize: "var(--text-base)" }}>"{t.text}"</p>
                <p style={{ color: "var(--color-text-muted)", fontWeight: 600, fontSize: "var(--text-sm)" }}>- {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section section--bg" style={{ padding: `${sectionPadMd} 0` }}>
        <div ref={reg("contact")} style={{ ...wrapNarrow, ...rv("contact") }}>
          <div className="section-heading">
            <p className="section-eyebrow">Digital Card</p>
            <h2 className="section-title">Share with a tap</h2>
          </div>
          <div ref={reg("card-body")} className="card" style={rv("card-body", 0.1)}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 400, marginBottom: "0.3rem" }}>{brand.name}</h3>
            <p style={{ color: "var(--color-accent)", letterSpacing: "0.14em", fontSize: "var(--text-xs)", marginBottom: "1.8rem", textTransform: "uppercase" }}>{brand.type}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "2rem" }}>
              <span>Location: {brand.location}</span>
              <span>Phone: {brand.phone}</span>
              <span>Website: {brand.website}</span>
              <span>Instagram: {brand.instagram}</span>
            </div>
            <button onClick={share} className="btn btn-primary" style={{ width: "100%" }}>
              Share this page
            </button>
          </div>
        </div>
      </section>

      <footer className="brand-footer">
        <div style={wrapWide} className="brand-footer-grid">
          <div className="brand-footer-col">
            <p className="brand-footer-name">{brand.name}</p>
            <p className="brand-footer-text">{brand.location} - {brand.website}</p>
          </div>
          <div className="brand-footer-col">
            <div className="brand-footer-links">
              {navItems.map((item) => (
                <a key={`footer-${item.href}`} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="brand-footer-col">
            <p className="brand-footer-text">{brand.phone}</p>
            <p className="brand-footer-text">{brand.instagram}</p>
          </div>
          <div className="brand-footer-col">
            <p className="brand-footer-text">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${brand.phone.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          width: "52px",
          height: "52px",
          borderRadius: "var(--radius-full)",
          background: "var(--color-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 20px oklch(from var(--color-accent) l c h / 0.2)",
          zIndex: 99,
          textDecoration: "none",
          color: "var(--color-accent-contrast)",
          transition: "transform var(--transition-base)",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
        </svg>
      </a>
    </main>
  );
}
