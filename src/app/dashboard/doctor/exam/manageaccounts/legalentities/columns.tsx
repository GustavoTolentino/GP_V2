"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Report2 = {
  id: string;
  createdOn: string;
  namePatient: string;
  cpf: string;
  voucherStatus: string;
  voucher: string;
  examStatusName: string;
  laudos: string;
  logisticsStatus: string;
  logisticsDateForecast: string;
};

export const columns: ColumnDef<Report2>[] = [
  {
    accessorKey: "namePatient",
    header: "Nome Completo",
  },
  {
    accessorKey: "cpf",
    header: "Categoria",
  },
  {
    accessorKey: "diseaseName",
    header: "Cidade",
  },

  {
    accessorKey: "logisticsStatus",
    header: "Estado",
  },
  {
    accessorKey: "createdOn",
    header: "Status",
  },
  {
    accessorKey: "logisticsDateForecast",
    header: "Criação",
  },
  {
    accessorKey: "Laudos",
    header: "Ultima Ativação",
  },
];
