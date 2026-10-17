import { useState } from "react";
import { AppLayout } from "../components/Layout.jsx";
import { patients, safetyReport, medications } from "../data/mockData.js";

export default function SafetyReport({ onNavigate, patientId, onLogout }) {
  const patient = patients.find((p) => p.id === patientId) || patients[0];
  const report = safetyReport;
  const meds = medications[patient.id] || [];

  const [activeTab, setActiveTab] = useState("overview");
  const [recommendations, setRecommendations] = useState(report.recommendations);
  const [alertVisible, setAlertVisible] = useState(true);
  const [exported, setExported] = useState(false);

  const severityClass = (s) => {
    if (s === "severe" || s === "Severe") return "severe";
    if (s === "moderate" || s === "Moderate") return "moderate";
    return "mild";
  };

  const riskClass = report.riskLevel;

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  const updateRec = (id, status) => {
    setRecommendations(recommendations.map((r) => r.id === id ? { ...r, status } : r));
  };

  return (
    <AppLayout
      activePage="patients"
      onNavigate={onNavigate}
      onLogout={onLogout}
      userRole="Doctor"
      title="Safety Report"
      subtitle={`${patient.name} · Generated ${report.generatedAt} · By ${report.reviewedBy}`}
      actions={
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={() => onNavigate("medication-list")}>
            ← Medications
          </button>
          <button className="btn btn-secondary" onClick={() => onNavigate("chat")}>
            💬 Ask Companion
          </button>
          <button className="btn btn-primary" onClick={handleExport}>
            {exported ? "✓ PDF Downloaded" : "⬇ Export PDF"}
          </button>
        </div>
      }
    >
      {/* High-severity alert */}
      {alertVisible && report.interactions.some((i) => i.severity === "severe") && (
        <div className="alert-banner danger" style={{ marginBottom: 20 }}>
          <span className="alert-icon">🚨</span>
          <div className="alert-content">
            <div className="alert-title">High-Severity Interaction Detected</div>
            <div className="alert-desc">
              {report.interactions.filter((i) => i.severity === "severe").length} severe drug-drug interaction(s) found. Immediate clinical review required before any prescribing decisions.
            </div>
          </div>
          <button
            style={{ background: "transparent", border: "none", color: "var(--high)", cursor: "pointer", fontSize: 16, padding: "0 4px" }}
            onClick={() => setAlertVisible(false)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Risk Score Header */}
      <div className={`risk-score-display ${riskClass}`} style={{ marginBottom: 24 }}>
        <div>
          <div className="risk-score-label">Overall Risk Score</div>
          <div className="risk-score-number">{report.riskScore}</div>
          <div style={{ fontSize: 10, opacity: 0.6, marginTop: 2 }}>/100</div>
        </div>
        <div
          style={{
            width: 1,
            height: 60,
            background: "rgba(255,255,255,0.15)",
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            className={`badge ${riskClass === "high" ? "badge-high" : riskClass === "moderate" ? "badge-moderate" : "badge-low"}`}
            style={{ marginBottom: 8, fontSize: 12 }}
          >
            {riskClass.toUpperCase()} RISK — {riskClass === "high" ? "Immediate Review Required" : riskClass === "moderate" ? "Monitor Closely" : "Routine Monitoring"}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55, maxWidth: 600 }}>
            {report.riskNarrative}
          </div>
          <div style={{ marginTop: 6 }}>
            <span className="ai-label">AI-Generated Narrative</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {[
          { label: "Interactions", value: report.interactions.length, cls: "badge-moderate" },
          { label: "Severe", value: report.interactions.filter(i => i.severity === "severe").length, cls: "badge-high" },
          { label: "Recommendations", value: recommendations.length, cls: "badge-info" },
          { label: "Medications Analysed", value: meds.length, cls: "badge-neutral" },
        ].map((s) => (
          <div key={s.label} className="card card-sm" style={{ padding: "12px 16px", textAlign: "center" }}>
            <div className="kpi-value" style={{ fontSize: 22 }}>{s.value}</div>
            <div className="kpi-label" style={{ marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div className={`tab ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
          Interactions & Toxicity
        </div>
        <div className={`tab ${activeTab === "recommendations" ? "active" : ""}`} onClick={() => setActiveTab("recommendations")}>
          Recommendations
        </div>
        <div className={`tab ${activeTab === "nutrients" ? "active" : ""}`} onClick={() => setActiveTab("nutrients")}>
          Drug-Nutrient Analysis
        </div>
        <div className={`tab ${activeTab === "history" ? "active" : ""}`} onClick={() => setActiveTab("history")}>
          Report History
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <div className="content-grid">
          <div>
            <div className="section-heading">Drug Interactions</div>
            {report.interactions.map((interaction) => (
              <div
                key={interaction.id}
                className={`interaction-item ${severityClass(interaction.severity)}`}
              >
                <div className="interaction-drugs">
                  {interaction.drugs.map((d, i) => (
                    <span key={d}>
                      <span className="drug-chip">{d}</span>
                      {i < interaction.drugs.length - 1 && (
                        <span style={{ color: "var(--text-muted)", fontSize: 12, margin: "0 4px" }}>×</span>
                      )}
                    </span>
                  ))}
                  <span
                    className={`badge ${interaction.severity === "severe" ? "badge-high" : interaction.severity === "moderate" ? "badge-moderate" : "badge-low"}`}
                    style={{ marginLeft: "auto", textTransform: "capitalize" }}
                  >
                    {interaction.severity}
                  </span>
                  <span className="badge badge-neutral">{interaction.type}</span>
                </div>
                <div className="interaction-desc">{interaction.description}</div>
              </div>
            ))}

            {report.duplicates.length === 0 && (
              <div className="alert-banner success" style={{ marginTop: 12 }}>
                <span className="alert-icon">✅</span>
                <div className="alert-content">
                  <div className="alert-title">No duplicate compounds detected</div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Toxicity summary */}
          <div>
            <div className="section-heading">Toxicity Summary</div>
            <div className="card">
              <div className="card-title" style={{ marginBottom: 12 }}>Risk Score Breakdown</div>
              {[
                { label: "Interaction Risk", value: 35, max: 40, cls: "high" },
                { label: "Toxicity Risk", value: 22, max: 30, cls: "moderate" },
                { label: "Allergy Risk", value: 10, max: 15, cls: "moderate" },
                { label: "Dosage Risk", value: 7, max: 15, cls: "low" },
              ].map((r) => (
                <div key={r.label} style={{ marginBottom: 14 }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: 5 }}>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{r.label}</span>
                    <span className="text-sm font-bold">{r.value}/{r.max}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${r.cls}`}
                      style={{ width: `${(r.value / r.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="divider" />
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  marginTop: 10,
                }}
              >
                <span className="ai-label" style={{ marginBottom: 6, display: "inline-block" }}>AI-Generated</span>
                <br />
                Primary concern: Renal impairment potentiating Metformin lactic acidosis risk. Secondary concern: CYP3A4-mediated Atorvastatin accumulation.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "recommendations" && (
        <div>
          <div className="section-heading">Medication Optimization Recommendations</div>
          <div className="alert-banner info" style={{ marginBottom: 20 }}>
            <span className="alert-icon">ℹ️</span>
            <div className="alert-content">
              <div className="alert-title">Advisory — Clinical Validation Required</div>
              <div className="alert-desc">
                All recommendations below are AI-generated and advisory only. The system will not automatically modify the patient's medication list. All changes require explicit clinical decision and action.
              </div>
            </div>
          </div>
          {recommendations.map((rec) => (
            <div key={rec.id} className="recommendation-item">
              <div className="rec-priority">P{rec.priority}</div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: 5 }}>
                  <span className="rec-title">{rec.title}</span>
                  <span className="badge badge-info" style={{ fontSize: 10 }}>{rec.type}</span>
                  {rec.status === "acknowledged" && (
                    <span className="badge badge-low" style={{ fontSize: 10 }}>✓ Acknowledged</span>
                  )}
                  {rec.status === "dismissed" && (
                    <span className="badge badge-neutral" style={{ fontSize: 10 }}>Dismissed</span>
                  )}
                </div>
                <div className="rec-desc">{rec.description}</div>
                {rec.status === "pending" && (
                  <div className="rec-actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => updateRec(rec.id, "acknowledged")}>
                      ✓ Acknowledge
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => updateRec(rec.id, "flagged")}>
                      🏳 Flag for Follow-up
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => updateRec(rec.id, "dismissed")}>
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "nutrients" && (
        <div>
          <div className="section-heading">Drug-Nutrient Interaction Analysis</div>
          {report.nutrientFindings.map((f, i) => (
            <div
              key={i}
              style={{
                padding: 18,
                border: "1px solid var(--border)",
                borderRadius: "var(--r-md)",
                marginBottom: 12,
                background: "var(--surface)",
              }}
            >
              <div className="flex items-center gap-3" style={{ marginBottom: 8 }}>
                <span className="drug-chip">{f.medication}</span>
                <span style={{ color: "var(--text-muted)", fontSize: 13 }}>→ affects →</span>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>
                  {f.nutrient}
                </span>
                <span
                  className={`badge ${f.severity === "moderate" ? "badge-moderate" : "badge-low"}`}
                  style={{ marginLeft: "auto", textTransform: "capitalize" }}
                >
                  {f.severity}
                </span>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>
                {f.risk}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "history" && (
        <div>
          <div className="section-heading">Previous Safety Reports</div>
          {[
            { date: "2026-05-08 14:32", score: 74, level: "high", by: "Dr. Sarah Ahmed" },
            { date: "2026-04-20 10:15", score: 62, level: "moderate", by: "Dr. Sarah Ahmed" },
            { date: "2026-03-10 09:05", score: 48, level: "moderate", by: "Dr. Sarah Ahmed" },
          ].map((r, i) => (
            <div
              key={i}
              style={{
                padding: "14px 18px",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-md)",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>{r.date}</div>
                  <div className="text-xs text-muted">Reviewed by {r.by}</div>
                </div>
                <span
                  className={`badge ${r.level === "high" ? "badge-high" : r.level === "moderate" ? "badge-moderate" : "badge-low"}`}
                  style={{ textTransform: "capitalize" }}
                >
                  {r.level} risk
                </span>
                <span style={{ fontSize: 16, fontWeight: 700, color: r.level === "high" ? "var(--high)" : r.level === "moderate" ? "var(--moderate)" : "var(--low)" }}>
                  {r.score}/100
                </span>
              </div>
              <button className="btn btn-ghost btn-sm">View</button>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
