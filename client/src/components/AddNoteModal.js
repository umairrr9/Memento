import React from "react";
import AddItemModal from "./AddItemModal";

export default function AddNoteModal({
  closeOnClick,
  saveOnClick,
  showModal,
  onTitleChange,
  tree,
  setSelectedFolder,
  selectedFolder,
}) {
  return (
    <AddItemModal
      modalTitle="Add a new note"
      labelTitle="New note name:"
      closeOnClick={closeOnClick}
      saveOnClick={saveOnClick}
      onTitleChange={onTitleChange}
      showModal={showModal}
      tree={tree}
      setSelectedFolder={setSelectedFolder}
      selectedFolder={selectedFolder}
    />
  );
}
