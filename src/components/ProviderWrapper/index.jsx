import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { CategoryProvider } from "../../context/CategoryContext";
import { ToastProvider } from "../../context/ToastContext";

const ProviderWrapper = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <CategoryProvider>{children}</CategoryProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </>
  );
};

export default ProviderWrapper;
