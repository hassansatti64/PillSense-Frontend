import { useState } from "react";
import { AppLayout } from "../components/Layout.jsx";
import { patients, medications } from "../data/mockData.js";

// ============================================================
// Medication List Page (M07)
// ============================================================
export function MedicationList({ onNavigate, patientId, onLogout }) {
  const patient = patients.find((p) => p.id === patientId) || patients[0];
  const meds = medications[patient.id] || [];
  const [localMeds, setLocalMeds] = useState(meds);
  const [showAdd, setShowAdd] = useState(false);
  const [editMed, setEditMed] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [running, setRunning] = useState(false);
  const [runDone, setRunDone] = useState(false);

  const handleRunAnalysis = () => {
    if (!patient.allergyConfirmed) {
      onNavigate("allergy-alert");
      return;
    }
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setRunDone(true);
      setTimeout(() => onNavigate("safety-report"), 800);
    }, 2200);
  };

  return (
    <AppLayout
      activePage="patients"
      onNavigate={onNavigate}
      onLogout={onLogout}
      userRole="Doctor"
      title="Medication List"
      subtitle={`${patient.name} · ${localMeds.length} active medications`}
      actions={
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={() => onNavigate("patient-detail")}>
            ← Patient Profile
          </button>
          <button className="btn btn-secondary" onClick={() => setShowAdd(true)}>
            + Add Medication
          </button>
          <button
            className="btn btn-primary"
            onClick={handleRunAnalysis}
            disabled={running}
            style={{ minWidth: 148 }}
          >
            {running ? (
              <><div className="spinner" style={{ width: 14, height: 14 }} /> Analysing…</>
            ) : runDone ? (
              "✓ Report Ready"
            ) : (
              "▶ Run Analysis"
            )}
          </button>
        </div>
      }
    >
      {!patient.allergyConfirmed && (
        <div className="alert-banner warning" style={{ marginBottom: 20 }}>
          <span className="alert-icon">⚠️</span>
          <div className="alert-content">
            <div className="alert-title">Allergy Profile Unconfirmed</div>
            <div className="alert-desc">
              The allergy contraindication check will run first. Please confirm the allergy profile before analysis.
            </div>
          </div>
          <button
            style={{ background: "transparent", border: "1px solid var(--moderate-border)", color: "var(--moderate)", borderRadius: "var(--r-sm)", padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
            onClick={() => onNavigate("allergy-profile")}
          >
            Confirm Now
          </button>
        </div>
      )}

      {/* Medication Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Drug Name</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Route</th>
              <th>Type</th>
              <th>Date Added</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {localMeds.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">
                    <div className="empty-icon">💊</div>
                    <div className="empty-title">No medications recorded</div>
                    <div className="empty-desc">Add medications to begin analysis.</div>
                  </div>
                </td>
              </tr>
            ) : (
              localMeds.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div className="cell-primary" style={{ fontFamily: "var(--font-mono)" }}>{m.name}</div>
                  </td>
                  <td>
                    <span className="text-sm">{m.dosage}</span>
                  </td>
                  <td>
                    <span className="text-sm">{m.frequency}</span>
                  </td>
                  <td>
                    <span className="badge badge-neutral">{m.route}</span>
                  </td>
                  <td>
                    <span className={`badge ${m.type === "OTC" ? "badge-info" : "badge-neutral"}`}>
                      {m.type}
                    </span>
                  </td>
                  <td className="text-muted text-sm">{m.dateAdded}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditMed(m)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setDeleteId(m.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Analysis status */}
      {running && (
        <div
          style={{
            marginTop: 24,
            padding: 20,
            background: "var(--surface-2)",
            borderRadius: "var(--r-md)",
            border: "1px solid var(--teal-border)",
            textAlign: "center",
          }}
        >
          <div className="spinner" style={{ margin: "0 auto 12px" }} />
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
            Running Full Analysis Pipeline…
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            Step 1: Allergy Contraindication Check → Step 2: Interaction Detection → Step 3: Toxicity Assessment
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAdd || editMed) && (
        <MedicationFormModal
          med={editMed}
          onClose={() => { setShowAdd(false); setEditMed(null); }}
          onSave={(med) => {
            if (editMed) {
              setLocalMeds(localMeds.map((m) => m.id === med.id ? med : m));
            } else {
              setLocalMeds([...localMeds, { ...med, id: `M${Date.now()}`, dateAdded: new Date().toISOString().split("T")[0] }]);
            }
            setShowAdd(false);
            setEditMed(null);
          }}
        />
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Remove Medication</div>
              <button className="close-btn" onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                Are you sure you want to remove this medication from the patient's active list? This action will be logged.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button
                className="btn btn-danger"
                onClick={() => { setLocalMeds(localMeds.filter((m) => m.id !== deleteId)); setDeleteId(null); }}
              >
                Remove Medication
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

// ============================================================
// Medication Form Modal (M08)
// ============================================================
function MedicationFormModal({ med, onClose, onSave }) {
  const [form, setForm] = useState(
    med || { name: "", dosage: "", frequency: "", route: "Oral", type: "Prescription", notes: "" }
  );
  const [freeText, setFreeText] = useState("");
  const [parsedPreview, setParsedPreview] = useState(null);
  const [activeTab, setActiveTab] = useState("structured");

  const parseFreeText = () => {
    // Simple mock parse
    const text = freeText.trim();
    if (!text) return;
    // Fake NLP parse result
    setParsedPreview({
      name: text.split(" ")[0] || "Unknown",
      dosage: text.match(/\d+\s*mg/i)?.[0] || "—",
      frequency: text.toLowerCase().includes("twice") ? "Twice daily" : "Once daily",
      route: "Oral",
      type: "Prescription",
    });
  };

  const handleSave = () => {
    if (!form.name || !form.dosage) return;
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">{med ? "Edit Medication" : "Add Medication"}</div>
            <div className="modal-subtitle">
              {med ? `Editing ${med.name}` : "Enter medication details or paste free-text prescription"}
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="tabs">
            <div className={`tab ${activeTab === "structured" ? "active" : ""}`} onClick={() => setActiveTab("structured")}>
              Structured Entry
            </div>
            <div className={`tab ${activeTab === "freetext" ? "active" : ""}`} onClick={() => setActiveTab("freetext")}>
              Free-Text / NLP
            </div>
          </div>

          {activeTab === "structured" ? (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Drug Name <span className="required">*</span></label>
                  <input
                    className="form-input"
                    placeholder="e.g. Metformin, Lisinopril"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Dosage Amount <span className="required">*</span></label>
                  <input
                    className="form-input"
                    placeholder="e.g. 500 mg"
                    value={form.dosage}
                    onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Frequency</label>
                  <select
                    className="form-select"
                    value={form.frequency}
                    onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                  >
                    <option>Once daily</option>
                    <option>Twice daily</option>
                    <option>Three times daily</option>
                    <option>Four times daily</option>
                    <option>Every 8 hours</option>
                    <option>Every 12 hours</option>
                    <option>Once weekly</option>
                    <option>As needed (PRN)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Route of Administration</label>
                  <select
                    className="form-select"
                    value={form.route}
                    onChange={(e) => setForm({ ...form, route: e.target.value })}
                  >
                    <option>Oral</option>
                    <option>IV</option>
                    <option>IM</option>
                    <option>Subcutaneous</option>
                    <option>Topical</option>
                    <option>Inhaled</option>
                    <option>Sublingual</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Medication Type</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {["Prescription", "OTC", "Supplement"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`filter-chip ${form.type === t ? "active" : ""}`}
                      onClick={() => setForm({ ...form, type: t })}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {form.type !== "Prescription" && (
                  <div className="form-hint">Non-prescription entries are included with equal analytical weight.</div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Notes (optional)</label>
                <textarea
                  className="form-textarea"
                  placeholder="e.g. Take with food, evening dose, etc."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  style={{ minHeight: 60 }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label">Free-Text Prescription Input</label>
                <textarea
                  className="form-textarea"
                  placeholder="Paste prescription text here, e.g.: 'Aspirin 75mg once daily by mouth for cardiovascular prophylaxis'"
                  value={freeText}
                  onChange={(e) => setFreeText(e.target.value)}
                  style={{ minHeight: 100 }}
                />
                <div className="form-hint">The LLM NLP parser will standardize drug names, resolve brand-to-generic equivalents, and extract dosage and frequency.</div>
              </div>
              <button className="btn btn-secondary" onClick={parseFreeText}>
                🤖 Parse with NLP
              </button>

              {parsedPreview && (
                <div
                  style={{
                    marginTop: 16,
                    padding: 16,
                    background: "var(--surface-2)",
                    borderRadius: "var(--r-md)",
                    border: "1px solid var(--teal-border)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--teal-light)" }}>
                      ✓ Parsed Result — Please confirm before saving
                    </div>
                    <span className="ai-label">AI-PARSED</span>
                  </div>
                  <div className="info-list">
                    {Object.entries(parsedPreview).map(([k, v]) => (
                      <div key={k} className="info-item">
                        <span className="info-item-label" style={{ textTransform: "capitalize" }}>{k}</span>
                        <span className="info-item-value">{v}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ marginTop: 12 }}
                    onClick={() => { setForm({ ...form, ...parsedPreview }); setActiveTab("structured"); }}
                  >
                    Use Parsed Data
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!form.name || !form.dosage}
          >
            {med ? "Save Changes" : "Add Medication"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Allergy Contraindication Alert Page (M09)
// ============================================================
export function AllergyContraindicationAlert({ onNavigate, patientId, onLogout }) {
  const patient = patients.find((p) => p.id === patientId) || patients[0];

  const contraindications = [
    {
      id: "C001",
      medication: "Aspirin",
      allergen: "Penicillin",
      type: "Database-confirmed",
      severity: "Severe",
      reason: "Patient has a recorded Severe allergy to Penicillin. Cross-reactive sensitivity has been identified between Penicillin-class antibiotics and Aspirin's salicylate structure in some patients. Requires clinical review.",
      aiIdentified: false,
      acknowledged: false,
    },
    {
      id: "C002",
      medication: "Omeprazole",
      allergen: "Sulfonamides",
      type: "AI-identified",
      severity: "Moderate",
      reason: "LLM analysis identified potential cross-reactive sensitivity risk between Sulfonamide-derived drugs and Omeprazole's benzimidazole group. While not directly contraindicated, clinical judgment is advised given patient's recorded sulfonamide allergy.",
      aiIdentified: true,
      acknowledged: false,
    },
  ];

  const [localItems, setLocalItems] = useState(contraindications);
  const [overrideId, setOverrideId] = useState(null);
  const [overrideReason, setOverrideReason] = useState("");

  const allAcknowledged = localItems.every((c) => c.acknowledged);

  const acknowledge = (id) => {
    setLocalItems(localItems.map((c) => c.id === id ? { ...c, acknowledged: true } : c));
  };

  const handleOverride = () => {
    if (!overrideReason.trim()) return;
    setLocalItems(localItems.map((c) => c.id === overrideId ? { ...c, acknowledged: true, overrideReason } : c));
    setOverrideId(null);
    setOverrideReason("");
  };

  return (
    <AppLayout
      activePage="patients"
      onNavigate={onNavigate}
      onLogout={onLogout}
      userRole="Doctor"
      title="Allergy Contraindication Check"
      subtitle={`${patient.name} · Pre-analysis safety gate`}
      actions={
        <button className="btn btn-secondary" onClick={() => onNavigate("medication-list")}>
          ← Medication List
        </button>
      }
    >
      {/* Header alert */}
      <div className="alert-banner danger" style={{ marginBottom: 24 }}>
        <span className="alert-icon">🚨</span>
        <div className="alert-content">
          <div className="alert-title">
            {localItems.filter((c) => !c.acknowledged).length} Allergy Conflict(s) Detected
          </div>
          <div className="alert-desc">
            The following medications have been flagged against this patient's allergy profile.
            All critical conflicts must be acknowledged before the analysis pipeline can proceed.
          </div>
        </div>
      </div>

      {/* Contraindication items */}
      {localItems.map((c) => (
        <div
          key={c.id}
          style={{
            padding: 20,
            borderRadius: "var(--r-md)",
            border: `1px solid ${c.acknowledged ? "var(--border)" : c.severity === "Severe" ? "var(--high-border)" : "var(--moderate-border)"}`,
            background: c.acknowledged
              ? "var(--surface-2)"
              : c.severity === "Severe"
              ? "var(--high-bg)"
              : "var(--moderate-bg)",
            marginBottom: 16,
            opacity: c.acknowledged ? 0.65 : 1,
            transition: "all 0.3s",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{ fontSize: 22, marginTop: 2 }}>
              {c.severity === "Severe" ? "🚨" : "⚠️"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {c.medication}
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: 13 }}>→ conflicts with allergen →</span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: c.severity === "Severe" ? "var(--high)" : "var(--moderate)",
                  }}
                >
                  {c.allergen}
                </span>
                <span
                  className={`badge ${c.severity === "Severe" ? "badge-high" : "badge-moderate"}`}
                >
                  {c.severity}
                </span>
                {c.aiIdentified && <span className="ai-label">AI-Identified</span>}
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>
                {c.reason}
              </p>
              {c.acknowledged ? (
                <div style={{ fontSize: 12, color: "var(--low)", fontWeight: 600 }}>
                  ✓ Acknowledged by Dr. Sarah Ahmed
                  {c.overrideReason && (
                    <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                      {" "}— Override reason: {c.overrideReason}
                    </span>
                  )}
                </div>
              ) : (
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-primary btn-sm" onClick={() => acknowledge(c.id)}>
                    ✓ Acknowledge & Proceed
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setOverrideId(c.id)}
                  >
                    Override with Reason
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Proceed button */}
      <div
        style={{
          marginTop: 24,
          padding: 20,
          background: "var(--surface)",
          borderRadius: "var(--r-md)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          {allAcknowledged ? (
            <div style={{ color: "var(--low)", fontSize: 14, fontWeight: 600 }}>
              ✓ All conflicts acknowledged — analysis pipeline unblocked
            </div>
          ) : (
            <div style={{ color: "var(--text-muted)", fontSize: 13 }}>
              {localItems.filter((c) => !c.acknowledged).length} conflict(s) pending acknowledgement
            </div>
          )}
        </div>
        <button
          className="btn btn-primary"
          disabled={!allAcknowledged}
          onClick={() => onNavigate("safety-report")}
        >
          Proceed to Analysis →
        </button>
      </div>

      {/* Override Modal */}
      {overrideId && (
        <div className="modal-overlay" onClick={() => setOverrideId(null)}>
          <div className="modal" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">Override Contraindication</div>
                <div className="modal-subtitle">
                  {localItems.find((c) => c.id === overrideId)?.medication} — {localItems.find((c) => c.id === overrideId)?.allergen}
                </div>
              </div>
              <button className="close-btn" onClick={() => setOverrideId(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="alert-banner warning" style={{ marginBottom: 16 }}>
                <span className="alert-icon">⚠️</span>
                <div className="alert-content">
                  <div className="alert-title">Override requires documented reason</div>
                  <div className="alert-desc">
                    This override will be permanently logged in the patient's audit trail and cannot be undone.
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Clinical Reason for Override <span className="required">*</span></label>
                <textarea
                  className="form-textarea"
                  placeholder="Document the clinical justification for overriding this contraindication…"
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setOverrideId(null)}>Cancel</button>
              <button
                className="btn btn-danger"
                onClick={handleOverride}
                disabled={!overrideReason.trim()}
              >
                Override & Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
