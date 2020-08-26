import React from "react";

export default function CardWithImage({
  imgSource,
  imgAlt,
  title,
  description,
  id,
  children,
}) {
  return (
    <div
      id={id}
      class="sm:w-4/5 md:w-3/5 lg:w-2/5 rounded overflow-hidden shadow-lg mx-auto my-8"
    >
      <img class="w-full" src={imgSource} alt={imgAlt} />
      <div class="px-6 py-4">
        <div class="font-bold text-brandBlue-A text-xl mb-2">{title}</div>
        {children ? (
          children
        ) : description ? (
          <p class="text-gray-600 text-base">{description}</p>
        ) : null}
      </div>
    </div>
  );
}