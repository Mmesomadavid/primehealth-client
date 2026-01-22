import { Outlet } from "react-router-dom";

const OrgLayout = () => {
  return (
    <div>
      {/* Your Org Sidebar / Header */}
      <h1>Organization Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default OrgLayout;
