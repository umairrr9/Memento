import React, { useState } from "react";
import { Link } from "react-router-dom";

function SideNav() {
  const tree = [
    {
      title: "Beverages",
      id: 1,
      children: [
        { title: "Coke", id: 2, value: "500ml bottle" },
        { title: "Water", id: 3, value: "2L bottle" },
        {
          title: "Fanta",
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
    <div>
      <TreeView tree={tree} level={0} />
    </div>
  );
}

// https://medium.com/@swatisucharita94/recursive-rendering-in-react-42666102eae2

const TreeView = ({ tree, level }) => {

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      {tree.map((t) => (
        <React.Fragment key={t.id}>
          <h2 style={{ marginLeft: `${level / 2}rem` }} onClick={() => setOpen(!isOpen)}>
            <span className={t.children ? "" : "hidden"}>{isOpen ? "⇒" : "⇓"} </span>{t.title}</h2>
          {t.children && <div className={isOpen && "hidden"}>
            <TreeView tree={t.children} level={level + 1}></TreeView>
          </div>}
        </React.Fragment>
      ))}
    </>
  );
};

export default SideNav;
