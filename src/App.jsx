import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./app/page";
import DashboardPage from "./app/dashboard/page";
import DashboardHeader from "./components/components/dashboard/header";
import { allUsers } from "./lib/users";
import CreateMpinPage from "./app/create-mpin/page";
import ProfilePage from "./app/dashboard/profile/page";
import ReminderPage from "./app/dashboard/reminder/page";
import MyDocumentsPage from "./app/dashboard/my-document/page";
import TokenPage from "./app/dashboard/token/page";
import GenerateTokenPage from "./app/dashboard/token/generate/page";
import ClinicalRecordPage from "./app/dashboard/clinical-record/page";
import ConsultationHistoryPage from "./app/dashboard/clinical-record/consultations/page";
import LabReportsPage from "./app/dashboard/clinical-record/lab-reports/page";
import RadiologyReportsPage from "./app/dashboard/clinical-record/radiology-reports/page";
import MedicinesPage from "./app/dashboard/clinical-record/medicines/page";

export function App() {
  const [currentUser, setCurrentUser] = useState(allUsers[0]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <DashboardHeader
          currentUser={currentUser}
          allUsers={allUsers}
          onSwitchProfile={setCurrentUser}
        />
        <main className="">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-mpin" element={<CreateMpinPage />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            <Route path="/dashboard/reminder" element={<ReminderPage />} />
            <Route
              path="/dashboard/appointments/book"
              element={<ReminderPage />}
            />
            <Route
              path="/dashboard/my-document"
              element={<MyDocumentsPage />}
            />
            <Route path="/dashboard/token" element={<TokenPage />} />
            <Route
              path="/dashboard/token/generate"
              element={<GenerateTokenPage />}
            />
            <Route
              path="/dashboard/clinical-record"
              element={<ClinicalRecordPage />}
            />
            <Route
              path="/dashboard/clinical-record/consultations"
              element={<ConsultationHistoryPage />}
            />
            <Route
              path="/dashboard/clinical-record/lab-reports"
              element={<LabReportsPage />}
            />
            <Route
              path="/dashboard/clinical-record/radiology-reports"
              element={<RadiologyReportsPage />}
            />
            <Route
              path="/dashboard/clinical-record/medicines"
              element={<MedicinesPage />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
