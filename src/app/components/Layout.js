"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";
import Nav from "./Nav";
import { useTheme } from "../context/ThemeContext";
import { usePathname } from "next/navigation";
import ProtectedRoute from "./ProtectedRoute";

// Dynamically import heavy components
const Sidebar = dynamic(() => import("./Sidebar"), {
  ssr: false,
});

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => {
    // Import CSS dynamically
    if (typeof window !== "undefined") {
      import("react-toastify/dist/ReactToastify.css");
    }
    return mod.ToastContainer;
  }),
  {
    ssr: false,
  }
);

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme();
  const pathname = usePathname();

  const noLayoutRoutes = ["/", "/login", "/signup", "/forgot_password"];
  const isNoLayout = noLayoutRoutes.includes(pathname);

  if (isNoLayout) {
    return (
      <>
        <main>{children}</main>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }

  return (
    <ProtectedRoute>
      <div className={isDarkMode ? "dark" : ""}>
        <Nav />
        <Sidebar />
        <main>{children}</main>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </ProtectedRoute>
  );
};

export default memo(Layout);
