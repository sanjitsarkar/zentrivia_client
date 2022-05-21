import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout, Loader, NotAvailable, QuizCard } from "../../components";
import { useQuiz } from "../../hooks";

const SearchedQuizPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  console.log("search", search);
  const { searchQuizzes, quizzes } = useQuiz();
  useEffect(() => {
    searchQuizzes(search);
  }, [search]);
  return (
    <Layout>
      <main className="col items-center mt-4">
        <h1 className="text-3xl text-bold mb-3  text-center">
          {quizzes.data.length} Quiz{quizzes.data.length > 1 && "zes"} found for{" "}
          <span className="text-primary">{search}</span>
        </h1>
        {quizzes.loading && <Loader />}
        <div className="col gap-2 justify-center mb-4">
          {!quizzes.loading &&
            quizzes.data.length > 0 &&
            quizzes.data.map((quiz) => <QuizCard quiz={quiz} key={quiz._id} />)}
          {!quizzes.loading && quizzes.data.length === 0 && <NotAvailable />}
        </div>
      </main>
    </Layout>
  );
};

export default SearchedQuizPage;
