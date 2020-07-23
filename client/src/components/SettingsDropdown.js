import React from "react";
import Dropdown from "./Dropdown";

export default function SettingsDropdown(
  {
    //   buttonStyles,
    //   buttonOnClick,
    //   innerButton,
    //   children,
    //   dropdownStyles,
  }
) {
  return (
    <Dropdown
      buttonStyles="rounded hover:shadow-md outline-none focus:outline-none bg-gray-100"
      innerButton={
        <svg height={24} viewBox="0 0 24 24" width={24}>
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      }
      dropdownStyles="text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 bg-white"
    >
      <a
        href="#pablo"
        className={
          "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent "
          //   + (color === "white" ? " text-gray-800" : "text-white")
        }
        onClick={(e) => e.preventDefault()}
      >
        Action
      </a>
      <a
        href="#pablo"
        className={
          "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent "
          // + (color === "white" ? " text-gray-800" : "text-white")
        }
        onClick={(e) => e.preventDefault()}
      >
        Another action
      </a>
      <a
        href="#pablo"
        className={
          "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent "
          // + (color === "white" ? " text-gray-800" : "text-white")
        }
        onClick={(e) => e.preventDefault()}
      >
        Something else here
      </a>
      <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
      <a
        href="#pablo"
        className={
          "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent "
          // + (color === "white" ? " text-gray-800" : "text-white")
        }
        onClick={(e) => e.preventDefault()}
      >
        Seprated link
      </a>
    </Dropdown>
  );
}
