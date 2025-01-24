import { IFeedbackData } from "@/types";
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

export const getAllFeedbacksById = async (id:any) => {
  const response = await api.post("/HealthProfessionalFeedbacks/get-all-health-professional-feedbacks-by-health-professional-id", {healthProfessionalId:id,});
  return response.data;
};

export const createFeedback = async (feedback:IFeedbackData) => {
  const response = await api.post("/HealthProfessionalFeedbacks/create-health-professional-feedback", feedback);
  return response.data;
};

export const getAllDrodownsFeedback = async () => {
  const response = await api.post("ReasonFeedbacks/get-all-reason-feedbacks");
  const responseCostumers = await getAllCostumers();
  const ret = {
    reasons: response.data.data,
    costumers: responseCostumers.data
  }
  return ret;
};

export const getProgramsByCostumer = async (id:any) => {
  const response = await api.post("CustomerPrograms/get-all-programs-by-customer-id", {customerId:id});
  return response.data;
}

const getAllCostumers = async () => {
  const response = await api.post("Customers/get-all-customers");
  return response.data;
}
export const updateUsers = async (data: any) => {
  const response = await api.put("/Users/update-user", {
    ...data,
  });
  return response.data;
};
