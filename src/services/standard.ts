import { api } from "./api";

export const validate = async () => {
  const res = await api.post("/Standard/ValidatebyUser", null, {});
  return res.data;
};

export const getAllReasonsInactivations = async () => {
  const response = await api.get("/Standard/get-all-reasons-inactivations");
  return response.data;
};
