import React from "react";
import Modal from "./Modal";
import TreeView from "./TreeView";

export default function DeleteItemModal({
    closeOnClick,
    saveOnClick,
    showModal,
    tree,
    setSelectedFolder,
    selectedFolder,
    modalTitle,
    labelTitle,
    isDeleteNote
  }) {
    return (
      <Modal
        closeOnClick={closeOnClick}
        saveOnClick={saveOnClick}
        showModal={showModal}
        modalTitle={modalTitle}
      >
        <div className="overflow-y-auto my-4" style={{ height: "10rem" }}>
          <TreeView
            node={tree[0]}
            level={-1}
            tree={tree}
            setSelectedFolder={setSelectedFolder}
            isDeleteNote={isDeleteNote}
          />
        </div>
        <div>
          <h2 className="text-gray-500 font-bold my-2">Selected folder: {selectedFolder && selectedFolder.title}</h2>
  
          <label
            className="block text-gray-500 font-bold my-2"
            htmlFor="inline-full-name"
          >
            {labelTitle}
          </label>
        </div>
      </Modal>
    );
  }