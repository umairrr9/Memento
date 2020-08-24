import React from "react";
import Modal from "./Modal";
import TreeView from "./TreeView";

export default function RenameItemModal({
  closeOnClick,
  saveOnClick,
  showModal,
  onTitleChange,
  tree,
  setSelectedFolder,
  selectedFolder,
  modalTitle,
  labelTitle,
  isRenameNote
}) {
  return (
    <Modal
      closeOnClick={closeOnClick}
      saveOnClick={saveOnClick}
      showModal={showModal}
      modalTitle={modalTitle}
    >
      <div className="overflow-y-auto overflow-x-auto my-4" style={{ height: "10rem" }}>
        <TreeView
          node={tree[0]}
          level={-1}
          tree={tree}
          setSelectedFolder={setSelectedFolder}
          isRenameNote={isRenameNote}
        />
      </div>
      <div>
        <h2 className="text-gray-500 font-bold my-2">Selected: {selectedFolder && selectedFolder.title}</h2>

        <label
          className="block text-gray-500 font-bold my-2"
          htmlFor="inline-full-name"
        >
          {labelTitle}
        </label>

        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-brandBlue-A"
          id="inline-full-name"
          type="text"
          onChange={onTitleChange}
        ></input>
      </div>
    </Modal>
  );
}
