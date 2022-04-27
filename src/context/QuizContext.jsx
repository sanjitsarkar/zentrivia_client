import React, { createContext, useContext, useReducer, useState } from "react";
import { useApi } from "../hooks/useApi";
import { initialState, reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  formatError,
} from "../utils";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [activeQuiz, setActiveQuiz] = useState("");
  const [quizzes, dispatchQuizzes] = useReducer(reducer, initialState);
  const [yourQuizzes, dispatchYourQuizzes] = useReducer(reducer, initialState);
  const [quizInfo, dispatchQuizInfo] = useReducer(reducer, initialState);
  const { callApi } = useApi();
  const fetchQuizzes = async () => {
    dispatchQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("get", "quizzes", false);
      dispatchQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.quizzes,
      });
    } catch (err) {
      dispatchQuizzes({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const fetchQuizzesByCategoryId = async (id) => {
    dispatchQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("get", `categories/${id}/quizzes`, false);
      dispatchQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.quizzes,
      });
    } catch (err) {
      dispatchQuizzes({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const fetchQuizInfo = async (quizId) => {
    dispatchQuizInfo({ type: ACTION_TYPE_LOADING });

    try {
      const result = await callApi("get", `quizzes/${quizId}`, false);
      dispatchQuizInfo({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.quiz,
      });
    } catch (err) {
      dispatchQuizInfo({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const addQuiz = async (quiz) => {
    dispatchQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("post", "quizzes", false, quiz);
      dispatchQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: [...quizzes.payload, result.data.quiz],
      });
    } catch (err) {
      dispatchQuizzes({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };

  const deleteQuiz = async (quizId) => {
    dispatchQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      await callApi("delete", `quizzes/${quizId}`, false);
      dispatchQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: quizzes.payload.filter((quiz) => quiz.id !== quizId),
      });
    } catch (err) {
      dispatchQuizzes({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const updateQuiz = async (quizId, quiz) => {
    dispatchQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("put", `quizzes/${quizId}`, false, quiz);
      dispatchQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: quizzes.payload.map((quiz) =>
          quiz.id === quizId ? result.data.Quiz : quiz
        ),
      });
    } catch (err) {
      dispatchQuizzes({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const fetchYourQuizzes = async () => {
    dispatchYourQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("get", "user/quizzes", true);
      dispatchYourQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.quizzes,
      });
    } catch (err) {
      dispatchYourQuizzes({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const searchYourQuizzes = async (search) => {
    dispatchYourQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi(
        "get",
        `user/quizzes?search=${search}`,
        true
      );
      dispatchYourQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.quizzes,
      });
    } catch (err) {
      dispatchYourQuizzes({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const searchQuizzes = async (search) => {
    dispatchQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      dispatchQuizzes({ type: ACTION_TYPE_SUCCESS, payload: [] });
      const result = await callApi("get", `quizzes?search=${search}`, false);
      dispatchQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.quizzes,
      });
    } catch (err) {
      dispatchQuizzes({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const clearQuizInfo = () => {
    dispatchQuizInfo({
      type: ACTION_TYPE_SUCCESS,
      payload: [],
    });
  };
  const isQuizInfoIsOfQuizId = (quizInfo, quizId) => {
    return quizInfo["_id"] === quizId;
  };
  return (
    <QuizContext.Provider
      value={{
        quizzes,
        dispatchQuizzes,
        activeQuiz,
        setActiveQuiz,
        fetchQuizzes,
        fetchQuizInfo,
        addQuiz,
        deleteQuiz,
        updateQuiz,
        fetchYourQuizzes,
        searchYourQuizzes,
        searchQuizzes,
        yourQuizzes,
        dispatchYourQuizzes,
        quizInfo,
        dispatchQuizInfo,
        fetchQuizzesByCategoryId,
        clearQuizInfo,
        isQuizInfoIsOfQuizId,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => useContext(QuizContext);
export { useQuiz, QuizProvider };
