import React from "react";

const QuizCard = ({ quiz }) => {
  return (
    <div className="quiz-card cursor-pointer row  gap-1  text-dark-2 p-2 br-sm">
      <img
        className="w-40 br-sm h-full"
        src={quiz.quizCoverImage}
        alt={quiz.title.substring(10)}
      />
      <div className="col  gap-1 h-full  quiz-card-bottom justify-center items-center">
        <h1 className="text-xl font-medium">{quiz.title}</h1>
        <div className="row gap-2 justify-center items-center">
          <button className="quiz-play-button p-1 pl-3 text-light text-md pr-3 bg-dark">
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
              className={`p-05 pl-2 br-sm pr-2 text-sm text-light ${
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
