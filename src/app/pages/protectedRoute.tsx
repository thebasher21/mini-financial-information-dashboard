"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticatedUser } from "../services/authService";

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (!isAuthenticatedUser()) {
        router.push("/pages/login");
      }
    }
    return () => {
      isMounted = false;
    };
  }, [router]);
  return isAuthenticatedUser() ? children : null;
};
export default ProtectedRoute;
