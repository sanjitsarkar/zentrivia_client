import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useQuiz } from "../hooks";
import { notify, QUIZ_COVER_PLACEHOLDER } from "../utils";
import Modal from "./Modal";
import UpdateQuizForm from "./UpdateQuizForm";

const QuizCard = ({ quiz, type }) => {
  let title = quiz.title;
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const { setActiveQuiz, deleteQuiz } = useQuiz();
  return (
    <>
      {type === "user" && (
        <Modal showModal={showModal} toggleModal={toggleModal}>
          <UpdateQuizForm quiz={quiz} toggleModal={toggleModal} />
        </Modal>
      )}
      <div className="quiz-card z-5 row  gap-1  text-light p-2 br-sm relative">
        {type === "user" && (
          <div className="row gap-1 absolute text-white t-2 r-2">
            <i
              onClick={async () => {
                await deleteQuiz(quiz._id);
              }}
              className="cursor-pointer  fa fa-trash  bg-error text-light grid place-content-center bx-sh-3 img-rounded w-8 h-8"
            />
            <i
              onClick={() => {
                toggleModal();
              }}
              className="cursor-pointer  fa fa-edit  bg-primary text-light grid place-content-center bx-sh-3 img-rounded w-8 h-8"
            />
          </div>
        )}
        <img
          className="w-40 br-sm h-full "
          src={quiz?.quizCoverImage ?? QUIZ_COVER_PLACEHOLDER}
          alt={quiz.title.substring(10)}
        />
        <div className="col  gap-1 h-full  quiz-card-bottom justify-center ">
          <h1 className="text-xl font-medium text-left">{title}</h1>
          <div className="row bottom-quiz-info items-center ">
            {type !== "user" ? (
              <button
                className="quiz-play-button  pl-3 text-dark text-md pr-3 "
                onClick={() => {
                  if (!isLoggedIn) {
                    notify("You must be logged in to play a quiz", "error");
                    navigate("/login");
                  } else if (quiz.totalQuestion === 0) {
                    notify("There's no any question", "error");
                  } else {
                    setActiveQuiz(quiz.title);
                    navigate(`/rules/${quiz._id}`);
                  }
                }}
              >
                Play
              </button>
            ) : (
              <Link
                to={`/profile/user/quizzes/${quiz._id}`}
                className="quiz-play-button  pl-3 text-dark  text-md pr-3 "
              >
                Add Questions
              </Link>
            )}
            <div className="row quiz-bottom-bar ">
              <span>
                {quiz.totalQuestion} question
                {quiz.totalQuestion > 1 && "s"}
              </span>
              <span>
                {quiz.totalPlayedUser} player
                {quiz.totalPlayedUser > 1 && "s"} played
              </span>
              <span
                className={`p-05 quiz-difficulty pl-2 br-sm pr-2 text-sm text-light ${
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
    </>
  );
};

export default QuizCard;
