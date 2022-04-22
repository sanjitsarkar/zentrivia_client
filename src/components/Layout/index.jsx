import React from "react";
import Footer from "../Footer";
import Header from "../Header";

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
