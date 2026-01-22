import { Outlet } from "react-router-dom";

const DoctorLayout = () => {
  return (
    <div>
      {/* Your Doctor Sidebar / Header */}
      <h1>Doctor Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default DoctorLayout;
