import api from "./axiosClient";

export const listEntries = () => api.get("/wellness-entries/");
export const createEntry = (payload) => api.post("/wellness-entries/", payload);
export const updateEntry = (id, payload) => api.patch(`/wellness-entries/${id}/`, payload);
export const deleteEntry = (id) => api.delete(`/wellness-entries/${id}/`);
export const getSummary = () => api.get("/wellness-summary/");
