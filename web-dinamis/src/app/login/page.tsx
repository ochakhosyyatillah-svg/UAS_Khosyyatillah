"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { redirect: false, email, password });
    if (res?.error) {
      setError("Email atau password salah.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "'Inter', -apple-system, sans-serif",
      position: "relative",
    }}>
      {/* Dark overlay for better readability */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        
        .login-btn-fashion {
          background-color: #111;
          color: white;
          border: 1px solid #111;
          transition: all 0.3s ease;
        }
        .login-btn-fashion:hover {
          background-color: transparent;
          color: #111;
        }
        .login-input {
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(0,0,0,0.2) !important;
        }
        .login-input:focus {
          border-bottom: 1px solid #111 !important;
        }
      `}</style>

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: "420px",
        margin: "20px",
        animation: "fadeIn 0.8s ease forwards",
        position: "relative", zIndex: 10,
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "0px", // Sharp edges for luxury feel
          padding: "50px 40px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            {/* Logo icon - Hanger/Shopping Bag */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 15px",
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "32px", fontWeight: 700, margin: "0 0 8px",
              color: "#111", letterSpacing: "1px",
            }}>
              STYLEHUB
            </h1>
            <p style={{ color: "#666", fontSize: "12px", margin: 0, letterSpacing: "2px", textTransform: "uppercase" }}>
              Administrator Portal
            </p>
          </div>

          {/* Error box */}
          {error && (
            <div style={{
              background: "#fff1f2", borderLeft: "3px solid #e11d48",
              padding: "12px 16px",
              color: "#be123c", fontSize: "13px",
              marginBottom: "24px",
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: "25px" }}>
              <label style={{
                display: "block", fontSize: "10px", fontWeight: 600,
                color: "#666", textTransform: "uppercase", letterSpacing: "2px",
                marginBottom: "8px",
              }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="login-input"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "transparent",
                    border: "none",
                    padding: "10px 0",
                    color: "#111", fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "35px" }}>
              <label style={{
                display: "block", fontSize: "10px", fontWeight: 600,
                color: "#666", textTransform: "uppercase", letterSpacing: "2px",
                marginBottom: "8px",
              }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="login-input"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "transparent",
                    border: "none",
                    padding: "10px 40px 10px 0",
                    color: "#111", fontSize: "14px",
                    outline: "none",
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#999", padding: "4px",
                  display: "flex", alignItems: "center",
                }}>
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} className="login-btn-fashion" style={{
              width: "100%", padding: "16px",
              fontSize: "13px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            }}>
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "30px", color: "#999", fontSize: "11px", letterSpacing: "1px" }}>
            © 2026 STYLEHUB • ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </div>
  );
}
