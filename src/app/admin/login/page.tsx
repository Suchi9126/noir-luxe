"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 1200));
    if (email === "admin@noirandco.in" && password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials. Try admin@noirandco.in / admin123");
      setLoading(false);
    }
  };

  return (
    <main style={{ background: "#0A0A0A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#C9A96E", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.4rem", letterSpacing: "0.3em", marginBottom: "0.5rem" }}>NOIR & CO.</p>
          <p style={{ color: "rgba(245,240,232,0.25)", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>Admin Access</p>
        </div>
        <form onSubmit={handleLogin} style={{ background: "#0D0D0D", border: "1px solid rgba(201,169,110,0.12)", padding: "2.5rem" }}>
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", color: "rgba(245,240,232,0.35)", fontFamily: "sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@noirandco.in"
              style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,169,110,0.2)", color: "#F5F0E8", padding: "0.9rem 1rem", fontFamily: "sans-serif", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = "#C9A96E"}
              onBlur={e => e.target.style.borderColor = "rgba(201,169,110,0.2)"} />
          </div>
          <div style={{ marginBottom: "1.8rem" }}>
            <label style={{ display: "block", color: "rgba(245,240,232,0.35)", fontFamily: "sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,169,110,0.2)", color: "#F5F0E8", padding: "0.9rem 1rem", fontFamily: "sans-serif", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = "#C9A96E"}
              onBlur={e => e.target.style.borderColor = "rgba(201,169,110,0.2)"} />
          </div>
          {error && <p style={{ color: "#E07070", fontFamily: "sans-serif", fontSize: "0.75rem", marginBottom: "1.2rem", lineHeight: 1.6 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ width: "100%", background: loading ? "rgba(201,169,110,0.5)" : "#C9A96E", color: "#0A0A0A", border: "none", padding: "1rem", fontFamily: "sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.3s ease" }}>
            {loading ? "Verifying..." : "Sign In →"}
          </button>
        </form>
        <p style={{ textAlign: "center", color: "rgba(245,240,232,0.15)", fontFamily: "sans-serif", fontSize: "0.68rem", marginTop: "1.5rem" }}>
          <a href="/" style={{ color: "rgba(201,169,110,0.3)", textDecoration: "none" }}>← Back to website</a>
        </p>
      </div>
    </main>
  );
}
