import React from "react";
import Dropdown from "./Dropdown";

export default function PlusDropdown({
  setShowNoteModal,
  setShowFolderModal,
  tree,
  setSelectedFolder,
  id,
  isShowing,
  setIsShowing,
}) {
  return (
    <Dropdown
      id={id}
      isShowing={isShowing}
      setIsShowing={setIsShowing}
      buttonStyles="rounded hover:shadow-md focus:shadow-md outline-none focus:outline-none bg-gray-100"
      // Plus button icon
      innerButton={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          className="text-brandBlue-A"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      }
      dropdownStyles="text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-8 sm:mt-1 bg-white"
    >
      {/* Dropdown menu options */}
      <button
        className={
          "focus:outline-none text-left text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-gray-200"
        }
        onClick={() => {
          setShowNoteModal(true);
          setSelectedFolder(tree[0]);
        }}
      >
        Add New Note
      </button>
      <button
        className={
          "focus:outline-none text-left text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-gray-200"
        }
        onClick={() => {
          setShowFolderModal(true);
          setSelectedFolder(tree[0]);
        }}
      >
        Add New Folder
      </button>
    </Dropdown>
  );
}