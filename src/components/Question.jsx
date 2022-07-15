import React, { useState } from "react";
import { useQuestion } from "../context";
import Modal from "./Modal";
import UpdateQuestionForm from "./UpdateQuestionForm";

const Question = ({ question, i, type, quizId }) => {
  const { wrongQuestions, deleteQuestion } = useQuestion();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const isWrongOption = (wrongOptionId) => {
    return (
      wrongQuestions.findIndex(
        (wrongQuestion) => wrongQuestion.optionId === wrongOptionId
      ) !== -1
    );
  };
  return (
    <div className="col gap-1 p-2">
      {type === "user" && (
        <Modal showModal={showModal} toggleModal={setShowModal}>
          <UpdateQuestionForm question={question} toggleModal={toggleModal} />
        </Modal>
      )}
      <div className="row gap-4 items-center">
        <div className="row gap-1 items-center">
          <h3 className="text-light text-medium font-normal">
            Q{i + 1}. {question.title}
          </h3>
          {type === "user" && (
            <div className="row gap-1 z-5 items-center">
              <i
                onClick={async () => {
                  await deleteQuestion(quizId, question._id);
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
        </div>
      </div>
      <div className="col options gap-1 ">
        {question.options.map((option) => (
          <button
            key={option._id}
            className={`btn  ${
              isWrongOption(option._id) ? "btn-error" : ""
            }  btn-${option.isCorrect ? "success" : "light"} 
                     option-button`}
          >
            {option.value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
