import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "..";
import {
  AuthProvider,
  CategoryProvider,
  QuestionProvider,
  QuizProvider,
  ScoreProvider,
  ThemeProvider,
  ToastProvider,
} from "../../context";

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
