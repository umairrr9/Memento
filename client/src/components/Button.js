import React from "react";

export default function Button({
  text,
  backgroundColor,
  textColor,
  textSize,
  padding,
  otherClasses,
}) {
  return (
    <button
      className={
        "bg-" +
        backgroundColor +
        " text-" +
        textColor +
        " text-" +
        textSize +
        " p-" +
        padding +
        " " +
        otherClasses
      }
    >
      {text}
    </button>
  );
}