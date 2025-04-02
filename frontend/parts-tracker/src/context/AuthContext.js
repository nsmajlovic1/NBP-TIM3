import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await API.post("/auth/login", credentials);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
        setUser(response.data);
        navigate("/dashboard");
      } else {
        throw new Error("Login failed. Unexpected response status.");
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
