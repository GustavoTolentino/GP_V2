import { IInvoiceData } from "@/types";
import api from "./api";

export const getAllClients = async (page = 1, pageSize = 100) => {
  const response = await api.post("/Customers/get-customers-paged", {
    "pageQuery": {
      "pageSize": pageSize,
      "page": page
    }
  });
  return response.data;
};

export const getClientById = async (id:any) => {
  const response = await api.post("/Customers/get-customer-by-id", {id:id});
  return response.data;
};

export const createClient = async (client:any) => {
  const response = await api.post("/Customers/create-customer", client);
  return response.data;
};

export const updateClient = async (data: any) => {
  const response = await api.put("/Customers/update-customer", {
    ...data,
  });
  return response.data;
};
