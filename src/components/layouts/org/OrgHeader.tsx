"use client";

import {
  Bell,
  Mail,
  Plus,
  ChevronDown,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb";

import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

export default function OrgHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-none bg-gray-100 px-6">
      {/* LEFT */}
      <div className="flex flex-col gap-1">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/org">Org</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/org/dashboard">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* Primary Action */}
        <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-600/90">
          <Plus size={16} />
          New Patient
        </Button>

        {/* Button Group */}
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost">
            <Mail size={18} />
          </Button>

          <Button size="icon" variant="ghost">
            <Bell size={18} />
          </Button>
        </div>

        {/* ORG + USER */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted">
                {/* Org Avatar */}
                <Avatar className="h-10 w-10 border-2 border-gray-400">
                    <AvatarImage src="/org-logo.png" />
                    <AvatarFallback>PH</AvatarFallback>
                </Avatar>

              <ChevronDown size={16} className="text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              Organization Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              Switch Organization
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
