import React from "react";
import GitHub from "../assets/github.svg";
import LinkedIn from "../assets/linkedin.svg";

function Footer(){
    return(
        <footer id="contact" className="p-8 bg-gray-800 relative">

            {/* LEFT */}
            <div className="absolute">
                <p className="text-gray-300">
                    Memento Notes 2020
                </p>

                <p className="text-gray-300 w-full sm:w-3/5 my-2">
                    Developed by Harris Uddin & Umair Ul-Haq.
                </p>
            </div>

            {/* CENTER */}
            <div className="relative">
                <center>
                <img alt="GitHub logo" src={LinkedIn} />
                <p className="text-gray-300 w-full sm:w-3/5 mb-4">
                    Connect with & contact
                <a
                    className="text-brandBlue-A hover:text-brandBlue-B focus:outline-none focus:text-brandBlue-B"
                    target="_blank"
                    href="https://www.linkedin.com/in/umair-ul-haq9/"> Umair</a> and
                <a
                    className="text-brandBlue-A hover:text-brandBlue-B focus:outline-none focus:text-brandBlue-B"
                    target="_blank"
                    href="https://www.linkedin.com/in/harrisuddin/"> Harris</a> on LinkedIn.
                </p>

                <img alt="GitHub logo" src={GitHub} />
                <p className="text-gray-300 w-full sm:w-3/5 mb-4">
                Feel free to check out our
                <a
                    className="text-brandBlue-A hover:text-brandBlue-B focus:outline-none focus:text-brandBlue-B"
                    target="_blank"
                    href="https://github.com/umairrr9/Memento/"> GitHub repository</a>. 
                </p>
                </center>
            </div>
        </footer>
    )
}

export default Footer;