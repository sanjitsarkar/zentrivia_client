import React, { createContext, useContext, useReducer, useState } from "react";
import { reducer } from "../reducers/reducer";
import { UserType } from "../types";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  callApi,
  formatError,
  initialLoginCredState,
  initialSignupCredState,
  notify
} from "../utils";

const AuthContext = createContext(null);
const initialState = {
  data: JSON.parse(localStorage?.getItem("user") || "") as UserType,
  isLoggedIn: JSON.parse(localStorage?.getItem("user") || "") ? true : false,
  loading: false,
  error: "",
};
const AuthProvider = ({ children }:any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [profile, dispatchProfile] = useReducer(reducer, initialState);
  const [loginCred, setLoginCred] = useState(initialLoginCredState);
  const [signupCred, setSignupCred] = useState(initialSignupCredState);

  const signUp = async (e) => {
    e.preventDefault();
    dispatch({ type: ACTION_TYPE_LOADING });
    try {
      if (signupCred.password !== signupCred.confirmPassword) {
        notify("Passwords do not match", "error");
        dispatch({ type: ACTION_TYPE_SUCCESS, payload: [] });

        return;
      }

      const result = await callApi("post", "auth/signup", false, {
        name: signupCred.name,
        email: signupCred.email,
        password: signupCred.password,
      });

      notify(`Welcome, ${result.data.name}`);
      setLoginCred(initialLoginCredState);
      setSignupCred(initialSignupCredState);
      storeUserData(result.data);
      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data,
        isLoggedIn: true,
      });
    } catch (err) {
      notify(formatError(err), "error");
      dispatch({ type: ACTION_TYPE_FAILURE, payload: formatError(err) });
    }
  };
  const updateUserInfo = async (user) => {
    try {
      dispatchProfile({ type: ACTION_TYPE_LOADING });
      const result = await callApi("put", "user", true, user);
      dispatchProfile({ type: ACTION_TYPE_SUCCESS, payload: result.data });
    } catch (err) {
      notify(formatError(err), "error");
      dispatchProfile({ type: ACTION_TYPE_FAILURE, payload: formatError(err) });
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

      notify(`Welcome, ${result.data.name}`);
      setLoginCred(initialLoginCredState);
      setSignupCred(initialSignupCredState);
      storeUserData(result.data);
      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data,
        isLoggedIn: true,
      });
    } catch (err) {
      notify(formatError(err), "error");
      dispatch({ type: ACTION_TYPE_FAILURE, payload: formatError(err) });
    }
  };
  const getUserInfo = async () => {
    try {
      dispatchProfile({ type: ACTION_TYPE_LOADING });
      const result = await callApi("get", "user", true);
      const {
        _id,
        email,
        name,
        profilePictureURL,
        updatedAt,
        createdAt,
        totalScore,
      } = result.data;

      dispatchProfile({
        type: ACTION_TYPE_SUCCESS,
        payload: {
          _id,
          email,
          name,
          profilePictureURL,
          updatedAt,
          createdAt,
          totalScore,
        },
      });
    } catch (err) {
      dispatchProfile({ type: ACTION_TYPE_FAILURE, payload: formatError(err) });
    }
  };
  const addScore = async (points, id, inCorrectQuestionsId) => {
    try {
      dispatchProfile({ type: ACTION_TYPE_LOADING });

      const result = await callApi("put", `user/scores/${id}`, true, {
        points,
        id,
        inCorrectQuestionsId,
      });
      const {
        _id,
        email,
        name,
        profilePictureURL,
        updatedAt,
        createdAt,
        totalScore,
      } = result.data;

      dispatchProfile({
        type: ACTION_TYPE_SUCCESS,
        payload: {
          _id,
          email,
          name,
          profilePictureURL,
          updatedAt,
          createdAt,
          totalScore,
        },
      });
    } catch (err) {
      dispatchProfile({ type: ACTION_TYPE_FAILURE, payload: formatError(err) });
    }
  };
  const logOut = () => {
    notify(`Goodbye, ${state.data.name}`);
    localStorage.removeItem("user");
    dispatch({ type: ACTION_TYPE_SUCCESS, payload: [], isLoggedIn: false });
  };
  const storeUserData = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
  };
  return (
    <AuthContext.Provider
      value={{
        user: state,
        setUser: dispatch,
        signUp,
        logIn,
        logOut,
        loginCred,
        addScore,
        setLoginCred,
        signupCred,
        setSignupCred,
        dispatchProfile,
        profile,
        getUserInfo,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
