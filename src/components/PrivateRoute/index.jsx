import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, useToast } from "../../hooks";

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
  return isLoggedIn ? children : <Navigate to="/" replace />;
};
export default PrivateRoute;
