"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Report2 = {
  id: string;
  namePatient: string;
};

export const columns: ColumnDef<Report2>[] = [
  {
    accessorKey: "namePatient",
    header: "Nome",
  },

  {
    accessorKey: "typeservice",
    header: "Tipo de Serviço",
  },
  {
    accessorKey: "km",
    header: "Custo KM (R$)",
  },
  {
    accessorKey: "custo",
    header: "Custo/Conta (R$)",
  },
  {
    accessorKey: "custocliente",
    header: "Custo/Cliente (R$)",
  },
];
