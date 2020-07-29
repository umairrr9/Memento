import React from "react";
import DeleteItemModal from "./DeleteItemModal";

export default function DeleteFolderModal({
    closeOnClick,
    saveOnClick,
    showModal,
    onTitleChange,
    tree,
    setSelectedFolder,
    selectedFolder,
  }) {
    return (
      <DeleteItemModal
        modalTitle="Delete a folder"
        labelTitle="The folders contents will be deleted."
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