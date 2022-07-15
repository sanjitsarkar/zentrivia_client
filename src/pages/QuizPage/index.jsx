import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Loader, NotAvailable } from "../../components";
import QuizCard from "../../components/QuizCard";
import { useCategory, useQuiz, useSearch } from "../../context";
import { DifficultyButton } from "./DifficultyButton";
import "./QuizPage.css";

const QuizPage = () => {
  const { quizzes, fetchQuizzesByCategoryId } = useQuiz();
  const {
    activeCategory,
    setActiveCategory,
    categoryInfo,
    fetchCategoryInfo,
    clearCategoryInfo,
  } = useCategory();
  const { id: categoryId } = useParams();
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const { skip, setSkip } = useSearch();
  useEffect(() => {
    clearCategoryInfo();
  }, []);
  useEffect(() => {
    setSkip(0);
  }, [activeCategory]);
  useEffect(() => {
    if (activeDifficulty === "All") fetchQuizzesByCategoryId(categoryId, skip);
    else {
      fetchQuizzesByCategoryId(categoryId, skip, activeDifficulty);
    }
  }, [categoryId, activeDifficulty, skip]);

  useEffect(() => {
    if (activeCategory === "") fetchCategoryInfo(categoryId);
  }, [activeCategory]);
  useEffect(() => {
    if (!categoryInfo.loading && categoryInfo.data.length !== 0) {
      setActiveCategory(categoryInfo.data.name);
    }
  }, [categoryInfo]);
  const observer = useRef();
  const loaderRef = useCallback(
    (node) => {
      if (quizzes.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSkip(quizzes.data.length);
        }
      });
      node && observer.current.observe(node);
    },
    [quizzes, activeDifficulty]
  );
  return (
    <Layout>
      <main className="col items-center mt-4 justify-center">
        <div className="row gap-025 bg-dark mb-3  flex-nowrap overflow-hidden overflow-x-scroll w-full justify-center difficulty-list">
          <DifficultyButton
            activeDifficulty={activeDifficulty}
            difficulty="All"
            setActiveDifficulty={setActiveDifficulty}
          />

          <DifficultyButton
            activeDifficulty={activeDifficulty}
            difficulty="Easy"
            setActiveDifficulty={setActiveDifficulty}
          />
          <DifficultyButton
            activeDifficulty={activeDifficulty}
            difficulty="Medium"
            setActiveDifficulty={setActiveDifficulty}
          />
          <DifficultyButton
            activeDifficulty={activeDifficulty}
            difficulty="Hard"
            setActiveDifficulty={setActiveDifficulty}
          />
        </div>
        <h1 className="text-3xl text-bold mb-3  text-center">
          {!quizzes.loading && quizzes.data.length} Quiz
          {!quizzes.loading && quizzes.data.length > 1 && "zes"} on{" "}
          <span className="text-primary">{activeCategory}</span>
        </h1>
        {quizzes.loading && <Loader />}
        <div className="col gap-2 justify-center mb-4">
          {!quizzes.loading &&
            quizzes.data.length > 0 &&
            quizzes.data.map((quiz, i) => {
              if (i === quizzes.data.length - 1)
                return <QuizCard quiz={quiz} key={quiz._id} ref={loaderRef} />;
              return <QuizCard quiz={quiz} key={quiz._id} />;
            })}
          {!quizzes.loading && quizzes.data.length === 0 && <NotAvailable />}
        </div>
      </main>
    </Layout>
  );
};

export default QuizPage;
