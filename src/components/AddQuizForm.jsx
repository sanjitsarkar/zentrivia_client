import React, { useEffect, useState } from "react";
import { useCategory, useQuiz } from "../hooks";
import { initialQuizState, uploadImages } from "../utils";
import Loader from "./Loader";

const AddQuizForm = ({ toggleModal }) => {
  const { addQuiz } = useQuiz();
  const { fetchCategories, categories } = useCategory();
  const [quizCoverImage, setQuizCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [quizInfo, setQuizInfo] = useState(initialQuizState);

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <form
      className="p-3  text-dark bg-light"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        if (quizCoverImage) {
          const urls = await uploadImages([quizCoverImage]);

          const _quizInfo = {
            ...quizInfo,
            quizCoverImage: urls[0],
          };

          await addQuiz(_quizInfo);
        } else {
          await addQuiz(quizInfo);
        }
        setQuizInfo(initialQuizState);
        setLoading(false);
        toggleModal();
      }}
    >
      <label className="text-2xl mb-2 block text-center  font-normal">
        Add Quiz
      </label>
      <div className="col gap-1 mb-2">
        <div className="col gap-1">
          <label htmlFor="quiz-title">Quiz title</label>
          <input
            type="text"
            placeholder="Enter quiz title"
            className="input"
            id="quiz-title"
            value={quizInfo.title}
            onChange={(e) =>
              setQuizInfo({ ...quizInfo, title: e.target.value })
            }
            required
          />
        </div>
        <div className="col gap-1">
          <label htmlFor="quiz-description">Quiz description</label>
          <textarea
            type="text"
            placeholder="Enter quiz description (optional)"
            className="input"
            id="quiz-description"
            value={quizInfo.quizDesc}
            onChange={(e) =>
              setQuizInfo({ ...quizInfo, quizDesc: e.target.value })
            }
          />
        </div>
        <div className="col gap-1">
          <label htmlFor="category">Choose quiz category</label>
          <select
            className="input cursor-pointer"
            id="category"
            value={quizInfo.categoryId}
            required
            onChange={(e) =>
              setQuizInfo({ ...quizInfo, categoryId: e.target.value })
            }
          >
            <option value="" className="cursor-pointer">
              Select quiz category
            </option>

            {categories.data.map((category) => (
              <option
                key={category._id}
                value={category._id}
                className="cursor-pointer"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col gap-1">
          <label htmlFor="difficulty">Choose quiz difficulty</label>
          <select
            className="input cursor-pointer"
            id="difficulty"
            value={quizInfo.quizDifficulty}
            required
            onChange={(e) =>
              setQuizInfo({ ...quizInfo, quizDifficulty: e.target.value })
            }
          >
            <option value="" className="cursor-pointer">
              Select quiz difficulty
            </option>
            <option value="Easy" className="cursor-pointer">
              Easy
            </option>
            <option value="Medium" className="cursor-pointer">
              Medium
            </option>
            <option value="Hard" className="cursor-pointer">
              Hard
            </option>
          </select>
        </div>
        <div className="col gap-1">
          {quizCoverImage && (
            <div className="relative w-fit">
              <i
                onClick={() => {
                  setQuizCoverImage(null);
                }}
                className="cursor-pointer absolute fa fa-close r-0 t-0 bg-error text-light grid place-content-center bx-sh-3 img-rounded w-8 h-8"
              />
              <img
                src={URL.createObjectURL(quizCoverImage)}
                alt="quizoverImage"
                className="object-cover"
              />
            </div>
          )}
          <label
            htmlFor="coverImage"
            className="cursor-pointer flex items-center bg-primary p-2 text-light"
          >
            <i className="fa fa-image mr-1" />
            {quizCoverImage ? "Change " : "Choose "}quiz cover photo
          </label>
          <input
            id="coverImage"
            className="hidden "
            type="file"
            accept="image/*"
            multiple={false}
            onChange={(e) => {
              setQuizCoverImage(e.target.files[0]);
            }}
          />
        </div>
      </div>
      <button className="btn btn-dark w-full text-lg mb-2" disabled={loading}>
        {loading ? <Loader isButtonLoader={true} /> : "Add"}
      </button>
    </form>
  );
};

export default AddQuizForm;
