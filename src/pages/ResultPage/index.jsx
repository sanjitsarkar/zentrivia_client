import React from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../../components";
import { useQuestion } from "../../hooks";
import Question from "./Question";

const ResultPage = () => {
  const { questions } = useQuestion();
  const { state } = useLocation();
  return (
    <Layout>
      {" "}
      <section className="question-section w-5-6 text-light mt-4 pb-5">
        <h1 className="text-3xl text-bold mb-3  text-primary text-center">
          {state.activeQuiz.title}
        </h1>
        <div className="row mb-3 justify-between items-center w-full">
          <h1 className="text-3xl text-bold mb-1 text-primary">Result</h1>{" "}
          <div className="col gap-2">
            <h3 className="text-xl ">
              Final Score:
              <span className="text-medium text-primary ml-05">
                {state.score} / {state.totalScore}
              </span>
            </h3>
          </div>
        </div>
        <div className="col gap-2">
          {questions.data.map((question, i) => (
            <Question question={question} i={i} key={question._id} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default ResultPage;
