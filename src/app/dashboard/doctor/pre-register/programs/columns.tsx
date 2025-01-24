"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Report2 = {
  id: string;
  namePatient: string;
};

export const columns: ColumnDef<Report2>[] = [
  {
    accessorKey: "namePatient",
    header: "",
  },

  {
    accessorKey: "edit",
    header: "",
  },
];
