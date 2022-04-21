import React from "react";
import "./App.css";
import SignupPage from "./pages/AuthPage/SignupPage";
import LoginPage from "./pages/AuthPage/Login";
import Toast from "./components/Toast";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import RulesPage from "./pages/RulesPage";
import PrivateRoute from "./components/PrivateRoute";
import QuestionPage from "./pages/QuestionPage";
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
