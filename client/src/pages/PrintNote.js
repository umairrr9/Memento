import React, { useState, useEffect, useRef } from "react";
import EditorJs from "@natterstefan/react-editor-js";
import TOOLS from "../editorjs/config";

export default function PrintNote() {
  const editorInstance = useRef(null);
  const [editorLoading, setEditorLoading] = useState(true);
  const [data, setData] = useState({});
  const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:80/api" : "/api";

  function getNote(noteId) {
    let url = API_URL + `/notes/${noteId}`;
    return fetch(url, {
      method: "GET",
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }

  useEffect(() => {
    const noteId =
      new URLSearchParams(window.location.search).get("note") || "";
    if (noteId !== "") {
      getNote(noteId)
        .then((json) => {
          if (json.error) throw new Error();
          // set the editor js data
          setData(json.note);
          // set editor loading to false
          setEditorLoading(false);
        })
        .catch(() => {
          alert("Sorry, this note couldn't be found.");
          window.location.href = "/note";
        });
    }
  }, []);

  return (
    <div className="pointer-events-none">
      {!editorLoading ? (
        <EditorJs
          tools={TOOLS}
          data={data}
          editorInstance={(instance) => {
            editorInstance.current = instance;
          }}
          onReady={() => setTimeout(() => window.print(), 2000)}
        />
      ) : null}
    </div>
  );
}
