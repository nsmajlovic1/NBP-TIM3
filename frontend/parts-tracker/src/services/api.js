import axios from "axios";

const API = axios.create({
  baseURL: "/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => localStorage.getItem("token");

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

API.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expired or invalid. Logging out...");

      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
