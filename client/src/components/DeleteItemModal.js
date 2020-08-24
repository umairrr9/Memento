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
    isDeleteNote,
    modalTitle,
    labelTitle,
  }) {
    return (
      <Modal
        closeOnClick={closeOnClick}
        saveOnClick={saveOnClick}
        showModal={showModal}
        modalTitle={"Delete Note or Folder"}
        labelTitle={"Deleting a folder will remove notes/folders within."}
      >
        
        <div className="overflow-y-auto overflow-x-auto my-4" style={{ height: "10rem" }}>
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
      // <DeleteItemModal
      //   modalTitle="Delete an item"
      //   labelTitle="The item's contents will be deleted."
      //   closeOnClick={closeOnClick}
      //   saveOnClick={saveOnClick}
      //   showModal={showModal}
      //   tree={tree}
      //   setSelectedFolder={setSelectedFolder}
      //   selectedFolder={selectedFolder}
      //   isDeleteNote={isDeleteNote}
      // />
    );
  }