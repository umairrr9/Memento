import React from "react";
import Dropdown from "./Dropdown";

export default function SettingsDropdown(
  {
    //   buttonStyles,
    //   buttonOnClick,
    //   innerButton,
    //   children,
    //   dropdownStyles,
    id,
    isShowing,
    setIsShowing
  }
) {
  return (
    <Dropdown
      id={id}
      isShowing={isShowing}
      setIsShowing={setIsShowing}
      buttonStyles="rounded hover:shadow-md outline-none focus:outline-none bg-gray-100"
      innerButton={
        <svg height={24} viewBox="0 0 24 24" width={24} className="text-brandBlue-A">
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="currentColor" d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      }
      dropdownStyles="text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 bg-white"
    >
      <a
        className={
          "text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent"
          //   + (color === "white" ? " text-gray-800" : "text-white")
        }
        onClick={(e) => e.preventDefault()}
      >
        Delete
      </a>
      <a
        className={
          "text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent"
          // + (color === "white" ? " text-gray-800" : "text-white")
        }
        onClick={(e) => e.preventDefault()}
      >
        Rename
      </a>
      <a
        className={
          "text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent"
          // + (color === "white" ? " text-gray-800" : "text-white")
        }
        onClick={(e) => e.preventDefault()}
      >
        Export
      </a>
    </Dropdown>
  );
}
