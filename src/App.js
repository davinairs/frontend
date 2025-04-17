import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import AdminDashboard from "./pages/dashboard_admin";
import UserDashboard from "./pages/dashboard_user";
import AnggotaDashboard from "./pages/dashboard_anggota";


function App() {
  return (
    <Routes>8
      <Route path="/" element={<Navigate to="/login" />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/dashboard_admin" element={<AdminDashboard />} />
      <Route exact path="/dashboard_user" element={<UserDashboard />} />
      <Route exact path="/dashboard_anggota" element={<AnggotaDashboard />} />
    </Routes>
  );
}

export default App;