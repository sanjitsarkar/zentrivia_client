import { createContext, useContext, useReducer, useState } from "react";
import { initialState, reducer } from "../reducers/reducer";
import { InitialStateType } from "../types";
import { Question } from "../types/Quiz";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  callApi,
  formatError,
  notify
} from "../utils";

const QuestionContext = createContext(null);

const QuestionProvider = ({ children }:any) => {
  const [activeQuestion, setActiveQuestion] = useState("");


  const [questions, dispatchQuestions] = useReducer<any>(reducer, initialState) as [InitialStateType, any];
  const [wrongQuestions, setWrongQuestions] = useState([]);

  const [questionInfo, dispatchQuestionInfo] = useReducer<any>(
    reducer,
    initialState
  ) as [InitialStateType, any];

  const fetchQuestions = async (quizId:String) => {
    dispatchQuestions({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("get", `quizzes/${quizId}/questions`, false);
      dispatchQuestions({
        type: ACTION_TYPE_SUCCESS,
        payload: result?.data.questions as Question[],
      });
    } catch (err) {
      dispatchQuestions({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };

  const fetchQuestionInfo = async (questionId:String) => {
    dispatchQuestionInfo({ type: ACTION_TYPE_LOADING });

    try {
      const result = await callApi("get", `questions/${questionId}`, false);
      dispatchQuestionInfo({
        type: ACTION_TYPE_SUCCESS,
        payload: result?.data.question as Question,
      });
    } catch (err) {
      dispatchQuestionInfo({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const addQuestion = async (question:Question) => {
    dispatchQuestions({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("post", "questions", false, question);
      notify("Question added successfully");
      dispatchQuestions({
        type: ACTION_TYPE_SUCCESS,
        payload: [result?.data.question, ...questions.data || []] ,
      });
    } catch (err) {
      if (formatError(err).includes("duplicate key")) {
        notify("Question with this title already exists", "error");
      }
      dispatchQuestions({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };

  const deleteQuestion = async (quizId:String, questionId:String) => {
    dispatchQuestions({ type: ACTION_TYPE_LOADING });
    try {
      notify("Question deleted successfully");
      await callApi("delete", `questions/${questionId}/${quizId}`, false);
      dispatchQuestions({
        type: ACTION_TYPE_SUCCESS,
        payload: questions.data.filter(
          (question:any) => question._id !== questionId
        ),
      });
    } catch (err) {
      dispatchQuestions({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const updateQuestion = async (questionId:String, question:Question) => {
    dispatchQuestions({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi(
        "put",
        `questions/${questionId}`,
        false,
        question
      );
      notify("Question updated successfully");
      dispatchQuestions({
        type: ACTION_TYPE_SUCCESS,
        payload: questions?.data.map((question:any):Question => 
        {
         return  question._id === questionId? result?.data.question : question} 
        ) 
      });
    } catch (err) {
      if (formatError(err).includes("duplicate key")) {
        notify("Question with this title already exists", "error");
      }
      dispatchQuestions({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const isQuestionIsOfquizId = (questions:any, quizId:String) => {
    return questions?.data?.some(
      (question:Question) => question?.quizId === quizId
    ) 
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
        isQuestionIsOfquizId,
        wrongQuestions,
        setWrongQuestions,
      }} 
    >
      {children}
    </QuestionContext.Provider>
  );
};

const useQuestion = () => useContext(QuestionContext);
export { useQuestion, QuestionProvider };
