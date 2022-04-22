import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks";

import { initialState, reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  formatError,
  initialLoginCredState,
  initialSignupCredState,
} from "../utils";
import { useToast } from "./ToastContext";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setToast } = useToast();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [loginCred, setLoginCred] = useState(initialLoginCredState);
  const [signupCred, setSignupCred] = useState(initialSignupCredState);
  const { callApi } = useApi();
  const signUp = async (e) => {
    e.preventDefault();
    dispatch({ type: ACTION_TYPE_LOADING });
    try {
      if (signupCred.password !== signupCred.confirmPassword) {
        setToast({
          show: true,
          content: "Passwords do not match",
          type: "info",
        });
        dispatch({ type: ACTION_TYPE_SUCCESS, payload: [] });

        return;
      }

      const result = await callApi("post", "auth/signup", false, {
        name: signupCred.name,
        email: signupCred.email,
        password: signupCred.password,
      });

      setToast({
        show: true,
        content: `Welcome, ${result.data.name}`,
        type: "info",
      });
      setLoginCred(initialLoginCredState);
      setSignupCred(initialSignupCredState);
      dispatch({ type: ACTION_TYPE_SUCCESS, payload: result.data });

      setIsLoggedIn(true);
    } catch (err) {
      setToast({
        show: true,
        content: formatError(err),
        type: "error",
      });

      dispatch({ type: ACTION_TYPE_FAILURE, payload: err.message });
    }
  };
  const logIn = async (e) => {
    e.preventDefault();
    dispatch({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("post", "auth/login", false, {
        email: loginCred.email,
        password: loginCred.password,
      });

      setToast({
        show: true,
        content: `Welcome, ${result.data.name}`,
        type: "info",
      });
      setLoginCred(initialLoginCredState);
      setSignupCred(initialSignupCredState);
      dispatch({ type: ACTION_TYPE_SUCCESS, payload: result.data });

      setIsLoggedIn(true);
    } catch (err) {
      setToast({
        show: true,
        content: formatError(err),
        type: "error",
      });

      dispatch({ type: ACTION_TYPE_FAILURE, payload: err.message });
    }
  };
  const logOut = () => {
    setToast({
      show: true,
      content: `Goodbye, ${state.data.name}`,
      type: "warning",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    dispatch({ type: ACTION_TYPE_SUCCESS, payload: [] });
  };
  useEffect(() => {
    if (isLoggedIn) {
      setToken(localStorage.getItem("token"));
      localStorage.setItem("user", JSON.stringify(state.data));
      localStorage.setItem("token", state.data.token);
      navigate(-1, { replace: true });
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setIsLoggedIn(true);
      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: JSON.parse(localStorage.getItem("user")),
      });
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        token,
        user: state,
        setUser: dispatch,
        isLoggedIn,
        signUp,
        logIn,
        logOut,
        loginCred,
        setLoginCred,
        signupCred,
        setSignupCred,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
