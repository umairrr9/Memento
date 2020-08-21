import React from "react";
import DeleteItemModal from "./DeleteItemModal";

export default function DeleteFolderModal({
    closeOnClick,
    saveOnClick,
    showModal,
    tree,
    setSelectedFolder,
    selectedFolder,
    isDeleteNote
  }) {
    return (
      <DeleteItemModal
        modalTitle="Delete an item"
        labelTitle="The item's contents will be deleted."
        closeOnClick={closeOnClick}
        saveOnClick={saveOnClick}
        showModal={showModal}
        tree={tree}
        setSelectedFolder={setSelectedFolder}
        selectedFolder={selectedFolder}
        isDeleteNote={isDeleteNote}
      />
    );
  }