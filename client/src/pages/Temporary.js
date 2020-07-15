// import logo from './logo.svg';
import React, { useRef, useState } from "react";
// import "./editorjs/custom/checklist/index.css";
// import { Button, CustomReact } from "./editorjs/plugin";
import EditorJS from "@editorjs/editorjs";
import EditorJs from "@natterstefan/react-editor-js";
import { TOOLS } from "../editorjs/config";

function Temporary() {
  const editorInstance = useRef(null);
  const [data, setData] = useState({
    blocks: [
      {
        type: "header",
        data: {
          text: "Editor.js ksjflhfuzu",
          level: 1,
        },
      },
      {
        type: "header",
        data: {
          text: "CustomReact Plugin",
          level: 2,
        },
      },
      {
        type: 'image',
        data: {
          url: "https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
          caption: ''
        }
      }
      // {
      //   type: "header",
      //   data: {
      //     text: "CustomJS Plugin",
      //     level: 2,
      //   },
      // },
      // {
      //   type: "customJs",
      //   data: {},
      // },
    ],
  });

  const onReady = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Editor.js is ready to work!");
  };

  const onChange = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Now I know that Editor's content changed!");
  };

  const onSave = async () => {
    if (editorInstance.current) {
      try {
        const outputData = await editorInstance.current.save();
        console.log(outputData);
        setData(outputData);
        //action('EditorJs onSave')(outputData)
      } catch (e) {
        //action('EditorJs onSave failed')(e)
      }
    }
  };

  return (
    <div>
      <button
        style={{
          cursor: "pointer",
          outline: "none",
          background: "lightgray",
          border: 0,
          display: "flex",
          margin: "0 auto",
          padding: "5px 10px",
          borderRadius: 5,
        }}
        onClick={onSave}
      />
      <EditorJs
        // tools={{ ...TOOLS, customReact: {class: CustomReact, inlineToolbar: true, shortcut: 'SHIFT+T'}}}
        tools={TOOLS}
        data={data}
        editorInstance={(instance) => {
          editorInstance.current = instance;
          // action("EditorJs editorInstance")(editorInstance);
        }}
        onChange={onChange}
        onReady={onReady}
      />
    </div>
  );
}

export default Temporary;
