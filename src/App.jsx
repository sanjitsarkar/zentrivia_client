import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./components";
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
  YourQuestionPage,
  YourQuizPage,
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
        <Route element={<PrivateRoute />}>
          <Route path="/rules/:id" element={<RulesPage />} />
          <Route path="/quizzes/:id/questions" element={<QuestionPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="profile/user/quizzes" element={<YourQuizPage />} />
          <Route
            path="profile/user/quizzes/:id"
            element={<YourQuestionPage />}
          />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
