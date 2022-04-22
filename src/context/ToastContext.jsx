import React, { useState, createContext, useContext, useEffect } from "react";
import { toast as toastify } from "react-toastify";

const ToastContext = createContext();
const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, content: "", type: "" });

  useEffect(() => {
    if (toast.content !== "")
      switch (toast.type) {
        case "success":
          toastify.success(toast.content);
          break;
        case "error":
          toastify.error(toast.content);
          break;
        default:
          toastify.info(toast.content);
      }
  }, [toast]);
  return (
    <ToastContext.Provider
      value={{
        toast,
        setToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);
export { useToast, ToastProvider };
