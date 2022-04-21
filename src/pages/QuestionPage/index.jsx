import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import NotAvailable from "../../components/NotAvailable";
import { useQuestion } from "../../context/QuestionContext";
import { useQuiz } from "../../context/QuizContext";

const QuestionPage = () => {
  const { questions, fetchQuestions } = useQuestion();
  const { activeQuiz, setActiveQuiz, clearQuizInfo, fetchQuizInfo, quizInfo } =
    useQuiz();
  const location = useLocation();
  let pathName = location.pathname.split("/");
  let quizId = pathName[pathName.length - 2];
  const [activeQuestionNo, setActiveQuestionNo] = useState(0);
  const [optionStateColor, setOptionColor] = useState("light");
  const [score, setScore] = useState(0);
  const [activeOption, setActiveOption] = useState(-1);
  const [timer, setTimer] = useState();
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    clearInterval(timer);
    setTimer(
      setInterval(() => {
        timeLeft > 0 && setTimeLeft(timeLeft - 1);
      }, 1000)
    );
  }, [activeQuestionNo]);
  useEffect(() => {
    fetchQuestions(quizId);
  }, [quizId]);

  useEffect(() => {
    fetchQuizInfo(quizId);

    clearQuizInfo();
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!quizInfo.loading && quizInfo.data.length !== 0) {
      setActiveQuiz(quizInfo.data);
    }
  }, [quizInfo]);
  useEffect(() => {
    if (timeLeft === 0) {
      if (activeQuestionNo < questions.data.length - 1) {
        setOptionColor("light");
        setActiveOption(-1);
        setActiveQuestionNo(activeQuestionNo + 1);
      }
      clearInterval(timer);
    }
  }, [timeLeft]);
  return (
    <Layout>
      <section className="question-section w-5-6 text-light mt-5">
        {questions.loading && <Loader />}
        {!questions.loading && questions.data.length > 0 && (
          <>
            <h1 className="text-3xl text-bold mb-4 text-center text-primary">
              {activeQuiz.title}
            </h1>
            <div className="col gap-2">
              <div className="row justify-between items-center">
                <h3 className="text-xl ">
                  Question:{" "}
                  <span className="text-medium  text-primary ml-05">
                    {activeQuestionNo + 1}/{questions.data.length}
                  </span>
                </h3>
                <div className="row gap-1">
                  <h3 className="text-xl ">
                    Time Left:
                    <span className="text-medium  text-primary ml-05">
                      {timeLeft} Seconds
                    </span>
                  </h3>
                  <h3 className="text-xl ">
                    Score:
                    <span className="text-medium  text-primary ml-05">
                      {score}
                    </span>
                  </h3>
                </div>
              </div>
              <div className="col gap-1">
                <h3 className="text-light text-medium font-normal">
                  {questions.data[activeQuestionNo].title}
                </h3>
                <div className="col options gap-1 ">
                  {questions.data[activeQuestionNo].options.map((option, i) => (
                    <button
                      className={`btn  ${
                        activeOption === i && !option.isCorrect
                          ? "btn-error"
                          : ""
                      }  btn-${option.isCorrect ? optionStateColor : "light"} 
                     `}
                      key={option.value}
                      onClick={() => {
                        setOptionColor("success");
                        if (option.isCorrect) {
                          if (activeQuiz.quizDifficulty === "Easy") {
                            setScore(score + 5);
                          } else if (activeQuiz.quizDifficulty === "Medium") {
                            setScore(score + 10);
                          } else if (activeQuiz.quizDifficulty === "Hard") {
                            setScore(score + 15);
                          }
                        } else setActiveOption(i);
                        setTimeout(() => {
                          if (activeQuestionNo < questions.data.length - 1) {
                            setOptionColor("light");
                            setActiveOption(-1);
                            setActiveQuestionNo(activeQuestionNo + 1);
                          }
                          if (activeQuestionNo === questions.data.length - 1) {
                            alert("Quiz is over");
                          }
                        }, 1000);
                      }}
                    >
                      {option.value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {!questions.loading && questions.data.length === 0 && (
          <NotAvailable title="There is no any question" />
        )}
      </section>
    </Layout>
  );
};

export default QuestionPage;
