import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import SummaryApi from "../common";

const ProtectedRoutes = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(SummaryApi.checkAuth.url, {
          method: SummaryApi.checkAuth.method,
          credentials: "include",
        });

        if (!response.ok) throw new Error("Authentication failed");

        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
