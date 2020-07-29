import React from "react";
import AddItemModal from "./AddItemModal";

export default function AddFolderModal({
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
      modalTitle="Add a new folder"
      labelTitle="New folder name:"
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
