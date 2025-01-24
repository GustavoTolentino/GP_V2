import { IProcedureStatus, ISendLaudo } from "@/types";
import { api } from "./api";

const programCode = "985";

export const getProceduresInValidationIndividual = async () => {
  const response = await api.get(
    "/Accreditations/get-procedures-in-validation-individual"
  );
  return response.data;
};

export const getProceduresInValidationLegalEntity = async () => {
  const response = await api.get(
    "/Accreditations/get-procedures-in-validation-legal-entity"
  );
  return response.data;
};

export const getProceduresInValidationCooperated = async () => {
  const response = await api.get(
    "/Accreditations/get-procedures-in-validation-cooperated"
  );
  return response.data;
};

export const getProceduresInValidationThirdParty = async () => {
  const response = await api.get(
    "/Accreditations/get-procedures-in-validation-third-party"
  );
  return response.data;
};

export const validateProcedureStatus = async (data: IProcedureStatus) => {
  const res = await api.post("/Accreditations/validate-procedure-status", {
    ...data,
  });
  return res.data;
};
