import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await API.get("/api/auth/me");
          setCurrentUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const response = await API.post("/api/auth/login", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const { access_token } = response.data;
    localStorage.setItem("token", access_token);

    // Fetch user details
    const userRes = await API.get("/api/auth/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    
    setCurrentUser(userRes.data);
    
    // Redirect based on role
    const role = userRes.data.role;
    if (role === "recruiter") {
      navigate("/recruitment");
    } else if (role === "enterprise") {
      navigate("/enterprise");
    } else {
      navigate("/career");
    }
  };

  const signup = async (name, email, password, role) => {
    await API.post("/api/auth/signup", {
      name,
      email,
      password,
      role
    });
    // Auto login after signup
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/login");
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
