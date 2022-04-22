import React from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";

const CategoryCard = ({ category }) => {
  const { setActiveQuiz } = useQuiz();
  return (
    <div className="card  bg-primary" id="category-card">
      <div className="card-header">
        <img
          src={category.img}
          alt={category.name}
          className="img h-40 w-full cover"
        />
      </div>
      <div className="card-bottom">
        <div className="card-body">
          <div className="card-title">{category.name}</div>
        </div>
        <div className="card-footer">
          <Link
            to={`/quizzes/${category._id}`}
            className="w-full"
            onClick={() => setActiveQuiz(category.name)}
          >
            <button className="btn btn-dark w-full">Exlore Quizzes</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
