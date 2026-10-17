import { useState, useRef, useEffect } from "react";
import { AppLayout } from "../components/Layout.jsx";
import { patients, chatHistory, medications } from "../data/mockData.js";

export default function DoctorChat({ onNavigate, patientId, onLogout }) {
  const patient = patients.find((p) => p.id === patientId) || patients[0];
  const meds = medications[patient.id] || [];
  const [messages, setMessages] = useState(chatHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(patient.id);
  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const sampleQuestions = [
    "What is the safest alternative to Metformin for this patient?",
    "Are there any dangerous drug combinations in the current regimen?",
    "What nutritional supplements should this patient take?",
    "Summarise the key risks in this patient's safety report.",
  ];

  const fakeResponses = [
    "Based on this patient's profile, health records, and active medication list, here is a context-grounded clinical assessment:\n\nThe current regimen presents significant polypharmacy risks. Given the CKD Stage 3 and concurrent use of ACE inhibitor (Lisinopril) with Metformin, the lactic acidosis risk is the highest priority concern. I recommend immediate review of eGFR values before the next refill. Consider SGLT-2 inhibitors like Dapagliflozin as a safer alternative.\n\n**Note:** This response is AI-generated and requires clinical validation before any prescribing action.",
    "Reviewing the active medications against the drug knowledge base and patient allergy profile: The most critical combination is Lisinopril + Metformin in CKD Stage 3. Secondary concern: Atorvastatin + Amlodipine (CYP3A4 interaction). I recommend reviewing Recommendation R002 in the safety report for a safer statin option.\n\n**Note:** All AI-generated recommendations must be clinically validated.",
    "Based on the current medication regimen and identified drug-nutrient interactions:\n\n1. **Vitamin B12** supplementation is strongly advised — long-term Metformin use is associated with B12 deficiency.\n2. **Magnesium** levels should be monitored — chronic Omeprazole use can cause hypomagnesaemia.\n3. **Coenzyme Q10** may help if statin-induced myalgia develops.\n\nRegular blood work monitoring is recommended.\n\n**Note:** AI-generated guidance — confirm with clinical judgment.",
  ];

  let responseIndex = 0;

  const sendMessage = () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const response = fakeResponses[messages.length % fakeResponses.length];
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: response,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isAI: true,
        },
      ]);
      setLoading(false);
    }, 1400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetSession = () => {
    if (window.confirm("Reset chat session? This will permanently clear the conversation history.")) {
      setMessages([chatHistory[0]]);
    }
  };

  const renderContent = (content) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <strong key={i} style={{ display: "block", marginTop: 6 }}>{line.replace(/\*\*/g, "")}</strong>;
      }
      if (line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.")) {
        return <div key={i} style={{ marginLeft: 8, marginTop: 4 }}>{line}</div>;
      }
      if (line.trim() === "") return <br key={i} />;
      return <span key={i}>{line.replace(/\*\*/g, "")}<br /></span>;
    });
  };

  return (
    <AppLayout
      activePage="chat"
      onNavigate={onNavigate}
      onLogout={onLogout}
      userRole="Doctor"
      title="Doctor Companion Chat"
      subtitle={`Context: ${patient.name} · ${meds.length} active medications · Latest report loaded`}
      actions={
        <div className="flex gap-2">
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate("safety-report")}>
            📋 View Report
          </button>
          <button className="btn btn-ghost btn-sm" onClick={resetSession}>
            🔄 Reset Session
          </button>
        </div>
      }
    >
      <div style={{ display: "flex", height: "calc(100vh - 140px)", gap: 20 }}>
        {/* Chat area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
          }}
        >
          {/* Context injection info */}
          <div
            style={{
              padding: "12px 20px",
              background: "var(--surface-2)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "var(--text-muted)",
            }}
          >
            <span className="ai-label">Context Injected</span>
            <span>Patient profile · Allergy records · {meds.length} medications · Safety report findings</span>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-msg ${msg.role === "user" ? "user" : "system"}`}
              >
                <div className="chat-avatar">
                  {msg.role === "user" ? "👤" : "🤖"}
                </div>
                <div>
                  <div className="chat-bubble">
                    {renderContent(msg.content)}
                    {msg.isAI && (
                      <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                        <span className="ai-label">AI-Generated · Requires Clinical Validation</span>
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4, paddingLeft: 4 }}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-msg system">
                <div className="chat-avatar">🤖</div>
                <div
                  className="chat-bubble"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "var(--text-muted)",
                  }}
                >
                  <div className="spinner" style={{ width: 14, height: 14 }} />
                  Analysing patient context…
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div
            style={{
              padding: "14px 20px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              gap: 12,
              alignItems: "flex-end",
            }}
          >
            <textarea
              className="chat-input"
              placeholder="Ask about medications, interactions, dosage alternatives, or clinical decisions…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
            />
            <button
              className="btn btn-primary btn-icon"
              style={{ width: 44, height: 44, fontSize: 18 }}
              onClick={sendMessage}
              disabled={!input.trim() || loading}
            >
              ↑
            </button>
          </div>
        </div>

        {/* Right panel */}
        <div
          style={{
            width: 280,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Patient context */}
          <div className="card">
            <div className="card-title" style={{ marginBottom: 14 }}>Active Patient Context</div>
            <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
              <div className="user-avatar">{patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>{patient.name}</div>
                <div className="text-xs text-muted">{patient.age}y · {patient.gender}</div>
              </div>
            </div>
            <div className="info-list">
              <div className="info-item">
                <span className="info-item-label">Conditions</span>
                <span className="info-item-value text-sm">{patient.conditions.length} recorded</span>
              </div>
              <div className="info-item">
                <span className="info-item-label">Medications</span>
                <span className="info-item-value text-sm">{meds.length} active</span>
              </div>
              <div className="info-item">
                <span className="info-item-label">Risk Level</span>
                <span
                  className="info-item-value text-sm font-bold"
                  style={{ color: "var(--high)", textTransform: "capitalize" }}
                >
                  {patient.riskLevel}
                </span>
              </div>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              style={{ marginTop: 12, width: "100%", justifyContent: "center" }}
              onClick={() => onNavigate("patient-detail")}
            >
              View Full Profile
            </button>
          </div>

          {/* Sample questions */}
          <div className="card">
            <div className="card-title" style={{ marginBottom: 12 }}>Suggested Queries</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sampleQuestions.map((q) => (
                <button
                  key={q}
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r-sm)",
                    padding: "9px 12px",
                    color: "var(--text-secondary)",
                    fontSize: 12,
                    cursor: "pointer",
                    textAlign: "left",
                    lineHeight: 1.4,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { e.target.style.borderColor = "var(--teal-border)"; e.target.style.color = "var(--teal-light)"; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text-secondary)"; }}
                  onClick={() => setInput(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Session info */}
          <div className="card card-sm">
            <div className="kpi-label" style={{ marginBottom: 6 }}>Session</div>
            <div className="info-list">
              <div className="info-item">
                <span className="info-item-label">Messages</span>
                <span className="info-item-value text-sm">{messages.length}</span>
              </div>
              <div className="info-item">
                <span className="info-item-label">LLM Engine</span>
                <span className="info-item-value text-sm text-low">● Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
