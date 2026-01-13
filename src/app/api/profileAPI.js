import { axiosAPI } from './axiosInstance';

const baseURL = '/api/v1/users'

export const fetchProfile = async () => {
  try {
    const response = await axiosAPI.get(
      `${baseURL}/me`
    );

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Network error or server unavailable";

    return { success: false, message: errorMessage };
  }
};

export const updateProfile = async ( formData) => {
  try {
    const response = await axiosAPI.put(
      `${baseURL}/users/update_profile/`,
      formData
    );

    return response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Network error or server unavailable";

    return { success: false, message: errorMessage };
  }
};
