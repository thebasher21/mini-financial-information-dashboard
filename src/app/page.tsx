"use client";

import { useEffect } from "react";
import ProtectedRoute from "./pages/protectedRoute";
import Home from "./components/dashboard";

export default function Landing() {
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <ProtectedRoute>
      <Home></Home>
    </ProtectedRoute>
  );
}
