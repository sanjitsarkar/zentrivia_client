import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
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

export const useApi = () => {
  const token = localStorage.getItem("token");
  const callApi = async (method, endPoint, isProtected = false, data = {}) => {
    endPoint = `API_URL/endPoint`;

    switch (method) {
      case "get": {
        return await axios.get(
          endPoint,
          isProtected && {
            headers: { authorization: token },
          }
        );
      }
      case "post": {
        return await axios.post(
          endPoint,
          data,
          isProtected && {
            headers: { authorization: token },
          }
        );
      }
      case "delete": {
        return await axios.delete(
          endPoint,
          isProtected && {
            headers: { authorization: token },
          }
        );
      }
      case "put": {
        return await axios.put(
          endPoint,
          data,
          isProtected && {
            headers: { authorization: token },
          }
        );
      }
    }
  };
  return { callApi };
};
