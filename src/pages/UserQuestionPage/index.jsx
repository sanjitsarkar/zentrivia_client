import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Loader, NotAvailable, Question } from "../../components";
import AddQuestionsForm from "../../components/AddQuestionForm";
import Modal from "../../components/Modal";
import { useQuestion } from "../../hooks";

const UserQuestionsPage = () => {
  const { questions, fetchQuestions } = useQuestion();
  const { id: quizId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  useEffect(() => {
    (async () => {
      await fetchQuestions(quizId);
    })();
  }, [quizId]);
  return (
    <Layout>
      <Modal showModal={showModal} toggleModal={toggleModal}>
        <AddQuestionsForm
          fetchQuestions={fetchQuestions}
          toggleModal={toggleModal}
        />
      </Modal>

      <main className="col items-center mt-4">
        {questions.loading && <Loader />}
        <div className="col gap-2 w-full">
          {questions.data.length > 0 &&
            questions.data.map((question, i) => (
              <Question
                type="user"
                quizId={quizId}
                question={question}
                i={i}
                key={question._id}
              />
            ))}
        </div>
        {!questions.loading && questions.data.length === 0 && (
          <NotAvailable
            title="There is no any question,
           Please add your own question"
          />
        )}
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

export default UserQuestionsPage;
