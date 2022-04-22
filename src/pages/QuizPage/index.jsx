import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import NotAvailable from "../../components/NotAvailable";
import { useCategory } from "../../context/CategoryContext";
import { useQuiz } from "../../context/QuizContext";
import QuizCard from "./QuizCard";

const QuizPage = () => {
  const { quizzes, fetchQuizzesByCategoryId } = useQuiz();
  const {
    activeCategory,
    setActiveCategory,
    categoryInfo,
    fetchCategoryInfo,
    clearCategoryInfo,
  } = useCategory();
  const location = useLocation();
  let pathName = location.pathname.split("/");
  let categoryId = pathName[pathName.length - 1];
  useEffect(() => {
    clearCategoryInfo();
  }, []);
  useEffect(() => {
    fetchQuizzesByCategoryId(categoryId);
  }, [location]);
  useEffect(() => {
    if (activeCategory === "") fetchCategoryInfo(categoryId);
  }, [activeCategory]);
  useEffect(() => {
    if (!categoryInfo.loading && categoryInfo.data.length !== 0) {
      setActiveCategory(categoryInfo.data.name);
    }
  }, [categoryInfo]);
  return (
    <Layout>
      <main className="col items-center mt-4">
        <h1 className="text-3xl text-bold mb-3  text-center">
          Quizzes on <span className="text-primary">{activeCategory}</span>
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
