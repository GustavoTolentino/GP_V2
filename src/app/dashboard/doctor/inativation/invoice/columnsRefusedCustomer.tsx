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

export const columnsRefusedCustomer: ColumnDef<Report2>[] = [
  {
    accessorKey: "namePatient",
    header: "Clinica/Laboratório",
  },
  {
    accessorKey: "cpf",
    header: "Programa",
  },
  {
    accessorKey: "diseaseName",
    header: "N° NF",
  },
  {
    accessorKey: "logisticsStatus",
    header: "Data de Criação",
  },
  {
    accessorKey: "logisticsDateForecast",
    header: "Valor",
  },
];
