import React, { useState } from "react";
import { Link } from "react-router-dom";

function SideNav({isNavOpen, setNavOpen}) {
  const tree = [
    {
      title: "Beverages",
      id: 1,
      children: [
        { title: "Coke", id: 2, value: "500ml bottle" },
        { title: "Water", id: 3, value: "2L bottle" },
        {
          title: "Fanta Fruit Twist Fruit TwistFruit Twist",
          id: 4,
          children: [
            { title: "Fruit Twist", id: 5, value: "small can" },
            { title: "Orange", id: 6, value: "test" },
          ],
        },
      ],
    },
    {
      title: "Todo",
      id: 7,
      children: [
        { title: "Go shopping", id: 8, value: "Apples, milk and bread." },
        { title: "Clean room", id: 9, value: "Clean desk, monitor." },
      ],
    },
    { title: "Books", id: 10, value: "Maths" },
  ];

  return (
    <div className={"top-0 left-0 overflow-x-hidden duration-300 fixed h-full bg-gray-100 z-10 " + (isNavOpen ? "w-36 sm:w-56 p-3" : "w-0")}>
      {
        isNavOpen && tree.map((t, i) => (
          <TreeView tree={[t]} key={i} level={0}/>
        ))
      }
    </div>
  );
}

// https://medium.com/@swatisucharita94/recursive-rendering-in-react-42666102eae2
// https://draftjs.org/
// https://codesandbox.io/embed/react-editor-js-23opz

const TreeView = ({ tree, level }) => {

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      {tree.map((t) => (
        <React.Fragment key={t.id}>
          <div className="flex items-center" style={{ marginLeft: `${level / 2}rem`, cursor: `${t.children ? 'pointer' : ''}` }} onClick={() => {if (t.children) setOpen(!isOpen)}}>
            <span className={t.children ? "" : "hidden"}>
              {!isOpen ? <span className="text-xl">&#9656; </span> : <span className="text-xl">&#9662; </span>}
            </span>
            <h2 className="py-1 border-b-2 truncate">{t.title}</h2>
          </div>
          {t.children && <div className={!isOpen ? "hidden" : ""}>
            <TreeView tree={t.children} level={level + 1}></TreeView>
          </div>}
        </React.Fragment>
      ))}
    </>
  );
};

export default SideNav;
