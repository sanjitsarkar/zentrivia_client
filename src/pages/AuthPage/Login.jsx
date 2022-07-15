import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Loader } from "../../components";
import { useAuth } from "../../context";
import { GUEST_CREDENTIAL } from "../../utils";
const LoginPage = () => {
  const { logIn, loginCred, setLoginCred, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (user.isLoggedIn) {
      if (pathname === "/signup") navigate("/", { replace: true });
      else if (pathname !== "/") navigate(-1, { replace: true });
    }
  }, [user, pathname]);

  return (
    <Layout>
      <form
        onSubmit={logIn}
        className="form  p-3 mt-5  br-sm text-dark b-solid b-1 bg-light  br-light bx-sh-light-3 "
      >
        <label className="text-2xl mb-2 block text-center  font-normal">
          Login
        </label>
        <div className="col gap-1 mb-2">
          <div className="input-box input input-light">
            <i className="fa fa-envelope"></i>
            <input
              type="text"
              placeholder="Enter your email"
              className="input"
              defaultValue={loginCred.email}
              onChange={(e) =>
                setLoginCred({ ...loginCred, email: e.target.value })
              }
              required
            />
          </div>
          <div className="input-box input input-light">
            <i className="fa fa-lock"></i>
            <input
              type={`${!showPassword ? "password" : "text"}`}
              placeholder="Enter your password"
              className="input"
              defaultValue={loginCred.password}
              onChange={(e) =>
                setLoginCred({ ...loginCred, password: e.target.value })
              }
              required
              autoComplete="true"
            />
            <i
              className={`fa cursor-pointer ${
                !showPassword ? "fa-eye" : "fa-eye-slash"
              }`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
        </div>

        <button
          className="btn btn-dark w-full text-lg mb-2"
          disabled={user.loading}
        >
          {user.loading ? <Loader isButtonLoader={true} /> : "Login"}
        </button>

        <button
          className="btn btn-info w-full text-md mb-2"
          onClick={() => {
            setLoginCred(GUEST_CREDENTIAL);
          }}
        >
          Login as Guest
        </button>

        <Link
          to="/signup"
          className="text-dark-4 row items-center flex-wrap gap-025"
        >
          <span>Don't have an account?</span>
          <span className="text-dark font-medium">Signup</span>
        </Link>
      </form>
    </Layout>
  );
};

export default LoginPage;
