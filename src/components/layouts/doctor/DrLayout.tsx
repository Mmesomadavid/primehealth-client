import { Outlet, Navigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const DoctorLayout = () => {
  const { doctorId } = useParams();
  const auth = useContext(AuthContext);

  if (!auth || auth.isLoading) return null;

  if (!auth.user) {
    return <Navigate to="/" replace />;
  }

  // Ensure the URL doctorId matches the logged-in doctor id
  if (doctorId !== auth.user.id) {
    return <Navigate to={`/doctor/${auth.user.id}`} replace />;
  }

  return (
    <div>
      {/* Your Doctor Sidebar / Header */}
      <h1>Doctor Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default DoctorLayout;
