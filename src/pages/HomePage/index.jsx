import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components";
import "./HomePage.css";

const HomePage = () => {
  return (
    <Layout>
      <main className="hero-section-content col gap-2 mt-5 items-center">
        <h1 className="hero-section-title text-primary text-8xl text-center">
          ZenTrivia
        </h1>
        <p className="hero-section-text text-light text-xl o-90 text-center">
          The place where you can test your
          <br />
          knowledge about{" "}
          <span className="text-primary text-bold text-2xl">Music</span>.
        </p>
        <Link to="/categories">
          <button className="hero-section-button btn btn-light w-fit  br-sm m-auto text-xl text-dark">
            Start Trivia
          </button>
        </Link>
      </main>
    </Layout>
  );
};

export default HomePage;
