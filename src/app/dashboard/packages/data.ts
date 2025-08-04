
export const opdPackages = [
    {
        id: 'opd-basic-health-check',
        name: 'Basic Health Checkup',
        description: 'A comprehensive package covering essential health parameters for a routine check.',
        totalAmount: 2500,
        type: 'OPD',
        items: [
            { name: 'Complete Blood Count (CBC)', department: 'Lab' },
            { name: 'Fasting Blood Sugar', department: 'Lab' },
            { name: 'Lipid Profile', department: 'Lab' },
            { name: 'Kidney Function Test', department: 'Lab' },
            { name: 'Liver Function Test', department: 'Lab' },
            { name: 'Urine Routine & Microscopy', department: 'Lab' },
            { name: 'Chest X-Ray', department: 'Radiology' },
            { name: 'ECG', department: 'Radiology' },
            { name: 'Physician Consultation', department: 'Consultation' },
        ]
    },
    {
        id: 'opd-cardiac-check',
        name: 'Cardiac Wellness Package',
        description: 'Specialized package for assessing heart health and identifying cardiac risks.',
        totalAmount: 6000,
        type: 'OPD',
        items: [
            { name: 'Lipid Profile', department: 'Lab' },
            { name: 'Hs-CRP', department: 'Lab' },
            { name: 'Homocysteine', department: 'Lab' },
            { name: 'Chest X-Ray', department: 'Radiology' },
            { name: 'ECG', department: 'Radiology' },
            { name: 'ECHO', department: 'Radiology' },
            { name: 'TMT', department: 'Radiology' },
            { name: 'Cardiologist Consultation', department: 'Consultation' },
        ]
    },
    {
        id: 'opd-diabetic-screen',
        name: 'Diabetic Screening',
        description: 'A package designed for early detection and management of diabetes.',
        totalAmount: 3500,
        type: 'OPD',
        items: [
            { name: 'Fasting Blood Sugar', department: 'Lab' },
            { name: 'Post Prandial Blood Sugar', department: 'Lab' },
            { name: 'HbA1c', department: 'Lab' },
            { name: 'Lipid Profile', department: 'Lab' },
            { name: 'Serum Creatinine', department: 'Lab' },
            { name: 'Urine Microalbuminuria', department: 'Lab' },
            { name: 'Diabetologist Consultation', department: 'Consultation' },
            { name: 'Diet Counseling', department: 'Consultation' },
        ]
    }
];

export const ipdPackages = [
    {
        id: 'ipd-maternity-normal',
        name: 'Normal Delivery Package',
        description: 'Comprehensive maternity package for normal delivery, including stay and essential care.',
        totalAmount: 50000,
        type: 'IPD',
        items: [
            { name: '2-Day Room Rent (Semi-Private)', department: 'Other' },
            { name: 'Labor Room Charges', department: 'Other' },
            { name: 'Obstetrician Fee', department: 'Consultation' },
            { name: 'Pediatrician Fee (at birth)', department: 'Consultation' },
            { name: 'Nursing Charges', department: 'Other' },
            { name: 'Standard Medications', department: 'Medicine' },
            { name: 'Newborn Hearing Screening', department: 'Lab' },
        ]
    },
    {
        id: 'ipd-cataract-surgery',
        name: 'Cataract Surgery Package',
        description: 'A complete package for one eye cataract surgery with standard IOL.',
        totalAmount: 30000,
        type: 'IPD',
        items: [
            { name: 'Day Care Bed Charges', department: 'Other' },
            { name: 'Operation Theatre Charges', department: 'Other' },
            { name: 'Surgeon & Anesthetist Fee', department: 'Consultation' },
            { name: 'Standard IOL', department: 'Other' },
            { name: 'Standard Consumables & Medication', department: 'Medicine' },
            { name: 'Post-op Follow-up Consultation', department: 'Consultation' },
        ]
    }
];
