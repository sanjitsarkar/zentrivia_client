import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Loader, NotAvailable } from "../../components";
import { useScore } from "../../context/ScoreContext";
import { useQuestion, useQuiz } from "../../hooks";
import "./QuestionPage.css";

const QuestionPage = () => {
  const navigate = useNavigate();
  const {
    questions,
    fetchQuestions,
    isQuestionIsOfQuizId,
    wrongQuestions,
    setWrongQuestions,
  } = useQuestion();
  const { addScore, fetchScoreInfo } = useScore();
  const {
    activeQuiz,
    setActiveQuiz,
    clearQuizInfo,
    fetchQuizInfo,
    quizInfo,
    isQuizInfoIsOfQuizId,
    updateQuiz,
  } = useQuiz();
  const location = useLocation();

  let pathName = location.pathname.split("/");
  let quizId = pathName[pathName.length - 2];

  const [activeQuestionNo, setActiveQuestionNo] = useState(0);
  const [optionStateColor, setOptionColor] = useState("light");
  const [score, setScore] = useState(0);
  const [activeOption, setActiveOption] = useState(-1);
  const timeRef = useRef();
  const [timeLeft, setTimeLeft] = useState(15);
  const questionRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const scrollToQuestion = () => {
    questionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const navigateToResultPage = async (_wrongQuestions, _score) => {
    setLoading(true);

    await addScore(
      _score,
      activeQuiz._id,
      _wrongQuestions.map((wrongQuestion) => wrongQuestion.questionId)
    );
    setLoading(false);

    navigate("/result", {
      state: {
        score: _score,
        totalScore: questions.data.length * points,
        activeQuiz,
      },
    });
  };
  const handleOptionClick = (option, i) => {
    {
      setIsClicked(true);

      setOptionColor("success");

      if (option.isCorrect) {
        setScore((prevScore) => prevScore + points);
      } else {
        setActiveOption(i);
        setWrongQuestions((prevWrongQuestions) => [
          ...prevWrongQuestions,
          {
            questionId: questions.data[activeQuestionNo]._id,
            optionId: option._id,
          },
        ]);
      }

      setTimeout(() => {
        setTimeLeft(15);
        clearInterval(timeRef.current);

        if (activeQuestionNo < questions.data.length - 1) {
          setOptionColor("light");
          setActiveOption(-1);
          setActiveQuestionNo(
            (prevActiveQuestionNo) => prevActiveQuestionNo + 1
          );
        }
        setIsClicked(false);
      }, 1000);

      if (activeQuestionNo === questions.data.length - 1) {
        let _score = score,
          _wrongQuestions = wrongQuestions;
        if (option.isCorrect) {
          _score += points;
        } else {
          _wrongQuestions = [
            ...wrongQuestions,
            {
              questionId: questions.data[activeQuestionNo]._id,
              optionId: option._id,
            },
          ];
        }
        (async () => {
          await navigateToResultPage(_wrongQuestions, _score);
        })();
      }
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
    setPoints(0);
    setWrongQuestions([]);
  }, []);

  useEffect(() => {
    if (!quizInfo.loading && quizInfo.data.length !== 0) {
      setActiveQuiz(quizInfo.data);
    }
  }, [quizInfo]);
  useEffect(() => {
    switch (activeQuiz.quizDifficulty) {
      case "Easy": {
        setPoints(5);
        break;
      }
      case "Medium": {
        setPoints(10);

        break;
      }
      case "Hard": {
        setPoints(15);

        break;
      }
    }
  }, [activeQuiz]);
  useEffect(() => {
    if (timeLeft === 0) {
      if (activeQuestionNo < questions.data.length - 1) {
        setWrongQuestions((prevWronQuestions) => [
          ...prevWronQuestions,
          questions.data[activeQuestionNo]._id,
        ]);
        setOptionColor("light");
        setActiveOption(-1);
        setActiveQuestionNo((prevActiveQuestionNo) => prevActiveQuestionNo + 1);
      } else {
        (async () => {
          await navigateToResultPage(wrongQuestions, score);
        })();
      }

      setTimeLeft(15);
      clearInterval(timeRef.current);
    }
  }, [timeLeft, wrongQuestions, score]);

  useEffect(() => {
    if (loading) {
      setTimeLeft(15);
      clearInterval(timeRef.current);
    }
  }, [loading]);
  useEffect(() => {
    scrollToQuestion();
  }, [questionRef, activeQuestionNo]);

  return (
    <Layout>
      <section className="question-section w-5-6 text-light mt-4 mb-3">
        {loading && (
          <h1 className="text-center mb-2 mt-5">Submitting Answers...</h1>
        )}
        {(questions.loading || loading) && <Loader />}
        {!loading && !questions.loading && questions.data.length > 0 && (
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
                      disabled={isClicked}
                      onClick={() => !isClicked && handleOptionClick(option, i)}
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
