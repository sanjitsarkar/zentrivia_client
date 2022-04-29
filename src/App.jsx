import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoute, Toast } from "./components";
import { useTheme } from "./hooks";
import {
  CategoryPage,
  HomePage,
  LoginPage,
  ProfilePage,
  QuestionPage,
  QuizPage,
  ResultPage,
  RulesPage,
  SignupPage,
} from "./pages";

function App() {
  const { theme } = useTheme();
  return (
    <div className={theme}>
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
        <Route
          path="/result"
          element={
            <PrivateRoute>
              <ResultPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toast />
    </div>
  );
}

export default App;
