import OrgSidebar from "./OrgSidebar";
import OrgHeader from "./OrgHeader";
import { Outlet, Navigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const OrgLayout = () => {
  const { orgId } = useParams();
  const auth = useContext(AuthContext);

  // Prevent rendering until auth is loaded
  if (!auth || auth.isLoading) return null;

  // Ensure user exists
  if (!auth.user) {
    return <Navigate to="/" replace />;
  }

  // Enforce orgId from URL
  if (orgId !== auth.user.organizationId) {
    return <Navigate to={`/org/${auth.user.organizationId}`} replace />;
  }

  return (
    <div className="flex min-h-screen bg-zinc-100">
      {/* Sidebar */}
      <OrgSidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header (always on top of outlet) */}
        <OrgHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="min-h-full rounded-2xl bg-white p-6 shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrgLayout;
