import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toast, PrivateRoute } from "./components";
import {
  HomePage,
  LoginPage,
  SignupPage,
  CategoryPage,
  QuizPage,
  RulesPage,
  QuestionPage,
} from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/quizzes/:id" element={<QuizPage />} />
        <Route
          path="/rules/:id"
          element={
            <PrivateRoute>
              <RulesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/quizzes/:id/questions"
          element={
            <PrivateRoute>
              <QuestionPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toast />
    </>
  );
}

export default App;
