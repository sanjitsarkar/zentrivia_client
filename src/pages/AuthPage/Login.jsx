import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/AuthContext";
import { GUEST_CREDENTIAL } from "../../utils";

const LoginPage = () => {
  const { logIn, loginCred, setLoginCred, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Layout>
      <main className="form-container h-full t-2  l-0 r-0 relative grid place-content-center text-dark w-full">
        <form
          className="form p-5   br-sm text-dark b-solid b-1 bg-light  br-light bx-sh-light-3 "
          onSubmit={logIn}
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

            <label className="checkbox-container">
              Remember Me
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>

          <button
            className="btn btn-dark w-full text-lg mb-2"
            disabled={user.loading}
          >
            {user.loading ? <Loader isButtonLoader={true} /> : "Login"}
          </button>

          <button
            className="btn btn-info w-full text-md mb-1"
            onClick={() => {
              setLoginCred(GUEST_CREDENTIAL);
            }}
          >
            Guest Login
          </button>
          <a href="#" className="text-dark-4 block mb-05">
            Forgot Password?
          </a>
          <Link to="/signup" className="text-dark-4 block">
            Don't have an account?
          </Link>
        </form>
      </main>
    </Layout>
  );
};

export default LoginPage;
