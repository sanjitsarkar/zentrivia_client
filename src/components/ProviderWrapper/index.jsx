import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { CategoryProvider } from "../../context/CategoryContext";
import { QuestionProvider } from "../../context/QuestionContext";
import { QuizProvider } from "../../context/QuizContext";
import { ToastProvider } from "../../context/ToastContext";

const ProviderWrapper = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <CategoryProvider>
              <QuizProvider>
                <QuestionProvider>{children}</QuestionProvider>
              </QuizProvider>
            </CategoryProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </>
  );
};

export default ProviderWrapper;
