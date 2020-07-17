import React, { useRef, useState } from "react";
// import EditorJS from "@editorjs/editorjs";
import EditorJs from "@natterstefan/react-editor-js";
import { TOOLS } from "../editorjs/config";
import SideNav from "../components/SideNav";

// TODO Convert page to pdf: https://itnext.io/javascript-convert-html-css-to-pdf-print-supported-very-sharp-and-not-blurry-c5ffe441eb5e

function Note() {
  const editorInstance = useRef(null);
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
  const [isNavOpen, setNavOpen] = useState(false);
  const [data, setData] = useState({
    blocks: [
      {
        type: "quote",
        data: {
          text: "The unexamined life is not worth living.",
        },
      },
    ],
  });
  const [numKeyPresses, setKeyPresses] = useState(0);

  const onReady = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Editor.js is ready to work!");
  };

  const onChange = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Now I know that Editor's content changed!");
    // onSave();
  };

  const onSave = async () => {
    if (editorInstance.current) {
      try {
        const outputData = await editorInstance.current.save();
        console.log(outputData);
        setData(outputData);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // if the keyboard has been pressed a few times, save the note
  const handleKeyPress = async () => {
    if (numKeyPresses >= 6) {
      onSave();
      setKeyPresses(0);
    } else {
      setKeyPresses(numKeyPresses + 1);
    }
  };

  return (
    <>
      <SideNav isNavOpen={isNavOpen} tree={tree} />
      <main className={"overflow-x-hidden sm:overflow-x-visible duration-500 " + (isNavOpen ? "ml-32 sm:ml-56" : "")}>
        <nav className={"bg-gray-100 flex items-center justify-start h-8 "}>
          <button
            type="button"
            className="ml-2 text-xl block text-gray-900 hover:text-black focus:text-black focus:outline-none"
            onClick={() => setNavOpen(!isNavOpen)}
          >
            {isNavOpen ? (
              <span>
                <svg
                  viewBox="0 0 14 14"
                  className="fill-current"
                  style={{
                    width: 14,
                    height: 14,
                    flexShrink: 0,
                    backfaceVisibility: "hidden",
                  }}
                  display="block"
                >
                  <path d="M7 2.225L5.775 1 0 7.125l5.775 6.125L7 12.025l-4.55-4.9L7 2.225zm7 0L12.775 1 7 7.125l5.775 6.125L14 12.025l-4.55-4.9 4.55-4.9z" />
                </svg>
              </span>
            ) : (
              <span>&#9776;</span>
            )}
          </button>
          <h2 className="ml-2 text-sm">Biology Notes</h2>
        </nav>
        <div className="pt-2 px-4 md:px-12 lg:px-0" onKeyPress={handleKeyPress}>
          <EditorJs
            tools={TOOLS}
            data={data}
            editorInstance={(instance) => {
              editorInstance.current = instance;
            }}
            onChange={onChange}
            onReady={onReady}
          />
        </div>
      </main>
    </>
  );
}

export default Note;
