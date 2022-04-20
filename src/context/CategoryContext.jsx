import axios from "axios";
import React, {
  useState,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { useApi } from "../hooks/useApi";
import { initialState, reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  formatError,
} from "../utils";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, dispatchCategories] = useReducer(reducer, initialState);
  const [yourCategories, dispatchYourCategories] = useReducer(
    reducer,
    initialState
  );
  const [categoryInfo, dispatchCategoryInfo] = useReducer(
    reducer,
    initialState
  );
  const { callApi } = useApi();
  const fetchCategories = async () => {
    dispatchCategories({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("get", "categories", false);
      dispatchCategories({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.categories,
      });
    } catch (err) {
      dispatchCategories({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const fetchCategoryInfo = async (categoryId) => {
    dispatchCategoryInfo({ type: ACTION_TYPE_LOADING });

    try {
      const result = await callApi("get", `categories/${categoryId}`, false);
      dispatchCategoryInfo({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.category,
      });
    } catch (err) {
      dispatchCategoryInfo({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const addCategory = async (category) => {
    dispatchCategories({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("post", "categories", false, category);
      dispatchCategories({
        type: ACTION_TYPE_SUCCESS,
        payload: [...categories.payload, result.data.category],
      });
    } catch (err) {
      dispatchCategories({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };

  const deleteCategory = async (categoryId) => {
    dispatchCategories({ type: ACTION_TYPE_LOADING });
    try {
      await callApi("delete", `categories/${categoryId}`, false);
      dispatchCategories({
        type: ACTION_TYPE_SUCCESS,
        payload: categories.payload.filter(
          (category) => category.id !== categoryId
        ),
      });
    } catch (err) {
      dispatchCategories({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const updateCategory = async (categoryId, category) => {
    dispatchCategories({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi(
        "put",
        `categories/${categoryId}`,
        false,
        category
      );
      dispatchCategories({
        type: ACTION_TYPE_SUCCESS,
        payload: categories.payload.map((category) =>
          category.id === categoryId ? result.data.category : category
        ),
      });
    } catch (err) {
      dispatchCategories({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const fetchYourCategories = async () => {
    dispatchYourCategories({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("get", "user/categories", true);
      dispatchYourCategories({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.categories,
      });
    } catch (err) {
      dispatchYourCategories({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const searchYourCategories = async (search) => {
    dispatchYourCategories({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi(
        "get",
        `user/categories?search=${search}`,
        true
      );
      dispatchYourCategories({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.categories,
      });
    } catch (err) {
      dispatchYourCategories({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  const searchCategories = async (search) => {
    dispatchCategories({ type: ACTION_TYPE_LOADING });
    try {
      dispatchCategories({ type: ACTION_TYPE_SUCCESS, payload: [] });
      const result = await callApi("get", `categories?search=${search}`, false);
      dispatchCategories({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.categories,
      });
    } catch (err) {
      dispatchCategories({
        type: ACTION_TYPE_FAILURE,
        payload: formatError(err),
      });
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <CategoryContext.Provider
      value={{
        categories,
        dispatchCategories,
        activeCategory,
        setActiveCategory,
        fetchCategories,
        fetchCategoryInfo,
        addCategory,
        deleteCategory,
        updateCategory,
        fetchYourCategories,
        searchYourCategories,
        searchCategories,
        yourCategories,
        dispatchYourCategories,
        categoryInfo,
        dispatchCategoryInfo,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => useContext(CategoryContext);
export { useCategory, CategoryProvider };
