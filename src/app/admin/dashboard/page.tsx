"use client";
import { useState } from "react";

const mockReservations = [
  { id: 1, name: "Priya Sharma", email: "priya@email.com", date: "2026-05-12", time: "8:00 PM", guests: 4, status: "pending", requests: "Window seat preferred" },
  { id: 2, name: "James Whitmore", email: "james@email.com", date: "2026-05-12", time: "7:30 PM", guests: 2, status: "confirmed", requests: "Anniversary dinner" },
  { id: 3, name: "Aiko Tanaka", email: "aiko@email.com", date: "2026-05-13", time: "9:00 PM", guests: 6, status: "pending", requests: "" },
  { id: 4, name: "Rohan Mehta", email: "rohan@email.com", date: "2026-05-14", time: "7:00 PM", guests: 3, status: "confirmed", requests: "Vegan menu" },
  { id: 5, name: "Sara Ali", email: "sara@email.com", date: "2026-05-14", time: "8:30 PM", guests: 2, status: "rejected", requests: "" },
];

const mockMenu = [
  { id: 1, name: "Seared Wagyu", category: "Mains", price: 3200, available: true },
  { id: 2, name: "Truffle Risotto", category: "Mains", price: 1800, available: true },
  { id: 3, name: "Lobster Bisque", category: "Starters", price: 1200, available: false },
  { id: 4, name: "Chocolate Soufflé", category: "Desserts", price: 900, available: true },
];

const kpis = [
  { label: "Total Bookings", value: "248", sub: "This month", trend: "+12%", up: true },
  { label: "Today's Covers", value: "34", sub: "of 40 seats", trend: "85%", up: true },
  { label: "Pending", value: "7", sub: "Need review", trend: "-3", up: false },
  { label: "Revenue Est.", value: "₹2.4L", sub: "This week", trend: "+8%", up: true },
];

const weekData = [40, 65, 50, 80, 90, 75, 60];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxVal = 90;

type ReservationStatus = "pending" | "confirmed" | "rejected";

export default function AdminDashboard() {
  const [tab, setTab] = useState("dashboard");
  const [reservations, setReservations] = useState(mockReservations);
  const [menu, setMenu] = useState(mockMenu);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const updateStatus = (id: number, status: ReservationStatus) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const toggleAvailable = (id: number) => {
    setMenu(prev => prev.map(m => m.id === id ? { ...m, available: !m.available } : m));
  };

  const statusColor = (s: string) => s === "confirmed" ? "#4CAF8A" : s === "rejected" ? "#E07070" : "#C9A96E";

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "▦" },
    { id: "reservations", label: "Reservations", icon: "📅" },
    { id: "menu", label: "Menu", icon: "🍽" },
    { id: "gallery", label: "Gallery", icon: "🖼" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0A", fontFamily: "sans-serif" }}>
      <style>{`
        .admin-sidebar { width: 240px; flex-shrink: 0; }
        .admin-main { flex: 1; min-width: 0; }
        .kpi-grid { grid-template-columns: repeat(4, 1fr); }
        .admin-mobile-bar { display: none; }
        @media (max-width: 900px) {
          .admin-sidebar { display: none; }
          .admin-mobile-bar { display: flex; position: sticky; top: 0; z-index: 50; background: #111; border-bottom: 1px solid rgba(201,169,110,0.15); padding: 0.75rem 1rem; gap: 0.4rem; overflow-x: auto; }
          .kpi-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) { .kpi-grid { grid-template-columns: 1fr 1fr; } }
        .res-table { width: 100%; overflow-x: auto; display: block; }
      `}</style>

      {/* Sidebar — Desktop */}
      <aside className="admin-sidebar" style={{ background: "#0D0D0D", borderRight: "1px solid rgba(201,169,110,0.1)", padding: "2rem 0", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <div style={{ padding: "0 1.5rem 2rem", borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
          <p style={{ color: "#C9A96E", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.1rem", letterSpacing: "0.2em" }}>NOIR & CO.</p>
          <p style={{ color: "rgba(245,240,232,0.25)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.2rem" }}>Admin Panel</p>
        </div>
        <nav style={{ padding: "1.5rem 0" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)} style={{
              display: "flex", alignItems: "center", gap: "0.85rem", width: "100%",
              padding: "0.85rem 1.5rem", background: "none", border: "none", cursor: "pointer",
              borderLeft: `2px solid ${tab === item.id ? "#C9A96E" : "transparent"}`,
              color: tab === item.id ? "#C9A96E" : "rgba(245,240,232,0.35)",
              fontSize: "0.8rem", letterSpacing: "0.1em", textAlign: "left",
              transition: "all 0.2s ease"
            }}>
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "1.5rem", marginTop: "auto", borderTop: "1px solid rgba(201,169,110,0.08)", position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <a href="/" style={{ color: "rgba(245,240,232,0.25)", fontSize: "0.7rem", letterSpacing: "0.1em", textDecoration: "none", display: "block", textAlign: "center", transition: "color 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#C9A96E"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.25)"}>
            ← View Website
          </a>
        </div>
      </aside>

      {/* Mobile Tab Bar */}
      <div className="admin-mobile-bar">
        {navItems.map(item => (
          <button key={item.id} onClick={() => setTab(item.id)} style={{
            background: tab === item.id ? "rgba(201,169,110,0.1)" : "none",
            border: `1px solid ${tab === item.id ? "#C9A96E" : "rgba(201,169,110,0.15)"}`,
            color: tab === item.id ? "#C9A96E" : "rgba(245,240,232,0.35)",
            padding: "0.5rem 1rem", fontSize: "0.68rem", letterSpacing: "0.1em",
            cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s"
          }}>{item.icon} {item.label}</button>
        ))}
      </div>

      {/* Main Area */}
      <main className="admin-main" style={{ padding: "2rem", overflowY: "auto" }}>

        {/* DASHBOARD TAB */}
        {tab === "dashboard" && (
          <div>
            <h1 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "2rem", fontWeight: 300, marginBottom: "0.3rem" }}>Dashboard</h1>
            <p style={{ color: "rgba(245,240,232,0.3)", fontSize: "0.78rem", marginBottom: "2.5rem" }}>Welcome back. Here's what's happening at Noir & Co.</p>

            {/* KPIs */}
            <div className="kpi-grid" style={{ display: "grid", gap: "1rem", marginBottom: "2.5rem" }}>
              {kpis.map(kpi => (
                <div key={kpi.label} style={{ background: "#141414", border: "1px solid rgba(201,169,110,0.1)", padding: "1.5rem", borderRadius: "2px" }}>
                  <p style={{ color: "rgba(245,240,232,0.35)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.8rem" }}>{kpi.label}</p>
                  <p style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "2.2rem", fontWeight: 300, lineHeight: 1 }}>{kpi.value}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.8rem" }}>
                    <p style={{ color: "rgba(245,240,232,0.25)", fontSize: "0.7rem" }}>{kpi.sub}</p>
                    <p style={{ color: kpi.up ? "#4CAF8A" : "#E07070", fontSize: "0.72rem" }}>{kpi.trend}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bar Chart */}
            <div style={{ background: "#141414", border: "1px solid rgba(201,169,110,0.1)", padding: "2rem" }}>
              <p style={{ color: "rgba(245,240,232,0.35)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "2rem" }}>Bookings This Week</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "0.75rem", height: "120px" }}>
                {weekData.map((val, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", height: "100%" }}>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100%" }}>
                      <div style={{ background: i === 4 ? "#C9A96E" : "rgba(201,169,110,0.25)", height: `${(val / maxVal) * 100}%`, width: "100%", transition: "height 0.8s ease", borderRadius: "1px 1px 0 0", minHeight: "4px" }} />
                    </div>
                    <p style={{ color: "rgba(245,240,232,0.3)", fontSize: "0.6rem", textTransform: "uppercase" }}>{weekDays[i]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reservations */}
            <div style={{ background: "#141414", border: "1px solid rgba(201,169,110,0.1)", padding: "2rem", marginTop: "1rem" }}>
              <p style={{ color: "rgba(245,240,232,0.35)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Recent Reservations</p>
              {reservations.slice(0, 3).map(r => (
                <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.8rem 0", borderBottom: "1px solid rgba(201,169,110,0.06)", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <p style={{ color: "#F5F0E8", fontSize: "0.85rem" }}>{r.name}</p>
                    <p style={{ color: "rgba(245,240,232,0.3)", fontSize: "0.72rem" }}>{r.date} · {r.time} · {r.guests} guests</p>
                  </div>
                  <span style={{ color: statusColor(r.status), border: `1px solid ${statusColor(r.status)}`, padding: "0.2rem 0.7rem", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESERVATIONS TAB */}
        {tab === "reservations" && (
          <div>
            <h1 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "2rem", fontWeight: 300, marginBottom: "0.3rem" }}>Reservations</h1>
            <p style={{ color: "rgba(245,240,232,0.3)", fontSize: "0.78rem", marginBottom: "2rem" }}>{reservations.length} total bookings</p>
            <div style={{ background: "#141414", border: "1px solid rgba(201,169,110,0.1)", overflow: "hidden" }}>
              <div className="res-table">
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
                      {["Guest", "Date", "Time", "Guests", "Status", "Actions"].map(h => (
                        <th key={h} style={{ color: "rgba(245,240,232,0.25)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "1rem 1.2rem", textAlign: "left", fontWeight: 400 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map(r => (
                      <tr key={r.id} style={{ borderBottom: "1px solid rgba(201,169,110,0.06)" }}>
                        <td style={{ padding: "1rem 1.2rem" }}>
                          <p style={{ color: "#F5F0E8", fontSize: "0.85rem" }}>{r.name}</p>
                          <p style={{ color: "rgba(245,240,232,0.3)", fontSize: "0.7rem" }}>{r.email}</p>
                        </td>
                        <td style={{ color: "rgba(245,240,232,0.55)", fontSize: "0.82rem", padding: "1rem 1.2rem" }}>{r.date}</td>
                        <td style={{ color: "rgba(245,240,232,0.55)", fontSize: "0.82rem", padding: "1rem 1.2rem" }}>{r.time}</td>
                        <td style={{ color: "rgba(245,240,232,0.55)", fontSize: "0.82rem", padding: "1rem 1.2rem", textAlign: "center" }}>{r.guests}</td>
                        <td style={{ padding: "1rem 1.2rem" }}>
                          <span style={{ color: statusColor(r.status), border: `1px solid ${statusColor(r.status)}`, padding: "0.25rem 0.7rem", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{r.status}</span>
                        </td>
                        <td style={{ padding: "1rem 1.2rem" }}>
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button onClick={() => updateStatus(r.id, "confirmed")} style={{ color: "#4CAF8A", border: "1px solid #4CAF8A", background: "none", padding: "0.3rem 0.7rem", fontSize: "0.62rem", cursor: "pointer", transition: "all 0.2s" }}
                              onMouseEnter={e => e.currentTarget.style.background = "rgba(76,175,138,0.1)"}
                              onMouseLeave={e => e.currentTarget.style.background = "none"}>✓</button>
                            <button onClick={() => updateStatus(r.id, "rejected")} style={{ color: "#E07070", border: "1px solid #E07070", background: "none", padding: "0.3rem 0.7rem", fontSize: "0.62rem", cursor: "pointer", transition: "all 0.2s" }}
                              onMouseEnter={e => e.currentTarget.style.background = "rgba(224,112,112,0.1)"}
                              onMouseLeave={e => e.currentTarget.style.background = "none"}>✕</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MENU TAB */}
        {tab === "menu" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h1 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "2rem", fontWeight: 300 }}>Menu</h1>
                <p style={{ color: "rgba(245,240,232,0.3)", fontSize: "0.78rem" }}>{menu.length} items</p>
              </div>
              <button style={{ color: "#0A0A0A", background: "#C9A96E", border: "none", padding: "0.75rem 1.5rem", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>+ Add Item</button>
            </div>
            <div style={{ background: "#141414", border: "1px solid rgba(201,169,110,0.1)", overflow: "hidden" }}>
              <div className="res-table">
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
                      {["Item", "Category", "Price", "Available", "Actions"].map(h => (
                        <th key={h} style={{ color: "rgba(245,240,232,0.25)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "1rem 1.2rem", textAlign: "left", fontWeight: 400 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {menu.map(item => (
                      <tr key={item.id} style={{ borderBottom: "1px solid rgba(201,169,110,0.06)" }}>
                        <td style={{ color: "#F5F0E8", fontSize: "0.85rem", padding: "1rem 1.2rem" }}>{item.name}</td>
                        <td style={{ padding: "1rem 1.2rem" }}>
                          <span style={{ color: "#C9A96E", border: "1px solid rgba(201,169,110,0.3)", padding: "0.2rem 0.6rem", fontSize: "0.6rem", letterSpacing: "0.1em" }}>{item.category}</span>
                        </td>
                        <td style={{ color: "#C9A96E", fontSize: "0.85rem", padding: "1rem 1.2rem" }}>₹{item.price.toLocaleString()}</td>
                        <td style={{ padding: "1rem 1.2rem" }}>
                          <button onClick={() => toggleAvailable(item.id)} style={{
                            width: "44px", height: "24px", borderRadius: "12px", border: "none", cursor: "pointer",
                            background: item.available ? "#C9A96E" : "rgba(245,240,232,0.1)",
                            position: "relative", transition: "background 0.3s ease"
                          }}>
                            <span style={{ position: "absolute", top: "2px", left: item.available ? "22px" : "2px", width: "20px", height: "20px", borderRadius: "50%", background: item.available ? "#0A0A0A" : "rgba(245,240,232,0.3)", transition: "left 0.3s ease" }} />
                          </button>
                        </td>
                        <td style={{ padding: "1rem 1.2rem" }}>
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button style={{ color: "#C9A96E", border: "1px solid rgba(201,169,110,0.3)", background: "none", padding: "0.3rem 0.7rem", fontSize: "0.62rem", cursor: "pointer" }}>Edit</button>
                            <button style={{ color: "#E07070", border: "1px solid rgba(224,112,112,0.3)", background: "none", padding: "0.3rem 0.7rem", fontSize: "0.62rem", cursor: "pointer" }}>Del</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {tab === "gallery" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h1 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "2rem", fontWeight: 300 }}>Gallery</h1>
                <p style={{ color: "rgba(245,240,232,0.3)", fontSize: "0.78rem" }}>Manage gallery images</p>
              </div>
              <button style={{ color: "#0A0A0A", background: "#C9A96E", border: "none", padding: "0.75rem 1.5rem", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>+ Add Image</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }}>
              {["photo-1414235077428","photo-1559339352-11d035aa65de","photo-1551632436-cbf8dd35adfa","photo-1533777857889-4be7c70b33f7","photo-1466978913421-dad2ebd01d17","photo-1544025162-d76694265947"].map((id, i) => (
                <div key={i} style={{ position: "relative", overflow: "hidden", aspectRatio: "1", background: "#141414" }}>
                  <img src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=300&q=80`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", transition: "background 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.7)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0)"}>
                    <button style={{ color: "#E07070", border: "1px solid #E07070", background: "none", padding: "0.4rem 0.8rem", fontSize: "0.65rem", cursor: "pointer" }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
