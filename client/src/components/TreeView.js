import React, { useRef, useState } from "react";

const TreeView = ({ tree, level }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      {tree.map((t) => (
          <React.Fragment key={t.id}>
            <div
              className="flex items-center"
              style={{
                marginLeft: `${level / 2}rem`,
                cursor: `${t.children ? "pointer" : ""}`,
              }}
              onClick={() => {
                if (t.children) setOpen(!isOpen);
              }}
            >
              <span className={t.children ? "" : "hidden"}>
                {!isOpen ? (
                  <span className="text-xl">&#9656; </span>
                ) : (
                  <span className="text-xl">&#9662; </span>
                )}
              </span>
              <h2 className="py-1 border-b-2 truncate">{t.title}</h2>
            </div>
            {t.children && (
              <div className={!isOpen ? "hidden" : ""}>
                <TreeView tree={t.children} level={level + 1}></TreeView>
              </div>
            )}
          </React.Fragment>
        ))}
    </>
  );
};

export default TreeView;
