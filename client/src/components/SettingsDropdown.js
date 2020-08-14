import React from "react";
import Dropdown from "./Dropdown";

export default function SettingsDropdown(
  {
    id,
    isShowing,
    setIsShowing,
    setShowDeleteNoteModal,
    setShowDeleteFolderModal,
    setShowRenameNoteModal,
    setShowRenameFolderModal,
    setSelectedFolder,
    tree,
    selectedNote,
    guest
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
            "text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-gray-200"
            //   + (color === "white" ? " text-gray-800" : "text-white")
          }
          // onClick={(e) => e.preventDefault()}
          onClick={() => {
            setShowDeleteFolderModal(true);

            setSelectedFolder(tree[0]);
          }}
        >
          Delete Folder
        </a>

          <a
            className={
              "text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-gray-200"
              //   + (color === "white" ? " text-gray-800" : "text-white")
            }
            // onClick={(e) => e.preventDefault()}
            onClick={() => {
              setShowDeleteNoteModal(true);

              setSelectedFolder(tree[0]);
            }}
          >
            Delete Note
        </a>

          <a
            className={
              "text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-gray-200"
              // + (color === "white" ? " text-gray-800" : "text-white")
            }
            // onClick={(e) => e.preventDefault()}
            onClick={() => {

              setShowRenameFolderModal(true);

              setSelectedFolder(tree[0]);
            }}
          >
            Rename Folder
        </a>

          <a
            className={
              "text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-gray-200"
              // + (color === "white" ? " text-gray-800" : "text-white")
            }
            // onClick={(e) => e.preventDefault()}
            onClick={() => {

              setShowRenameNoteModal(true);

              setSelectedFolder(tree[0]);
            }}
          >
            Rename Note
        </a>

      {selectedNote ? <a
        className={
          "text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-gray-200"
          // + (color === "white" ? " text-gray-800" : "text-white")
        }
        // onClick={() => window.location.href=`/print?note=${selectedNote.noteId}`}
        onClick={() => window.open(`/print?note=${selectedNote.noteId}`, '_blank')}
      >
        Print
      </a> : null}
    </Dropdown>
  );
}
