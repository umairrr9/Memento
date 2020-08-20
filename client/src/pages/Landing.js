import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import researching from '../assets/researching.svg';
import inSync from '../assets/in_sync.svg';
import thoughtProcess from '../assets/thought_process.svg';
import { Link } from "react-router-dom";
import ImageCaption from "../components/ImageCaption";
import { loginAsGuest, isLoggedIn } from "../api";
import Diagonal from '../components/Diagonal';

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
    document.body.classList.remove('architect');
  }, []);

  useEffect(() => {
    isLoggedIn()
      .then((json) => {
        setIsLoggedIn(json);
      })
  }, []);

  return (
    <>
      <NavBar loggedIn={loggedIn} />

      <div className="" id="content">

        {/* Landing Page Front */}
        <div className="px-8 hover:pb-16 pt-3 relative" id="front">

        

          <div className="text-center leading-tight pt-3 sm:p-12">
            <h1 className="text-5xl text-black pt-12 font-inter">Productivity and simplicity with Memento.</h1>
            <p className="m-auto text-2xl text-gray-500 font-lato w-3/4 pt-3">
              Use Memento to take and store notes in the simplest way
              possible; whether you need to study, write meeting notes, make lists or
              anything else!
                </p>
          </div>

          <div id="buttons" className="text-center">
          {loggedIn ? 
          <>
          <Link
            className="shadow-md bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-3xl font-lato hover:text-white p-2 m-4 mb-2 border border-brandBlue-A hover:border-transparent rounded"
            to="/note"
          >
            Go To Your Notes
          </Link>
        </>
          :
            <>
              <Link
                className="shadow-md bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-3xl font-lato hover:text-white p-2 m-4 mb-2 border border-brandBlue-A hover:border-transparent rounded"
                onClick={() => {
                  loginAsGuest()
                    .then(() => {
                      window.location.href = '/note';
                    })
                    .catch(() => alert("There seems to be a problem, try again!"))
                }}
                to="#"
              >
                Try as Guest
              </Link>

              <Link
                className="shadow-md bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-3xl font-lato hover:text-white p-2 m-4 mb-2 border border-brandBlue-A hover:border-transparent rounded"
                to="/signup"
              >
                Sign Up
              </Link>
            </>
            
          }
          </div>



          <div className="m-auto text-center sm:flex sm:align-center sm:justify-around py-20">

            <ImageCaption image={thoughtProcess} imageClasses="w-auto h-48 object-cover inline"
              alt="Illustration of creative person looking at notes."
              caption="Unleash your creativity" captionClasses="mt-1 text-lato text-xl text-brandBlue-A" />

            <ImageCaption image={researching} imageClasses="w-auto h-48 object-cover inline mt-8 sm:mt-0"
              alt="Illustration of person laying down whilst using laptop."
              caption="Get productive" captionClasses="mt-1 text-lato text-xl text-brandBlue-A" />

            <ImageCaption image={inSync} imageClasses="w-auto h-48 object-cover inline mt-8 sm:mt-0"
              alt="Illustration demonstrating use of application across multiple devices."
              caption="Access your notes anywhere" captionClasses="mt-1 text-lato text-xl text-brandBlue-A" />
          </div>


          <Diagonal colour={"gray-200"}/>

        </div>

        {/* Why Memento Section */}
        <div id="whymemento" className="px-8 pb-16 bg-gray-200 relative">



          <h1 className="text-5xl text-brandBlue-A"> Why Memento </h1>
          




        </div>



        {/* Tutorial Section */}
        <div id="tutorial" className="px-8 bg-black">
          <h1 className="text-5xl text-brandBlue-A"> Tutorial </h1>
          
        </div>

        {/* About Us Section */}
        <div id="aboutus" className="px-8 bg-gray-300">
          <h1 className="text-5xl text-brandBlue-A"> About Us </h1>
          
        </div>




      </div>
    </>
  )

}

export default Landing;