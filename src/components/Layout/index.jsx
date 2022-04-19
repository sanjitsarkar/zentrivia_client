import React from "react";
import Footer from "../Footer";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <div className="bg-dark  overflow-x-hidden text-light h-screen ">
      <Header />
      <div className="main  h-full grid place-content-center">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
