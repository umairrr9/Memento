// import logo from './logo.svg';
import React, { useRef, useState, useEffect } from "react";
// import "./editorjs/custom/checklist/index.css";
// import { Button, CustomReact } from "./editorjs/plugin";
import EditorJS from "@editorjs/editorjs";
import EditorJs from "@natterstefan/react-editor-js";
import { TOOLS } from "../editorjs/config";
import SideNav from "../components/SideNav";

// TODO Convert page to pdf: https://itnext.io/javascript-convert-html-css-to-pdf-print-supported-very-sharp-and-not-blurry-c5ffe441eb5e

function Temporary() {
  const editorInstance = useRef(null);
  const [isNavOpen, setNavOpen] = useState(false);
  const [data, setData] = useState({
    blocks: [],
  });

  // useEffect(() => {
  //   // document.getElementById('root').classList.append('duration-500');
  //   // className="" style={{marginLeft: `${isNavOpen ? "14rem" : "0"}`}
  //   if (isNavOpen) {
  //     document.getElementById('root').style.marginLeft = '14rem';
  //   } else {
  //     document.getElementById('root').style.marginLeft = '0';
  //   } 
    
  //   // return () => {
  //   //   cleanup
  //   // }
  // }, [isNavOpen]);

  const onReady = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Editor.js is ready to work!");
  };

  const onChange = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Now I know that Editor's content changed!");
    onSave();
  };

  const onSave = async () => {
    if (editorInstance.current) {
      try {
        const outputData = await editorInstance.current.save();
        console.log(outputData);
        setData(outputData);
      } catch (e) {
        //action('EditorJs onSave failed')(e)
      }
    }
  };

  return (
    <>
      <SideNav isNavOpen={isNavOpen} setNavOpen={setNavOpen}/>
      <main className={"duration-500 " + (isNavOpen ? "ml-36 sm:ml-0" : "")} /*style={{marginLeft: `${isNavOpen ? "14rem" : "0"}`}}*/>
        <nav className="bg-gray-100">
          <nav className={"flex items-center justify-start "}>
            <button type="button" className="ml-2 text-xl block text-gray-900 hover:text-black focus:text-black focus:outline-none" onClick={() => setNavOpen(!isNavOpen)}>&#9776;</button>
            <h2 className="ml-2 text-sm">Biology Notes</h2>
          </nav>
        </nav>
        <div className="pt-2 px-4 sm:px-0"> 
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

export default Temporary;