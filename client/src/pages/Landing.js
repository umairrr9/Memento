import React from 'react';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import researching from '../assets/researching.svg';
import fileSync from '../assets/file_sync.svg';
import inSync from '../assets/in_sync.svg';
import ideasFlow from '../assets/ideas_flow.svg';
import thoughtProcess from '../assets/thought_process.svg';
import {Link} from "react-router-dom";
import ImageCaption from "../components/ImageCaption";

function Landing() {
  return (
    <div>
      <NavBar />
      
      <div className="">
        <div className="px-8 py-3" id="pattern">
            <div className="font-semibold text-5xl text-white leading-tight text-center py-6 sm:p-12"> 
              <h1 className="inline px-2"> Creativity. </h1>
              <h1 className="inline px-2"> Simplicty. </h1>
              <h1 className="inline px-2"> Memento. </h1>
            </div>

            <div> {/* Paragraph and call to action */}
              <div className="sm:w-1/2 m-auto text-2xl text-white">
              <p className="text-center">
                  Use Memento to take and store notes in the simplest way
                  possible - whether you need to study, write meeting notes, make lists or
                  anything else.
                
                <br />
                
                <Link to="/signup">
                  <Button text="Sign Up For Free" backgroundColor="white" textColor="brandBlue-A"
                  textSize="2xl" padding="3" otherClasses="font-semibold my-4 rounded-full" />
                </Link>
                
                
              </p>
            </div>

            <div className="m-auto text-center sm:flex sm:align-center sm:justify-around mt-10">

              <ImageCaption image={thoughtProcess} imageClasses="w-auto h-48 object-cover inline"
              caption="Unleash your creativity" captionClasses="mt-1 text-white" />

              <ImageCaption image={researching} imageClasses="w-auto h-48 object-cover inline mt-8 sm:mt-0"
              caption="Get productive" captionClasses="mt-1 text-white" />

              <ImageCaption image={inSync} imageClasses="w-auto h-48 object-cover inline mt-8 sm:mt-0"
              caption="Access your notes anywhere" captionClasses="mt-1 text-white" />

            </div>
              
            </div>
            
          </div>

          <div id="features" className="">
            <h1 className="text-5xl text-brandBlue-A"> Features </h1>
            <p>
              We have a wide range of features to help you have the best note taking experience possible!
            </p>


          </div>



      </div>

  </div>
  )
    
}

export default Landing;