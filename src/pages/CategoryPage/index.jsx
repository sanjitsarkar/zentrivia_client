import React, { useCallback, useEffect } from "react";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import NotAvailable from "../../components/NotAvailable";
import { useCategory } from "../../context/CategoryContext";
import CategoryCard from "./CategoryCard";

const CategoryPage = () => {
  const { categories } = useCategory();

  return (
    <Layout>
      <main className="category-section">
        <h1 className="text-3xl text-bold mb-3 mt-4 text-center">
          Choose <span className="text-primary">Trivia</span> Category
        </h1>
        {categories.loading && <Loader />}
        <div className="row gap-1 justify-center items-center ">
          {!categories.loading &&
            categories.data.length > 0 &&
            categories.data.map((category) => (
              <CategoryCard category={category} key={category._id} />
            ))}
          {!categories.loading && categories.data.length === 0 && (
            <NotAvailable title="Category is empty" />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default CategoryPage;
