import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../apis/user/users.api";
import { AuthRoutes } from "../constants/routes";
import { getToken, removeToken, setToken } from "../utils/authStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const userData = await getProfile();
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
  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
    // navigate(AuthRoutes.LOGIN);
    navigate(AuthRoutes.WEBSITE);
  };

  return (
    <AuthContext.Provider value={{ showLoader, hideLoader, loading, login, logout, isAuthenticated, refreshUser: fetchUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth () {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context
}
