import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";
import ResetPassword from "./pages/Auth/ResetPassword";
import Register from "./pages/Auth/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import OrgLayout from "./components/layouts/org/OrgLayout";
import DoctorLayout from "./components/layouts/doctor/DrLayout";

import Loader from "./components/Loader";
import { AuthContext } from "./context/AuthContext";

// Org Pages
import OrgHome from "./pages/Org/OrgHome";
import OrgPatients from "./pages/Org/OrgPatients";
import OrgSettings from "./pages/Org/OrgSettings";
import OrgAppointments from "./pages/Org/OrgAppointments";
import OrgMessages from "./pages/Org/OrgMessages";
import OrgReports from "./pages/Org/OrgReports";
import OrgDep from "./pages/Org/OrgDep";
import OrgStaff from "./pages/Org/OrgStaff";

// Doctor Pages
import DrHome from "./pages/Doctor/DrHome";
import DrAppointments from "./pages/Doctor/DrAppointments";
import DrSettings from "./pages/Doctor/DrSettings";

function App() {
  const auth = useContext(AuthContext);

  // If auth context is still loading, show loader
  if (!auth || auth.isLoading) return <Loader />;

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Organization Routes */}
      <Route element={<ProtectedRoute role="OWNER" />}>
        <Route path="/org/:orgId" element={<OrgLayout />}>
          <Route index element={<OrgHome />} />
          <Route path="patients" element={<OrgPatients />} />
          <Route path="appointments" element={<OrgAppointments />} />
          <Route path="messages" element={<OrgMessages />} />
          <Route path="reports" element={<OrgReports />} />
          <Route path="departments" element={<OrgDep />} />
          <Route path="staffs" element={<OrgStaff />} />
          <Route path="settings" element={<OrgSettings />} />
        </Route>
      </Route>

      {/* Doctor Routes */}
      <Route element={<ProtectedRoute role="DOCTOR" />}>
        <Route path="/doctor/:doctorId" element={<DoctorLayout />}>
          <Route index element={<DrHome />} />
          <Route path="appointments" element={<DrAppointments />} />
          <Route path="settings" element={<DrSettings />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
