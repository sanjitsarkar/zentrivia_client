import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
const Header = () => {
  const { isLoggedIn, logOut, user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  return (
    <header
      id="header"
      className="p-3  bx-sh-primary-2 pt-2 pb-2 fixed  bg-dark w-full  row justify-between items-center"
    >
      <div className="row items-center justify-between w-full gap-1 flex-nowrap">
        <div className="row gap-1 items-center  flex-nowrap">
          <div className={`left title ${isLoggedIn ? "hide" : ""}`}>
            <Link to="/" className="text-2xl">
              Zen<span className="text-primary">Trivia</span>
            </Link>
          </div>
          {isLoggedIn && (
            <div className="input-box input input-dark">
              <i className="fa fa-search"></i>
              <input
                type="search"
                placeholder="Search quiz..."
                className="input"
                defaultValue=""
                onClick={(e) => {}}
                onChange={(e) => {}}
              />
            </div>
          )}
        </div>

        <ul
          className={`right row items-center  text-light flex-nowrap
         
        }`}
        >
          {!isLoggedIn ? (
            <li>
              <Link to="/login">
                <button className="btn btn-primary auth-button">Login</button>
              </Link>
            </li>
          ) : (
            <>
              <li className=" col items-center justify-center">
                <img
                  src={user.data.profilePictureURL}
                  className="avatar avatar-xsm"
                  id="avatar"
                  alt={user.data.name}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                />
              </li>
            </>
          )}
        </ul>
      </div>
      {isLoggedIn && showProfileMenu && (
        <ul className="absolute text-dark t-5 mt-2  bg-light z-55 br-sm  col items-center gap-05 p-2 r-1 ">
          <Link to="/profile">Profile</Link>
          <li>
            <button className="btn btn-secondary auth-button " onClick={logOut}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
