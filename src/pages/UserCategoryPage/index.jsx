import React, { useEffect, useState } from "react";
import {
  AddCategoryForm,
  CategoryCard,
  Layout,
  Loader,
  NotAvailable,
} from "../../components";
import Modal from "../../components/Modal";
import { useCategory } from "../../hooks";

const UserCategoryPage = ({}) => {
  const { yourCategories, fetchYourCategories } = useCategory();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  useEffect(() => {
    fetchYourCategories();
  }, []);
  return (
    <Layout>
      <Modal showModal={showModal} toggleModal={toggleModal}>
        <AddCategoryForm toggleModal={toggleModal} />
      </Modal>

      <main className="col items-center mt-4">
        <h1 className="text-3xl text-bold mb-3  text-center">
          Your Categories
        </h1>
        {yourCategories.loading && <Loader />}
        <div className="row gap-2 justify-center mb-4">
          {!yourCategories.loading &&
            yourCategories.data.length > 0 &&
            yourCategories.data.map((category) => (
              <CategoryCard
                type="user"
                category={category}
                key={category._id}
              />
            ))}
          {!yourCategories.loading && yourCategories.data.length === 0 && (
            <NotAvailable title="Category is empty, Please add your own quiz category" />
          )}
        </div>
        <button
          className="create-quiz-btn btn btn-float-right-lg btn-light"
          onClick={toggleModal}
        >
          <i className="fa fa-add"></i>
        </button>
      </main>
    </Layout>
  );
};

export default UserCategoryPage;
