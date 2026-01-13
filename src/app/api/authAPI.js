import { axiosAPI } from "./axiosInstance";

const baseUrl = "/api/v1/auth";

const validateToken = async () => {
  const response = await axiosAPI.get(`${baseUrl}/validate`);
  return response;
};

const login = async (username, password) => {
  const data = new URLSearchParams();
  data.append("username", username);
  data.append("password", password);
  const response = await axiosAPI.post(`${baseUrl}/token`, data);
  return response;
};

const logout = async () => {
  await axiosAPI.post(`${baseUrl}/logout`);
};

const setCookie = async (token) => {
  const response = await axiosAPI.post(`${baseUrl}/set-cookies`, {
    token: token,
  });
  return response;
};

export { validateToken, login, setCookie, logout };
