import React from "react";
import { Footer, Header } from "..";
import "./Layout.css";
const Layout = ({ children }) => {
  return (
    <div className="bg-dark text-light ">
      <Header />
      <div className="main row justify-center">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
