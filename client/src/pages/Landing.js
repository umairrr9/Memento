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
          
          <div id="cards" className="text-center">
            
            <Card
              title={"Inline Tools"}
              description={"Add headings, tables, checklists, delimiters and more to your notes."}
              link={"tutorial"}
            />

            <Card
              title={"Saving"}
              description={"Notes are saved after every 7 characters entered or through the save button."}
              link={"tutorial"}
            />

            <Card 
              title={"Organising"}
              description={"Our hierarchical structure allows you to organise your folders and notes."}
              link={"tutorial"}
            />

            <Card 
              title={"Note Settings"}
              description={"Folders and notes can be renamed and deleted. blablablablabla blaaj jnj."}
              link={"tutorial"}
            />

            <Card 
              title={"Printing"}
              description={"Print your notes. fjndksjfkmsdvndmd vdkjsdffdg fdnksmdvsj djngfsdnjf."}
              link={"tutorial"}
            />

            <Card 
              title={"Printing"}
              description={"Print your notes. fjndksjfkmsdvndmd vdkjsdffdg fdnksmdvsj djngfsdnjf."}
              link={"tutorial"}
            />
            
          </div>

          <div id="left and right" className="flex mt-4">


<div id="left" className="w-1/2">

<h2 className="text-3xl text-gray-600 font-lato">Our Emphasis on Simplicity</h2>

<p className="text-gray-600 text-xl font-lato py-3">
    Welcome to Memento! We designed this note taking app to allow you to unleash your inner creativity
    and maximise productivity in the simplest way possible.
</p>

  <p className="text-gray-600 font-lato text-xl">
    We believe simplicity is key to being productive. When we keep things simple, we have more clarity and focus
    as there’s nothing to take our attention away. Therefore our design should help you stay focused and be more
    productive when you’re taking notes! 
  </p>
  
</div>

<div id="right" className="">

    <blockquote className="max-w-sm my-6 p-6 bg-blue-100 border border-l-8 border-brandBlue-A text-blue-900 box-border">
      <p className="italic text-lg leading-6 m-0 pb-3">
        Simplicity is the ultimate sophistication.
      </p>
      <p className="font-bold text-lg leading-6 m-0 ">
        - Leonardo Da Vinci
      </p>
    </blockquote>

    <blockquote className="max-w-sm my-6 p-6 bg-blue-100 border border-l-8 border-brandBlue-A text-blue-900 box-border">
      <p className="italic text-lg leading-6 m-0 pb-3">
        Simplicity is the key to brilliance.
      </p>
      <p className="font-bold text-lg leading-6 m-0 ">
        - Bruce Lee
      </p>
    </blockquote>

</div>


          </div>

          

          

          <Diagonal colour={"white"}/>

        </div>

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