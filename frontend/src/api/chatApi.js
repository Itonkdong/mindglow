import api from "./axiosClient";

export const listSessions = () => api.get("/chat/sessions/");
export const createSession = (payload = {}) => api.post("/chat/sessions/", payload);
export const listMessages = (sessionId) => api.get(`/chat/sessions/${sessionId}/messages/`);
export const sendMessage = (sessionId, content) => api.post(`/chat/sessions/${sessionId}/messages/`, { content });
