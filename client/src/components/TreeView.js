import React, { useState } from "react";

// const TreeView = ({ tree, level }) => {
//   const [isOpen, setOpen] = useState(false);

//   return (
//     <>
//       {tree.map((t) => (
//           <React.Fragment key={t.id}>
//             <div
//               className="flex items-center"
//               style={{
//                 marginLeft: `${level / 2}rem`,
//                 cursor: `${t.children ? "pointer" : ""}`,
//               }}
//               onClick={() => {
//                 if (t.children) setOpen(!isOpen);
//               }}
//             >
//               <span className={t.children ? "" : "hidden"}>
//                 {!isOpen ? (
//                   <span className="text-xl">&#9656; </span>
//                 ) : (
//                   <span className="text-xl">&#9662; </span>
//                 )}
//               </span>
//               <h2 className="py-1 border-b-2 truncate">{t.title}</h2>
//             </div>
//             {t.children && (
//               <div className={!isOpen ? "hidden" : ""}>
//                 <TreeView tree={t.children} level={level + 1}></TreeView>
//               </div>
//             )}
//           </React.Fragment>
//         ))}
//     </>
//   );
// };

// import React, { useState } from "react";

const TreeView = ({ node, tree, level, setSelectedFolder }) => {
  const [isOpen, setOpen] = useState(node.parentId === null ? true : false);
  let children = tree.filter((n) => n.parentId === node.id);
  // https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular
  // https://www.creative-tim.com/learning-lab/tailwind-starter-kit/login

  return (
    <>
      {node.title && (
        <span
          className="flex items-center"
          key={node.id}
          style={{
            marginLeft: `${level}rem`,
            cursor: `${!node.noteId ? "pointer" : ""}`,
          }}
          onClick={() => {
            if (children.length >= 1) {
              setOpen(!isOpen);
            } else {
              if (node.noteId) console.log(node.noteId);
            }
            if (!node.noteId) {
              if (setSelectedFolder) setSelectedFolder(node);
              console.log(node);
            }
          }}
        >
          {!node.noteId && (
            <span>
              {!isOpen ? (
                <span className="text-xl">&#9656; </span>
              ) : (
                <span className="text-xl">&#9662; </span>
              )}
            </span>
          )}
          <h2 className="py-1 border-b-2 truncate">{node.title}</h2>
        </span>
      )}
      {children.map((t) => (
        <div className={!isOpen ? "hidden" : ""} key={t.id}>
          <TreeView
            node={t}
            tree={tree}
            level={level + 1}
            setSelectedFolder={setSelectedFolder}
          ></TreeView>
        </div>
      ))}
    </>
  );
};

// export default TreeView;


export default TreeView;
