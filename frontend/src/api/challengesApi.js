import api from "./axiosClient";

export const listChallenges = () => api.get("/challenges/");
export const todayChallenge = () => api.get("/challenges/today/");
export const completeChallenge = (id) => api.post(`/challenges/${id}/complete/`);
export const challengeHistory = () => api.get("/challenges/history/");
