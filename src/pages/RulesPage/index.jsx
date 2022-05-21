import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../../components";
import "./RulesPage.css";

const RulesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let pathName = location.pathname.split("/");
  let quizId = pathName[pathName.length - 1];
  return (
    <Layout>
      <div className="backdrop"></div>
      <section className="rules-section  bg-light br-sm text-dark mt-5">
        <h1 className="text-xl p-2 bg-dark-2 br-sm text-light ">
          Some rules for this quiz
        </h1>
        <hr />
        <div className="p-2 pl-3">
          <ul className="col text-dark-4 list-decimal gap-05">
            <li>You will have only 15 seconds per each question.</li>
            <li>Once you select your answer, it can't be undone.</li>
            <li>You can't select any option once time goes off.</li>
            <li>You can't exit from the Quiz while you're playing.</li>
            <li>You'll get points on the basis of your correct answers</li>
            <li>
              You'll get 5 points for Easy, 10 points for Medium and 15 points
              for Hard Quiz.
            </li>
          </ul>
        </div>
        <hr />
        <div className="row justify-end gap-1 p-2 ">
          <button
            className="btn btn-outline-error p-3 pt-1 pb-1"
            onClick={() => {
              navigate(-1);
            }}
          >
            Exit
          </button>

          <Link to={`/quizzes/${quizId}/questions`}>
            <button className="btn btn-dark">Continue</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default RulesPage;
