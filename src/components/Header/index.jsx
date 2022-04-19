import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <header
      id="header"
      className="p-3 bx-sh-primary-2 pt-2 pb-2 fixed  bg-dark w-full  row justify-between items-center"
    >
      <div className="row items-center justify-between w-full gap-1 flex-nowrap">
        <div className="row gap-1 items-center  flex-nowrap">
          <div className="left">
            <Link to="/" className="text-2xl">
              Zen<span className="text-primary">Trivia</span>
            </Link>
          </div>
          {isLoggedIn && (
            <div className="input-box input input-dark">
              <i className="fa fa-search"></i>
              <input
                type="search"
                placeholder="Search videos..."
                className="input"
                defaultValue=""
                onClick={(e) => {}}
                onChange={(e) => {}}
              />
            </div>
          )}
        </div>

        <ul
          className={`right row items-center gap-1 text-light
         
        }`}
        >
          {!isLoggedIn ? (
            <li>
              <Link to="/login">
                <button className="btn btn-primary auth-button">Login</button>
              </Link>
            </li>
          ) : (
            <li>
              <button
                className="btn btn-secondary auth-button"
                onClick={() => {}}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
