import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../apis/user/users.api";
import { AdminRoutes, AuthRoutes } from "../constants/routes";
import {
  getRole,
  getToken,
  removeRole,
  removeToken,
  setRole,
  setToken,
} from "../utils/authStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const navigate = useNavigate();
  
  const fetchUser = async () => {
    const role = getRole();
    setLoading(true);
    try {
      const userData = await getProfile(role === "admin" ? "admin" : "user");
      setUser(userData?.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response?.status === 401) {
        // Only logout if unauthorized
        removeToken();
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = "/login";
      } else {
        // Network error → do NOT logout
        console.error("Network error while fetching user");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Check auth on app load
  useEffect(() => {
    const token = getToken();

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  // ✅ Login
  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  // ❌ Logout
  const logout = async () => {
    const isImpersonating = sessionStorage.getItem("isImpersonating");
    if (isImpersonating) {
      setToken(sessionStorage.getItem("adminToken"));
      setRole(sessionStorage.getItem("adminRole"));
      sessionStorage.removeItem("isImpersonating");
      // 🔥 IMPORTANT: reset user first
    setUser(null);
    setIsAuthenticated(false);

    // 🔥 Fetch admin again
    await fetchUser();

    // 🔥 Navigate after state updated
    navigate(AdminRoutes.DASHBOARD, { replace: true });
    } else {
      removeToken();
      setUser(null);
      setIsAuthenticated(false);
      removeRole();
      navigate(AuthRoutes.WEBSITE);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        showLoader,
        hideLoader,
        loading,
        login,
        logout,
        isAuthenticated,
        refreshUser: fetchUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
