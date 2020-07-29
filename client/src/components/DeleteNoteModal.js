import React from "react";
import DeleteItemModal from "./DeleteItemModal";

export default function DeleteNoteModal({
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
        modalTitle="Delete a note"
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