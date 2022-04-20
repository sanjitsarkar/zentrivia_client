import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import NotAvailable from "../../components/NotAvailable";
import { useQuiz } from "../../context/QuizContext";
import QuizCard from "./QuizCard";

const QuizPage = () => {
  const { quizzes, activeQuiz, fetchQuizzesByCategoryId } = useQuiz();
  const location = useLocation();
  useEffect(() => {
    let pathName = location.pathname.split("/");
    let categoryId = pathName[pathName.length - 1];
    fetchQuizzesByCategoryId(categoryId);
  }, [location]);
  return (
    <Layout>
      <main className="col items-center mt-4">
        <h1 className="text-3xl text-bold mb-3  text-center">
          Quizzes on <span className="text-primary">{activeQuiz}</span>
        </h1>
        {quizzes.loading && <Loader />}
        <div className="col gap-2 justify-center mb-4">
          {!quizzes.loading &&
            quizzes.data.length > 0 &&
            quizzes.data.map((quiz) => <QuizCard quiz={quiz} key={quiz._id} />)}
          {!quizzes.loading && quizzes.data.length === 0 && (
            <NotAvailable title="Quiz is empty" />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default QuizPage;
