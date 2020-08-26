import React, { useState } from "react";

const TreeView = ({
  node,
  tree,
  level,
  setSelectedFolder,
  setSelectedNote,
  isRedirecting,
  isRenameNote,
  isDeleteNote,
}) => {
  const [isOpen, setOpen] = useState(node.parentId === null ? true : false);
  let children = tree.filter((n) => n.parentId === node.id);

  return (
    <>
      {node.title && (
        <div
          className="flex items-center"
          key={node.id}
          style={{
            marginLeft: `${level}rem`,
            cursor: `pointer`,
          }}
          onClick={() => {
            setOpen(!isOpen);
            if (isDeleteNote) {
              setSelectedFolder(node);
            } else if (isRenameNote) {
              if (node.noteId) setSelectedFolder(node);
            } else {
              if (node.noteId && isRedirecting)
                window.location.href = `/note?note=${node.noteId}`;
              if (!node.noteId && setSelectedFolder) setSelectedFolder(node);
            }
          }}
        >
          {!node.noteId ? (
            <span className="text-xl">
              {!isOpen ? <span>&#9656; </span> : <span>&#9662; </span>}
            </span>
          ) : null}
          <h2 className="py-1 border-b-2 hover:border-gray-400">
            {node.title}
          </h2>
        </div>
      )}
      <div className={!isOpen ? "hidden" : ""}>
        {children.length >= 1 ? (
          children.map((t) => (
            <React.Fragment key={t.id}>
              <TreeView
                node={t}
                tree={tree}
                level={level + 1}
                setSelectedFolder={setSelectedFolder}
                setSelectedNote={setSelectedNote}
                isRedirecting={isRedirecting}
                isRenameNote={isRenameNote}
                isDeleteNote={isDeleteNote}
              ></TreeView>
            </React.Fragment>
          ))
        ) : !node.noteId ? (
          <h3
            className="text-gray-700 text-sm my-1"
            style={{
              marginLeft: `${level + 1}rem`,
            }}
          >
            No pages inside
          </h3>
        ) : null}
      </div>
    </>
  );
};

export default TreeView;