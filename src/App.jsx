import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./app/page";
import DashboardPage from "./app/dashboard/page";
import DashboardHeader from "./components/components/dashboard/header";
import { allUsers } from "./lib/users";
import CreateMpinPage from "./app/create-mpin/page";

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
          </Routes>
        </main>
      </div>
    </Router>
  );
}
