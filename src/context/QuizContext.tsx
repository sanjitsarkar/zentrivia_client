import React, { createContext, useContext, useReducer, useState } from "react";
import { initialState, reducer } from "../reducers/reducer";
import {
    ACTION_TYPE_FAILURE,
    ACTION_TYPE_LOADING,
    ACTION_TYPE_SUCCESS,
    callApi,
    formatError
} from "../utils";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [activeQuiz, setActiveQuiz] = useState("");
  const [quizzes, dispatchQuizzes] = useReducer(reducer, initialState);
  const [yourQuizzes, dispatchYourQuizzes] = useReducer(reducer, initialState);
  const [quizInfo, dispatchQuizInfo] = useReducer(reducer, initialState);

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
  const fetchQuizInfo = async (quizId:String) => {
    dispatchQuizInfo({ type: ACTION_TYPE_LOADING });

    try {
      const result = await callApi("get", `quizzes/${quizId:String}`, false);
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

  const deleteQuiz = async (quizId:String) => {
    dispatchYourQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      await callApi("delete", `quizzes/${quizId:String}`, false);
      notify("Quiz deleted successfully");
      dispatchYourQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: yourQuizzes.data.filter((quiz) => quiz._id !== quizId:String),
      });
    } catch (err) {
      dispatchYourQuizzes({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const updateQuiz = async (quizId:String, quiz) => {
    dispatchYourQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("put", `quizzes/${quizId:String}`, false, quiz);
      notify("Quiz updated successfully");
      dispatchYourQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: yourQuizzes.data.map((quiz) =>
          quiz._id === quizId:String ? result.data.quiz : quiz
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
    dispatchQuizInfo( ACTION_TYPE_SUCCESS,
      payload: [],
    });
  };
  const isQuizInfoIsOfquizId:String = (quizInfo, quizId:String) => {
    return quizInfo["_id"] === quizId:String;
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
        isQuizInfoIsOfquizId:String,
        fetchYourQuizzesByCategoryId,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => useContext(QuizContext);
export { useQuiz, QuizProvider };
