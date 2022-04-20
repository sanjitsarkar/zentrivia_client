import React, {
  useState,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
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
  const [activeQuiz, setActiveQuiz] = useState("All");
  const [quizzes, dispatchQuizzes] = useReducer(reducer, initialState);
  const [yourQuizzes, dispatchYourQuizzes] = useReducer(reducer, initialState);
  const [QuizInfo, dispatchQuizInfo] = useReducer(reducer, initialState);
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
  const fetchQuizInfo = async (QuizId) => {
    dispatchQuizInfo({ type: ACTION_TYPE_LOADING });

    try {
      const result = await callApi("get", `quizzes/${QuizId}`, false);
      dispatchQuizInfo({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.Quiz,
      });
    } catch (err) {
      dispatchQuizInfo({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const addQuiz = async (Quiz) => {
    dispatchQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("post", "quizzes", false, Quiz);
      dispatchQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: [...quizzes.payload, result.data.Quiz],
      });
    } catch (err) {
      dispatchQuizzes({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };

  const deleteQuiz = async (QuizId) => {
    dispatchQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      await callApi("delete", `quizzes/${QuizId}`, false);
      dispatchQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: quizzes.payload.filter((Quiz) => Quiz.id !== QuizId),
      });
    } catch (err) {
      dispatchQuizzes({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const updateQuiz = async (QuizId, Quiz) => {
    dispatchQuizzes({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("put", `quizzes/${QuizId}`, false, Quiz);
      dispatchQuizzes({
        type: ACTION_TYPE_SUCCESS,
        payload: quizzes.payload.map((Quiz) =>
          Quiz.id === QuizId ? result.data.Quiz : Quiz
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
        QuizInfo,
        dispatchQuizInfo,
        fetchQuizzesByCategoryId,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => useContext(QuizContext);
export { useQuiz, QuizProvider };
