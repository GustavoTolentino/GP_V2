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
    header: "Nome",
  },
  {
    accessorKey: "cpf",
    header: "N° Linceça",
  },
  {
    accessorKey: "diseaseName",
    header: "Tipo",
  },

  {
    accessorKey: "logisticsStatus",
    header: "Telefone",
  },
  {
    accessorKey: "createdOn",
    header: "Validade",
  },
];
