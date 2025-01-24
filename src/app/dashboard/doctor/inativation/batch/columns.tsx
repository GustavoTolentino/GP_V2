"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Report2 = {
  id: string;
  businessName: string;
  cnpj: string;
  batchNumber: string;
  program: string;
  status: string;
  value: string;
};

export const columns: ColumnDef<Report2>[] = [
  {
    accessorKey: "businessName",
    header: "Clínica/Laboratório",
  },
  {
    accessorKey: "cnpj",
    header: "CNPJ",
  },
  {
    accessorKey: "batchNumber",
    header: "Lote",
  },
  {
    accessorKey: "program",
    header: "Programa",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "value",
    header: "Valor",
  },
];
