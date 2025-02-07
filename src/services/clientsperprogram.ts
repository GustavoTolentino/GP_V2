import api from "./api";

export const getAllClientsPerProgram = async (page = 1, pageSize = 100) => {
  const response = await api.post("/CustomerPrograms/get-customer-programs-paged", {
    "pageQuery": {
      "pageSize": pageSize,
      "page": page
    }
  });
  return response.data;
};

export const getClientProgramById = async (id:any) => {
  const response = await api.post("/CustomerPrograms/get-customer-program", {id:id});
  return response.data;
};

export const updateClientProgram = async (data:any) => {
  const response = await api.put("/CustomerPrograms/update-customer-program", {
      ...data,
    });
    return response.data;
}