import React from 'react';

function Button({text, backgroundColor, textColor, textSize, padding, otherClasses}) {
  return (

        <button className={"bg-" + backgroundColor + " text-" + textColor + " text-" + textSize + " p-" + padding + " " + otherClasses}>
          {text}
        </button>
  )
    
}

export default Button;