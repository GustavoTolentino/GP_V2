import api from "./api";

export const getHealthProfessionalsPaged = async (page = 1, pageSize = 100) => {
  const response = await api.post(
    "/HealthProfessionals/get-health-professionals-paged",
    {
      pageQuery: {
        pageSize: pageSize,
        page: page,
      },
    }
  );
  return response.data;
};

export const getHealthProfessional = async (id: any) => {
  const response = await api.post(
    "/HealthProfessionals/get-health-professional",
    {
      id: id,
    }
  );
  return response.data;
};

export const createHealthProfessional = async (data: any) => {
  const res = await api.post(
    "/HealthProfessionals/create-health-professional",
    {
      ...data,
    }
  );
  return res.data;
};

export const getAllHealthProfessionalStatus = async () => {
  const response = await api.get(
    "/HealthProfessionals/get-all-health-professional-status"
  );
  return response.data;
};

export const getAllHealthProfessionalTypes = async () => {
  const response = await api.get(
    "/HealthProfessionals/get-all-health-professional-types"
  );
  return response.data;
};

export const updateHealthProfessional = async (data: any) => {
  const response = await api.put(
    "/HealthProfessionals/update-health-professional",
    {
      ...data,
    }
  );
  return response.data;
};

export const checkIfCpfExists = async (cpf: any) => {
  const response = await api.get("/HealthProfessionals/check-if-cpf-exists", {
    params: {
      cpf: cpf,
    },
  });
  return response.data;
};
