import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <div className="card w-60 bg-primary">
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
          <Link to="/categories" className="w-full">
            <button className="btn btn-dark w-full">Play</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
