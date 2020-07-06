import React, { useState } from "react";
import Link from "./Link"
import {Link as Route} from "react-router-dom";


const NavBar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <nav className="md:flex bg-white md:justify-between md:items-center md:px-8 md:py-1 shadow-xl relative">
      <div className="flex items-center justify-between px-4 py-3 md:p-0">
        <div className="flex items-center">
          <img className="inline w-16 h-16" src={require('../assets/transparent.png')} alt="Memento Logo"/>
          <h1 className="ml-2 inline text-xl text-brandBlue-A font-bold hover:text-brandBlue-B">Memento</h1>
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
                  fill-rule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {
        <nav className={isOpen ? 'block px-4 pt-2 pb-4 md:flex md:p-0' : 'hidden px-4 pt-2 pb-4 md:flex md:p-0'}>
          {/* <a
            href="#"
            className="block px-2 py-1 text-gray-500 font-bold rounded hover:text-gray-800"
          >
            Features
          </a>
           */}
          <Link otherClasses="" href="#" color="gray-500" hoverColor="gray-800" focusColor="gray-800" text="Features"/>
          <Link otherClasses="mt-1 md:mt-0 md:ml-2" href="#" color="gray-500" hoverColor="gray-800" focusColor="gray-800" text="About Us"/>
          <Link otherClasses="mt-1 md:mt-0 md:ml-2 md:mr-16" href="#" color="gray-500" hoverColor="gray-800" focusColor="gray-800" text="Something"/>
          <Route to="/login">
          <Link otherClasses="mt-1 md:mt-0 md:ml-2" href="#" color="brandBlue-A" hoverColor="brandBlue-B" focusColor="brandBlue-B" text="Login"/>
          </Route>
          {/* <Link otherClasses="rounded-full mt-1 md:mt-0 md:ml-2 hover:text-brandBlue-B hover:border-brandBlue-B border-brandBlue-A border-2 border-solid" href="#" color="brandBlue-A" hoverColor="brandBlue-B" focusColor="brandBlue-B" text="Sign Up"/>
           */}

          {/* <a ?isLogin=true
            href="/"
            className="mt-1 block text-brandBlue-A hover:text-brandBlue-B font-bold px-2 py-1 md:mt-0 md:ml-2"
          >
            Log in
          </a> */}

          <Route
            to="/signup"
            className="bg-white mt-1 hover:text-brandBlue-B hover:border-brandBlue-B inline-block border-brandBlue-A border-2 border-solid text-brandBlue-A font-bold px-2 py-1 rounded-full md:mt-0 md:ml-2"
          >
            Sign Up
          </Route>
        </nav>
      }
    </nav>
  );
};

export default NavBar;