import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";
import ResetPassword from "./pages/Auth/ResetPassword";
import Register from "./pages/Auth/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import OrgLayout from "./components/layouts/OrgLayout";
import DoctorLayout from "./components/layouts/DrLayout";

// Org Pages
import OrgHome from "./pages/Org/OrgHome";
import OrgPatients from "./pages/Org/OrgPatients";
import OrgSettings from "./pages/Org/OrgSettings";

// Doctor Pages
import DrHome from "./pages/Doctor/DrHome";
import DrAppointments from "./pages/Doctor/DrAppointments";
import DrSettings from "./pages/Doctor/DrSettings";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Organization Routes */}
      <Route element={<ProtectedRoute role="OWNER" />}>
        <Route path="/dashboard/org" element={<OrgLayout />}>
          <Route index element={<OrgHome />} />
          <Route path="patients" element={<OrgPatients />} />
          <Route path="settings" element={<OrgSettings />} />
        </Route>
      </Route>

      {/* Doctor Routes */}
      <Route element={<ProtectedRoute role="DOCTOR" />}>
        <Route path="/dashboard/doctor" element={<DoctorLayout />}>
          <Route index element={<DrHome />} />
          <Route path="appointments" element={<DrAppointments />} />
          <Route path="settings" element={<DrSettings />} />
        </Route>
      </Route>

      {/* Redirect any unknown route back to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
