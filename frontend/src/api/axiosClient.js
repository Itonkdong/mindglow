import axios from "axios";

const runtimeApiBaseUrl = window.__MINDGLOW_CONFIG__?.VITE_API_BASE_URL;
const apiBaseUrl =
  runtimeApiBaseUrl || import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem("refreshToken");
      if (refresh) {
        const { data } = await axios.post(`${api.defaults.baseURL}/token/refresh/`, { refresh });
        localStorage.setItem("accessToken", data.access);
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
