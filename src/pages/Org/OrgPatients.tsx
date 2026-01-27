"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState, RowSelectionState} from "@tanstack/react-table";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, SlidersHorizontal } from "lucide-react";
import { OrgAddPatients } from "../../components/organization/OrgAddPatients";

// -----------------------------
// Types
// -----------------------------
export type Patient = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  registered: string;
  lastVisit: string;
  lastTreatment: string;
  status: "active" | "inactive";
};

// -----------------------------
// Mock data (replace with API)
// -----------------------------
const data: Patient[] = [
  {
    id: "1",
    name: "Willie Jennie",
    phone: "(388) 316-4463",
    email: "willie.jennings@mail.com",
    address: "8309 Barby Hill",
    registered: "Mar 12, 2021",
    lastVisit: "05 Jun 2021",
    lastTreatment: "Tooth Scaling",
    status: "active",
  },
];

// -----------------------------
// Columns
// -----------------------------
export const columns: ColumnDef<Patient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Patient",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "registered",
    header: "Registered",
  },
  {
    accessorKey: "lastVisit",
    header: "Last Visit",
  },
  {
    accessorKey: "lastTreatment",
    header: "Last Treatment",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "active" ? "default" : "secondary"}>
        {row.original.status}
      </Badge>
    ),
  },
];

// -----------------------------
// Component
// -----------------------------
const OrgPatients = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [openAddPatient, setOpenAddPatient] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-semibold">Patients</h2>
          <p className="text-sm text-muted-foreground">
            Manage patients across your organization
          </p>
        </div>
        <Button
          className="gap-2 bg-blue-600 hover:bg-blue-600/90"
          onClick={() => setOpenAddPatient(true)}
        >
          <Plus className="h-4 w-4" /> Add Patient
        </Button>
      </div>

      <OrgAddPatients
        open={openAddPatient}
        onOpenChange={setOpenAddPatient}
      />

      {/* Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Treatment</TabsTrigger>
          <TabsTrigger value="inactive">Inactive Treatment</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center justify-between gap-4">
            <Input
              placeholder="Search patients..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl border bg-background">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No patients found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} selected
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="inactive">
          <div className="text-sm text-muted-foreground">
            Inactive patients will appear here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};



export default OrgPatients;