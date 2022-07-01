import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from ".";
import { useQuestion } from "../context";
import { initialOptionState, initialQuestionState } from "../utils";
import Option from "./Option";

const AddQuestionForm = ({ toggleModal }) => {
  const { id: quizId:String } = useParams();
  const { addQuestion } = useQuestion();
  const [loading, setLoading] = useState(false);
  const [questionInfo, setQuestionInfo] = useState(initialQuestionState);
  return (
    <form
      className="p-3 modal-form  text-dark bg-light"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await addQuestion({ ...questionInfo, quizId:String });
        initialQuestionState.options = initialOptionState;
        setQuestionInfo(initialQuestionState);
        toggleModal();
        setLoading(false);
      }}
    >
      <label className="text-2xl mb-2 block text-center  font-normal">
        Add Question
      </label>
      <div className="col gap-1 mb-2">
        <div className="col gap-1">
          <label htmlFor="question-title">Question title</label>
          <input
            type="text"
            placeholder="Enter question title"
            className="input"
            id="question-title"
            value={questionInfo.title}
            onChange={(e) =>
              setQuestionInfo({ ...questionInfo, title: e.target.value })
            }
            required
          />
        </div>

        <div className="col gap-1 w-full">
          {[...Array(4)].map((_, i) => (
            <Option
              i={i}
              key={i}
              questionInfo={questionInfo}
              setQuestionInfo={setQuestionInfo}
            />
          ))}
        </div>
      </div>
      <button className="btn btn-dark w-full text-lg mb-2" disabled={loading}>
        {loading ? <Loader isButtonLoader={true} /> : "Add"}
      </button>
    </form>
  );
};

export default AddQuestionForm;
