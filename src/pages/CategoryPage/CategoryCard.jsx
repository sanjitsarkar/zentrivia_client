import React from "react";
import { Link } from "react-router-dom";
import { useCategory } from "../../hooks";

const CategoryCard = ({ category }) => {
  const { setActiveCategory } = useCategory();
  return (
    <div className="card category-card">
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
            onClick={() => setActiveCategory(category.name)}
          >
            <button className="btn btn-dark w-full category-button">
              Exlore Quizzes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
