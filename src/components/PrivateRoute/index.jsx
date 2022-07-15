import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context";

const PrivateRoute = () => {
  const {
    user: { isLoggedIn },
  } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};
export default PrivateRoute;
