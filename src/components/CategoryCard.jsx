import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCategory } from "../hooks";
import { CATEGORY_COVER_PLACEHOLDER } from "../utils";
import Modal from "./Modal";
import UpdateCategoryForm from "./UpdateCategoryForm";

const CategoryCard = ({ category, type }) => {
  const { setActiveCategory, deleteCategory } = useCategory();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  return (
    <>
      {type === "user" && (
        <Modal showModal={showModal} toggleModal={toggleModal}>
          <UpdateCategoryForm toggleModal={toggleModal} category={category} />
        </Modal>
      )}
      <div className="card category-card z-1">
        {type === "user" && (
          <div
            className="row gap-1 absolute  t-2 r-2 text-white"
            style={{ zIndex: 1 }}
          >
            <i
              onClick={async () => {
                await deleteCategory(category._id);
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
        <div className="card-header">
          <img
            src={category.img ?? CATEGORY_COVER_PLACEHOLDER}
            alt={category.name}
            style={{ objectFit: "cover" }}
            className="img h-40  w-full"
          />
        </div>
        <div className="card-bottom">
          <div className="card-body">
            <div className="card-title">{category.name}</div>
          </div>
          <div className="card-footer">
            {type === "user" ? (
              <Link
                to={`/profile/user/categories/${category._id}/quizzes`}
                className="w-full"
                onClick={() => setActiveCategory(category.name)}
              >
                <button className="btn btn-dark w-full category-button">
                  View Quizzes
                </button>
              </Link>
            ) : (
              <Link
                to={`/quizzes/${category._id}`}
                className="w-full"
                onClick={() => setActiveCategory(category.name)}
              >
                <button className="btn btn-dark w-full category-button">
                  Exlore Quizzes
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
