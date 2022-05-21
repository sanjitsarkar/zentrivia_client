import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from ".";
import { useQuestion } from "../hooks";
import { initialQuestionState } from "../utils";
import Option from "./Option";

const UpdateQuestionForm = ({ question, toggleModal }) => {
  const { id: quizId } = useParams();
  const { updateQuestion } = useQuestion();
  const [loading, setLoading] = useState(false);
  const [questionInfo, setQuestionInfo] = useState(question);
  useEffect(() => {
    setQuestionInfo({ ...questionInfo, quizId });
  }, []);

  return (
    <form
      className="p-3 modal-form text-dark bg-light"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await updateQuestion(question._id, questionInfo);
        setQuestionInfo(initialQuestionState);
        toggleModal();
        setLoading(false);
      }}
    >
      <label className="text-2xl mb-2 block text-center  font-normal">
        Update Question
      </label>
      <div className="col gap-1 mb-2">
        <div className="col gap-1">
          <label htmlFor="question-title">Question title</label>
          <input
            type="text"
            placeholder="Enter question title"
            className="input"
            id="question-title"
            defaultValue={questionInfo.title}
            onChange={(e) =>
              setQuestionInfo({ ...questionInfo, title: e.target.value })
            }
            required
          />
        </div>

        <div className="col gap-2 w-full">
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
        {loading ? <Loader isButtonLoader={true} /> : "Update"}
      </button>
    </form>
  );
};

export default UpdateQuestionForm;
