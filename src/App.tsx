import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./components";
import { useAuth, useTheme } from "./context";
import {
  CategoryPage,
  HomePage,
  LoginPage,
  PageNotFound,
  ProfilePage,
  QuestionPage,
  QuizPage,
  ResultPage,
  RulesPage,
  SearchedQuizPage,
  SignupPage,
  UserCategoryPage,
  UserQuestionPage,
  UserQuizPage
} from "./pages";

function App(){
  const { theme } = useTheme();
  const { user, getUserInfo } = useAuth();
  useEffect(() => {
    user.isLoggedIn && (async () => await getUserInfo())();
  }, [user]);
  return (
    <div className={theme}>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/quizzes" element={<SearchedQuizPage />} />
        <Route path="/quizzes/:id" element={<QuizPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/rules/:id" element={<RulesPage />} />
          <Route path="/quizzes/:id/questions" element={<QuestionPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="profile/user/categories/:id/quizzes"
            element={<UserQuizPage type="category" />}
          />
          <Route path="profile/user/quizzes" element={<UserQuizPage />} />
          <Route
            path="profile/user/quizzes/:id"
            element={<UserQuestionPage />}
          />
          <Route
            path="profile/user/categories"
            element={<UserCategoryPage />}
          />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
