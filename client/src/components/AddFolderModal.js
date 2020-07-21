import React from "react";
import Modal from "./Modal";
import TreeView from "./TreeView";

export default function AddFolderModal({
  closeOnClick,
  saveOnClick,
  showModal,
  setShowModal,
  onTitleChange,
  tree,
  setSelectedFolder,
  selectedFolder,
  title
}) {
  return (
    <Modal
      closeOnClick={closeOnClick}
      saveOnClick={saveOnClick}
      showModal={showModal}
      setShowModal={setShowModal}
      title={title}
    >
      <div
        className="overflow-y-auto"
        style={{ height: "10rem" }}
      >
        <TreeView
          node={tree[0]}
          level={-1}
          tree={tree}
          setSelectedFolder={setSelectedFolder}
        />
      </div>
      <div>
        <label
          className="block text-gray-500 font-bold my-2"
          htmlFor="inline-full-name"
        >
          New folder name:
        </label>

        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
          onChange={onTitleChange}
        ></input>

        <h2>Folder: {selectedFolder.title}</h2>
      </div>
    </Modal>
  );
}
