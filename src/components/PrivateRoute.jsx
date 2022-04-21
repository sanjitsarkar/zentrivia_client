import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const { setToast } = useToast();
  useEffect(() => {
    if (!isLoggedIn) {
      setToast({
        content: "You must be logged in to view this page",
        type: "error",
        show: true,
      });
    }
  }, [isLoggedIn]);
  return isLoggedIn === true ? children : <Navigate to="/" replace />;
};
export default PrivateRoute;
