'use client'

import { useEffect, useRef, useState } from 'react'

interface Brand {
  slug: string
  name: string
  tagline: string
  type: string
  accentColor: string
  accentColorDark: string
  bgColor: string
  phone: string
  location: string
  instagram: string
  website: string
  offerBanner: string
  heroImage: string
  stats: { value: string; label: string }[]
  marqueeItems: string[]
  whatsappActions: { label: string; emoji: string }[]
}

interface Props {
  brand: Brand
}

const services = [
  { icon: '🍽', title: 'Fine Dining', desc: 'An elevated table experience with seasonal menus crafted by our executive chef.' },
  { icon: '🥂', title: 'Private Events', desc: 'Intimate dinners, corporate evenings, and celebrations tailored to your vision.' },
  { icon: '🍷', title: 'Wine Pairing', desc: 'A curated cellar spanning four continents, guided by our in-house sommelier.' },
  { icon: '🎂', title: 'Special Occasions', desc: 'Bespoke menus and décor for anniversaries, birthdays, and milestones.' },
]

const testimonials = [
  { name: 'Arjun M.', rating: 5, text: 'Every detail was immaculate. The tasting menu alone was worth the trip from Delhi.' },
  { name: 'Priya S.', rating: 5, text: 'We hosted our anniversary here — the team made it completely unforgettable.' },
  { name: 'Rahul K.', rating: 5, text: 'The atmosphere, the food, the service — nothing short of exceptional.' },
]

const faqs = [
  { q: 'Do you accept walk-ins?', a: 'We strongly recommend reservations, especially on weekends. Walk-ins are accommodated subject to availability.' },
  { q: 'Is there a dress code?', a: 'Smart casual is preferred. We ask guests to avoid sportswear, flip-flops, or beachwear.' },
  { q: 'Can I bring a custom cake?', a: 'Yes, with prior notice. A nominal plating charge applies. Please inform us 48 hours in advance.' },
  { q: 'Do you cater to dietary restrictions?', a: 'Absolutely. Jain, vegan, gluten-free, and allergy-conscious menus are available on request.' },
  { q: 'What are your timings?', a: 'Lunch: 12:00 PM – 3:30 PM. Dinner: 7:00 PM – 11:30 PM. Closed on Tuesdays.' },
]

export default function BrandPage({ brand }: Props) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [])

  const waBase = `https://wa.me/${brand.phone.replace(/\D/g, '')}`

  return (
    <div className="bp-root" style={{ background: brand.bgColor, color: '#e8ede8' }}>

      {/* Offer Strip */}
      <div className="bp-strip" style={{ background: brand.accentColor }}>
        {brand.offerBanner}
      </div>

      {/* Nav */}
      <header className="bp-nav">
        <a href="#" className="bp-logo" style={{ color: brand.accentColor }} aria-label={brand.name}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 14 Q14 6 20 14 Q14 22 8 14Z" fill="currentColor" opacity="0.85"/>
          </svg>
          <span>{brand.name}</span>
        </a>
        <nav className="bp-nav-links" aria-label="Site navigation">
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#gallery">Gallery</a>
          <a href="#reserve" className="bp-nav-cta btn-press" style={{ background: brand.accentColor }}>
            Reserve
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="bp-hero">
        <img
          src={brand.heroImage}
          alt={`${brand.name} – ${brand.type}`}
          className="bp-hero-img"
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
        />
        <div
          className="bp-hero-overlay"
          style={{ background: `linear-gradient(105deg, ${brand.bgColor}f2 0%, ${brand.bgColor}b0 50%, ${brand.bgColor}30 100%)` }}
        />
        <div className="bp-hero-content">
          <p className="bp-eyebrow reveal stagger-1" style={{ color: brand.accentColor }}>
            {brand.type} · Bengaluru
          </p>
          <h1 className="bp-h1 reveal stagger-2">{brand.name}</h1>
          <p className="bp-tagline reveal stagger-3">{brand.tagline}</p>
          <div className="bp-hero-btns reveal stagger-4">
            <a href="#reserve" className="bp-btn-primary btn-press" style={{ background: brand.accentColor }}>
              Reserve a Table
            </a>
            <a
              href={`tel:${brand.phone}`}
              className="bp-btn-ghost btn-press"
              style={{ borderColor: brand.accentColor, color: brand.accentColor }}
            >
              {brand.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bp-marquee-wrap" style={{ borderTop: `1px solid ${brand.accentColor}33`, borderBottom: `1px solid ${brand.accentColor}33` }}>
        <div className="bp-marquee-track">
          {[...brand.marqueeItems, ...brand.marqueeItems].map((item, i) => (
            <span key={i} className="bp-marquee-item">
              <span style={{ color: brand.accentColor }}>✦</span> {item}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="bp-stats reveal" style={{ background: brand.accentColorDark }}>
        {brand.stats.map((s, i) => (
          <div key={i} className={`bp-stat reveal stagger-${i + 1}`}>
            <span className="bp-stat-value" style={{ color: brand.accentColor }}>{s.value}</span>
            <span className="bp-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* About */}
      <section id="about" className="bp-section">
        <div className="bp-container bp-about-grid">
          <div className="bp-about-img-col reveal stagger-1">
            <div className="bp-about-img-wrap">
              <img
                src={`https://picsum.photos/seed/${brand.slug}-about/600/700`}
                alt={`${brand.name} interior`}
                width={600}
                height={700}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="bp-availability-badge" style={{ borderColor: `${brand.accentColor}55`, color: brand.accentColor }}>
              <span className="bp-avail-dot" style={{ background: brand.accentColor }} />
              Accepting Reservations Tonight
            </div>
          </div>
          <div className="bp-about-text reveal stagger-2">
            <p className="bp-label" style={{ color: brand.accentColor }}>Our Story</p>
            <h2 className="bp-h2">Where Every Evening Becomes a Memory</h2>
            <p className="bp-body">
              {brand.name} was founded on a single belief — that a great meal is never just about the food.
              It is the lighting, the silence between courses, the warmth of the welcome.
              Nestled in {brand.location}, we have spent years crafting an atmosphere where
              Bengaluru&apos;s most discerning guests return, not just for the cuisine, but for the feeling.
            </p>
            <p className="bp-body" style={{ marginTop: '1rem' }}>
              Our kitchen sources daily from farms within 200 km, collaborates with artisan producers,
              and presents a menu that shifts with the seasons. No two months are the same here.
            </p>
            <div className="bp-qual-tags">
              {['FSSAI Certified', 'Farm-to-Table', 'Award-Winning Sommelier', 'Michelin-Inspired Kitchen'].map((tag) => (
                <span
                  key={tag}
                  className="bp-tag"
                  style={{ borderColor: `${brand.accentColor}55`, color: brand.accentColor }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="menu" className="bp-section bp-section-alt" style={{ background: brand.accentColorDark + '55' }}>
        <div className="bp-container">
          <p className="bp-label reveal" style={{ color: brand.accentColor }}>Experiences</p>
          <h2 className="bp-h2 reveal stagger-1">What We Offer</h2>
          <div className="bp-services-grid">
            {services.map((s, i) => (
              <div key={i} className={`bp-service-card reveal stagger-${Math.min(i + 1, 4)}`}>
                <span className="bp-service-icon">{s.icon}</span>
                <h3 className="bp-service-title">{s.title}</h3>
                <p className="bp-service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reserve */}
      <section id="reserve" className="bp-section bp-reserve-section" style={{ background: brand.accentColorDark }}>
        <div className="bp-container bp-reserve-grid">
          <div className="bp-reserve-left reveal stagger-1">
            <p className="bp-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Reservations</p>
            <h2 className="bp-h2" style={{ color: '#fff' }}>Book Your Table</h2>
            <p className="bp-body" style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.75rem' }}>
              Confirmed on WhatsApp within minutes. Same-day tables available for lunch.
            </p>
            <div className="bp-reserve-contact">
              <a href={`tel:${brand.phone}`} style={{ color: '#fff' }}>{brand.phone}</a>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>{brand.location}</span>
            </div>
            <div className="bp-reserve-reasons">
              {['Instant WhatsApp confirmation', 'No card required to reserve', 'Free cancellation up to 2 hrs'].map((r) => (
                <p key={r} className="bp-reserve-reason">
                  <span style={{ color: brand.accentColor }}>✓</span> {r}
                </p>
              ))}
            </div>
          </div>
          <form
            className="bp-form reveal stagger-2"
            onSubmit={(e) => {
              e.preventDefault()
              const f = e.currentTarget
              const get = (name: string) =>
                (f.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null)?.value ?? ''
              const msg = `Hi, I'd like to reserve a table.%0AName: ${get('name')}%0APhone: ${get('phone')}%0ADate: ${get('date')}%0ATime: ${get('time')}%0AGuests: ${get('guests')}%0ANote: ${get('note')}`
              window.open(`${waBase}?text=${msg}`, '_blank')
            }}
          >
            <div className="bp-form-row">
              <div className="bp-field">
                <label className="bp-field-label" htmlFor="res-name">Full Name</label>
                <input id="res-name" name="name" type="text" placeholder="Your name" required className="bp-input" />
              </div>
              <div className="bp-field">
                <label className="bp-field-label" htmlFor="res-phone">Phone Number</label>
                <input id="res-phone" name="phone" type="tel" placeholder="10-digit number" required className="bp-input" />
              </div>
            </div>
            <div className="bp-form-row">
              <div className="bp-field">
                <label className="bp-field-label" htmlFor="res-date">Date</label>
                <input
                  id="res-date"
                  name="date"
                  type="date"
                  required
                  className="bp-input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="bp-field">
                <label className="bp-field-label" htmlFor="res-time">Time</label>
                <select id="res-time" name="time" required className="bp-input">
                  <option value="">Select time</option>
                  <option>12:00 PM</option>
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>7:00 PM</option>
                  <option>8:00 PM</option>
                  <option>9:00 PM</option>
                  <option>10:00 PM</option>
                </select>
              </div>
            </div>
            <div className="bp-field">
              <label className="bp-field-label" htmlFor="res-guests">Number of Guests</label>
              <select id="res-guests" name="guests" required className="bp-input">
                <option value="">Select</option>
                {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
              </select>
            </div>
            <div className="bp-field">
              <label className="bp-field-label" htmlFor="res-note">Special Request (optional)</label>
              <textarea id="res-note" name="note" placeholder="Anniversary, dietary needs, seating preference…" rows={3} className="bp-input bp-textarea" />
            </div>
            <button type="submit" className="bp-submit btn-press" style={{ background: '#fff', color: brand.accentColorDark }}>
              Confirm on WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bp-section">
        <div className="bp-container">
          <p className="bp-label reveal" style={{ color: brand.accentColor }}>Ambience</p>
          <h2 className="bp-h2 reveal stagger-1">A Glimpse Inside</h2>
          <div className="bp-gallery-grid">
            {[
              `https://picsum.photos/seed/${brand.slug}-g1/900/600`,
              `https://picsum.photos/seed/${brand.slug}-g2/600/600`,
              `https://picsum.photos/seed/${brand.slug}-g3/600/600`,
              `https://picsum.photos/seed/${brand.slug}-g4/600/600`,
            ].map((url, i) => (
              <div key={i} className={`bp-gallery-item reveal stagger-${i + 1}`}>
                <img src={url} alt={`${brand.name} gallery ${i + 1}`} width={900} height={600} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bp-section bp-section-alt" style={{ background: brand.accentColorDark + '44' }}>
        <div className="bp-container">
          <p className="bp-label reveal" style={{ color: brand.accentColor }}>Guest Reviews</p>
          <h2 className="bp-h2 reveal stagger-1">What Our Guests Say</h2>
          <div className="bp-testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className={`bp-testimonial-card reveal stagger-${i + 1}`}>
                <div className="bp-stars" style={{ color: brand.accentColor }}>{'★'.repeat(t.rating)}</div>
                <p className="bp-testimonial-text">&ldquo;{t.text}&rdquo;</p>
                <p className="bp-testimonial-name">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bp-section">
        <div className="bp-container bp-faq-wrap">
          <p className="bp-label reveal" style={{ color: brand.accentColor }}>FAQs</p>
          <h2 className="bp-h2 reveal stagger-1">Common Questions</h2>
          <div className="bp-faq-list">
            {faqs.map((f, i) => (
              <div
                key={i}
                className={`bp-faq-item reveal stagger-${Math.min(i + 1, 4)}`}
                style={{ borderBottom: `1px solid ${brand.accentColor}22` }}
              >
                <button
                  className="bp-faq-q"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                    style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', flexShrink: 0 }}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <p className="bp-faq-a">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Actions */}
      <section className="bp-section bp-section-alt" style={{ background: brand.accentColorDark + '55' }}>
        <div className="bp-container">
          <p className="bp-label reveal" style={{ color: brand.accentColor }}>Quick Connect</p>
          <h2 className="bp-h2 reveal stagger-1">How Can We Help?</h2>
          <div className="bp-wa-grid">
            {brand.whatsappActions.map((a, i) => (
              <a
                key={i}
                href={`${waBase}?text=${encodeURIComponent(a.label)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`bp-wa-card reveal stagger-${i + 1}`}
                style={{ border: `1px solid ${brand.accentColor}33` }}
              >
                <span className="bp-wa-emoji">{a.emoji}</span>
                <span className="bp-wa-label">{a.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bp-footer" style={{ borderTop: `1px solid ${brand.accentColor}33` }}>
        <div className="bp-container bp-footer-inner">
          <span style={{ color: brand.accentColor, fontSize: '1.4rem', fontWeight: 700 }}>{brand.name}</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </span>
          <div className="bp-footer-links">
            <a href={`tel:${brand.phone}`} style={{ color: 'rgba(255,255,255,0.5)' }}>Call</a>
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)' }}>Instagram</a>
            <a href={brand.website} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)' }}>Website</a>
          </div>
        </div>
      </footer>

      {/* Emergency / Floating CTA */}
      <a
        href={`${waBase}?text=${encodeURIComponent('Hi, I\'d like to make a reservation')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bp-float-cta btn-press"
        style={{ background: brand.accentColor }}
        aria-label="Reserve on WhatsApp"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Reserve
      </a>
    </div>
  )
}