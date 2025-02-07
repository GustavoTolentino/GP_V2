import { IFeedbackData } from "@/types";
import api from "./api";

export const getAllFeedbacksById = async (id:any) => {
  const response = await api.post("/AccountFeedbacks/get-all-account-feedback-by-account-id", {id:id,});
  return response.data;
};

export const createPayment = async (payment:any) => {
  const response = await api.post("/PaymentDetails/create-payment-detail-for-health-professional", payment);
  return response.data;
};

export const getAllDropdownsPayments = async () => {
  const response = await api.post("PaymentTypes/get-all-payment-types");
  const responseBanks = await getAllBanks();
  const ret = {
    banks: responseBanks.data,
    paymentTypes: response.data.data
  }
  return ret;
};

export const getPaymentById = async (id:any) => {
  const response = await api.post("/PaymentDetails/get-payment-detail-by-health-professional-id", {healthProfessionalId:id});
  return response.data;
}

const getAllBanks = async () => {
  const response = await api.get("Banks/get-all-banks");
  return response.data;
}
export const updatePayment = async (data: any) => {
  const response = await api.post("/PaymentDetails/update-payment-detail", {
    ...data,
  });
  return response.data;
};
