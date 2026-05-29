import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { login as loginRequest, me, register as registerRequest } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      setLoading(false);
      return;
    }
    me().then(({ data }) => setUser(data)).finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    async login(credentials) {
      const { data } = await loginRequest(credentials);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      const profile = await me();
      setUser(profile.data);
    },
    async register(payload) {
      await registerRequest(payload);
      const { data } = await loginRequest({ username: payload.username, password: payload.password });
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      const profile = await me();
      setUser(profile.data);
    },
    logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
