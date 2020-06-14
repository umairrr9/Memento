import React from 'react';

function ImageCaption({imageClasses, image, captionClasses, caption}) {
    return(
        <div>
            <img className={imageClasses} src={image} />
            <h2 className={captionClasses}>{caption}</h2>
        </div>
    )
}

export default ImageCaption;