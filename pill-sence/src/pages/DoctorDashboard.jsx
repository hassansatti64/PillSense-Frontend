import { AppLayout } from "../components/Layout.jsx";
import { patients, safetyReport } from "../data/mockData.js";

export default function DoctorDashboard({ onNavigate, selectedPatient, onSelectPatient, onLogout }) {
  const highRisk = patients.filter((p) => p.riskLevel === "high").length;
  const recentPatients = patients.slice(0, 4);

  const riskColor = {
    high: "var(--high)",
    moderate: "var(--moderate)",
    low: "var(--low)",
  };

  const riskBadgeClass = {
    high: "badge-high",
    moderate: "badge-moderate",
    low: "badge-low",
  };

  return (
    <AppLayout
      activePage="dashboard"
      onNavigate={onNavigate}
      onLogout={onLogout}
      userRole="Doctor"
      title="Clinical Dashboard"
      subtitle="Monday, 11 May 2026"
      actions={
        <button
          className="btn btn-primary"
          onClick={() => onNavigate("patients")}
        >
          + New Patient
        </button>
      }
    >
      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Patients</div>
          <div className="kpi-value">{patients.length}</div>
          <div className="kpi-meta">Under active management</div>
        </div>
        <div className="kpi-card danger">
          <div className="kpi-label">High Risk Patients</div>
          <div className="kpi-value" style={{ color: "var(--high)" }}>{highRisk}</div>
          <div className="kpi-meta">Require immediate review</div>
        </div>
        <div className="kpi-card warning">
          <div className="kpi-label">Pending Reviews</div>
          <div className="kpi-value" style={{ color: "var(--moderate)" }}>2</div>
          <div className="kpi-meta">Allergy profiles unconfirmed</div>
        </div>
        <div className="kpi-card success">
          <div className="kpi-label">Reports Generated</div>
          <div className="kpi-value" style={{ color: "var(--low)" }}>14</div>
          <div className="kpi-meta">This month</div>
        </div>
      </div>

      <div className="content-grid">
        {/* Left column */}
        <div>
          {/* Alert */}
          <div
            className="alert-banner danger"
            style={{ marginBottom: 24 }}
          >
            <span className="alert-icon">🚨</span>
            <div className="alert-content">
              <div className="alert-title">High-Priority Alert: Muhammad Tariq</div>
              <div className="alert-desc">
                Severe Lisinopril–Metformin interaction detected in CKD Stage 3 patient. Risk Score 74/100. Immediate clinical review recommended.
              </div>
            </div>
            <button
              style={{ background: "transparent", border: "1px solid var(--high-border)", color: "var(--high)", borderRadius: "var(--r-sm)", padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
              onClick={() => { onSelectPatient("P001"); onNavigate("safety-report"); }}
            >
              View Report
            </button>
          </div>

          {/* Recent patients */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Recent Patients</div>
                <div className="card-subtitle">Last reviewed cases</div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => onNavigate("patients")}>
                View All →
              </button>
            </div>
            <div className="table-container" style={{ border: "none" }}>
              <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Conditions</th>
                    <th>Medications</th>
                    <th>Risk</th>
                    <th>Last Review</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {recentPatients.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <div
                            className="user-avatar"
                            style={{ width: 30, height: 30, fontSize: 11 }}
                          >
                            {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <div className="cell-primary">{p.name}</div>
                            <div className="text-xs text-muted">{p.age}y · {p.gender}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-muted text-sm">
                          {p.conditions.slice(0, 1).join(", ")}
                          {p.conditions.length > 1 && (
                            <span style={{ color: "var(--text-muted)" }}>
                              {" "}+{p.conditions.length - 1} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="text-sm">{p.medicationCount} drugs</span>
                      </td>
                      <td>
                        <span
                          className={`badge ${riskBadgeClass[p.riskLevel]}`}
                          style={{ textTransform: "capitalize" }}
                        >
                          {p.riskLevel} risk
                        </span>
                      </td>
                      <td className="text-muted text-sm">{p.lastReviewed}</td>
                      <td>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => { onSelectPatient(p.id); onNavigate("patient-detail"); }}
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Risk distribution */}
          <div className="card">
            <div className="card-header" style={{ marginBottom: 16 }}>
              <div className="card-title">Risk Distribution</div>
            </div>
            {[
              { label: "High Risk", count: 2, total: patients.length, cls: "high" },
              { label: "Moderate Risk", count: 1, total: patients.length, cls: "moderate" },
              { label: "Low Risk", count: 2, total: patients.length, cls: "low" },
            ].map((r) => (
              <div key={r.label} style={{ marginBottom: 14 }}>
                <div
                  className="flex justify-between items-center"
                  style={{ marginBottom: 5 }}
                >
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{r.label}</span>
                  <span className="text-sm font-bold" style={{ color: riskColor[r.cls] }}>
                    {r.count}/{r.total}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${r.cls}`}
                    style={{ width: `${(r.count / r.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="card">
            <div className="card-title" style={{ marginBottom: 14 }}>Quick Actions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: "flex-start", width: "100%" }}
                onClick={() => onNavigate("patients")}
              >
                👥 View All Patients
              </button>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: "flex-start", width: "100%" }}
                onClick={() => { onSelectPatient("P001"); onNavigate("safety-report"); }}
              >
                📋 Latest Safety Report
              </button>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: "flex-start", width: "100%" }}
                onClick={() => onNavigate("chat")}
              >
                💬 Doctor Companion Chat
              </button>
            </div>
          </div>

          {/* System info */}
          <div className="card card-sm">
            <div
              className="flex items-center gap-2"
              style={{ marginBottom: 10 }}
            >
              <span
                className="status-dot active"
                style={{ color: "var(--text-secondary)", fontSize: 12 }}
              >
                &nbsp;System Online
              </span>
            </div>
            <div className="info-list">
              <div className="info-item">
                <span className="info-item-label">LLM Engine</span>
                <span className="info-item-value text-sm text-low">● Operational</span>
              </div>
              <div className="info-item">
                <span className="info-item-label">Drug DB</span>
                <span className="info-item-value text-sm">v3.2.1 · 4,872 records</span>
              </div>
              <div className="info-item">
                <span className="info-item-label">Session</span>
                <span className="info-item-value text-sm">Expires in 28 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
