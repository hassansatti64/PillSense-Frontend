import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate auth — route by email prefix
    setTimeout(() => {
      setLoading(false);
      if (email.toLowerCase().includes("admin")) {
        onLogin("Admin");
      } else {
        onLogin("Doctor");
      }
    }, 1000);
  };

  const handleForgot = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
  };

  if (showForgot) {
    return (
      <div className="login-page">
        <div className="login-bg-grid" />
        <div className="login-bg-glow" />
        <div className="login-card">
          <div className="login-logo">
            <div className="login-logo-icon">💊</div>
            <div>
              <div className="login-logo-text">Pill<span>Sense</span></div>
              <div className="login-tagline">Doctor Companion Platform</div>
            </div>
          </div>

          {forgotSent ? (
            <div>
              <div
                className="alert-banner success"
                style={{ marginBottom: 20 }}
              >
                <span className="alert-icon">✅</span>
                <div className="alert-content">
                  <div className="alert-title">Reset link sent</div>
                  <div className="alert-desc">
                    A password reset link has been sent to{" "}
                    <strong>{forgotEmail}</strong>. The link expires in 30 minutes.
                  </div>
                </div>
              </div>
              <button
                className="btn btn-secondary w-full"
                onClick={() => {
                  setShowForgot(false);
                  setForgotSent(false);
                  setForgotEmail("");
                }}
              >
                ← Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgot}>
              <div className="login-heading">Reset Password</div>
              <div className="login-sub">
                Enter your registered email address and we'll send you a secure reset link.
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="doctor@hospital.pk"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-full btn-lg" style={{ width: "100%", justifyContent: "center" }}>
                Send Reset Link
              </button>
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowForgot(false)}
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-bg-grid" />
      <div className="login-bg-glow" />

      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">💊</div>
          <div>
            <div className="login-logo-text">Pill<span>Sense</span></div>
            <div className="login-tagline">Doctor Companion Platform</div>
          </div>
        </div>

        <div className="login-heading">Welcome back</div>
        <div className="login-sub">
          Sign in with your institutional credentials to access the clinical dashboard.
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="doctor@hospital.pk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Password <span className="required">*</span>
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="form-error" style={{ marginBottom: 12 }}>
              ⚠ {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: "100%", justifyContent: "center", marginBottom: 14 }}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: 16, height: 16 }} />
                Authenticating…
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ fontSize: 13, color: "var(--teal-light)" }}
              onClick={() => setShowForgot(true)}
            >
              Forgot your password?
            </button>
          </div>
        </form>

        <div className="divider" style={{ marginTop: 28 }} />

        <div
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-sm)",
            padding: "12px 14px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 8,
            }}
          >
            Demo Credentials
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.7 }}>
            <div>👨‍⚕️ Doctor: <span style={{ color: "var(--teal-light)", fontFamily: "var(--font-mono)" }}>doctor@hospital.pk</span> / any password</div>
            <div>🛡️ Admin: <span style={{ color: "var(--teal-light)", fontFamily: "var(--font-mono)" }}>admin@hospital.pk</span> / any password</div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 11.5,
            color: "var(--text-muted)",
          }}
        >
          🔒 Secured by JWT · TLS 1.3 Encrypted · COMSATS University
        </div>
      </div>
    </div>
  );
}
