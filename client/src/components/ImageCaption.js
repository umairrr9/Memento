import React from "react";

export default function ImageCaption({
  imageClasses,
  image,
  alt,
  captionClasses,
  caption,
}) {
  return (
    <div>
      <img className={imageClasses} src={image} alt={alt} />
      <h2 className={captionClasses}>{caption}</h2>
    </div>
  );
}