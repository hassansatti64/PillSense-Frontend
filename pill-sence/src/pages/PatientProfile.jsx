import { useState } from "react";
import { AppLayout, Badge } from "../components/Layout.jsx";
import { patients, allergies } from "../data/mockData.js";

// ============================================================
// Patient Detail Page (M05)
// ============================================================
export function PatientDetail({ onNavigate, patientId, onSelectPatient, onLogout }) {
  const patient = patients.find((p) => p.id === patientId) || patients[0];
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState({ ...patient });

  const riskColor = { high: "var(--high)", moderate: "var(--moderate)", low: "var(--low)" };
  const riskBadge = { high: "badge-high", moderate: "badge-moderate", low: "badge-low" };

  return (
    <AppLayout
      activePage="patients"
      onNavigate={onNavigate}
      onLogout={onLogout}
      userRole="Doctor"
      title={patient.name}
      subtitle={`Patient ID: ${patient.id} · Last reviewed: ${patient.lastReviewed}`}
      actions={
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={() => onNavigate("patients")}>
            ← All Patients
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowEdit(true)}>
            ✏ Edit Profile
          </button>
        </div>
      }
    >
      {/* Top summary banner */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {[
          { label: "Age", value: `${patient.age} years` },
          { label: "Gender", value: patient.gender },
          { label: "Weight", value: patient.weight },
          {
            label: "Risk Level",
            value: (
              <span className={`badge ${riskBadge[patient.riskLevel]}`} style={{ textTransform: "capitalize" }}>
                {patient.riskLevel} risk
              </span>
            ),
          },
        ].map((item) => (
          <div key={item.label} className="card card-sm" style={{ padding: "14px 18px" }}>
            <div className="kpi-label">{item.label}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginTop: 4 }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div className="content-grid">
        {/* Main info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Demographics */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Patient Demographics</div>
            </div>
            <div className="info-list">
              <div className="info-item">
                <span className="info-item-label">Full Name</span>
                <span className="info-item-value">{patient.name}</span>
              </div>
              <div className="info-item">
                <span className="info-item-label">Date of Birth</span>
                <span className="info-item-value">{patient.dob}</span>
              </div>
              <div className="info-item">
                <span className="info-item-label">Gender</span>
                <span className="info-item-value">{patient.gender}</span>
              </div>
              <div className="info-item">
                <span className="info-item-label">Weight</span>
                <span className="info-item-value">{patient.weight}</span>
              </div>
              <div className="info-item">
                <span className="info-item-label">Patient ID</span>
                <span className="info-item-value text-mono text-sm">{patient.id}</span>
              </div>
            </div>
          </div>

          {/* Chronic Conditions */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Chronic Conditions</div>
              <button className="btn btn-ghost btn-sm">+ Add Condition</button>
            </div>
            {patient.conditions.length === 0 ? (
              <div className="empty-state" style={{ padding: "30px 0" }}>
                <div className="empty-title">No conditions recorded</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {patient.conditions.map((c) => (
                  <div
                    key={c}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      background: "var(--surface-2)",
                      borderRadius: "var(--r-sm)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 15 }}>🫀</span>
                      <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-primary)" }}>{c}</span>
                    </div>
                    <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Allergy profile card */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Allergy Profile</div>
                <div className="card-subtitle">
                  {patient.allergyConfirmed ? (
                    <span style={{ color: "var(--low)" }}>✓ Confirmed by doctor</span>
                  ) : (
                    <span style={{ color: "var(--high)" }}>⚠ Not yet confirmed</span>
                  )}
                </div>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onNavigate("allergy-profile")}
              >
                Manage →
              </button>
            </div>
            {(allergies[patient.id] || []).length === 0 ? (
              <div className="text-muted text-sm">No allergies recorded.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {(allergies[patient.id] || []).map((a) => (
                  <div
                    key={a.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      background: "var(--surface-2)",
                      borderRadius: "var(--r-sm)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{a.allergen}</div>
                      <div className="text-xs text-muted">{a.type}</div>
                    </div>
                    <span
                      className={`badge ${a.severity === "Severe" ? "badge-high" : a.severity === "Moderate" ? "badge-moderate" : "badge-low"}`}
                    >
                      {a.severity}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {!patient.allergyConfirmed && (
              <button
                className="btn btn-primary w-full mt-3"
                style={{ marginTop: 14, width: "100%", justifyContent: "center" }}
              >
                Confirm Allergy Profile
              </button>
            )}
          </div>

          {/* Quick actions */}
          <div className="card">
            <div className="card-title" style={{ marginBottom: 14 }}>Patient Actions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: "flex-start", width: "100%" }}
                onClick={() => onNavigate("medication-list")}
              >
                💊 Manage Medications
              </button>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: "flex-start", width: "100%" }}
                onClick={() => onNavigate("allergy-profile")}
              >
                🛡️ Allergy Profile
              </button>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: "flex-start", width: "100%" }}
                onClick={() => onNavigate("safety-report")}
              >
                📋 Safety Report
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

          {/* Medication summary */}
          <div className="card card-sm">
            <div className="kpi-label" style={{ marginBottom: 8 }}>Active Medications</div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {patient.medicationCount}
            </div>
            <div className="text-xs text-muted mt-2">
              Last analysis: {patient.lastReviewed}
            </div>
            <button
              className="btn btn-primary btn-sm"
              style={{ marginTop: 12, width: "100%", justifyContent: "center" }}
              onClick={() => onNavigate("medication-list")}
            >
              Run Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div className="modal-overlay" onClick={() => setShowEdit(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">Edit Patient Profile</div>
                <div className="modal-subtitle">{patient.name}</div>
              </div>
              <button className="close-btn" onClick={() => setShowEdit(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <input type="date" className="form-input" value={editForm.dob} onChange={e => setEditForm({ ...editForm, dob: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select className="form-select" value={editForm.gender} onChange={e => setEditForm({ ...editForm, gender: e.target.value })}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Weight (kg)</label>
                  <input className="form-input" value={editForm.weight} onChange={e => setEditForm({ ...editForm, weight: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowEdit(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowEdit(false)}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

// ============================================================
// Allergy Profile Page (M06)
// ============================================================
export function AllergyProfile({ onNavigate, patientId, onLogout }) {
  const patient = patients.find((p) => p.id === patientId) || patients[0];
  const patientAllergies = allergies[patient.id] || [];
  const [localAllergies, setLocalAllergies] = useState(patientAllergies);
  const [confirmed, setConfirmed] = useState(patient.allergyConfirmed);
  const [showAdd, setShowAdd] = useState(false);
  const [newAllergy, setNewAllergy] = useState({ allergen: "", type: "Drug", severity: "Moderate" });
  const [deleteId, setDeleteId] = useState(null);

  const severityBadge = { Severe: "badge-high", Moderate: "badge-moderate", Mild: "badge-low" };

  const handleAdd = () => {
    if (!newAllergy.allergen) return;
    setLocalAllergies([
      ...localAllergies,
      { ...newAllergy, id: `A${Date.now()}`, dateAdded: new Date().toISOString().split("T")[0] },
    ]);
    setNewAllergy({ allergen: "", type: "Drug", severity: "Moderate" });
    setShowAdd(false);
    setConfirmed(false);
  };

  return (
    <AppLayout
      activePage="patients"
      onNavigate={onNavigate}
      onLogout={onLogout}
      userRole="Doctor"
      title="Allergy Profile"
      subtitle={`${patient.name} · ${patient.id}`}
      actions={
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={() => onNavigate("patient-detail")}>
            ← Patient Profile
          </button>
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            + Add Allergy
          </button>
        </div>
      }
    >
      {!confirmed && (
        <div className="alert-banner warning" style={{ marginBottom: 24 }}>
          <span className="alert-icon">⚠️</span>
          <div className="alert-content">
            <div className="alert-title">Allergy Profile Not Confirmed</div>
            <div className="alert-desc">
              This patient's allergy profile must be confirmed by the reviewing doctor before medication analysis can be initiated.
            </div>
          </div>
        </div>
      )}

      <div className="content-grid">
        <div>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Recorded Allergies</div>
                <div className="card-subtitle">{localAllergies.length} entries on record</div>
              </div>
            </div>

            {localAllergies.length === 0 ? (
              <div className="empty-state" style={{ padding: "40px 0" }}>
                <div className="empty-icon">🛡️</div>
                <div className="empty-title">No allergies recorded</div>
                <div className="empty-desc">Add allergy entries to protect this patient during analysis.</div>
              </div>
            ) : (
              <div className="table-container" style={{ border: "none" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Allergen</th>
                      <th>Type</th>
                      <th>Severity</th>
                      <th>Date Added</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {localAllergies.map((a) => (
                      <tr key={a.id}>
                        <td>
                          <div className="cell-primary">{a.allergen}</div>
                        </td>
                        <td>
                          <span className="badge badge-neutral">{a.type}</span>
                        </td>
                        <td>
                          <span className={`badge ${severityBadge[a.severity]}`}>{a.severity}</span>
                        </td>
                        <td className="text-muted text-sm">{a.dateAdded}</td>
                        <td>
                          <div className="actions-cell">
                            <button className="btn btn-ghost btn-sm">Edit</button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => setDeleteId(a.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Confirm button */}
            <div
              style={{
                marginTop: 20,
                padding: "16px 0 0",
                borderTop: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                {confirmed ? (
                  <span style={{ color: "var(--low)", fontSize: 13, fontWeight: 600 }}>
                    ✓ Allergy profile confirmed — analysis enabled
                  </span>
                ) : (
                  <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
                    Confirm this profile to enable medication analysis
                  </span>
                )}
              </div>
              {!confirmed ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setConfirmed(true)}
                >
                  ✓ Confirm Allergy Profile
                </button>
              ) : (
                <button
                  className="btn btn-secondary"
                  onClick={() => setConfirmed(false)}
                >
                  Unconfirm
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right info panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card">
            <div className="card-title" style={{ marginBottom: 14 }}>Summary</div>
            <div className="info-list">
              <div className="info-item">
                <span className="info-item-label">Total Entries</span>
                <span className="info-item-value">{localAllergies.length}</span>
              </div>
              <div className="info-item">
                <span className="info-item-label">Severe</span>
                <span className="info-item-value text-high font-bold">
                  {localAllergies.filter((a) => a.severity === "Severe").length}
                </span>
              </div>
              <div className="info-item">
                <span className="info-item-label">Moderate</span>
                <span className="info-item-value" style={{ color: "var(--moderate)", fontWeight: 600 }}>
                  {localAllergies.filter((a) => a.severity === "Moderate").length}
                </span>
              </div>
              <div className="info-item">
                <span className="info-item-label">Status</span>
                <span className={`info-item-value ${confirmed ? "text-low" : "text-high"}`} style={{ fontWeight: 600 }}>
                  {confirmed ? "Confirmed" : "Unconfirmed"}
                </span>
              </div>
            </div>
          </div>

          <div className="card card-sm">
            <div
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                lineHeight: 1.6,
                padding: "6px 0",
              }}
            >
              <strong style={{ color: "var(--text-secondary)" }}>Important:</strong> The allergy contraindication check runs
              before all medication analysis. All recorded allergies will be cross-referenced against the patient's medication
              regimen by the LLM engine.
            </div>
          </div>
        </div>
      </div>

      {/* Add Allergy Modal */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">Add Allergy Entry</div>
                <div className="modal-subtitle">{patient.name}</div>
              </div>
              <button className="close-btn" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Allergen Name <span className="required">*</span></label>
                <input
                  className="form-input"
                  placeholder="e.g. Penicillin, Sulfonamides, Shellfish"
                  value={newAllergy.allergen}
                  onChange={(e) => setNewAllergy({ ...newAllergy, allergen: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Allergy Type</label>
                  <select
                    className="form-select"
                    value={newAllergy.type}
                    onChange={(e) => setNewAllergy({ ...newAllergy, type: e.target.value })}
                  >
                    <option>Drug</option>
                    <option>Food</option>
                    <option>Environmental</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Severity</label>
                  <select
                    className="form-select"
                    value={newAllergy.severity}
                    onChange={(e) => setNewAllergy({ ...newAllergy, severity: e.target.value })}
                  >
                    <option>Mild</option>
                    <option>Moderate</option>
                    <option>Severe</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd}>Add Allergy</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Remove Allergy Entry</div>
              <button className="close-btn" onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                Are you sure you want to remove this allergy entry? This action will be logged in the audit trail.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setLocalAllergies(localAllergies.filter((a) => a.id !== deleteId));
                  setDeleteId(null);
                  setConfirmed(false);
                }}
              >
                Remove Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
