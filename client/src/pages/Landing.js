import React from 'react';
import NavBar from '../components/NavBar';
// https://stackoverflow.com/questions/50858790/svg-image-as-pattern-full-width-keep-ratio
function Landing() {
  return (
    <div>
      <NavBar />
      <div className="bg-brandBlue-A">
        <div className="px-8 py-3" id="pattern"> 
          <div className="">
          <h1 className="text-white">Get more organized.<br/>Get more done.</h1>
          <p className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus dui ut sapien rhoncus facilisis.
          Quisque sollicitudin varius dolor eu molestie. Quisque ac turpis et nunc placerat ornare sit amet id nisl.
          Nulla vel dignissim mi, sed malesuada nisl. Mauris mi tortor, ultricies ac tellus non, feugiat bibendum
          risus. Morbi sed odio et elit bibendum tincidunt ac sit amet arcu. Donec ut justo a odio pharetra
          ullamcorper quis id nibh. Nam finibus facilisis nisl. Mauris nec nulla lobortis, facilisis sapien et,
          iaculis est. In bibendum sit amet tellus fermentum lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi vel odio eget velit sagittis lacinia sit amet eget enim. 


          </p>
          </div>
        </div>
      </div>
    </div>
  )
    
}

export default Landing;