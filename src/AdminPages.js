import { useState } from "react";
import { AppLayout } from "../components/Layout.jsx";
import { adminUsers, drugKnowledgeBase, auditLogs } from "../data/mockData.js";

// ============================================================
// Admin Dashboard (M14)
// ============================================================
export function AdminDashboard({ onNavigate }) {
  return (
    <AppLayout
      activePage="admin-dashboard"
      onNavigate={onNavigate}
      userRole="Admin"
      title="Admin Dashboard"
      subtitle="Platform control panel · Auto-refreshes every 60s"
    >
      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Registered Doctors</div>
          <div className="kpi-value">3</div>
          <div className="kpi-meta">2 active · 1 suspended</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Registered Pharmacists</div>
          <div className="kpi-value">2</div>
          <div className="kpi-meta">All active</div>
        </div>
        <div className="kpi-card success">
          <div className="kpi-label">Total Patient Profiles</div>
          <div className="kpi-value">5</div>
          <div className="kpi-meta">0 archived</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">System Uptime</div>
          <div className="kpi-value" style={{ color: "var(--low)", fontSize: 22 }}>99.8%</div>
          <div className="kpi-meta">Last 30 days</div>
        </div>
      </div>

      <div className="content-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Active sessions */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Active Sessions</div>
                <div className="card-subtitle">Currently authenticated users</div>
              </div>
            </div>
            <div className="table-container" style={{ border: "none" }}>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Last Activity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Dr. Sarah Ahmed", role: "Doctor", last: "2 min ago", active: true },
                    { name: "Zara Pharmaceuticals", role: "Pharmacist", last: "14 min ago", active: true },
                  ].map((s) => (
                    <tr key={s.name}>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="user-avatar" style={{ width: 28, height: 28, fontSize: 10 }}>
                            {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <span className="cell-primary">{s.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${s.role === "Doctor" ? "badge-info" : "badge-neutral"}`}>{s.role}</span>
                      </td>
                      <td className="text-muted text-sm">{s.last}</td>
                      <td>
                        <span className="status-dot active" style={{ color: "var(--text-secondary)", fontSize: 12 }}>
                          &nbsp;Online
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent audit */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Recent Audit Events</div>
                <div className="card-subtitle">Last 5 system events</div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => onNavigate("audit-log")}>
                View All →
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {auditLogs.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 16 }}>
                    {log.eventType.includes("Login") ? "🔐"
                      : log.eventType.includes("Report") ? "📋"
                      : log.eventType.includes("Created") ? "✨"
                      : log.eventType.includes("Updated") ? "🔄"
                      : "📝"}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>
                      {log.eventType}
                    </div>
                    <div className="text-xs text-muted">{log.userName} · {log.affectedRecord}</div>
                  </div>
                  <span className="text-xs text-muted" style={{ whiteSpace: "nowrap" }}>{log.timestamp.split(" ")[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Knowledge base status */}
          <div className="card">
            <div className="card-title" style={{ marginBottom: 14 }}>Drug Knowledge Base</div>
            <div className="info-list">
              <div className="info-item">
                <span className="info-item-label">Version</span>
                <span className="info-item-value text-sm">v3.2.1</span>
              </div>
              <div className="info-item">
                <span className="info-item-label">Last Updated</span>
                <span className="info-item-value text-sm">2026-05-07</span>
              </div>
              <div className="info-item">
                <span className="info-item-label">Total Records</span>
                <span className="info-item-value text-sm font-bold">4,872</span>
              </div>
              <div className="info-item">
                <span className="info-item-label">Sources</span>
                <span className="info-item-value text-sm">DrugBank · OpenFDA</span>
              </div>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              style={{ marginTop: 12, width: "100%", justifyContent: "center" }}
              onClick={() => onNavigate("drug-knowledge")}
            >
              Manage Knowledge Base
            </button>
          </div>

          {/* System health */}
          <div className="card">
            <div className="card-title" style={{ marginBottom: 14 }}>System Health</div>
            {[
              { label: "API Server", status: "Operational", ok: true },
              { label: "PostgreSQL DB", status: "Operational", ok: true },
              { label: "LLM API", status: "Operational", ok: true },
              { label: "MongoDB", status: "Operational", ok: true },
              { label: "Email SMTP", status: "Operational", ok: true },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "6px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{s.label}</span>
                <span
                  className="status-dot active"
                  style={{ color: s.ok ? "var(--low)" : "var(--high)", fontSize: 12 }}
                >
                  &nbsp;{s.status}
                </span>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="card">
            <div className="card-title" style={{ marginBottom: 12 }}>Quick Actions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="btn btn-secondary" style={{ justifyContent: "flex-start", width: "100%" }} onClick={() => onNavigate("user-management")}>
                👤 Manage Users
              </button>
              <button className="btn btn-secondary" style={{ justifyContent: "flex-start", width: "100%" }} onClick={() => onNavigate("drug-knowledge")}>
                💊 Update Drug DB
              </button>
              <button className="btn btn-secondary" style={{ justifyContent: "flex-start", width: "100%" }} onClick={() => onNavigate("audit-log")}>
                🔍 Full Audit Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// ============================================================
// User Management (M02 + M03)
// ============================================================
export function UserManagement({ onNavigate }) {
  const [users, setUsers] = useState(adminUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Doctor", specialization: "" });
  const [successMsg, setSuccessMsg] = useState("");

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role.toLowerCase() === roleFilter;
    return matchSearch && matchRole;
  });

  const toggleStatus = (id) => {
    setUsers(users.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u));
  };

  const handleCreate = () => {
    if (!newUser.name || !newUser.email) return;
    const created = {
      ...newUser,
      id: `U${Date.now()}`,
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: "—",
    };
    setUsers([...users, created]);
    setShowCreate(false);
    setNewUser({ name: "", email: "", role: "Doctor", specialization: "" });
    setSuccessMsg(`Account created for ${created.name}. Credentials have been sent to ${created.email}.`);
    setTimeout(() => setSuccessMsg(""), 5000);
  };

  return (
    <AppLayout
      activePage="user-management"
      onNavigate={onNavigate}
      userRole="Admin"
      title="User Management"
      subtitle="Manage doctor and pharmacist accounts"
      actions={
        <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
          + Create Account
        </button>
      }
    >
      {successMsg && (
        <div className="alert-banner success" style={{ marginBottom: 20 }}>
          <span className="alert-icon">✅</span>
          <div className="alert-content">
            <div className="alert-title">Account Created</div>
            <div className="alert-desc">{successMsg}</div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input placeholder="Search by name or email…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="filter-bar">
          {["all", "doctor", "pharmacist"].map((r) => (
            <button key={r} className={`filter-chip ${roleFilter === r ? "active" : ""}`} onClick={() => setRoleFilter(r)}>
              {r === "all" ? "All Users" : r.charAt(0).toUpperCase() + r.slice(1) + "s"}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Created</th>
              <th>Last Login</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="user-avatar" style={{ width: 28, height: 28, fontSize: 10 }}>
                      {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <span className="cell-primary">{u.name}</span>
                  </div>
                </td>
                <td>
                  <span className="text-sm text-mono">{u.email}</span>
                </td>
                <td>
                  <span className={`badge ${u.role === "Doctor" ? "badge-info" : "badge-neutral"}`}>{u.role}</span>
                </td>
                <td className="text-muted text-sm">{u.specialization || "—"}</td>
                <td>
                  <span
                    className="status-dot"
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: 12,
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: u.status === "Active" ? "var(--low)" : "var(--text-muted)",
                        display: "inline-block",
                        marginRight: 6,
                        boxShadow: u.status === "Active" ? "0 0 6px var(--low)" : "none",
                      }}
                    />
                    {u.status}
                  </span>
                </td>
                <td className="text-muted text-sm">{u.createdAt}</td>
                <td className="text-muted text-sm">{u.lastLogin}</td>
                <td>
                  <div className="actions-cell">
                    <button
                      className={`btn btn-sm ${u.status === "Active" ? "btn-danger" : "btn-secondary"}`}
                      onClick={() => toggleStatus(u.id)}
                    >
                      {u.status === "Active" ? "Suspend" : "Activate"}
                    </button>
                    <button className="btn btn-ghost btn-sm">Reset PW</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">Create User Account</div>
                <div className="modal-subtitle">New doctor or pharmacist account</div>
              </div>
              <button className="close-btn" onClick={() => setShowCreate(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Full Name <span className="required">*</span></label>
                <input className="form-input" placeholder="Dr. Full Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address <span className="required">*</span></label>
                <input type="email" className="form-input" placeholder="doctor@hospital.pk" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select className="form-select" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                    <option>Doctor</option>
                    <option>Pharmacist</option>
                  </select>
                </div>
                {newUser.role === "Doctor" && (
                  <div className="form-group">
                    <label className="form-label">Specialization</label>
                    <input className="form-input" placeholder="e.g. Internal Medicine" value={newUser.specialization} onChange={(e) => setNewUser({ ...newUser, specialization: e.target.value })} />
                  </div>
                )}
              </div>
              <div className="form-hint">A temporary password will be auto-generated and sent to the registered email address.</div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreate} disabled={!newUser.name || !newUser.email}>Create Account</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

// ============================================================
// Drug Knowledge Base (M15)
// ============================================================
export function DrugKnowledgeBase({ onNavigate }) {
  const [drugs, setDrugs] = useState(drugKnowledgeBase);
  const [search, setSearch] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importDone, setImportDone] = useState(false);
  const [activeTab, setActiveTab] = useState("records");

  const filtered = drugs.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.genericName.toLowerCase().includes(search.toLowerCase()) ||
    d.class.toLowerCase().includes(search.toLowerCase())
  );

  const handleImport = () => {
    setShowConfirm(false);
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setImportDone(true);
      setTimeout(() => setImportDone(false), 5000);
    }, 2000);
  };

  const nutrientMappings = [
    { medication: "Metformin", nutrient: "Vitamin B12", interaction: "Reduces absorption via intrinsic factor", severity: "moderate" },
    { medication: "Omeprazole", nutrient: "Magnesium", interaction: "Chronic use associated with hypomagnesaemia", severity: "moderate" },
    { medication: "Atorvastatin", nutrient: "Coenzyme Q10", interaction: "May reduce CoQ10 synthesis", severity: "mild" },
    { medication: "Lisinopril", nutrient: "Potassium", interaction: "ACE inhibitor increases potassium retention", severity: "moderate" },
    { medication: "Aspirin", nutrient: "Folate", interaction: "High doses may interfere with folate metabolism", severity: "mild" },
  ];

  return (
    <AppLayout
      activePage="drug-knowledge"
      onNavigate={onNavigate}
      userRole="Admin"
      title="Drug Knowledge Base"
      subtitle="DrugBank + OpenFDA · v3.2.1 · 4,872 drug records"
      actions={
        <button className="btn btn-primary" onClick={() => setShowImport(true)}>
          ⬆ Import Dataset
        </button>
      }
    >
      {importDone && (
        <div className="alert-banner success" style={{ marginBottom: 20 }}>
          <span className="alert-icon">✅</span>
          <div className="alert-content">
            <div className="alert-title">Knowledge Base Updated Successfully</div>
            <div className="alert-desc">128 new records integrated, 42 records updated, 0 duplicates. No active sessions were disrupted.</div>
          </div>
        </div>
      )}

      {importing && (
        <div className="alert-banner info" style={{ marginBottom: 20 }}>
          <span className="alert-icon"><div className="spinner" style={{ width: 16, height: 16 }} /></span>
          <div className="alert-content">
            <div className="alert-title">Import in Progress</div>
            <div className="alert-desc">Validating, deduplicating, and integrating records without disrupting active sessions…</div>
          </div>
        </div>
      )}

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Drug Records", value: "4,872", sub: "Locally stored in PostgreSQL" },
          { label: "Last Updated", value: "2026-05-07", sub: "v3.2.1 import" },
          { label: "Drug-Nutrient Mappings", value: "312", sub: "Across 5 nutrient categories" },
        ].map((s) => (
          <div key={s.label} className="card card-sm" style={{ padding: "14px 18px" }}>
            <div className="kpi-label">{s.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "4px 0" }}>{s.value}</div>
            <div className="text-xs text-muted">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="tabs">
        <div className={`tab ${activeTab === "records" ? "active" : ""}`} onClick={() => setActiveTab("records")}>Drug Records</div>
        <div className={`tab ${activeTab === "nutrients" ? "active" : ""}`} onClick={() => setActiveTab("nutrients")}>Drug-Nutrient Mappings</div>
      </div>

      {activeTab === "records" && (
        <>
          <div className="flex gap-3 mb-4">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input placeholder="Search by name, class, or ingredient…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Drug Name</th>
                  <th>Generic Name</th>
                  <th>Drug Class</th>
                  <th>Max Daily Dose</th>
                  <th>Source</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id}>
                    <td><div className="cell-primary" style={{ fontFamily: "var(--font-mono)" }}>{d.name}</div></td>
                    <td className="text-sm text-muted">{d.genericName}</td>
                    <td><span className="badge badge-info" style={{ fontSize: 11 }}>{d.class}</span></td>
                    <td className="text-sm">{d.maxDailyDose}</td>
                    <td><span className="badge badge-neutral" style={{ fontSize: 11 }}>{d.source}</span></td>
                    <td className="text-muted text-sm">{d.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === "nutrients" && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Medication</th>
                <th>Affected Nutrient</th>
                <th>Interaction</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {nutrientMappings.map((n, i) => (
                <tr key={i}>
                  <td><span className="drug-chip">{n.medication}</span></td>
                  <td><div className="cell-primary">{n.nutrient}</div></td>
                  <td className="text-sm text-muted">{n.interaction}</td>
                  <td>
                    <span className={`badge ${n.severity === "moderate" ? "badge-moderate" : "badge-low"}`} style={{ textTransform: "capitalize" }}>
                      {n.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Import modal */}
      {showImport && (
        <div className="modal-overlay" onClick={() => setShowImport(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">Import Dataset</div>
                <div className="modal-subtitle">DrugBank or OpenFDA dataset update</div>
              </div>
              <button className="close-btn" onClick={() => setShowImport(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Select Dataset Source</label>
                <select className="form-select">
                  <option>DrugBank (Full Export)</option>
                  <option>OpenFDA Drug Records</option>
                  <option>Custom Dataset (JSON)</option>
                </select>
              </div>
              <div
                style={{
                  border: "2px dashed var(--border-mid)",
                  borderRadius: "var(--r-md)",
                  padding: "32px 20px",
                  textAlign: "center",
                  background: "var(--surface-2)",
                  cursor: "pointer",
                  transition: "border-color 0.18s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--teal)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-mid)"}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-primary)", marginBottom: 4 }}>
                  Click to select or drag & drop file
                </div>
                <div className="text-xs text-muted">.json, .csv, .xml — max 500MB</div>
              </div>
              <div className="form-hint mt-3">
                The system will validate, deduplicate, and integrate records without disrupting active user sessions.
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowImport(false)}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={() => { setShowImport(false); setShowConfirm(true); }}
              >
                Validate & Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Confirm Knowledge Base Update</div>
              <button className="close-btn" onClick={() => setShowConfirm(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ background: "var(--surface-2)", borderRadius: "var(--r-md)", padding: "16px", marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 10 }}>
                  Import Preview
                </div>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-item-label">New Records</span>
                    <span className="info-item-value text-low font-bold">128</span>
                  </div>
                  <div className="info-item">
                    <span className="info-item-label">Updated Records</span>
                    <span className="info-item-value" style={{ color: "var(--moderate)", fontWeight: 600 }}>42</span>
                  </div>
                  <div className="info-item">
                    <span className="info-item-label">Duplicates Detected</span>
                    <span className="info-item-value text-sm">0 (auto-skipped)</span>
                  </div>
                  <div className="info-item">
                    <span className="info-item-label">Source</span>
                    <span className="info-item-value text-sm">DrugBank v5.1.12</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                Committing this import will update the live drug knowledge base. Active analysis sessions will not be affected.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleImport}>Commit Import</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

// ============================================================
// Audit Log (M16)
// ============================================================
export function AuditLog({ onNavigate }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");

  const filtered = auditLogs.filter((l) => {
    const matchSearch =
      l.userName.toLowerCase().includes(search.toLowerCase()) ||
      l.eventType.toLowerCase().includes(search.toLowerCase()) ||
      l.affectedRecord.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || l.eventType.toLowerCase().includes(typeFilter.toLowerCase());
    return matchSearch && matchType;
  });

  return (
    <AppLayout
      activePage="audit-log"
      onNavigate={onNavigate}
      userRole="Admin"
      title="Audit Log"
      subtitle="Immutable system event log — all clinical data access and modifications"
      actions={
        <button className="btn btn-secondary">
          ⬇ Export CSV
        </button>
      }
    >
      {/* Service health */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Database", ok: true },
          { label: "LLM API", ok: true },
          { label: "Backend API", ok: true },
          { label: "System Uptime", ok: true, value: "99.8%" },
        ].map((s) => (
          <div key={s.label} className="card card-sm" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: s.ok ? "var(--low)" : "var(--high)",
                boxShadow: s.ok ? "0 0 6px var(--low)" : "none",
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: s.ok ? "var(--low)" : "var(--high)", fontWeight: 600 }}>
                {s.value || (s.ok ? "Operational" : "Error")}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4" style={{ flexWrap: "wrap" }}>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input placeholder="Search by user, event, or record…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="filter-bar">
          {["all", "report", "medication", "login", "profile", "knowledge"].map((t) => (
            <button key={t} className={`filter-chip ${typeFilter === t ? "active" : ""}`} onClick={() => setTypeFilter(t)}>
              {t === "all" ? "All Events" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <input
          type="date"
          className="form-input"
          style={{ width: "auto", padding: "6px 10px" }}
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          placeholder="From date"
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Role</th>
              <th>Event Type</th>
              <th>Affected Record</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id}>
                <td>
                  <span className="text-sm text-mono">{log.timestamp}</span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="user-avatar" style={{ width: 24, height: 24, fontSize: 9 }}>
                      {log.userName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <span className="text-sm">{log.userName}</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${log.role === "Doctor" ? "badge-info" : log.role === "Admin" ? "badge-moderate" : "badge-neutral"}`}>
                    {log.role}
                  </span>
                </td>
                <td>
                  <div className="cell-primary">{log.eventType}</div>
                </td>
                <td className="text-muted text-sm">{log.affectedRecord}</td>
                <td className="text-muted text-sm text-mono">{log.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="page-btn">←</button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <button className="page-btn">→</button>
      </div>

      <div
        style={{
          marginTop: 12,
          padding: "12px 16px",
          background: "var(--surface-2)",
          borderRadius: "var(--r-sm)",
          border: "1px solid var(--border)",
          fontSize: 12,
          color: "var(--text-muted)",
        }}
      >
        🔒 Audit log entries are immutable and cannot be altered or deleted by any user role, including System Administrators.
      </div>
    </AppLayout>
  );
}
