import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useQuiz, useTheme } from "../../hooks";
import { PROFILE_PIC_PLACEHOLDER } from "../../utils";
import "./Header.css";
const Header = () => {
  const { isLoggedIn, logOut } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { toggleTheme, theme } = useTheme();
  const { profile, getUserInfo } = useAuth();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { searchQuizzes } = useQuiz();
  useEffect(() => {
    (async () => await getUserInfo())();
  }, []);
  return (
    <header
      id="header"
      style={{ zIndex: 999 }}
      className=" p-3 t-0 bx-sh-primary-2 pt-2 pb-2 fixed   w-full  row justify-between items-center"
    >
      <div className="row items-center justify-between w-full gap-1 flex-nowrap">
        <div className="row gap-1 items-center  flex-nowrap">
          <div className={`left title ${isLoggedIn ? "hide" : ""}`}>
            <Link to="/" className="text-2xl">
              Zen<span className="text-primary">Trivia</span>
            </Link>
          </div>
          {isLoggedIn && (
            <form
              onSubmit={(e) => {
                e.preventDefault(e);
                navigate("/quizzes?search=" + search);
              }}
              className="input-box input input-dark"
            >
              <i className="fa fa-search"></i>
              <input
                type="search"
                placeholder="Search quiz..."
                className="input"
                defaultValue=""
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          )}
        </div>

        <ul
          className={`right row items-center  text-light flex-nowrap
         
        }`}
        >
          <button
            onClick={toggleTheme}
            className={`${theme === "" ? "text-light" : "text-dark-black"}`}
          >
            {theme !== "light" ? (
              <img
                src="https://assets.codepen.io/210284/sun.png"
                alt="light"
                className="w-8"
              />
            ) : (
              <img
                src="https://assets.codepen.io/210284/moon.png"
                alt="dark"
                className="w-8"
              />
            )}
          </button>
          {!isLoggedIn ? (
            <li>
              <Link to="/login">
                <button className="btn btn-primary auth-button">Login</button>
              </Link>
            </li>
          ) : (
            <li className=" col items-center justify-center">
              <img
                src={profile.data.profilePictureURL ?? PROFILE_PIC_PLACEHOLDER}
                className="w-12 b-2 br-primary b-solid  img-rounded"
                id="avatar"
                alt={profile.data.name}
                onClick={() =>
                  setShowProfileMenu(
                    (prevShowProfileMenu) => !prevShowProfileMenu
                  )
                }
              />
            </li>
          )}
        </ul>
      </div>
      {isLoggedIn && showProfileMenu && (
        <ul className="menu absolute text-dark t-5 mt-2  bg-light z-55 br-sm  col items-center gap-05 p-2 r-1 ">
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
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
