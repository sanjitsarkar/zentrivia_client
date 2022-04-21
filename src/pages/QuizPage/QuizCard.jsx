import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useQuiz } from "../../context/QuizContext";
import { useToast } from "../../context/ToastContext";

const QuizCard = ({ quiz }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { setToast } = useToast();
  const { setActiveQuiz } = useQuiz();
  return (
    <div className="quiz-card cursor-pointer row  gap-1  text-light p-2 br-sm">
      <img
        className="w-40 br-sm h-full"
        src={quiz.quizCoverImage}
        alt={quiz.title.substring(10)}
      />
      <div className="col  gap-1 h-full  quiz-card-bottom justify-center items-center">
        <h1 className="text-xl font-medium">{quiz.title}</h1>
        <div className="row gap-2 justify-center items-center">
          <button
            className="quiz-play-button  pl-3 text-dark text-md pr-3 "
            onClick={() => {
              if (!isLoggedIn) {
                setToast({
                  content: "You must be logged in to play a quiz",
                  type: "error",
                  show: true,
                });
              } else {
                setActiveQuiz(quiz.title);
                navigate(`/rules/${quiz._id}`);
              }
            }}
          >
            Play
          </button>
          <div className="row quiz-bottom-bar justify-center">
            <span>
              {quiz.totalQuestion} question
              {quiz.totalQuestion.length > 1 && "s"}
            </span>
            <span>
              {quiz.totalPlayedUser} player
              {quiz.totalPlayedUser.length > 1 && "s"} played
            </span>
            <span
              className={`p-05  pl-2 br-sm pr-2 text-sm text-light ${
                quiz.quizDifficulty === "Hard" ? "bg-tertiary" : ""
              } ${quiz.quizDifficulty === "Medium" ? "bg-secondary" : ""} ${
                quiz.quizDifficulty === "Easy" ? "bg-primary" : ""
              }`}
            >
              {quiz.quizDifficulty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
