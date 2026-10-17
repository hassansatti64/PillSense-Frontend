// ============================================================
// PillSense Mock Data
// ============================================================

export const currentUser = {
  id: 'U001',
  name: 'Dr. Sarah Ahmed',
  email: 'sarah.ahmed@hospital.pk',
  role: 'Doctor',
  specialization: 'Internal Medicine',
  initials: 'SA',
};

export const patients = [
  {
    id: 'P001',
    name: 'Muhammad Tariq',
    age: 67,
    gender: 'Male',
    dob: '1957-03-14',
    weight: '78 kg',
    conditions: ['Type 2 Diabetes', 'Hypertension', 'CKD Stage 3'],
    allergyConfirmed: true,
    lastReviewed: '2026-05-08',
    riskLevel: 'high',
    medicationCount: 7,
  },
  {
    id: 'P002',
    name: 'Ayesha Siddiqui',
    age: 54,
    gender: 'Female',
    dob: '1971-11-22',
    weight: '63 kg',
    conditions: ['Hypothyroidism', 'Osteoporosis'],
    allergyConfirmed: true,
    lastReviewed: '2026-05-05',
    riskLevel: 'moderate',
    medicationCount: 4,
  },
  {
    id: 'P003',
    name: 'Bilal Chaudhry',
    age: 45,
    gender: 'Male',
    dob: '1980-07-08',
    weight: '85 kg',
    conditions: ['Hypertension', 'Dyslipidemia'],
    allergyConfirmed: true,
    lastReviewed: '2026-05-01',
    riskLevel: 'low',
    medicationCount: 3,
  },
  {
    id: 'P004',
    name: 'Fatima Malik',
    age: 72,
    gender: 'Female',
    dob: '1953-01-30',
    weight: '58 kg',
    conditions: ['Atrial Fibrillation', 'Type 2 Diabetes', 'Hypertension', 'COPD'],
    allergyConfirmed: false,
    lastReviewed: '2026-04-28',
    riskLevel: 'high',
    medicationCount: 9,
  },
  {
    id: 'P005',
    name: 'Usman Khan',
    age: 38,
    gender: 'Male',
    dob: '1987-05-17',
    weight: '72 kg',
    conditions: ['Asthma'],
    allergyConfirmed: true,
    lastReviewed: '2026-04-20',
    riskLevel: 'low',
    medicationCount: 2,
  },
];

export const allergies = {
  P001: [
    { id: 'A001', allergen: 'Penicillin', type: 'Drug', severity: 'Severe', dateAdded: '2024-01-10' },
    { id: 'A002', allergen: 'Sulfonamides', type: 'Drug', severity: 'Moderate', dateAdded: '2024-01-10' },
    { id: 'A003', allergen: 'Shellfish', type: 'Food', severity: 'Mild', dateAdded: '2024-03-15' },
  ],
  P002: [
    { id: 'A004', allergen: 'Aspirin', type: 'Drug', severity: 'Moderate', dateAdded: '2022-06-20' },
    { id: 'A005', allergen: 'Latex', type: 'Environmental', severity: 'Mild', dateAdded: '2022-06-20' },
  ],
  P003: [
    { id: 'A006', allergen: 'Amoxicillin', type: 'Drug', severity: 'Severe', dateAdded: '2023-09-04' },
  ],
};

export const medications = {
  P001: [
    { id: 'M001', name: 'Metformin', dosage: '500 mg', frequency: 'Twice daily', route: 'Oral', type: 'Prescription', dateAdded: '2024-01-15' },
    { id: 'M002', name: 'Amlodipine', dosage: '5 mg', frequency: 'Once daily', route: 'Oral', type: 'Prescription', dateAdded: '2024-01-15' },
    { id: 'M003', name: 'Atorvastatin', dosage: '40 mg', frequency: 'Once daily (evening)', route: 'Oral', type: 'Prescription', dateAdded: '2024-02-01' },
    { id: 'M004', name: 'Lisinopril', dosage: '10 mg', frequency: 'Once daily', route: 'Oral', type: 'Prescription', dateAdded: '2024-02-01' },
    { id: 'M005', name: 'Aspirin', dosage: '75 mg', frequency: 'Once daily', route: 'Oral', type: 'Prescription', dateAdded: '2024-03-10' },
    { id: 'M006', name: 'Vitamin D3', dosage: '1000 IU', frequency: 'Once daily', route: 'Oral', type: 'OTC', dateAdded: '2024-04-01' },
    { id: 'M007', name: 'Omeprazole', dosage: '20 mg', frequency: 'Once daily (morning)', route: 'Oral', type: 'Prescription', dateAdded: '2024-04-15' },
  ],
};

export const safetyReport = {
  patientId: 'P001',
  generatedAt: '2026-05-08 14:32',
  reviewedBy: 'Dr. Sarah Ahmed',
  riskScore: 74,
  riskLevel: 'high',
  riskNarrative: 'This patient presents a HIGH-risk polypharmacy profile. The combination of Lisinopril with concurrent renal impairment (CKD Stage 3) raises significant nephrotoxicity concerns. Metformin use in CKD Stage 3 requires close monitoring due to lactic acidosis risk. The ACE inhibitor (Lisinopril) combined with Amlodipine may cause additive hypotension. Immediate clinical review of the renal function and dosage adjustments is strongly recommended.',
  interactions: [
    {
      id: 'I001',
      drugs: ['Lisinopril', 'Metformin'],
      severity: 'severe',
      type: 'Drug-Drug',
      description: 'Lisinopril-induced renal impairment can reduce Metformin clearance, significantly increasing the risk of lactic acidosis in patients with pre-existing CKD Stage 3. This combination requires urgent reassessment.',
    },
    {
      id: 'I002',
      drugs: ['Atorvastatin', 'Amlodipine'],
      severity: 'moderate',
      type: 'Drug-Drug',
      description: 'Amlodipine inhibits CYP3A4-mediated metabolism of Atorvastatin, potentially increasing plasma concentrations of Atorvastatin by up to 30%. Monitor for signs of myopathy or rhabdomyolysis.',
    },
    {
      id: 'I003',
      drugs: ['Aspirin', 'Lisinopril'],
      severity: 'moderate',
      type: 'Drug-Drug',
      description: 'High-dose NSAIDs/Aspirin may attenuate the antihypertensive efficacy of ACE inhibitors. At 75mg, effect is minimal, but monitoring of blood pressure is advised.',
    },
    {
      id: 'I004',
      drugs: ['Vitamin D3', 'Atorvastatin'],
      severity: 'mild',
      type: 'Drug-Nutrient',
      description: 'No clinically significant interaction. Concurrent use is generally considered safe. Vitamin D supplementation may have modest positive effects on statin myalgia.',
    },
  ],
  duplicates: [],
  overdoseFlags: [],
  recommendations: [
    {
      id: 'R001',
      priority: 1,
      type: 'Dosage Adjustment',
      title: 'Reduce Metformin dosage due to CKD Stage 3',
      description: 'Current eGFR in CKD Stage 3 (30–44 mL/min/1.73m²) warrants dose reduction of Metformin to 250 mg twice daily or considering discontinuation if eGFR falls below 30. Check latest creatinine levels.',
      status: 'pending',
    },
    {
      id: 'R002',
      priority: 2,
      type: 'Safer Alternative',
      title: 'Consider switching Atorvastatin 40mg to Rosuvastatin',
      description: 'Rosuvastatin is minimally metabolized by CYP3A4, making it a safer option when used concurrently with Amlodipine, reducing interaction risk while maintaining equivalent lipid-lowering efficacy.',
      status: 'pending',
    },
    {
      id: 'R003',
      priority: 3,
      type: 'Monitoring',
      title: 'Monitor renal function every 3 months',
      description: 'Given the combination of Lisinopril and Metformin in a patient with CKD Stage 3, quarterly monitoring of serum creatinine, eGFR, and electrolytes is strongly advised.',
      status: 'acknowledged',
    },
  ],
  nutrientFindings: [
    { medication: 'Metformin', nutrient: 'Vitamin B12', risk: 'Long-term use associated with B12 deficiency. Consider monitoring serum B12 annually.', severity: 'moderate' },
    { medication: 'Omeprazole', nutrient: 'Magnesium', risk: 'Chronic PPI use may cause hypomagnesaemia. Check magnesium levels if on long-term therapy.', severity: 'mild' },
  ],
};

export const chatHistory = [
  {
    role: 'system',
    content: 'Hello Dr. Ahmed. I have full access to Muhammad Tariq\'s patient profile, allergy records, active medications, and the latest safety report. How can I assist you today?',
    timestamp: '14:32',
  },
  {
    role: 'user',
    content: 'What is the safest alternative to Metformin given his CKD Stage 3?',
    timestamp: '14:33',
  },
  {
    role: 'system',
    content: 'Given Muhammad Tariq\'s CKD Stage 3 (assumed eGFR 30–44 mL/min/1.73m²), the safest alternatives to Metformin for glycaemic control include:\n\n**1. SGLT-2 Inhibitors (with caution):** Empagliflozin or Dapagliflozin — both have cardioprotective and nephroprotective data, though efficacy diminishes at lower eGFR. Dapagliflozin is approved down to eGFR ≥25.\n\n**2. DPP-4 Inhibitors:** Sitagliptin (dose-adjusted to 50mg once daily at eGFR 30–50) — well-tolerated renally, no lactic acidosis risk.\n\n**3. GLP-1 Receptor Agonists:** Dulaglutide — renal dose adjustment generally not required, cardiovascular benefit demonstrated in CKD patients.\n\nNote: These are AI-generated suggestions. Clinical validation against full patient history and latest renal function tests is required before prescribing.',
    timestamp: '14:33',
    isAI: true,
  },
];

export const adminUsers = [
  { id: 'U001', name: 'Dr. Sarah Ahmed', email: 'sarah.ahmed@hospital.pk', role: 'Doctor', specialization: 'Internal Medicine', status: 'Active', createdAt: '2025-01-15', lastLogin: '2026-05-11' },
  { id: 'U002', name: 'Dr. Kamran Baig', email: 'kamran.baig@hospital.pk', role: 'Doctor', specialization: 'Cardiology', status: 'Active', createdAt: '2025-01-15', lastLogin: '2026-05-10' },
  { id: 'U003', name: 'Zara Pharmaceuticals', email: 'zara.ph@hospital.pk', role: 'Pharmacist', specialization: null, status: 'Active', createdAt: '2025-02-01', lastLogin: '2026-05-09' },
  { id: 'U004', name: 'Dr. Nadia Hussain', email: 'nadia.h@hospital.pk', role: 'Doctor', specialization: 'Nephrology', status: 'Suspended', createdAt: '2025-03-10', lastLogin: '2026-04-01' },
  { id: 'U005', name: 'Ali Hassan (Pharmacist)', email: 'ali.hassan@hospital.pk', role: 'Pharmacist', specialization: null, status: 'Active', createdAt: '2025-04-01', lastLogin: '2026-05-08' },
];

export const drugKnowledgeBase = [
  { id: 'D001', name: 'Metformin', genericName: 'Metformin HCl', activeIngredients: 'Metformin Hydrochloride', maxDailyDose: '2550 mg', class: 'Biguanide', source: 'DrugBank', lastUpdated: '2025-11-01' },
  { id: 'D002', name: 'Amlodipine', genericName: 'Amlodipine', activeIngredients: 'Amlodipine Besylate', maxDailyDose: '10 mg', class: 'CCB', source: 'DrugBank', lastUpdated: '2025-11-01' },
  { id: 'D003', name: 'Atorvastatin', genericName: 'Atorvastatin', activeIngredients: 'Atorvastatin Calcium', maxDailyDose: '80 mg', class: 'HMG-CoA Reductase Inhibitor', source: 'DrugBank', lastUpdated: '2025-11-01' },
  { id: 'D004', name: 'Lisinopril', genericName: 'Lisinopril', activeIngredients: 'Lisinopril', maxDailyDose: '40 mg', class: 'ACE Inhibitor', source: 'OpenFDA', lastUpdated: '2025-10-15' },
  { id: 'D005', name: 'Warfarin', genericName: 'Warfarin Sodium', activeIngredients: 'Warfarin Sodium', maxDailyDose: '15 mg', class: 'Anticoagulant', source: 'DrugBank', lastUpdated: '2025-11-01' },
  { id: 'D006', name: 'Omeprazole', genericName: 'Omeprazole', activeIngredients: 'Omeprazole', maxDailyDose: '40 mg', class: 'PPI', source: 'DrugBank', lastUpdated: '2025-11-01' },
];

export const auditLogs = [
  { id: 'L001', timestamp: '2026-05-11 14:32', userId: 'U001', userName: 'Dr. Sarah Ahmed', role: 'Doctor', eventType: 'Safety Report Generated', affectedRecord: 'Patient P001', ipAddress: '192.168.1.45' },
  { id: 'L002', timestamp: '2026-05-11 14:28', userId: 'U001', userName: 'Dr. Sarah Ahmed', role: 'Doctor', eventType: 'Medication Added', affectedRecord: 'Patient P001 — Omeprazole', ipAddress: '192.168.1.45' },
  { id: 'L003', timestamp: '2026-05-11 13:55', userId: 'U003', userName: 'Zara Pharmaceuticals', role: 'Pharmacist', eventType: 'Patient Profile Viewed', affectedRecord: 'Patient P003', ipAddress: '192.168.1.62' },
  { id: 'L004', timestamp: '2026-05-11 11:20', userId: 'ADMIN', userName: 'System Admin', role: 'Admin', eventType: 'User Account Created', affectedRecord: 'User U005 — Ali Hassan', ipAddress: '192.168.1.1' },
  { id: 'L005', timestamp: '2026-05-10 16:45', userId: 'U002', userName: 'Dr. Kamran Baig', role: 'Doctor', eventType: 'Allergy Profile Confirmed', affectedRecord: 'Patient P002', ipAddress: '192.168.1.33' },
  { id: 'L006', timestamp: '2026-05-10 15:10', userId: 'U001', userName: 'Dr. Sarah Ahmed', role: 'Doctor', eventType: 'Doctor Companion Chat Session', affectedRecord: 'Patient P001', ipAddress: '192.168.1.45' },
  { id: 'L007', timestamp: '2026-05-10 10:00', userId: 'ADMIN', userName: 'System Admin', role: 'Admin', eventType: 'Knowledge Base Updated', affectedRecord: 'DrugBank v3.2.1 — 128 records', ipAddress: '192.168.1.1' },
];
