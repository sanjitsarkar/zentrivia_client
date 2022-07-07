import React, { createContext, useContext, useReducer, useState } from "react";
import { initialState, reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  callApi,
  formatError,
  notify,
} from "../utils";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [activeQuiz, setActiveQuiz] = useState("");
  const [quizzes, dispatchQuizzes] = useReducer(reducer, initialState);
  const [yourQuizzes, dispatchYourQuizzes] = useReducer(reducer, initialState);
  const [quizInfo, dispatchQuizInfo] = useReducer(reducer, initialState);

  const fetchQuizzes = async (skip = 0, difficulty) => {
    dispatchQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi(
        "get",
        `quizzes/?skip=${skip}&difficulty=${difficulty}`,
        false
      );
      dispatchQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: [...quizzes, ...result.data.quizzes],
      });
    } catch (err) {
      dispatchQuizzes({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const fetchQuizzesByCategoryId = async (id, skip = 0, difficulty) => {
    dispatchQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi(
        "get",
        `categories/${id}/quizzes?skip=${skip}&difficulty=${difficulty}`,
        false
      );
      dispatchQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: [...quizzes, ...result.data.quizzes],
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
    dispatchYourQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("post", "quizzes", false, quiz);
      notify("Quiz added successfully");
      dispatchYourQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: [result.data.quiz, ...yourQuizzes.data],
      });
    } catch (err) {
      if (formatError(err).includes("duplicate key")) {
        notify("Quiz with this title already exists", "error");
      }
      dispatchYourQuizzes({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };

  const deleteQuiz = async (quizId) => {
    dispatchYourQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      await callApi("delete", `quizzes/${quizId}`, false);
      notify("Quiz deleted successfully");
      dispatchYourQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: yourQuizzes.data.filter((quiz) => quiz._id !== quizId),
      });
    } catch (err) {
      dispatchYourQuizzes({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const updateQuiz = async (quizId, quiz) => {
    dispatchYourQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("put", `quizzes/${quizId}`, false, quiz);
      notify("Quiz updated successfully");
      dispatchYourQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: yourQuizzes.data.map((quiz) =>
          quiz._id === quizId ? result.data.quiz : quiz
        ),
      });
    } catch (err) {
      if (formatError(err).includes("duplicate key")) {
        notify("Quiz with this title already exists", "error");
      }
      dispatchYourQuizzes({
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
  const fetchYourQuizzesByCategoryId = async (categoryId) => {
    dispatchYourQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi(
        "get",
        `categories/${categoryId}/quizzes`,
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
        fetchYourQuizzesByCategoryId,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => useContext(QuizContext);
export { useQuiz, QuizProvider };
