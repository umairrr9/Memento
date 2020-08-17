import React from "react";
import TreeView from "./TreeView";

function SideNav({ isNavOpen, tree, setSelectedNote }) {
  return (
    <div
      className={
        "top-0 left-0 overflow-x-hidden duration-500 fixed h-full bg-gray-100 z-10 " +
        (isNavOpen ? "w-32 sm:w-56" : "w-0")
      }
    >
      {isNavOpen ? (
        <>
          <div className="mb-6 flex items-center h-8 px-3 hover:bg-gray-400">
            <h3 className="max-w-full truncate">Harris</h3>
          </div>
          <div className="px-3">
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

// https://medium.com/@swatisucharita94/recursive-rendering-in-react-42666102eae2
// https://draftjs.org/
// https://codesandbox.io/embed/react-editor-js-23opz

export default SideNav;
