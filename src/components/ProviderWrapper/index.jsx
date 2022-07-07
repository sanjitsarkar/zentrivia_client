import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "..";
import {
  AuthProvider,
  CategoryProvider,
  ModalProvider,
  QuestionProvider,
  QuizProvider,
  ScoreProvider,
  SearchProvider,
  ThemeProvider,
} from "../../context";

const ProviderWrapper = ({ children }) => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <CategoryProvider>
          <QuizProvider>
            <QuestionProvider>
              <ThemeProvider>
                <ScoreProvider>
                  <ModalProvider>
                    <SearchProvider>{children}</SearchProvider>
                  </ModalProvider>
                </ScoreProvider>
              </ThemeProvider>
            </QuestionProvider>
          </QuizProvider>
        </CategoryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default ProviderWrapper;
