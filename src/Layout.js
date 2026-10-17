import { useState } from "react";

// ============================================================
// Sidebar Component
// ============================================================
export function Sidebar({ activePage, onNavigate, userRole }) {
  const isAdmin = userRole === "Admin";

  const doctorNav = [
    { id: "dashboard", label: "Dashboard", icon: "⚕️" },
    { id: "patients", label: "Patients", icon: "👥" },
    { id: "chat", label: "Doctor Companion", icon: "💬" },
  ];

  const adminNav = [
    { id: "admin-dashboard", label: "Dashboard", icon: "📊" },
    { id: "user-management", label: "User Management", icon: "👤" },
    { id: "drug-knowledge", label: "Drug Knowledge Base", icon: "💊" },
    { id: "audit-log", label: "Audit Log", icon: "🔍" },
  ];

  const navItems = isAdmin ? adminNav : doctorNav;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <div className="logo-pill">💊</div>
          <div className="logo-text">
            Pill<span>Sense</span>
          </div>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="user-chip">
          <div className="user-avatar">
            {isAdmin ? "AD" : "SA"}
          </div>
          <div className="user-info">
            <div className="user-name">
              {isAdmin ? "System Admin" : "Dr. Sarah Ahmed"}
            </div>
            <div className="user-role">
              {isAdmin ? "Administrator" : "Internal Medicine"}
            </div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">
          {isAdmin ? "Administration" : "Clinical Workspace"}
        </div>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.badge && (
              <span className="nav-badge">{item.badge}</span>
            )}
          </div>
        ))}

        {!isAdmin && (
          <>
            <div className="nav-section-label" style={{ marginTop: 12 }}>Switch View</div>
            <div
              className="nav-item"
              onClick={() => onNavigate("admin-dashboard")}
            >
              <span className="nav-icon">🛡️</span>
              Admin Panel
            </div>
          </>
        )}
      </nav>

      <div className="sidebar-bottom">
        <button
          className="logout-btn"
          onClick={() => onNavigate("login")}
        >
          <span>🚪</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

// ============================================================
// Topbar Component
// ============================================================
export function Topbar({ title, subtitle, actions }) {
  return (
    <header className="topbar">
      <div style={{ flex: 1 }}>
        <div className="topbar-title">{title}</div>
        {subtitle && <div className="topbar-subtitle">{subtitle}</div>}
      </div>
      {actions && <div className="topbar-actions">{actions}</div>}
    </header>
  );
}

// ============================================================
// App Layout Wrapper
// ============================================================
export function AppLayout({ activePage, onNavigate, userRole, title, subtitle, actions, children }) {
  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={onNavigate} userRole={userRole} />
      <div className="main-content">
        <Topbar title={title} subtitle={subtitle} actions={actions} />
        <div className="page-body animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Modal Component
// ============================================================
export function Modal({ isOpen, onClose, title, subtitle, children, footer, size }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal ${size === "lg" ? "modal-lg" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <div className="modal-title">{title}</div>
            {subtitle && <div className="modal-subtitle">{subtitle}</div>}
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

// ============================================================
// Alert Banner Component
// ============================================================
export function AlertBanner({ type = "danger", icon, title, description, onDismiss }) {
  return (
    <div className={`alert-banner ${type}`}>
      {icon && <span className="alert-icon">{icon}</span>}
      <div className="alert-content">
        <div className="alert-title">{title}</div>
        {description && <div className="alert-desc">{description}</div>}
      </div>
      {onDismiss && (
        <button
          style={{
            background: "transparent",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            opacity: 0.7,
            fontSize: 16,
            padding: "0 4px",
          }}
          onClick={onDismiss}
        >
          ✕
        </button>
      )}
    </div>
  );
}

// ============================================================
// Badge Component
// ============================================================
export function Badge({ level, children }) {
  const cls = {
    high: "badge-high",
    severe: "badge-high",
    moderate: "badge-moderate",
    low: "badge-low",
    mild: "badge-low",
    info: "badge-info",
    neutral: "badge-neutral",
    active: "badge-low",
    suspended: "badge-high",
    pending: "badge-moderate",
    doctor: "badge-info",
    pharmacist: "badge-neutral",
    admin: "badge-moderate",
  }[level?.toLowerCase()] || "badge-neutral";

  return <span className={`badge ${cls}`}>{children}</span>;
}

// ============================================================
// Confirm Dialog
// ============================================================
export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmLabel = "Confirm", danger = false }) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>{message}</p>
      <div className="modal-footer" style={{ padding: "18px 0 0", border: "none" }}>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button
          className={`btn ${danger ? "btn-danger" : "btn-primary"}`}
          onClick={() => { onConfirm(); onClose(); }}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
