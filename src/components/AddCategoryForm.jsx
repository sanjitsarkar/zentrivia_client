import React, { useState } from "react";
import { useCategory } from "../hooks";
import { initialCategoryState, uploadImages } from "../utils";
import Loader from "./Loader";

const AddCategoryForm = ({ toggleModal }) => {
  const { addCategory } = useCategory();
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState(initialCategoryState);

  return (
    <form
      className="p-3 modal-form text-dark bg-light"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        if (img) {
          const urls = await uploadImages([img]);

          const _categoryInfo = {
            ...categoryInfo,
            img: urls[0],
          };
          await addCategory(_categoryInfo);
        } else {
          const _categoryInfo = {
            ...categoryInfo,
            img: undefined,
          };
          await addCategory(_categoryInfo);
        }
        setCategoryInfo(initialCategoryState);
        setLoading(false);
        toggleModal();
      }}
    >
      <label className="text-2xl mb-2 block text-center  font-normal">
        Add Category
      </label>
      <div className="col gap-1 mb-2">
        <div className="col gap-1">
          <label htmlFor="category-title">Category title</label>
          <input
            type="text"
            placeholder="Enter category title"
            className="input"
            id="category-title"
            value={categoryInfo.name}
            onChange={(e) =>
              setCategoryInfo({ ...categoryInfo, name: e.target.value })
            }
            required
          />
        </div>
        <div className="col gap-1">
          <label htmlFor="category-description">Category description</label>
          <textarea
            type="text"
            placeholder="Enter category description (optional)"
            className="input"
            id="category-description"
            value={categoryInfo.description}
            onChange={(e) =>
              setCategoryInfo({ ...categoryInfo, description: e.target.value })
            }
          />
        </div>

        <div className="col gap-1">
          {img && (
            <div className="relative w-fit">
              <i
                onClick={() => {
                  setImg(null);
                }}
                className="cursor-pointer absolute fa fa-close r-0 t-0 bg-error text-light grid place-content-center bx-sh-3 img-rounded w-8 h-8"
              />
              <img
                src={URL.createObjectURL(img)}
                alt="categoryoverImage"
                className="object-cover"
              />
            </div>
          )}
          <label
            htmlFor="coverImage"
            className="cursor-pointer flex items-center bg-primary p-2 text-light"
          >
            <i className="fa fa-image mr-1" />
            {img ? "Change " : "Choose "}category cover photo
          </label>
          <input
            id="coverImage"
            className="hidden "
            type="file"
            accept="image/*"
            multiple={false}
            onChange={(e) => {
              setImg(e.target.files[0]);
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

export default AddCategoryForm;
