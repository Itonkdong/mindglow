import api from "./axiosClient";

export const register = (payload) => api.post("/auth/register/", payload);
export const login = (payload) => api.post("/token/", payload);
export const me = () => api.get("/auth/me/");
