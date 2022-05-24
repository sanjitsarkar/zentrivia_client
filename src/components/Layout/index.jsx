import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer, Header } from "..";
import "./Layout.css";
const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-dark text-light ">
      <Header />
      <div className="main relative row justify-center">
        {location.pathname !== "/" && !location.pathname.includes("rules") && (
          <button
            className="back-button fixed  z-10  br-full w-12 h-12  text-2xl bx-sh-primary-2"
            onClick={() => {
              if (
                location.pathname.includes("questions") ||
                location.pathname.includes("result")
              ) {
                navigate("/categories");
              } else if (
                location.pathname === "/quizzes" ||
                location.pathname === "/profile"
              ) {
                navigate("/");
              } else {
                navigate(-1);
              }
            }}
          >
            &#10140;
          </button>
        )}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
