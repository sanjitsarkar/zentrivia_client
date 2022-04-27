import React from "react";
import { useQuestion } from "../../hooks";

const Question = ({ question, i }) => {
  const { wrongQuestions } = useQuestion();
  const isWrongOption = (wrongOptionId) => {
    return (
      wrongQuestions.findIndex(
        (wrongQuestion) => wrongQuestion.optionId === wrongOptionId
      ) !== -1
    );
  };
  return (
    <div className="col gap-1">
      <h3 className="text-light text-medium font-normal">
        Q{i + 1}. {question.title}
      </h3>
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
