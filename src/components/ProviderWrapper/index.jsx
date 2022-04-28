import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  CategoryProvider,
  QuestionProvider,
  QuizProvider,
  ToastProvider,
} from "../../context";
import { ScoreProvider } from "../../context/ScoreContext";
import { ThemeProvider } from "../../context/ThemeContext";
import ScrollToTop from "../ScrollToTop";

const ProviderWrapper = ({ children }) => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastProvider>
        <AuthProvider>
          <CategoryProvider>
            <QuizProvider>
              <QuestionProvider>
                <ThemeProvider>
                  <ScoreProvider>{children}</ScoreProvider>
                </ThemeProvider>
              </QuestionProvider>
            </QuizProvider>
          </CategoryProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default ProviderWrapper;
