import React, { useState, createContext, useContext, useReducer } from "react";
import { useApi } from "../hooks";
import { initialState, reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  formatError,
} from "../utils";

const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {
  const [activeQuestion, setActiveQuestion] = useState("");
  const [questions, dispatchQuestions] = useReducer(reducer, initialState);

  const [questionInfo, dispatchQuestionInfo] = useReducer(
    reducer,
    initialState
  );
  const { callApi } = useApi();
  const fetchQuestions = async (quizId) => {
    dispatchQuestions({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("get", `quizzes/${quizId}/questions`, false);
      dispatchQuestions({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.questions,
      });
    } catch (err) {
      dispatchQuestions({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };

  const fetchQuestionInfo = async (questionId) => {
    dispatchQuestionInfo({ type: ACTION_TYPE_LOADING });

    try {
      const result = await callApi("get", `questions/${questionId}`, false);
      dispatchQuestionInfo({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.Question,
      });
    } catch (err) {
      dispatchQuestionInfo({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const addQuestion = async (question) => {
    dispatchQuestions({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("post", "questions", false, question);
      dispatchQuestions({
        type: ACTION_TYPE_SUCCESS,
        payload: [...questions.payload, result.data.question],
      });
    } catch (err) {
      dispatchQuestions({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };

  const deleteQuestion = async (questionId) => {
    dispatchQuestions({ type: ACTION_TYPE_LOADING });
    try {
      await callApi("delete", `questions/${questionId}`, false);
      dispatchQuestions({
        type: ACTION_TYPE_SUCCESS,
        payload: questions.payload.filter(
          (question) => question.id !== questionId
        ),
      });
    } catch (err) {
      dispatchQuestions({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const updateQuestion = async (questionId, question) => {
    dispatchQuestions({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi(
        "put",
        `questions/${questionId}`,
        false,
        question
      );
      dispatchQuestions({
        type: ACTION_TYPE_SUCCESS,
        payload: questions.payload.map((question) =>
          question.id === questionId ? result.data.Question : question
        ),
      });
    } catch (err) {
      dispatchQuestions({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const isQuestionIsOfQuizId = (questions, quizId) => {
    return questions.data.findIndex(
      (question) => question.quizId === quizId
    ) === -1
      ? false
      : true;
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        dispatchQuestions,
        activeQuestion,
        setActiveQuestion,
        fetchQuestions,
        fetchQuestionInfo,
        addQuestion,
        deleteQuestion,
        updateQuestion,
        questionInfo,
        dispatchQuestionInfo,
        isQuestionIsOfQuizId,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

const useQuestion = () => useContext(QuestionContext);
export { useQuestion, QuestionProvider };
