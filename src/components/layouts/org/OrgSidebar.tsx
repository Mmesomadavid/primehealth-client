"use client";

import {
  Home,
  Users,
  Calendar,
  FileText,
  Building2,
  BarChart3,
  Settings,
  MessageCircle,
} from "lucide-react";

import { ScrollArea } from "../../../components/ui/scroll-area";
import { NavLink, useParams } from "react-router-dom";

export default function OrgSidebar() {
  const { orgId } = useParams();

  // In case orgId is missing, you can fallback to a default route
  if (!orgId) return null;

  return (
    <div className="flex h-screen">
      {/* MAIN SIDEBAR */}
      <aside className="flex w- flex-col border-none bg-gray-100">

        {/* Header */}
        <div className="px-4 py-4">
          {/* Search */}
        </div>

        {/* SCROLLABLE CONTENT */}
        <ScrollArea className="flex-1 px-2">
          <div className="px-2 pb-6">
            {/* OVERVIEW */}
            <Section title="Overview">
              <NavItem
                to={`/org/${orgId}`}
                icon={<Home size={16} />}
                label="Dashboard"
              />
            </Section>

            {/* PATIENT CARE */}
            <Section title="Patient Care">
              <NavItem
                to={`/org/${orgId}/patients`}
                icon={<Users size={16} />}
                label="Patients"
              />
              <NavItem
                to={`/org/${orgId}/appointments`}
                icon={<Calendar size={16} />}
                label="Appointments"
              />
              <NavItem
                to={`/org/${orgId}/messages`}
                icon={<MessageCircle size={16} />}
                label="Messages"
              />
            </Section>

            {/* CLINICAL RECORDS */}
            <Section title="Clinical Records">
              <NavItem
                to={`/org/${orgId}/reports`}
                icon={<FileText size={16} />}
                label="Records"
              />
            </Section>

            {/* ORGANIZATION */}
            <Section title="Organization">
              <NavItem
                to={`/org/${orgId}/departments`}
                icon={<Building2 size={16} />}
                label="Departments"
              />
              <NavItem
                to={`/org/${orgId}/staffs`}
                icon={<Users size={16} />}
                label="Staff & Roles"
              />
            </Section>

            {/* ANALYTICS */}
            <Section title="Analytics">
              <NavItem
                to={`/org/${orgId}/reports`}
                icon={<BarChart3 size={16} />}
                label="Reports & Insights"
              />
            </Section>

            {/* SETTINGS */}
            <Section title="Settings">
              <NavItem
                to={`/org/${orgId}/settings`}
                icon={<Settings size={16} />}
                label="Settings"
              />
            </Section>
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  to,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
          isActive ? "bg-muted font-medium" : "text-foreground hover:bg-muted"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
