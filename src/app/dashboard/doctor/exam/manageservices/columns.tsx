"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { LuDownload } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { downlaodLaudoPatient } from "@/services/doctor";
import { MdOutlineDescription, MdOutlineFileUpload } from "react-icons/md";
import { FaCheckDouble, FaDownload, FaUpload } from "react-icons/fa";
import {
  useInsufficientSample,
  useSendLaudo,
  useSolicitation,
  useUnidentifiedSample,
} from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { downloadingLaudo, downloadingLaudoCPf } from "@/services/diagnostic";
import { toast } from "sonner";

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
    header: "Serviço",
  },
  {
    accessorKey: "cpf",
    header: "Grupo",
  },
  {
    accessorKey: "diseaseName",
    header: "Sub Grupo",
  },

  {
    accessorKey: "logisticsStatus",
    header: "Estado",
  },
  {
    accessorKey: "createdOn",
    header: "PAC",
  },
];
