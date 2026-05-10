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
  { icon: '🩺', title: 'General Consultation', desc: 'Thorough in-person and online consultations for adults and children, with same-day appointments available.' },
  { icon: '🔬', title: 'Diagnostics & Lab', desc: 'On-site blood work, urine analysis, and ECG. Reports delivered digitally within hours.' },
  { icon: '🛡', title: 'Preventive Care', desc: 'Annual health check-ups, vaccinations, and lifestyle counselling to keep illness at bay.' },
  { icon: '💊', title: 'Chronic Disease Management', desc: 'Long-term care plans for diabetes, hypertension, thyroid disorders, and respiratory conditions.' },
  { icon: '🌿', title: 'Nutrition & Wellness', desc: 'Personalised diet plans and wellness programmes from a certified nutrition advisor.' },
  { icon: '🚑', title: 'Emergency Support', desc: '24/7 phone triage for urgent concerns, with rapid referral coordination when needed.' },
]

const doctors = [
  {
    name: 'Dr. Priya Sharma',
    degree: 'MBBS, MD (Internal Medicine) — AIIMS Delhi',
    speciality: 'General Physician & Preventive Care',
    experience: '12 Years',
    philosophy: 'I believe every patient deserves time, not just a prescription. My goal is to understand the whole person — not just the symptom.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80',
  },
]

const testimonials = [
  { name: 'Ananya R.', rating: 5, text: 'Dr. Sharma took the time to actually listen. First doctor in years who explained everything clearly and didn\'t rush me out.' },
  { name: 'Suresh M.', rating: 5, text: 'My father\'s diabetes has been under control for 18 months now, thanks to her structured care plan. Truly exceptional.' },
  { name: 'Kavya T.', rating: 5, text: 'Online consultation was seamless. Got a full diagnosis, prescription, and follow-up plan in under 30 minutes.' },
]

const faqs = [
  { q: 'What are the clinic timings?', a: 'Mon–Sat: 9:00 AM – 1:00 PM and 5:00 PM – 8:00 PM. Sunday: 10:00 AM – 12:00 PM (by appointment only).' },
  { q: 'Are online consultations available?', a: 'Yes. Video and WhatsApp consultations are available for existing patients and new patients with non-emergency concerns. Book via the form below or WhatsApp.' },
  { q: 'Do you accept insurance?', a: 'We accept most major health insurance providers including Star Health, HDFC ERGO, and Medi Assist. Please carry your insurance card and photo ID.' },
  { q: 'How do I get my reports?', a: 'Lab reports are emailed within 6–12 hours of sample collection. You can also WhatsApp us for a digital copy.' },
  { q: 'Is there a consultation fee?', a: 'In-person: ₹500. Online: ₹400. Follow-up within 7 days: ₹200. No hidden charges.' },
  { q: 'Do you see children?', a: 'Yes. We see patients of all ages. For children under 5, please bring the vaccination record if available.' },
]

const gallery = [
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=80',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
  'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
]

export default function ClinicPage({ brand }: Props) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const countersStarted = useRef(false)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cp-visible')
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.cp-reveal').forEach((el) => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const statsSection = document.querySelector('.cp-stats-strip')
    if (!statsSection) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !countersStarted.current) {
        countersStarted.current = true
        document.querySelectorAll('[data-count-target]').forEach((el) => {
          const target = parseInt((el as HTMLElement).dataset.countTarget ?? '0', 10)
          let start = 0
          const step = Math.ceil(target / 60)
          const timer = setInterval(() => {
            start = Math.min(start + step, target)
            el.textContent = start.toLocaleString()
            if (start >= target) clearInterval(timer)
          }, 24)
        })
      }
    }, { threshold: 0.5 })
    io.observe(statsSection)
    return () => io.disconnect()
  }, [])

  const waBase = `https://wa.me/${brand.phone.replace(/\D/g, '')}`

  return (
    <div className="cp-root">

      {/* Offer strip */}
      <div className="cp-offer-strip">{brand.offerBanner}</div>

      {/* Nav */}
      <header className="cp-nav">
        <a href="#" className="cp-nav-logo" aria-label={brand.name}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#0F4C81"/>
            <path d="M16 7v18M7 16h18" stroke="#38B2AC" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span>{brand.name}</span>
        </a>
        <nav className="cp-nav-links" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#gallery">Clinic</a>
          <a href="#book" className="cp-nav-cta">Book Appointment</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="cp-hero">
        <div className="cp-hero-bg-pattern" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cross" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M24 10v28M10 24h28" stroke="#0F4C81" strokeWidth="1" strokeOpacity="0.04" strokeLinecap="round"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cross)"/>
          </svg>
        </div>
        <div className="cp-hero-inner cp-container">
          <div className="cp-hero-text">
            <div className="cp-hero-badge cp-reveal cp-s1">
              <span className="cp-badge-dot"></span>
              Available Today · Indiranagar, Bengaluru
            </div>
            <h1 className="cp-hero-h1 cp-reveal cp-s2">
              Compassionate Care<br/>
              <span className="cp-hero-accent">You Can Trust</span>
            </h1>
            <p className="cp-hero-sub cp-reveal cp-s3">
              Practising evidence-based medicine with patience and clarity.
              Same-day appointments. Online consultations. No rushed visits.
            </p>
            <div className="cp-hero-btns cp-reveal cp-s4">
              <a href="#book" className="cp-btn-primary">Book Appointment</a>
              <a href={`tel:${brand.phone}`} className="cp-btn-ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Call Now
              </a>
            </div>
            <div className="cp-verify-badge cp-reveal cp-s5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38B2AC" strokeWidth="2" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              MCI Verified · MBBS AIIMS Delhi · MD Internal Medicine
            </div>
          </div>
          <div className="cp-hero-img-col cp-reveal cp-s2">
            <div className="cp-hero-img-frame">
              <img
                src={brand.heroImage}
                alt={`${brand.name} — ${brand.type}`}
                width={520}
                height={600}
                loading="eager"
                decoding="async"
                className="cp-hero-img"
              />
              <div className="cp-timing-card">
                <p className="cp-timing-label">Today&apos;s Hours</p>
                <p className="cp-timing-value">9AM – 1PM · 5PM – 8PM</p>
                <p className="cp-timing-status">
                  <span className="cp-badge-dot"></span>Open Now
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="cp-marquee-wrap">
        <div className="cp-marquee-track">
          {[...brand.marqueeItems, ...brand.marqueeItems].map((item, i) => (
            <span key={i} className="cp-marquee-item">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="#38B2AC" aria-hidden="true">
                <circle cx="4" cy="4" r="4"/>
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="cp-stats-strip">
        {brand.stats.map((s, i) => (
          <div key={i} className="cp-stat cp-reveal">
            <span className="cp-stat-value">{s.value}</span>
            <span className="cp-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* About */}
      <section id="about" className="cp-section cp-section-white">
        <div className="cp-container cp-about-grid">
          {doctors.map((doc, i) => (
            <>
              <div key={`img-${i}`} className="cp-about-img-col cp-reveal cp-s1">
                <div className="cp-about-img-wrap">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    width={480}
                    height={560}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="cp-avail-badge">
                  <span className="cp-badge-dot"></span>
                  Accepting New Patients
                </div>
              </div>
              <div key={`txt-${i}`} className="cp-about-text cp-reveal cp-s2">
                <p className="cp-section-label">About the Doctor</p>
                <h2 className="cp-section-h2">{doc.name}</h2>
                <p className="cp-about-degree">{doc.degree}</p>
                <p className="cp-about-speciality">{doc.speciality} · {doc.experience}</p>
                <blockquote className="cp-about-quote">&ldquo;{doc.philosophy}&rdquo;</blockquote>
                <div className="cp-qual-tags">
                  {['MCI Registered', 'AIIMS Alumni', 'Certified Diabetes Educator', 'Nutrition Advisor', 'FSSAI Certified'].map((tag) => (
                    <span key={tag} className="cp-tag">{tag}</span>
                  ))}
                </div>
                <div className="cp-consult-timing-card">
                  <div className="cp-consult-row">
                    <span className="cp-consult-day">Mon – Sat</span>
                    <span className="cp-consult-time">9AM – 1PM &nbsp;·&nbsp; 5PM – 8PM</span>
                  </div>
                  <div className="cp-consult-row">
                    <span className="cp-consult-day">Sunday</span>
                    <span className="cp-consult-time">10AM – 12PM (Appointment only)</span>
                  </div>
                  <a href="#book" className="cp-btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Book a Consultation</a>
                </div>
              </div>
            </>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="cp-section cp-section-blue">
        <div className="cp-container">
          <p className="cp-section-label cp-reveal">Our Services</p>
          <h2 className="cp-section-h2 cp-reveal cp-s1">What We Treat &amp; Provide</h2>
          <div className="cp-services-grid">
            {services.map((s, i) => (
              <div key={i} className={`cp-service-card cp-reveal cp-s${Math.min(i + 1, 4)}`}>
                <span className="cp-service-icon" aria-hidden="true">{s.icon}</span>
                <h3 className="cp-service-title">{s.title}</h3>
                <p className="cp-service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment */}
      <section id="book" className="cp-section cp-section-form">
        <div className="cp-container cp-book-grid">
          <div className="cp-book-left cp-reveal cp-s1">
            <p className="cp-section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Easy Booking</p>
            <h2 className="cp-section-h2" style={{ color: '#fff' }}>Book Your Consultation</h2>
            <p className="cp-book-sub">Confirmed on WhatsApp within minutes. No card required. Free cancellation up to 2 hours before.</p>
            <div className="cp-book-reasons">
              {[
                'Same-day appointments available',
                'Online video consultations',
                'Instant WhatsApp confirmation',
                'No hidden fees',
              ].map((r) => (
                <p key={r} className="cp-book-reason">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38B2AC" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {r}
                </p>
              ))}
            </div>
            <div className="cp-book-contact">
              <a href={`tel:${brand.phone}`}>{brand.phone}</a>
              <span>{brand.location}</span>
            </div>
          </div>
          <form
            className="cp-form cp-reveal cp-s2"
            onSubmit={(e) => {
              e.preventDefault()
              const f = e.currentTarget
              const get = (n: string) => (f.elements.namedItem(n) as HTMLInputElement | HTMLSelectElement | null)?.value ?? ''
              const msg = `Hi Dr. Sharma, I'd like to book a consultation.%0AName: ${get('name')}%0APhone: ${get('phone')}%0ADate: ${get('date')}%0ATime: ${get('time')}%0AConcern: ${get('concern')}`
              window.open(`${waBase}?text=${msg}`, '_blank')
            }}
          >
            <div className="cp-form-row">
              <div className="cp-field">
                <label htmlFor="f-name" className="cp-label">Full Name</label>
                <input id="f-name" name="name" type="text" placeholder="Your name" required className="cp-input"/>
              </div>
              <div className="cp-field">
                <label htmlFor="f-phone" className="cp-label">Phone Number</label>
                <input id="f-phone" name="phone" type="tel" placeholder="10-digit mobile" required className="cp-input"/>
              </div>
            </div>
            <div className="cp-form-row">
              <div className="cp-field">
                <label htmlFor="f-date" className="cp-label">Preferred Date</label>
                <input id="f-date" name="date" type="date" required className="cp-input" min={new Date().toISOString().split('T')[0]}/>
              </div>
              <div className="cp-field">
                <label htmlFor="f-time" className="cp-label">Preferred Time</label>
                <select id="f-time" name="time" required className="cp-input">
                  <option value="">Select time</option>
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                  <option>7:00 PM</option>
                </select>
              </div>
            </div>
            <div className="cp-field">
              <label htmlFor="f-type" className="cp-label">Consultation Type</label>
              <select id="f-type" name="type" required className="cp-input">
                <option value="">Select type</option>
                <option>In-Person (₹500)</option>
                <option>Online Video (₹400)</option>
                <option>Follow-Up (₹200)</option>
              </select>
            </div>
            <div className="cp-field">
              <label htmlFor="f-concern" className="cp-label">Chief Concern</label>
              <textarea id="f-concern" name="concern" placeholder="Brief description of your symptoms or concern…" rows={3} className="cp-input cp-textarea"/>
            </div>
            <button type="submit" className="cp-submit">Confirm on WhatsApp →</button>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="cp-section cp-section-white">
        <div className="cp-container">
          <p className="cp-section-label cp-reveal">Patient Stories</p>
          <h2 className="cp-section-h2 cp-reveal cp-s1">What Our Patients Say</h2>
          <div className="cp-testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className={`cp-testimonial-card cp-reveal cp-s${i + 1}`}>
                <div className="cp-stars" aria-label={`${t.rating} out of 5 stars`}>
                  {'★'.repeat(t.rating)}
                </div>
                <p className="cp-testimonial-text">&ldquo;{t.text}&rdquo;</p>
                <p className="cp-testimonial-name">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cp-section cp-section-blue">
        <div className="cp-container cp-faq-wrap">
          <p className="cp-section-label cp-reveal">FAQs</p>
          <h2 className="cp-section-h2 cp-reveal cp-s1">Common Questions</h2>
          <div className="cp-faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`cp-faq-item cp-reveal cp-s${Math.min(i + 1, 4)}`}>
                <button
                  className="cp-faq-q"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" aria-hidden="true"
                    style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease', flexShrink: 0 }}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div className="cp-faq-a-wrap" style={{ maxHeight: openFaq === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                  <p className="cp-faq-a">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="cp-section cp-section-white">
        <div className="cp-container">
          <p className="cp-section-label cp-reveal">Inside the Clinic</p>
          <h2 className="cp-section-h2 cp-reveal cp-s1">A Welcoming Space</h2>
          <div className="cp-gallery-grid">
            {gallery.map((url, i) => (
              <div key={i} className={`cp-gallery-item cp-reveal cp-s${Math.min(i + 1, 4)}`}>
                <img src={url} alt={`Clinic photo ${i + 1}`} width={900} height={600} loading="lazy" decoding="async"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp quick actions */}
      <section className="cp-section cp-section-blue">
        <div className="cp-container">
          <p className="cp-section-label cp-reveal">Quick Connect</p>
          <h2 className="cp-section-h2 cp-reveal cp-s1">How Can We Help?</h2>
          <div className="cp-wa-grid">
            {brand.whatsappActions.map((a, i) => (
              <a
                key={i}
                href={`${waBase}?text=${encodeURIComponent(a.label)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`cp-wa-card cp-reveal cp-s${Math.min(i + 1, 4)}`}
                aria-label={a.label}
              >
                <span className="cp-wa-emoji" aria-hidden="true">{a.emoji}</span>
                <span className="cp-wa-label">{a.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Map */}
      <section className="cp-section cp-section-dark">
        <div className="cp-container cp-contact-grid">
          <div className="cp-contact-info cp-reveal cp-s1">
            <p className="cp-section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Find Us</p>
            <h2 className="cp-section-h2" style={{ color: '#fff' }}>Contact &amp; Location</h2>
            <div className="cp-contact-rows">
              <div className="cp-contact-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38B2AC" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <a href={`tel:${brand.phone}`} style={{ color: '#fff' }}>{brand.phone}</a>
              </div>
              <div className="cp-contact-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38B2AC" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>12, 100 Feet Rd, Indiranagar, Bengaluru — 560038</span>
              </div>
              <div className="cp-contact-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38B2AC" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Mon–Sat 9AM–1PM · 5PM–8PM &nbsp;|&nbsp; Sun 10AM–12PM</span>
              </div>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cp-btn-outline-white"
            >
              Get Directions →
            </a>
          </div>
          <div className="cp-map-col cp-reveal cp-s2">
            <div className="cp-map-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#38B2AC" strokeWidth="1.5" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Indiranagar, Bengaluru</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="cp-footer">
        <div className="cp-container cp-footer-inner">
          <span className="cp-footer-logo">{brand.name}</span>
          <span className="cp-footer-copy">© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
          <div className="cp-footer-links">
            <a href={`tel:${brand.phone}`}>Call</a>
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#book">Book Now</a>
          </div>
        </div>
      </footer>

      {/* Floating emergency CTA */}
      <a
        href={`${waBase}?text=${encodeURIComponent('Hi, I need an urgent consultation.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="cp-float-btn"
        aria-label="Emergency WhatsApp consultation"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Emergency
      </a>
    </div>
  )
}