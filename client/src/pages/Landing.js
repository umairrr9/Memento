import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import researching from '../assets/researching.svg';
import inSync from '../assets/in_sync.svg';
import thoughtProcess from '../assets/thought_process.svg';
import { HashLink as Link } from 'react-router-hash-link';
import ImageCaption from "../components/ImageCaption";
import { loginAsGuest, isLoggedIn } from "../api";
import Diagonal from '../components/Diagonal';
import Card from '../components/Card';

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


          <Diagonal colour={"gray-100"}/>

        </div>

        {/* Why Memento Section */}
        <div id="whymemento" className="pt-6 pb-16 px-8 bg-gray-100 relative">

          <h1 className="text-5xl font-inter">Why Memento</h1>
          
          <div id="left" className="w-1/2">

          <ul>
              <li className="my-2 w-56 bg-white rounded text-center font-lato text-brandBlue-A text-xl shadow-lg">Add headings, tables, checklists, delimiters and more to your notes.</li>
              <li className="my-2 w-56 bg-white rounded text-center font-lato text-brandBlue-A text-xl shadow-lg">Notes are saved after every 7 characters entered or through the save button.</li>
              <li className="my-2 bg-white rounded text-center font-lato text-brandBlue-A text-xl shadow-lg">Our hierarchical structure allows you to organise your folders and notes.</li>
              <li className="my-2 bg-white rounded text-center font-lato text-brandBlue-A text-xl shadow-lg">Folders and notes can be renamed and deleted.</li>
              <li className="my-2 bg-white rounded text-center font-lato text-brandBlue-A text-xl shadow-lg">Print your notes.</li>
            </ul>

            
            {/*  */}
            
            <div className="max-w-sm bg-white rounded overflow-hidden shadow-lg">
              {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" /> */}
              <div className="px-6 py-3">
                <h2 className="font-inter text-brandBlue-A font-bold text-xl mb-2">Inline Tools</h2>
                <p className="font-lato text-gray-600 text-base">
                Add headings, tables, checklists, delimiters and more to your notes.
                </p>
              </div>
              <div className="px-6 pt-2 pb-2">
                <Link className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:text-brandBlue-A" to="/#tutorial">Learn More</Link>
              </div>
            </div>

            {/*  */}


            <p className="text-gray-600 font-lato">Learn more about these features and how to use them in the next section.</p>

            <p className="text-gray-600 font-lato py-3">
              Welcome to Memento! We designed this note taking app to allow you to unleash your inner creativity
              and maximise productivity in the simplest way possible.
            </p>

            

            <p className="text-gray-600 font-lato">
              We believe simplicity is key to being productive. When we keep things simple, we have more clarity and focus
              as there’s nothing to take our attention away. Therefore our design should help you stay focused and be more
              productive when you’re taking notes! 
            </p>
            {/* and no, not just because Leonardo Da Vinci said
              “Simplicity is the ultimate sophistication” or because Bruce Lee said “Simplicity is the key to
              brilliance”. */}
          </div>

          <div id="right">

          </div>

          <Diagonal colour={"white"}/>

        </div>

{/* make it so there is 1 delete modal */}


        {/* Tutorial Section */}
        <div id="tutorial" className="px-8">
          <h1 className="text-5xl text-brandBlue-A"> Tutorial </h1>
          

          
        </div>

        {/* About Us Section */}
        <div id="aboutus" className="px-8 bg-gray-100">
          <h1 className="text-5xl text-brandBlue-A"> About Us </h1>
          
        </div>




      </div>
    </>
  )

}

export default Landing;