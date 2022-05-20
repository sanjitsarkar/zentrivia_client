import React, { useEffect, useState } from "react";
import {
  AddQuizForm,
  Layout,
  Loader,
  NotAvailable,
  QuizCard,
} from "../../components";
import Modal from "../../components/Modal";
import { useQuiz } from "../../hooks";

const YourQuizPage = () => {
  const { yourQuizzes, fetchYourQuizzes } = useQuiz();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  useEffect(() => {
    fetchYourQuizzes();
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
              <QuizCard  type="user" quiz={quiz} key={quiz._id} />
            ))}
          {!yourQuizzes.loading && yourQuizzes.data.length === 0 && (
            <NotAvailable title="Quiz is empty" />
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

export default YourQuizPage;
