import React, { useState, useEffect } from "react";
import { logout } from "../api";
import { HashLink as Link } from "react-router-hash-link";

const NavBar = ({ loggedIn }) => {
  const [isOpen, setOpen] = useState(false);
  const [notScrolled, setScrolled] = useState(true);

  function isScrolling() {
    setScrolled(window.pageYOffset === 0);
  }

  // If user scrolls, set notScrolled to false.
  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", isScrolling);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", isScrolling);
    };
  }, []);

  return (
    // If user hasn't scrolled / is at the top of the page, the nav bar is transparent.
    <nav
      className={
        "lg:flex lg:justify-between lg:items-center lg:px-8 lg:py-1 fixed w-full z-10 " +
        (notScrolled
          ? "bg-white shadow-md lg:bg-transparent lg:shadow-none"
          : "bg-white shadow-md")
      }
    >
      <div className="flex items-center justify-between px-4 py-3 lg:p-0">
        <div className="flex items-center focus:outline-none">
          <img
            className="inline w-16 h-16 focus:outline-none"
            src={require("../assets/transparent.png")}
            alt="Memento Logo"
          />
          <Link
            className="ml-2 inline text-2xl text-brandBlue-A font-inter outline-none focus:outline-none focus:text-brandBlue-B hover:text-brandBlue-B"
            to="/"
          >
            Memento
          </Link>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setOpen(!isOpen)}
            type="button"
            className="block text-gray-500 hover:text-gray-700 focus:text-gray-800 focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {
        <nav
          className={
            "px-4 pt-2 pb-4 lg:flex lg:p-0 items-center " +
            (isOpen ? "block" : "hidden")
          }
        >
          <Link
            className="focus:outline-none block px-2 py-1 text-lg font-lato text-gray-500 hover:text-gray-800 focus:text-gray-800"
            to="/#whymemento"
          >
            Why Memento
          </Link>

          <Link
            className="mt-1 lg:mt-0 lg:ml-2 focus:outline-none block px-2 py-1 text-lg font-lato text-gray-500 hover:text-gray-800 focus:text-gray-800"
            to="/#tutorial"
          >
            Tutorial
          </Link>

          <Link
            className="mt-1 lg:mt-0 lg:ml-2 lg:mr-16 focus:outline-none block px-2 py-1 text-lg font-lato text-gray-500 hover:text-gray-800 focus:text-gray-800"
            to="/#contact"
          >
            Find Us
          </Link>

          {loggedIn ? (
            <button
              className="shadow-md inline-block bg-transparent lg:mt-0 lg:ml-2 mt-1 focus:outline-none px-2 py-1 text-lg font-lato text-brandBlue-A hover:text-white focus:text-brandBlue-B border border-brandBlue-A hover:bg-brandBlue-A hover:border-transparent rounded"
              onClick={() => logout()}
            >
              {" "}
              Logout
            </button>
          ) : (
            <>
              <Link
                className="mt-1 lg:mt-0 lg:ml-2 focus:outline-none block px-2 py-1 text-lg font-lato text-brandBlue-A hover:text-brandBlue-B focus:text-brandBlue-B"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="shadow-md inline-block bg-transparent lg:mt-0 lg:ml-2 mt-1 focus:outline-none px-2 py-1 text-lg font-lato text-brandBlue-A hover:text-white border border-brandBlue-A hover:bg-brandBlue-A hover:border-transparent focus:bg-brandBlue-A focus:text-white rounded"
                to="/signup"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      }
    </nav>
  );
};

export default NavBar;