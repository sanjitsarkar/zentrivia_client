import React from "react";

const Option = ({ i, setQuestionInfo, questionInfo }) => {
  return (
    <div className="row gap-1 items-center">
      <label htmlFor="option">Option {i + 1}</label>
      <input
        type="text"
        placeholder={`Enter Option ${i + 1}`}
        className="input w-full"
        id="option"
        defaultValue={questionInfo.options[i].value}
        onChange={(e) => {
          let _question = questionInfo;
          _question.options[i].value = e.target.value;
          setQuestionInfo(_question);
        }}
        required
      />
      <label className="radio-container ">
        Correct
        <input
          required
          type="radio"
          name="option"
          checked={questionInfo.options[i].isCorrect}
          onChange={() => {
            let options = questionInfo.options.map((option, index) => {
              if (index === i) return { ...option, isCorrect: true };
              return { ...option, isCorrect: false };
            });

            setQuestionInfo({ ...questionInfo, options });
          }}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default Option;
