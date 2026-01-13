import { axiosAPI } from "./axiosInstance";

export const sendContactForm = async (formBody) => {
  try {
    const response = await axiosAPI.post(
      "http://localhost:8000/api/v1/help-support/contact-form",
      formBody
    );
    return response.status;
  } catch (error) {
    return error.response?.status || "Network error";
  }
};
