import React from "react";
import RenameItemModal from "./RenameItemModal";

export default function RenameFolderModal({
  closeOnClick,
  saveOnClick,
  showModal,
  onTitleChange,
  tree,
  setSelectedFolder,
  selectedFolder,
}) {
  return (
    <RenameItemModal
      modalTitle="Rename a folder"
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