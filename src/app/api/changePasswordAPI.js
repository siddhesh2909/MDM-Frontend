import { axiosAPI } from "./axiosInstance";

export const updatePassword = async (oldPassword, newPassword) => {
  try {
    const response = await axiosAPI.put("/api/v1/users/me/password", {
      current_password: oldPassword,
      new_password: newPassword,
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating password:", error);
    const errorMessage =
      error.response?.data?.detail ||
      "Failed to update password: Unknown error.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};