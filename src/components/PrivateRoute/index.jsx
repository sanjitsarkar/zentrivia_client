import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks";

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};
export default PrivateRoute;
