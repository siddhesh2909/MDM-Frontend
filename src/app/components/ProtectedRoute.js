"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingPage from "./LoadingPage";
import { validateToken } from "../api/authAPI";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await validateToken()
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <LoadingPage />;
  }

  return isAuthenticated ? children : router.push("/login");
};

export default ProtectedRoute;
