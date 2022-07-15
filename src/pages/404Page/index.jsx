import React from "react";
import { Link } from "react-router-dom";
import NotAvailable from "../../components/NotAvailable";
import PageNotFoundImage from "./404.png";
const PageNotFound = () => {
  return (
    <div className="w-screen h-screen">
      <NotAvailable
        img={PageNotFoundImage}
        classes="h-full"
        type="404"
        title="It's seems like you are lost"
        children={
          <Link to="/">
            <button
              className=" px-6 bg-primary text-light rounded-sm
      py-2.5 text-lg"
            >
              Go back to home
            </button>
          </Link>
        }
      />
    </div>
  );
};

export default PageNotFound;
