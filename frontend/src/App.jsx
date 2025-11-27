import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Tasks from "./pages/Tasks";

import useAuth from "./hooks/useAuth.jsx";

const ProtectedDashboard = useAuth(Dashboard);
const ProtectedEmployees = useAuth(Employees);
const ProtectedTasks = useAuth(Tasks);

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-300 text-base-content" data-theme="business">
        <Toaster position="top-right" />

        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Pages */}
          <Route path="/dashboard" element={<ProtectedDashboard />} />
          <Route path="/employees" element={<ProtectedEmployees />} />
          <Route path="/tasks" element={<ProtectedTasks />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}
