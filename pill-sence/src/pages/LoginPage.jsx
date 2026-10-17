import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState("doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const DEMO = {
    doctor:     { email: "dr.hassan@pmch.edu.pk",  password: "doctor123",  name: "Dr. Hassan Zaman",    role: "doctor",     dept: "General Medicine" },
    pharmacist: { email: "pharm.sara@pmch.edu.pk", password: "pharma123",  name: "Pharm. Sara Ahmed",   role: "pharmacist", dept: "Outpatient Pharmacy" },
    admin:      { email: "admin@pmch.edu.pk",       password: "admin123",   name: "Admin. Bilal Raza",   role: "admin",      dept: "IT / Platform" },
  };

  const handleLogin = () => {
    setError("");
    const creds = DEMO[role];
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (email !== creds.email || password !== creds.password) {
      setError("Invalid credentials. Use the demo credentials below.");
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(creds); }, 900);
  };

  const handleForgot = () => {
    if (!forgotEmail) return;
    setForgotSent(true);
  };

  const fillDemo = () => {
    setEmail(DEMO[role].email);
    setPassword(DEMO[role].password);
    setError("");
  };

  if (showForgot) {
    return (
      <div className="login-page">
        <div className="login-left">
          <div className="login-left-logo">
            <div className="login-left-logo-icon">💊</div>
            <div className="login-left-logo-text">PillSense</div>
          </div>
          <div className="login-left-hero">
            <div className="login-left-title">Secure Clinical Intelligence Platform</div>
            <div className="login-left-sub">COMSATS University, Islamabad — Healthcare Intelligence</div>
          </div>
          <div className="login-left-footer">© 2024 PillSense Editorial Guardian. HIPAA Compliant Secure Portal.</div>
        </div>
        <div className="login-right">
          <div className="login-form-wrap">
            <div className="login-heading">Reset password</div>
            <div className="login-sub" style={{ marginBottom: 24 }}>Enter your hospital email to receive a reset link.</div>
            {forgotSent ? (
              <div className="alert-banner success" style={{ marginBottom: 20 }}>
                <span className="alert-icon">✅</span>
                <div className="alert-content">
                  <div className="alert-title">Reset link sent</div>
                  <div className="alert-desc">Check your hospital email inbox.</div>
                </div>
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">Hospital email</label>
                <input className="form-input" type="email" placeholder="you@pmch.edu.pk"
                  value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} />
              </div>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button className="btn btn-secondary" onClick={() => { setShowForgot(false); setForgotSent(false); setForgotEmail(""); }}>← Back</button>
              {!forgotSent && <button className="btn btn-primary w-full" onClick={handleForgot}>Send reset link</button>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      {/* ── Left panel ── */}
      <div className="login-left">
        <div className="login-left-logo">
          <div className="login-left-logo-icon">💊</div>
          <div className="login-left-logo-text">PillSense</div>
        </div>

        <div className="login-left-hero">
          <div className="login-left-title">AI-Powered Doctor Companion — Medication Safety Platform</div>
          <div className="login-left-sub">COMSATS University, Islamabad – Healthcare Intelligence</div>
          <div className="login-stats">
            <div className="login-stat">
              <div className="login-stat-value">11</div>
              <div className="login-stat-label">Modules</div>
            </div>
            <div className="login-stat">
              <div className="login-stat-value">LLM</div>
              <div className="login-stat-label">AI-Powered</div>
            </div>
            <div className="login-stat">
              <div className="login-stat-value">85%+</div>
              <div className="login-stat-label">Accuracy</div>
            </div>
            <div className="login-stat">
              <div className="login-stat-value">30s</div>
              <div className="login-stat-label">Per Report</div>
            </div>
          </div>
        </div>

        <div className="login-left-footer">© 2026 PillSense Editorial Guardian. HIPAA Compliant Secure Portal.</div>
      </div>

      {/* ── Right panel ── */}
      <div className="login-right">
        <div className="login-form-wrap animate-slide-up">
          <div className="login-heading">Welcome back</div>
          <div className="login-sub">Sign in to access clinical intelligence.</div>

          {/* Role selector */}
          <div className="role-tabs">
            {["doctor", "pharmacist", "admin"].map(r => (
              <button key={r} className={`role-tab${role === r ? " active" : ""}`}
                onClick={() => { setRole(r); setEmail(""); setPassword(""); setError(""); }}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          {error && (
            <div className="alert-banner danger" style={{ marginBottom: 16 }}>
              <span className="alert-icon">⚠️</span>
              <div className="alert-content"><div className="alert-desc">{error}</div></div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Hospital email</label>
            <input className="form-input" type="email" placeholder={DEMO[role].email}
              value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "var(--text-muted)", cursor: "pointer" }}>
              <input type="checkbox" style={{ accentColor: "var(--green-mid)" }} />
              Remember this device
            </label>
            <button className="btn-ghost btn-sm" style={{ color: "var(--green-mid)", padding: "0", background: "none", fontSize: 12 }}
              onClick={() => setShowForgot(true)}>Forgot password?</button>
          </div>

          <button className="btn btn-primary w-full btn-lg" onClick={handleLogin} disabled={loading}
            style={{ justifyContent: "center" }}>
            {loading ? <><span className="spinner" style={{ width: 16, height: 16, borderTopColor: "#fff", borderColor: "rgba(255,255,255,0.3)" }} /> Signing in...</> : "Sign in to PillSense →"}
          </button>

          {/* Demo fill helper */}
          <div style={{ marginTop: 20, padding: 14, background: "var(--surface-2)", borderRadius: "var(--r-md)", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Demo credentials — {role}</div>
            <div style={{ fontSize: 12.5, color: "var(--text-secondary)", marginBottom: 4 }}>📧 {DEMO[role].email}</div>
            <div style={{ fontSize: 12.5, color: "var(--text-secondary)", marginBottom: 10 }}>🔑 {DEMO[role].password}</div>
            <button className="btn btn-secondary btn-sm w-full" onClick={fillDemo} style={{ justifyContent: "center" }}>Fill credentials</button>
          </div>

          <div className="login-footer-text" style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 20 }}>
            <span style={{ color: "var(--green-mid)", marginTop: 1 }}>✅</span>
            <span>Authorized healthcare professionals only. JWT secured. HIPAA-aware session management. All interactions are audited for clinical compliance.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
