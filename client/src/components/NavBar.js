import React, { useState, useEffect } from "react";
import Link from "./Link"
import {Link as Route} from "react-router-dom";


const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const [notScrolled, setScrolled] = useState(true);

  function isScrolling() {
    setScrolled(window.pageYOffset === 0);
  }

  // This will check if the user has scrolled any amount.
  // If so, set notScrolled to false.
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
    <nav className={"md:flex md:justify-between md:items-center md:px-8 md:py-1 fixed w-full z-10 " +
    (notScrolled ? "bg-transparent" : "bg-white shadow-md")}>
      <div className="flex items-center justify-between px-4 py-3 md:p-0">
        <div className="flex items-center">
          <img className="inline w-16 h-16" src={require('../assets/transparent.png')} alt="Memento Logo"/>
          <Route to="/">
          <h1 className="ml-2 inline text-2xl text-brandBlue-A font-inter hover:text-brandBlue-B">Memento</h1>
          </Route>
        </div>
        <div className="md:hidden">
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
        <nav className={"px-4 pt-2 pb-4 md:flex md:p-0 items-center " + (isOpen ? 'block' : 'hidden')}>
         
          <Link otherClasses="" href="#" color="gray-500" hoverColor="gray-800" focusColor="gray-800" text="Why Memento"/>
          <Link otherClasses="mt-1 md:mt-0 md:ml-2" href="#" color="gray-500" hoverColor="gray-800" focusColor="gray-800" text="Documentation"/>
          <Link otherClasses="mt-1 md:mt-0 md:ml-2 md:mr-16" href="#" color="gray-500" hoverColor="gray-800" focusColor="gray-800" text="About Us"/>
          <Link otherClasses="mt-1 md:mt-0 md:ml-2" href="/login" color="brandBlue-A" hoverColor="brandBlue-B" focusColor="brandBlue-B" text="Login"/>
          <Link otherClasses="bg-white mt-1 hover:text-brandBlue-B hover:border-brandBlue-B inline-block border-brandBlue-A border-2 border-solid text-brandBlue-A font-bold text-lg px-2 py-1 rounded-full md:mt-0 md:ml-2" href="/signup" color="brandBlue-A" hoverColor="brandBlue-B" focusColor="brandBlue-B" text="Sign Up" />
        </nav>
      }
    </nav>
  );
};

export default NavBar;