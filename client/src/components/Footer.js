import React from "react";
import GitHub from "../assets/github.svg";
import LinkedIn from "../assets/linkedin.svg";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-800 flex justify-center pt-8 pb-12 px-8 sm:px-0">
      {/* <div className="">
        <p className="text-gray-300">Memento Notes 2020</p>

        <p className="text-gray-300">
          Developed by Harris Uddin & Umair Ul-Haq.
        </p>
      </div> */}

      <div className="flex flex-col text-center items-center">

        <img alt="LinkedIn logo" src={LinkedIn} />

        <p className="text-gray-300">
          {"Developed by "}
          <a
            className="text-brandBlue-A hover:text-brandBlue-B focus:outline-none focus:text-brandBlue-B"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/umair-ul-haq9/"
          >
            {"Umair "}
          </a>
          {"and "}
          <a
            className="text-brandBlue-A hover:text-brandBlue-B focus:outline-none focus:text-brandBlue-B"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/harrisuddin/"
          >
            {"Harris"}
          </a>
          .
        </p>

        <img className="mt-4" alt="GitHub logo" src={GitHub} />

        <p className="text-gray-300">
          {"Feel free to check out our "}
          <a
            className="text-brandBlue-A hover:text-brandBlue-B focus:outline-none focus:text-brandBlue-B"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/umairrr9/Memento/"
          >
            GitHub repository
          </a>
          .
        </p>
      </div>
    </footer>
  );
}