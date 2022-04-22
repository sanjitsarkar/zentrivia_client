import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Loader } from "../../components";
import { useAuth } from "../../hooks";

const SignupPage = () => {
  const { signUp, signupCred, setSignupCred, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <Layout>
      <form
        className="form p-3 mt-3 br-sm text-dark b-solid b-1  br-light bx-sh-light-3 bg-light"
        onSubmit={signUp}
      >
        <label className="text-2xl mb-2 block text-center  font-normal">
          Signup
        </label>
        <div className="col gap-1 mb-2">
          <div className="input-box input input-light">
            <i className="fa fa-user"></i>
            <input
              type="text"
              placeholder="Enter your name"
              className="input"
              defaultValue={signupCred.name}
              onChange={(e) =>
                setSignupCred({ ...signupCred, name: e.target.value })
              }
              required
            />
          </div>

          <div className="input-box input input-light">
            <i className="fa fa-envelope"></i>
            <input
              type="email"
              placeholder="Enter your email"
              className="input"
              defaultValue={signupCred.email}
              onChange={(e) =>
                setSignupCred({ ...signupCred, email: e.target.value })
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
              defaultValue={signupCred.password}
              onChange={(e) =>
                setSignupCred({ ...signupCred, password: e.target.value })
              }
              required
            />
            <i
              className={`fa cursor-pointer ${
                !showPassword ? "fa-eye" : "fa-eye-slash"
              }`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
          <div className="input-box input input-light">
            <i className="fa fa-lock"></i>
            <input
              type={`${!showConfirmPassword ? "password" : "text"}`}
              placeholder="Confirm your password"
              className="input"
              defaultValue={signupCred.confirmPassword}
              onChange={(e) =>
                setSignupCred({
                  ...signupCred,
                  confirmPassword: e.target.value,
                })
              }
              required
            />
            <i
              className={`fa cursor-pointer ${
                !showConfirmPassword ? "fa-eye" : "fa-eye-slash"
              }`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            ></i>
          </div>
        </div>
        <button
          className="btn btn-dark w-full text-lg mb-2"
          disabled={user.loading}
        >
          {user.loading ? <Loader isButtonLoader={true} /> : "Signup"}
        </button>

        <Link to="/login" className="text-dark-4 block">
          Already have an account?
        </Link>
      </form>
    </Layout>
  );
};

export default SignupPage;
