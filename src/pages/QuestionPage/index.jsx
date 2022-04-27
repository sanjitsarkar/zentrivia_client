import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Loader, NotAvailable } from "../../components";
import { useQuestion, useQuiz } from "../../hooks";
import "./QuestionPage.css";

const QuestionPage = () => {
  const navigate = useNavigate();
  const { questions, fetchQuestions, isQuestionIsOfQuizId } = useQuestion();
  const {
    activeQuiz,
    setActiveQuiz,
    clearQuizInfo,
    fetchQuizInfo,
    quizInfo,
    isQuizInfoIsOfQuizId,
  } = useQuiz();
  const location = useLocation();

  let pathName = location.pathname.split("/");
  let quizId = pathName[pathName.length - 2];

  const [activeQuestionNo, setActiveQuestionNo] = useState(0);
  const [optionStateColor, setOptionColor] = useState("light");
  const [score, setScore] = useState(0);
  const [activeOption, setActiveOption] = useState(-1);
  const timeRef = useRef();
  const [timeLeft, setTimeLeft] = useState(15000);
  const questionRef = useRef(null);

  const scrollToQuestion = () => {
    questionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOptionClick = (option, i) => {
    {
      setOptionColor("success");
      if (option.isCorrect) {
        switch (activeOption.quizDifficulty) {
          case "Easy": {
            setScore((prevScore) => prevScore + 5);
            break;
          }
          case "Medium": {
            setScore((prevScore) => prevScore + 10);
            break;
          }
          case "Hard": {
            setScore((prevScore) => prevScore + 15000);
            break;
          }
        }
      } else setActiveOption(i);

      setTimeout(() => {
        setTimeLeft(15000000);
        clearInterval(timeRef.current);

        if (activeQuestionNo < questions.data.length - 1) {
          setOptionColor("light");
          setActiveOption(-1);
          setActiveQuestionNo(
            (prevActiveQuestionNo) => prevActiveQuestionNo + 1
          );
        }

        if (activeQuestionNo === questions.data.length - 1) {
          navigate("/result");
        }
      }, 1000);
    }
  };

  useEffect(() => {
    clearInterval(timeRef.current);

    timeRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(timeRef.current);
    };
  }, [activeQuestionNo, timeLeft]);

  useEffect(() => {
    if (questions.data.length === 0 || !isQuestionIsOfQuizId(questions, quizId))
      fetchQuestions(quizId);
  }, [quizId]);

  useEffect(() => {
    if (quizInfo.data.length === 0 || !isQuizInfoIsOfQuizId(quizInfo, quizId))
      fetchQuizInfo(quizId);
    clearQuizInfo();
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
        setActiveQuestionNo((prevActiveQuestionNo) => prevActiveQuestionNo + 1);
      } else {
        navigate("/result");
      }

      setTimeLeft(15000);
      clearInterval(timeRef.current);
    }
  }, [timeLeft]);

  useEffect(() => {
    scrollToQuestion();
  }, [questionRef, activeQuestionNo]);

  return (
    <Layout>
      <section className="question-section w-5-6 text-light mt-4 mb-3">
        {questions.loading && <Loader />}
        {!questions.loading && questions.data.length > 0 && (
          <>
            <h1 className="text-3xl text-bold mb-3  text-primary">
              {activeQuiz.title}
            </h1>
            <div className="col gap-2 ">
              <div className="row justify-between items-center gap-05">
                <h3 className="text-xl ">
                  Question:{" "}
                  <span className="text-medium  text-primary ml-05">
                    {activeQuestionNo + 1}/{questions.data.length}
                  </span>
                </h3>
                <div className="row gap-1">
                  <h3 className="text-xl " ref={timeRef}>
                    Time Left:
                    <span className="text-medium  text-primary ml-05">
                      {timeLeft} Second{timeLeft > 1 && "s"}
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
                <h3 className="text-light text-2xl font-medium">
                  {questions.data[activeQuestionNo].title}
                </h3>
                <div className="col options gap-1 mt-2" ref={questionRef}>
                  {questions.data[activeQuestionNo].options.map((option, i) => (
                    <button
                      className={`btn  ${
                        activeOption === i && !option.isCorrect
                          ? "btn-error"
                          : ""
                      }  btn-${option.isCorrect ? optionStateColor : "light"} 
                     option-button`}
                      key={option.value}
                      onClick={() => handleOptionClick(option, i)}
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
