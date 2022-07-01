import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout, Loader, NotAvailable, QuizCard } from "../../components";
import { useQuiz } from "../../context";

const SearchedQuizPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const { searchQuizzes, quizzes } = useQuiz();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      await searchQuizzes(search);
      setLoading(false);
    })();
  }, [search]);
  return (
    <Layout>
      <main className="col items-center mt-4">
        <h1 className="text-3xl text-bold mb-3  text-center">
          {!loading && quizzes.data.length} Quiz
          {quizzes.data.length > 1 && "zes"} found for{" "}
          <span className="text-primary">{search}</span>
        </h1>
        {loading && <Loader />}
        <div className="col gap-2 justify-center mb-4">
          {!loading &&
            quizzes.data.length > 0 &&
            quizzes.data.map((quiz) => <QuizCard quiz={quiz} key={quiz._id} />)}
          {!loading && quizzes.data.length === 0 && <NotAvailable />}
        </div>
      </main>
    </Layout>
  );
};

export default SearchedQuizPage;
