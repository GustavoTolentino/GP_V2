import { IInvoiceData } from "@/types";
import api from "./api";

export const getUsers = async (page = 1, pageSize = 100) => {
  const response = await api.post("/Users/get-users-paged", {
    PageQuery: {
      pageSize: pageSize,
      page: page,
    },
  });
  return response.data;
};

export const getAllInvoicesById = async (id:any) => {
  const response = await api.post("/InvoiceAutonomous/get-all-invoice-autonomous-by-health-professional-id", {healthProfessionalId:id,});
  return response.data;
};

export const createInvoice = async (invoice:IInvoiceData) => {
  const response = await api.post("/InvoiceAutonomous/create-invoice-autonomo", invoice);
  return response.data;
};

export const getProcedureFile = async (id:any) => {
 const procedureFile = await api.post("InvoiceAutonomous/get-invoice-autonomo-procedure-invoice-file-download-by-id", {id:id});
 return procedureFile.data;
}

export const getFile = async (id:any) => {
 const file = await api.post("InvoiceAutonomous/get-invoice-autonomo-file-download-by-id", {id:id});
 return file.data;
}

export const updateUsers = async (data: any) => {
  const response = await api.put("/Users/update-user", {
    ...data,
  });
  return response.data;
};
