import api from "./axiosClient";

export const listRecommendations = () => api.get("/recommendations/");
export const generateRecommendations = () => api.post("/recommendations/generate/");
