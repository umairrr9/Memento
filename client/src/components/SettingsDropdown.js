import React from "react";
import Dropdown from "./Dropdown";

export default function SettingsDropdown({
  id,
  isShowing,
  setIsShowing,
  setShowDeleteItemModal,
  setShowRenameNoteModal,
  setShowRenameFolderModal,
  setSelectedFolder,
  tree,
  selectedNote,
  setShowProfileModal,
  showProfileModal,
  logout,
  onSave,
}) {
  return (
    <Dropdown
      id={id}
      isShowing={isShowing}
      setIsShowing={setIsShowing}
      buttonStyles="rounded hover:shadow-md focus:shadow-md outline-none focus:outline-none bg-gray-100"
      // 3 dots icon
      innerButton={
        <svg
          height={24}
          viewBox="0 0 24 24"
          width={24}
          className="text-brandBlue-A"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="currentColor"
            d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
          />
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
          setShowDeleteItemModal(true);

          setSelectedFolder(tree[0]);
        }}
      >
        Delete Note/Folder
      </button>

      <button
        className={
          "focus:outline-none text-left text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-gray-200"
        }
        onClick={() => {
          setShowRenameFolderModal(true);

          setSelectedFolder(tree[0]);
        }}
      >
        Rename Folder
      </button>

      <button
        className={
          "focus:outline-none text-left text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-gray-200"
        }
        onClick={() => {
          setShowRenameNoteModal(true);

          setSelectedFolder(tree[0]);
        }}
      >
        Rename Note
      </button>

      {selectedNote ? (
        <button
          className={
            "focus:outline-none text-left text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-gray-200"
          }
          onClick={() => {
            onSave();
            window.open(`/print?note=${selectedNote.noteId}`, "_blank");
          }}
        >
          Print
        </button>
      ) : null}

      <button
        className={
          "focus:outline-none text-left text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-gray-200"
        }
        onClick={() => setShowProfileModal(!showProfileModal)}
      >
        Profile
      </button>

      <button
        className={
          "focus:outline-none text-left text-sm text-brandBlue-A cursor-pointer py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-gray-200"
        }
        onClick={() => logout()}
      >
        Logout
      </button>
    </Dropdown>
  );
}