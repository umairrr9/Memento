import React from "react";
import Dropdown from "./Dropdown";
// const [showFolderModal, setShowFolderModal] = useState(false);

export default function PlusDropdown(
  {
    //   buttonStyles,
    //   buttonOnClick,
    //   innerButton,
    //   children,
    //   dropdownStyles,

    setShowNoteModal,
    setShowFolderModal,
    tree,
    setSelectedFolder,
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
      dropdownStyles="text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 bg-white"
    >
      <a
        className={
          "text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-gray-200"
          //   + (color === "white" ? " text-gray-800" : "text-white")
        }
        // onClick={(e) => e.preventDefault()}
        onClick={() => {
          setShowNoteModal(true);
          setSelectedFolder(tree[0]);
        }}
      >
        Add New Note
      </a>
      <a
        className={
          "text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-gray-200"
          // + (color === "white" ? " text-gray-800" : "text-white")
        }
        // onClick={(e) => e.preventDefault()}
        onClick={() => {
          setShowFolderModal(true);
          setSelectedFolder(tree[0]);
        }}
      >
        Add New Folder
      </a>
    </Dropdown>
  );
}
