import { useState } from "react";
import "./styles.css";

import LoginPage from "./pages/LoginPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientList from "./pages/PatientList";
import { PatientDetail, AllergyProfile } from "./pages/PatientProfile";
import { MedicationList, AllergyContraindicationAlert } from "./pages/MedicationPages";
import SafetyReport from "./pages/SafetyReport";
import DoctorChat from "./pages/DoctorChat";
import {
  AdminDashboard,
  UserManagement,
  DrugKnowledgeBase,
  AuditLog,
} from "./pages/AdminPages";

import { mockPatients } from "./data/mockData";

export default function App() {
  const [user, setUser] = useState(null); // null = logged out
  const [page, setPage] = useState("dashboard");
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // ── Auth ────────────────────────────────────────────────
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setPage(loggedInUser.role === "admin" ? "admin-dashboard" : "dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("dashboard");
    setSelectedPatientId(null);
  };

  // ── Navigation helper ────────────────────────────────────
  const navigate = (target, patientId = null) => {
    if (patientId) setSelectedPatientId(patientId);
    setPage(target);
  };

  // ── Not logged in ────────────────────────────────────────
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // ── Resolve selected patient object ─────────────────────
  const selectedPatient = mockPatients.find((p) => p.id === selectedPatientId) || null;

  // ── Page map ─────────────────────────────────────────────
  const renderPage = () => {
    switch (page) {
      // Doctor flow
      case "dashboard":
        return (
          <DoctorDashboard
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );

      case "patients":
        return (
          <PatientList
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );

      case "patient-detail":
        return (
          <PatientDetail
            user={user}
            patient={selectedPatient}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );

      case "allergy-profile":
        return (
          <AllergyProfile
            user={user}
            patient={selectedPatient}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );

      case "medications":
        return (
          <MedicationList
            user={user}
            patient={selectedPatient}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );

      case "allergy-alert":
        return (
          <AllergyContraindicationAlert
            user={user}
            patient={selectedPatient}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );

      case "safety-report":
        return (
          <SafetyReport
            user={user}
            patient={selectedPatient}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );

      case "chat":
        return (
          <DoctorChat
            user={user}
            patient={selectedPatient}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );

      // Admin flow
      case "admin-dashboard":
        return (
          <AdminDashboard
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );

      case "user-management":
        return (
          <UserManagement
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );

      case "drug-kb":
        return (
          <DrugKnowledgeBase
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );

      case "audit-log":
        return (
          <AuditLog
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );

      default:
        return (
          <DoctorDashboard
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );
    }
  };

  return <div className="app-root">{renderPage()}</div>;
}
