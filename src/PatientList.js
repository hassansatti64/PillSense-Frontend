import { useState } from "react";
import { AppLayout, Badge } from "../components/Layout.jsx";
import { patients } from "../data/mockData.js";

export default function PatientList({ onNavigate, onSelectPatient }) {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [showNewModal, setShowNewModal] = useState(false);
  const [form, setForm] = useState({
    name: "", dob: "", gender: "", weight: "", conditions: ""
  });

  const filtered = patients.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.conditions.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    const matchRisk = riskFilter === "all" || p.riskLevel === riskFilter;
    return matchSearch && matchRisk;
  });

  const riskBadge = { high: "badge-high", moderate: "badge-moderate", low: "badge-low" };

  return (
    <AppLayout
      activePage="patients"
      onNavigate={onNavigate}
      userRole="Doctor"
      title="Patient Profiles"
      subtitle="Manage and monitor patient health records"
      actions={
        <button className="btn btn-primary" onClick={() => setShowNewModal(true)}>
          + New Patient
        </button>
      }
    >
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            placeholder="Search by name or condition…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-bar">
          {["all", "high", "moderate", "low"].map((r) => (
            <button
              key={r}
              className={`filter-chip ${riskFilter === r ? "active" : ""}`}
              onClick={() => setRiskFilter(r)}
            >
              {r === "all" ? "All Patients" : `${r.charAt(0).toUpperCase() + r.slice(1)} Risk`}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Age / Gender</th>
              <th>Chronic Conditions</th>
              <th>Medications</th>
              <th>Allergy Profile</th>
              <th>Risk Level</th>
              <th>Last Reviewed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className="empty-state">
                    <div className="empty-icon">👥</div>
                    <div className="empty-title">No patients found</div>
                    <div className="empty-desc">Try adjusting your search or filters.</div>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div
                        className="user-avatar"
                        style={{ width: 32, height: 32, fontSize: 12 }}
                      >
                        {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div className="cell-primary">{p.name}</div>
                        <div className="text-xs text-muted" style={{ fontFamily: "var(--font-mono)" }}>
                          {p.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-sm">{p.age}y · {p.gender}</span>
                  </td>
                  <td>
                    <div className="tag-list">
                      {p.conditions.slice(0, 2).map((c) => (
                        <span key={c} className="tag" style={{ fontSize: 11 }}>{c}</span>
                      ))}
                      {p.conditions.length > 2 && (
                        <span className="tag" style={{ fontSize: 11 }}>
                          +{p.conditions.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="text-sm">{p.medicationCount} drugs</span>
                  </td>
                  <td>
                    {p.allergyConfirmed ? (
                      <span className="badge badge-low">✓ Confirmed</span>
                    ) : (
                      <span className="badge badge-high">⚠ Unconfirmed</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${riskBadge[p.riskLevel]}`} style={{ textTransform: "capitalize" }}>
                      {p.riskLevel} risk
                    </span>
                  </td>
                  <td className="text-muted text-sm">{p.lastReviewed}</td>
                  <td>
                    <div className="actions-cell">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => { onSelectPatient(p.id); onNavigate("patient-detail"); }}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => { onSelectPatient(p.id); onNavigate("medication-list"); }}
                      >
                        Medications
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="page-btn">←</button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">→</button>
      </div>

      {/* New Patient Modal */}
      {showNewModal && (
        <div className="modal-overlay" onClick={() => setShowNewModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">New Patient Profile</div>
                <div className="modal-subtitle">Create a new patient health record</div>
              </div>
              <button className="close-btn" onClick={() => setShowNewModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name <span className="required">*</span></label>
                  <input className="form-input" placeholder="Patient full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Date of Birth <span className="required">*</span></label>
                  <input type="date" className="form-input" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select className="form-select" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Weight (kg)</label>
                  <input className="form-input" placeholder="e.g. 72" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Chronic Conditions</label>
                <textarea
                  className="form-textarea"
                  placeholder="e.g. Type 2 Diabetes, Hypertension (comma-separated)"
                  value={form.conditions}
                  onChange={e => setForm({...form, conditions: e.target.value})}
                  style={{ minHeight: 70 }}
                />
                <div className="form-hint">Separate multiple conditions with commas</div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowNewModal(false)}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={() => { setShowNewModal(false); setForm({ name: "", dob: "", gender: "", weight: "", conditions: "" }); }}
              >
                Create Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
