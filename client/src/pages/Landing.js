import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import researching from "../assets/researching.svg";
import inSync from "../assets/in_sync.svg";
import thoughtProcess from "../assets/thought_process.svg";
import { HashLink as Link } from "react-router-hash-link";
import ImageCaption from "../components/ImageCaption";
import { loginAsGuest, isLoggedIn } from "../api";
import Diagonal from "../components/Diagonal";
import Card from "../components/Card";

function Landing() {
  const [loggedIn, setIsLoggedIn] = useState(false);

  // function loginAsGuest() {
  //   let url = API_URL + `/users/guest`;

  //   return fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       return json;
  //     });
  // }

  useEffect(() => {
    document.body.classList.remove("architect");
  }, []);

  useEffect(() => {
    isLoggedIn().then((json) => {
      setIsLoggedIn(json);
    });
  }, []);

  return (
    <>
      <NavBar loggedIn={loggedIn} />

      <div className="" id="content">
        {/* Landing Page Front */}
        <div className="px-8 hover:pb-16 pt-3 relative" id="front">
          <div className="text-center leading-tight pt-3 sm:p-12">
            <h1 className="text-5xl text-black pt-12 font-inter">
              Productivity and simplicity with Memento.
            </h1>
            <p className="m-auto text-2xl text-gray-500 font-lato w-3/4 pt-3">
              Use Memento to take and store notes in the simplest way possible;
              whether you need to study, write meeting notes, make lists or
              anything else!
            </p>
          </div>

          <div
            id="buttons"
            className="my-8 sm:my-0 h-40 sm:h-auto flex flex-col sm:block text-center justify-center"
          >
            {loggedIn ? (
              <>
                <Link
                  className="shadow-md bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-3xl font-lato hover:text-white p-2 m-4 mb-2 border border-brandBlue-A hover:border-transparent rounded"
                  to="/note"
                >
                  Go To Your Notes
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="shadow-md bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-3xl font-lato hover:text-white p-2 m-4 mb-2 border border-brandBlue-A hover:border-transparent rounded"
                  onClick={() => {
                    loginAsGuest()
                      .then(() => {
                        window.location.href = "/note";
                      })
                      .catch(() =>
                        alert("There seems to be a problem, try again!")
                      );
                  }}
                  to="#"
                >
                  Try as Guest
                </Link>

                <Link
                  className="mt-4 sm:mt-0 shadow-md bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-3xl font-lato hover:text-white p-2 m-4 mb-2 border border-brandBlue-A hover:border-transparent rounded"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="m-auto text-center md:flex md:align-center md:justify-around py-20">
            <ImageCaption
              image={thoughtProcess}
              imageClasses="w-auto h-40 lg:h-48 object-cover inline"
              alt="Illustration of creative person looking at notes."
              caption="Unleash your creativity"
              captionClasses="mt-1 text-lato text-xl text-brandBlue-A"
            />

            <ImageCaption
              image={researching}
              imageClasses="w-auto h-40 lg:h-48 object-cover inline mt-8 md:mt-0"
              alt="Illustration of person laying down whilst using laptop."
              caption="Get productive"
              captionClasses="mt-1 text-lato text-xl text-brandBlue-A"
            />

            <ImageCaption
              image={inSync}
              imageClasses="w-auto h-40 lg:h-48 object-cover inline mt-8 md:mt-0"
              alt="Illustration demonstrating use of application across multiple devices."
              caption="Access your notes anywhere"
              captionClasses="mt-1 text-lato text-xl text-brandBlue-A"
            />
          </div>

          <Diagonal colour={"gray-100"} />
        </div>

        {/* Why Memento Section */}
        <div id="whymemento" className="pt-6 pb-16 px-8 bg-gray-100 relative">
          <h1 className="text-5xl font-inter">Why Memento</h1>

          <div id="cards" className="text-center mt-3">
            <Card
              title={"Inline Tools"}
              description={
                // "Add headings, tables, checklists, delimiters and more to your notes."
                "As well as plain text, Memento allows you to add headings, tables, checklists and much more."
              }
              link={"tutorial"}
            />

            <Card
              title={"Organising"}
              description={
                "Organise your folders and notes neatly using Memento's hierarchical structure."
              }
              link={"tutorial"}
            />

            <Card
              title={"Syncing"}
              description={
                "Access your notes anywhere, as long you're logged in and your work is saved."
              }
              link={"tutorial"}
            />

            <Card
              title={"Saving"}
              description={
                "Notes are saved every few characters so you don't have to worry about losing them."
              }
              link={"tutorial"}
            />

            <Card
              title={"Any Device"}
              description={
                "You can use whichever device you want, whether it's a phone, tablet or your computer."
              }
              link={"tutorial"}
            />

            <Card
              title={"Simplicity"}
              description={
                "Our simple design will help you stay focused and productive when taking notes."
              }
              link={"tutorial"}
            />
          </div>
          
          <center>
          <div class="justify-center flex items-center bg-brandBlue-A text-white text-sm font-bold px-4 py-3 mt-3 w-1/3" role="alert">
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
            <p>Did you know Memento means 'to remember' in Latin.</p>
          </div>
          </center>
          

          <Diagonal colour={"white"} />
        </div>

        {/* Tutorial Section */}
        <div id="tutorial" className="px-8">
          <h1 className="text-5xl"> Tutorial </h1>
        </div>

        {/* About Us Section */}
        <div id="aboutus" className="px-8 bg-gray-100">
          <h1 className="text-5xl"> About Us </h1>
        </div>
      </div>
    </>
  );
}

export default Landing;
