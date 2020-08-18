import React, {useState} from 'react';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import researching from '../assets/researching.svg';
import inSync from '../assets/in_sync.svg';
import thoughtProcess from '../assets/thought_process.svg';
import {Link} from "react-router-dom";
import ImageCaption from "../components/ImageCaption";
import ProfileModal from "../components/ProfileModal";
const API_URL =
process.env.NODE_ENV === "development" ? "http://localhost:80/api" : "/api";

function Landing() {

  const [showModal, setShowModal] = useState(false);

  function loginAsGuest() {
    let url = API_URL + `/users/guest`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }

  return (
    <>
      <NavBar />
      
      <div id="content">

        {/* Top of Landing Page */}
        <div className="px-8" id="pattern">

            <div className="font-semibold text-5xl text-black leading-tight text-center py-3 sm:p-12"> 
              <h1 className="px-2 pt-12 font-inter"> Productivity and simplicity with Memento. </h1>
              <button onClick={() => setShowModal(!showModal)}>modal</button>
            </div>

            <div>
                
                <br />

                <div id="text" className="text-center sm:w-1/2 m-auto text-2xl text-gray-500 font-baloo-2">
                  <p>
                    Use Memento to take and store notes in the simplest way
                    possible; whether you need to study, write meeting notes, make lists or
                    anything else.
                  </p>
                </div>

                <div id="buttons" className="text-center py-12 pb-48">
                  
                 <Link to="/signup">
                    <Button text="Sign Up Free" backgroundColor="gray-100" textColor="brandBlue-A"
                    textSize="3xl" padding="3" otherClasses="px-5 border-brandBlue-A border-2 border-solid font-semibold m-4 rounded-full" />
                  </Link>

                  <Link to="/">
                    <Button text="Learn More" backgroundColor="brandBlue-A" textColor="white"
                    textSize="3xl" padding="3" otherClasses="border-brandBlue-A border-2 border-solid font-semibold m-4 rounded-full" />
                  </Link>
                  
                  <Link to="/" onClick={() => {
                    loginAsGuest()
                    .then(json => {
                      console.log(json);
                      window.location.href = '/note'; 
                    })
                    .catch(() => alert("There seems to be a problem, try again!"))

                  }}>
                    <Button text="Try as Guest" backgroundColor="brandBlue-A" textColor="white"
                    textSize="3xl" padding="3" otherClasses="border-brandBlue-A border-2 border-solid font-semibold m-4 rounded-full" />
                  </Link>
                </div>

            
              
            </div>
            
          </div>

          {/* Why Memento Section */}
          <div id="features" className="">
            <h1 className="text-5xl text-brandBlue-A"> Features </h1>
            <p>
              We have a wide range of features to help you have the best note taking experience possible!
            </p>

            <div className="m-auto text-center sm:flex sm:align-center sm:justify-around mt-10">

              <ImageCaption image={thoughtProcess} imageClasses="w-auto h-48 object-cover inline"
              alt="Illustration of creative person looking at notes."
              caption="Unleash your creativity" captionClasses="mt-1 text-white" />

              <ImageCaption image={researching} imageClasses="w-auto h-48 object-cover inline mt-8 sm:mt-0"
              alt="Illustration of person laying down whilst using laptop."
              caption="Get productive" captionClasses="mt-1 text-white" />

              <ImageCaption image={inSync} imageClasses="w-auto h-48 object-cover inline mt-8 sm:mt-0"
              alt="Illustration demonstrating use of application across multiple devices."
              caption="Access your notes anywhere" captionClasses="mt-1 text-white" />
            </div>


          </div>

          {/* Documentation Section */}
          <div>

          </div>

          {/* About Us Section */}
          <div>
            
          </div>




      </div>
      <ProfileModal showModal={showModal} modalTitle={"Profile Settings"} closeOnClick={() => setShowModal(false)}/>
  </>
  )
    
}

export default Landing;