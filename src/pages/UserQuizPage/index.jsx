import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddQuizForm,
  Layout,
  Loader,
  NotAvailable,
  QuizCard,
} from "../../components";
import Modal from "../../components/Modal";
import { useQuiz } from "../../hooks";

const UserQuizPage = ({ type }) => {
  const { id: categoryId } = useParams();
  const { yourQuizzes, fetchYourQuizzes, fetchYourQuizzesByCategoryId } =
    useQuiz();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  useEffect(() => {
    (async () => {
      if (type === "category") {
        await fetchYourQuizzesByCategoryId(categoryId);
      } else {
        await fetchYourQuizzes();
      }
    })();
  }, []);
  return (
    <Layout>
      <Modal showModal={showModal} toggleModal={toggleModal}>
        <AddQuizForm toggleModal={toggleModal} />
      </Modal>

      <main className="col items-center mt-4">
        <h1 className="text-3xl text-bold mb-3  text-center">Your Quizzes</h1>
        {yourQuizzes.loading && <Loader />}
        <div className="col gap-2 justify-center mb-4">
          {!yourQuizzes.loading &&
            yourQuizzes.data.length > 0 &&
            yourQuizzes.data.map((quiz) => (
              <QuizCard type="user" quiz={quiz} key={quiz._id} />
            ))}
          {!yourQuizzes.loading && yourQuizzes.data.length === 0 && (
            <NotAvailable title="Quiz is empty, Please add your own quiz" />
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

export default UserQuizPage;
