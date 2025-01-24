import { IProfileId } from "@/types";
import { api } from "./api";

export const getProfileByProfileTypeId = async (data: IProfileId) => {
  const response = await api.get("/profiles/get-profile-by-profile-type-id", {
    params: data,
  });
  return response.data;
};
