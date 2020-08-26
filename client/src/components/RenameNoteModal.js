import React from "react";
import RenameItemModal from "./RenameItemModal";

export default function RenameNoteModal({
  closeOnClick,
  saveOnClick,
  showModal,
  onTitleChange,
  tree,
  setSelectedFolder,
  selectedFolder,
  isRenameNote,
}) {
  return (
    <RenameItemModal
      modalTitle="Rename a note"
      labelTitle="New note name:"
      closeOnClick={closeOnClick}
      saveOnClick={saveOnClick}
      onTitleChange={onTitleChange}
      showModal={showModal}
      tree={tree}
      setSelectedFolder={setSelectedFolder}
      selectedFolder={selectedFolder}
      isRenameNote={isRenameNote}
    />
  );
}