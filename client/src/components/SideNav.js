import React from "react";
import TreeView from "./TreeView";
import { HashLink as Link } from "react-router-hash-link";

export default function SideNav({ isNavOpen, tree, setSelectedNote }) {
  return (
    // If the nav bar is open, display the tree of notes and folders
    <div
      className={
        "top-0 left-0 overflow-x-auto duration-500 fixed h-full bg-gray-100 z-10 " +
        (isNavOpen ? "w-32 sm:w-56" : "w-0")
      }
    >
      {isNavOpen ? (
        <>
        <div className="w-full h-8 px-3 pt-1">
          <Link
            className="text-xl text-brandBlue-A font-inter outline-none focus:outline-none focus:text-brandBlue-B hover:text-brandBlue-B"
            to="/"
          >
            Memento
          </Link>
          </div>
          <div className="p-3">
            <TreeView
              node={tree[0]}
              level={-1}
              tree={tree}
              setSelectedNote={setSelectedNote}
              isRedirecting={true}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
