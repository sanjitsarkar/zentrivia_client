import React from "react";
import "./Loader.css";
const Loader = ({ isButtonLoader = false }) => {
  return (
    <div
      className={`w-full ${
        !isButtonLoader ? "h-5-6" : "h-auto"
      } grid p-1 place-content-center`}
    >
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
