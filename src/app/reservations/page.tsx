"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const timeSlots = ["7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM"];

type FormState = {
  name: string; email: string; phone: string;
  date: string; time: string; guests: number; requests: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function ReservationsPage() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", date: "", time: "", guests: 2, requests: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = "Valid email required";
    if (!form.phone.match(/^[0-9+\-\s]{8,15}$/)) e.phone = "Valid phone required";
    if (!form.date) e.date = "Please select a date";
    if (!form.time) e.time = "Please select a time";
    if (form.guests < 1 || form.guests > 20) e.guests = "1–20 guests only";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1800));
    setStatus("success");
  };

  const inputStyle = (field: keyof FormState) => ({
    width: "100%", background: "rgba(255,255,255,0.03)",
    border: `1px solid ${errors[field] ? "#E07070" : "rgba(201,169,110,0.2)"}`,
    color: "#F5F0E8", padding: "1rem 1.25rem",
    fontFamily: "sans-serif", fontSize: "0.9rem",
    outline: "none", transition: "border-color 0.3s ease",
    borderRadius: "0"
  });

  return (
    <main style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Banner */}
      <section style={{ position: "relative", height: "40vh", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1920&q=80"
          alt="Reservations" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.3)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem", opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.3s" }}>Book Your Experience</p>
          <h1 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 300, letterSpacing: "0.05em", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 1s ease 0.5s" }}>Reservations</h1>
        </div>
      </section>

      {/* Form Section */}
      <section style={{ padding: "6rem 4rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "6rem", alignItems: "start" }}>

          {/* Left Info */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)", transition: "all 1s ease 0.4s" }}>
            <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Reserve</p>
            <h2 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 300, lineHeight: 1.3, marginBottom: "2rem" }}>
              An Evening<br />
              <em style={{ color: "#C9A96E" }}>Awaits You</em>
            </h2>
            <div style={{ width: "40px", height: "1px", background: "#C9A96E", marginBottom: "2rem" }} />
            <p style={{ color: "rgba(245,240,232,0.5)", fontFamily: "sans-serif", fontSize: "0.9rem", lineHeight: 1.9, marginBottom: "3rem" }}>
              Reservations are available Tuesday through Sunday. For parties larger than 8 or private dining enquiries, please call us directly.
            </p>

            {/* Info blocks */}
            {[
              { label: "Dining Hours", value: "Lunch: 12 PM – 3 PM\nDinner: 7 PM – 11 PM" },
              { label: "Reservations", value: "Tue – Sun\nMonday: Closed" },
              { label: "Contact", value: "+91 98765 43210\nhello@noirandco.in" },
              { label: "Address", value: "12 Lavelle Road\nBengaluru 560001" },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: "2rem", paddingLeft: "1.2rem", borderLeft: "1px solid rgba(201,169,110,0.2)" }}>
                <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{item.label}</p>
                {item.value.split("\n").map(line => (
                  <p key={line} style={{ color: "rgba(245,240,232,0.5)", fontFamily: "sans-serif", fontSize: "0.85rem", lineHeight: 1.8 }}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Right: Form */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)", transition: "all 1s ease 0.6s" }}>

            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "5rem 2rem", border: "1px solid rgba(201,169,110,0.2)", background: "#0D0D0D" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>✦</div>
                <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Reservation Confirmed</p>
                <h3 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "2rem", fontWeight: 300, marginBottom: "1.5rem" }}>
                  We look forward to<br />welcoming you
                </h3>
                <p style={{ color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.85rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                  A confirmation has been sent to <strong style={{ color: "#C9A96E" }}>{form.email}</strong>.<br />
                  For changes, call us at +91 98765 43210.
                </p>
                <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", date: "", time: "", guests: 2, requests: "" }); }}
                  style={{ color: "#C9A96E", border: "1px solid #C9A96E", background: "transparent", padding: "0.8rem 2rem", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                  New Reservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: "#0D0D0D", padding: "3rem", border: "1px solid rgba(201,169,110,0.1)" }}>
                <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "2.5rem" }}>Your Details</p>

                {/* Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ display: "block", color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Full Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                      placeholder="Arnav Mehta" style={inputStyle("name")}
                      onFocus={e => e.target.style.borderColor = "#C9A96E"}
                      onBlur={e => e.target.style.borderColor = errors.name ? "#E07070" : "rgba(201,169,110,0.2)"} />
                    {errors.name && <p style={{ color: "#E07070", fontSize: "0.7rem", marginTop: "0.3rem" }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={{ display: "block", color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                      placeholder="you@email.com" style={inputStyle("email")}
                      onFocus={e => e.target.style.borderColor = "#C9A96E"}
                      onBlur={e => e.target.style.borderColor = errors.email ? "#E07070" : "rgba(201,169,110,0.2)"} />
                    {errors.email && <p style={{ color: "#E07070", fontSize: "0.7rem", marginTop: "0.3rem" }}>{errors.email}</p>}
                  </div>
                </div>

                {/* Phone */}
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Phone *</label>
                  <input type="tel" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                    placeholder="+91 98765 43210" style={inputStyle("phone")}
                    onFocus={e => e.target.style.borderColor = "#C9A96E"}
                    onBlur={e => e.target.style.borderColor = errors.phone ? "#E07070" : "rgba(201,169,110,0.2)"} />
                  {errors.phone && <p style={{ color: "#E07070", fontSize: "0.7rem", marginTop: "0.3rem" }}>{errors.phone}</p>}
                </div>

                {/* Date + Time */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ display: "block", color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Date *</label>
                    <input type="date" min={today} value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))}
                      style={{ ...inputStyle("date"), colorScheme: "dark" }}
                      onFocus={e => e.target.style.borderColor = "#C9A96E"}
                      onBlur={e => e.target.style.borderColor = errors.date ? "#E07070" : "rgba(201,169,110,0.2)"} />
                    {errors.date && <p style={{ color: "#E07070", fontSize: "0.7rem", marginTop: "0.3rem" }}>{errors.date}</p>}
                  </div>
                  <div>
                    <label style={{ display: "block", color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Time *</label>
                    <select value={form.time} onChange={e => setForm(f => ({...f, time: e.target.value}))}
                      style={{ ...inputStyle("time"), appearance: "none" as const }}
                      onFocus={e => e.target.style.borderColor = "#C9A96E"}
                      onBlur={e => e.target.style.borderColor = errors.time ? "#E07070" : "rgba(201,169,110,0.2)"}>
                      <option value="" style={{ background: "#0D0D0D" }}>Select time</option>
                      {timeSlots.map(t => <option key={t} value={t} style={{ background: "#0D0D0D" }}>{t}</option>)}
                    </select>
                    {errors.time && <p style={{ color: "#E07070", fontSize: "0.7rem", marginTop: "0.3rem" }}>{errors.time}</p>}
                  </div>
                </div>

                {/* Guests */}
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Number of Guests *</label>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(201,169,110,0.2)", background: "rgba(255,255,255,0.03)" }}>
                    <button type="button" onClick={() => setForm(f => ({...f, guests: Math.max(1, f.guests - 1)}))}
                      style={{ padding: "1rem 1.5rem", color: "#C9A96E", fontFamily: "sans-serif", fontSize: "1.2rem", background: "none", border: "none", cursor: "pointer", borderRight: "1px solid rgba(201,169,110,0.2)" }}>−</button>
                    <span style={{ flex: 1, textAlign: "center", color: "#F5F0E8", fontFamily: "sans-serif", fontSize: "1rem" }}>{form.guests} {form.guests === 1 ? "Guest" : "Guests"}</span>
                    <button type="button" onClick={() => setForm(f => ({...f, guests: Math.min(20, f.guests + 1)}))}
                      style={{ padding: "1rem 1.5rem", color: "#C9A96E", fontFamily: "sans-serif", fontSize: "1.2rem", background: "none", border: "none", cursor: "pointer", borderLeft: "1px solid rgba(201,169,110,0.2)" }}>+</button>
                  </div>
                </div>

                {/* Special Requests */}
                <div style={{ marginBottom: "2.5rem" }}>
                  <label style={{ display: "block", color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Special Requests</label>
                  <textarea value={form.requests} onChange={e => setForm(f => ({...f, requests: e.target.value}))}
                    placeholder="Dietary requirements, special occasions, seating preferences..."
                    rows={4} style={{ ...inputStyle("requests"), resize: "none" as const }}
                    onFocus={e => e.target.style.borderColor = "#C9A96E"}
                    onBlur={e => e.target.style.borderColor = "rgba(201,169,110,0.2)"} />
                </div>

                {/* Submit */}
                <button type="submit" disabled={status === "loading"}
                  style={{
                    width: "100%", background: status === "loading" ? "rgba(201,169,110,0.5)" : "#C9A96E",
                    color: "#0A0A0A", padding: "1.2rem", fontFamily: "sans-serif",
                    fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase",
                    border: "none", cursor: status === "loading" ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.background = "#E8D5B0"; }}
                  onMouseLeave={e => { if (status !== "loading") e.currentTarget.style.background = "#C9A96E"; }}>
                  {status === "loading" ? "Confirming Reservation..." : "Confirm Reservation →"}
                </button>

                <p style={{ textAlign: "center", color: "rgba(245,240,232,0.2)", fontFamily: "sans-serif", fontSize: "0.7rem", marginTop: "1rem", lineHeight: 1.7 }}>
                  We will send a confirmation to your email within minutes.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
