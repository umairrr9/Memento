import React, { useRef, forwardRef, useState, useEffect } from "react";
// import EditorJS from "@editorjs/editorjs";
import EditorJs from "@natterstefan/react-editor-js";
import TOOLS from "../editorjs/config";
import SideNav from "../components/SideNav";
import AddFolderModal from "../components/AddFolderModal";
import AddNoteModal from "../components/AddNoteModal";
import DeleteFolderModal from "../components/DeleteFolderModal";
import DeleteNoteModal from "../components/DeleteNoteModal";
import RenameFolderModal from "../components/RenameFolderModal";
import RenameNoteModal from "../components/RenameNoteModal";
import Tippy from "@tippy.js/react";
import 'tippy.js/dist/tippy.css';

// import AddItemModal from "../components/AddItemModal";
import folderAdd from "../assets/folder-outline-add.svg";
import noteAdd from "../assets/document-add.svg";
import SettingsDropdown from "../components/SettingsDropdown";
import PlusDropdown from "../components/PlusDropdown";
// import Dropdown from '../components/Dropdown';

// TODO Convert page to pdf: https://itnext.io/javascript-convert-html-css-to-pdf-print-supported-very-sharp-and-not-blurry-c5ffe441eb5e

export default function Note() {
  const editorInstance = useRef(null);
  // const [shouldReinitialize, setShouldReinitialize] = useState(false);
  const [editorLoading, setEditorLoading] = useState(true);
  const [tree, setTree] = useState([
    {
      title: null,
      parentId: null,
      id: 0,
    },
  ]);

  useEffect(() => {
    getNoteTree().then((json) => {
      if (json.error) throw new Error();
      let t = null;
      if (!json.error) {
        t = json.notesTree;
      }
      setTree(t);
      const noteId =
        new URLSearchParams(window.location.search).get("note") || "";
      if (noteId !== "") {
        getNote(noteId).then((json) => {
          if (json.error) throw new Error();
          // set the editor js data
          setData(json.note);
          // set the selected note
          let noteInTree = t.find((obj) => obj.noteId === noteId);
          setSelectedNote(noteInTree);
          // set editor loading to false
          setEditorLoading(false);
        })
          .catch(() => {
            alert("Sorry, this note couldn't be found");
            window.location.href = '/note';
          });
      }
    })
      .catch(() => alert("Sorry, something went wrong, please reload the page."));
  }, []);

  // useEffect(() => {
  //   const noteId =
  //     new URLSearchParams(window.location.search).get("note") || "";
  //   if (noteId !== "") {
  //     getNote(noteId).then((json) => {
  //       // set the editor js data
  //       setData(json.note);
  //       // set the selected note
  //       console.log(tree);
  //       let noteInTree = tree.find((obj) => obj.noteId === noteId);
  //       console.log(noteInTree);
  //       setSelectedNote(noteInTree);
  //       // set editor loading to false
  //       setEditorLoading(false);
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   // TODO: replace with api call
  //   const noteData = new URLSearchParams(window.location.search).get("note") || "";
  //   console.log(notes[noteData]);
  //   if (noteData !== "") {
  //     setData(notes[noteData]);
  //     setEditorLoading(false);
  //   }
  // }, []);

  // const [notes, setNotes] = useState({
  //   test: {
  //     blocks: [
  //       {
  //         type: "header",
  //         data: {
  //           text: "Editor.js",
  //           level: 2,
  //         },
  //       },
  //     ],
  //   },
  //   biotat: {
  //     blocks: [
  //       {
  //         type: "header",
  //         data: {
  //           text: "Biotat",
  //           level: 2,
  //         },
  //       },
  //     ],
  //   },
  // });

  const [data, setData] = useState({});
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [ShowDeleteNoteModal, setShowDeleteNoteModal] = useState(false);
  const [ShowDeleteFolderModal, setShowDeleteFolderModal] = useState(false);
  const [ShowRenameNoteModal, setShowRenameNoteModal] = useState(false);
  const [ShowRenameFolderModal, setShowRenameFolderModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(tree[0]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedDropdown, setSelectedDropdown] = useState(-1);
  const [newTitle, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // function traverse(node, level, tree) {
  //   if (node.title) {console.log(node.title, level);}
  //   let children = tree.filter((n) => n.parentId === node.id);
  //   if (children.length === 0) return;
  //   for (let i in children) {
  //     traverse(children[i], level + 1, tree);
  //   }
  // }

  // let t = null;
  // function deleteFolder(node, tree) {
  //   let newTree = tree;
  //   if (node.title) {
  //     // console.log(node.title, level);
  //     newTree = tree.filter(n => n.id !== node.id);
  //   }
  //   // console.log(newTree);
  //   // setTree(newTree);
  //   t = newTree;
  //   let children = tree.filter((n) => n.parentId === node.id);
  //   if (children.length === 0) {
  //     return;
  //   }
  //   for (let i in children) {
  //     // console.log(children[i]);
  //     deleteFolder(children[i], newTree);
  //   }
  // }

  // function deleteFolder(node, tree) {
  //   let newTree = null;
  //   if (node.title) {
  //     newTree = [];
  //     for (let i = 1; i < tree.length; i++) {
  //       if (tree[i].noteId) {
  //         try {
  //           deleteNote(tree[i].noteId).then(json => {
  //             console.log(json);
  //           });
  //         } catch (err) { }
  //       }
  //       if (tree[i].parentId !== node.id) newTree.push(tree[i]);
  //     }
  //   }
  //   let children = tree.filter((n) => n.parentId === node.id);
  //   if (children.length === 0) return;
  //   for (let i in children) {
  //     deleteFolder(children[i], tree);
  //   }
  // }

  // let t = null;
  // function deleteFolder(node, tree) {
  //   let newTree = [];
  //   // newTree = tree.filter(n => n.parentId !== node.id);
  //   // newTree = newTree.filter(n => n.id !== node.id);
  //   for (let i = 1; i < tree.length; i++) {
  //     if (tree[i].noteId) {
  //       try {
  //         deleteNote(tree[i].noteId).then(json => {
  //           console.log(json);
  //         });
  //       } catch (err) {}
  //     }
  //     if (tree[i].parentId !== node.id) newTree.push(tree[i]);
  //   }
  //   newTree = newTree.filter(n => n.id !== 0 && n.id !== node.id);
  //   setTree(newTree);
  //   console.log("hi", newTree);
  // }

  function deleteNote(noteId) {
    let url = `http://localhost:80/api/notes/${noteId}`;

    return fetch(url, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then((json) => {
        return json;
      })
  }

  function setNote(noteId, note) {
    let url = `http://localhost:80/api/notes/${noteId}`;
    let body = JSON.stringify({ note });

    return fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }

  function getNote(noteId) {
    let url = `http://localhost:80/api/notes/${noteId}`; // 5f1c1dde949f0c004c51b99e
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

  function createNewNote() {
    let url = `http://localhost:80/api/notes`;
    let body = JSON.stringify({ userId: "5f19c98a0c9e490b498f1f0d" });

    return fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }

  function getNoteTree() {
    let url = `http://localhost:80/api/users/5f19c98a0c9e490b498f1f0d/notesTree`;

    return fetch(url, {
      method: "GET",
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
        // console.log(json);
        // if (!json.error) {
        //   setTree(json.notesTree);
        // }
      });
  }

  function setNoteTree(tree) {
    let url = `http://localhost:80/api/users/5f19c98a0c9e490b498f1f0d/notesTree`;
    let body = JSON.stringify({ notesTree: tree });

    return fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }

  function addFolder(parentFolderId, title, tree) {
    if (!(title.length >= 1)) return;
    let id = tree.length + 1;
    let folder = { parentId: parentFolderId, title, id };
    let newTree = tree;
    newTree.push(folder);
    setNoteTree(newTree)
      .then((json) => {
        if (json.error) {
          // alert("Sorry, the folder couldn't be added, try again later.");
          // return;
          throw new Error();
        }
        setTree(newTree);
      })
      .catch(() =>
        alert("Sorry, the folder couldn't be added, try again later.")
      );
  }

  function addNote(parentFolderId, title, tree) {
    if (!(title.length >= 1)) return;
    //let noteId = id.toString(); // later get note id from api
    createNewNote()
      .then((json) => {
        if (json.error) {
          // alert("Sorry, the note couldn't be added. Please try again later.");
          // return;
          throw new Error();
        }
        let id = tree.length + 1;
        let folder = {
          parentId: parentFolderId,
          title,
          id,
          noteId: json.noteId,
        };
        let newTree = tree;
        newTree.push(folder);
        console.log(newTree);
        setNoteTree(newTree);
        setTree(newTree);
      })
      .catch(() =>
        alert("Sorry, the note couldn't be added. Please try again later.")
      );
  }

  function renameItem(id, newTitle, tree) {
    if (!(newTitle.length >= 1)) return;
    // let id = tree.length + 1;
    //let folder = { parentId: parentFolderId, title: newTitle, id };
    let itemIndex = tree.findIndex(n => n.id === id);
    let newTree = tree;
    newTree[itemIndex].title = newTitle;
    setNoteTree(newTree)
      .then((json) => {
        if (json.error) {
          // alert("Sorry, the folder couldn't be added, try again later.");
          // return;
          throw new Error();
        }
        setTree(newTree);
      })
      .catch(() =>
        alert("Sorry, the item couldn't be renamed, try again later.")
      );
  }

  const [isNavOpen, setNavOpen] = useState(false);
  const [numKeyPresses, setKeyPresses] = useState(0);

  const onReady = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Editor.js is ready to work!");
  };

  const onChange = (api) => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Now I know that Editor's content changed!");
  };

  const onSave = async () => {
    // setShouldReinitialize(false);
    if (editorInstance.current) {
      try {
        // console.log(editorInstance.current);
        const outputData = await editorInstance.current.save();
        console.log(outputData);
        setNote(selectedNote.noteId, outputData).then(json => {
          setIsSaving(true);
          if (json.error) {
            throw new Error();
          }
          console.log(json.newNote);
        })
          .catch(() => alert("The note couldn't be saved in the database"))
          .finally(() => setTimeout(() => {
            setIsSaving(false);
          }, 1000));

        // data = outputData;
        setData(outputData);
        // TODO: update note in db via api call
      } catch (e) {
        console.error(e);
      }
    }
  };

  // if the keyboard has been pressed a few times, save the note
  const handleKeyPress = async () => {
    if (editorLoading) return;
    if (numKeyPresses >= 6) {
      onSave();
      setKeyPresses(0);
    } else {
      setKeyPresses(numKeyPresses + 1);
    }
  };

  return (
    <>
      <SideNav
        isNavOpen={isNavOpen}
        tree={tree}
        setSelectedNote={setSelectedNote}
      />
      <main
        className={
          "overflow-x-hidden sm:overflow-x-visible duration-500 " +
          (isNavOpen ? "ml-32 sm:ml-56" : "")
        }
      >
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
          <h2 className="ml-2 text-sm">{selectedNote && selectedNote.title}</h2>
          {isSaving && <h3 className="ml-3 text-gray-700 font-hairline text-sm">Saving...</h3>}
          <div className="flex items-center ml-auto">
            {/* <button className="focus:outline-none px-2">
              <img
                className="w-6 h-auto"
                onClick={() => {
                  setShowFolderModal(true);
                  setSelectedFolder(tree[0]);
                }}
                src={folderAdd}
                alt="Add Folder sign"
              />
            </button>
            <button className="focus:outline-none px-2">
              <img
                className="w-6 h-auto"
                onClick={() => {
                  setShowNoteModal(true);
                  setSelectedFolder(tree[0]);
                }}
                src={noteAdd}
                alt="Add Note sign"
              />
            </button> */}
            <Tippy content="Save">
              <button onClick={onSave} className="focus:outline-none px-2">
                <svg height={24} viewBox="0 0 24 24" width={24} className="text-brandBlue-A">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path fill="currentColor" d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />
                </svg>
              </button>
            </Tippy>
            <SettingsDropdown id={1} tree={tree} setSelectedFolder={setSelectedFolder} isShowing={selectedDropdown} setIsShowing={setSelectedDropdown} setShowDeleteNoteModal={setShowDeleteNoteModal} setShowDeleteFolderModal={setShowDeleteFolderModal} setShowRenameNoteModal={setShowRenameNoteModal} setShowRenameFolderModal={setShowRenameFolderModal} />
            <PlusDropdown id={2} isShowing={selectedDropdown} setIsShowing={setSelectedDropdown} setSelectedFolder={setSelectedFolder} tree={tree} setShowNoteModal={setShowNoteModal} setShowFolderModal={setShowFolderModal} />
          </div>
          {/* <svg viewBox="0 0 20 20" className="text-brandBlue-A w-6 h-auto fill-current">
      <path
        // fill="currentColor"
        d="M9 10V8h2v2h2v2h-2v2H9v-2H7v-2h2zm-5 8h12V6h-4V2H4v16zm-2 1V0h12l4 4v16H2v-1z"
      />
    </svg>

    <svg viewBox="0 0 20 20">
      <path d="M0 4c0-1.1.9-2 2-2h7l2 2h7a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V4zm2 2v10h16V6H2zm7 4V8h2v2h2v2h-2v2H9v-2H7v-2h2z" />
    </svg> */}
        </nav>
        <div className="pt-2 px-4 md:px-12 lg:px-0" onKeyPress={handleKeyPress}>
          {!editorLoading ? (
            <EditorJs
              tools={TOOLS}
              data={data}
              editorInstance={(instance) => {
                editorInstance.current = instance;
              }}
              onChange={onChange}
              onReady={onReady}
            />
          ) : // <div className="h-screen">
            //   <h1 className="text-2xl font-semibold text-center mt-12">
            //     Select a note to start writing!
            //   </h1>
            // </div>
            null}
        </div>
      </main>

      <AddFolderModal
        closeOnClick={() => {
          setSelectedFolder(tree[0]);
          setShowFolderModal(false);
        }}
        saveOnClick={() => {
          addFolder(selectedFolder.id, newTitle, tree);
          setSelectedFolder(tree[0]);
          // setNoteTree();
          setShowFolderModal(false);
        }}
        onTitleChange={(e) => setTitle(e.target.value)}
        showModal={showFolderModal}
        setShowModal={setShowFolderModal}
        tree={tree}
        setSelectedFolder={setSelectedFolder}
        selectedFolder={selectedFolder}
      />

      <AddNoteModal
        closeOnClick={() => {
          setSelectedFolder(tree[0]);
          setShowNoteModal(false);
        }}
        saveOnClick={() => {
          addNote(selectedFolder.id, newTitle, tree);
          setSelectedFolder(tree[0]);
          // setNoteTree();
          setShowNoteModal(false);
        }}
        onTitleChange={(e) => setTitle(e.target.value)}
        showModal={showNoteModal}
        tree={tree}
        setSelectedFolder={setSelectedFolder}
        selectedFolder={selectedFolder}
      />

      <DeleteFolderModal
        closeOnClick={() => {
          setSelectedFolder(tree[0]);
          setShowDeleteFolderModal(false);
        }}
        saveOnClick={() => {
          // deleteFolder(selectedFolder.id, title, tree);
          setSelectedFolder(tree[0]);
          // setNoteTree();
          setShowFolderModal(false);
        }}
        onTitleChange={(e) => setTitle(e.target.value)}
        showModal={ShowDeleteFolderModal}
        setShowModal={setShowDeleteFolderModal}
        tree={tree}
        setSelectedFolder={setSelectedFolder}
        selectedFolder={selectedFolder}
      />

      <DeleteNoteModal
        closeOnClick={() => {
          setSelectedFolder(tree[0]);
          setShowDeleteNoteModal(false);
        }}
        saveOnClick={() => {
          // deleteFolder(selectedFolder.id, title, tree);
          setSelectedFolder(tree[0]);
          // setNoteTree();
          setShowFolderModal(false);
        }}
        onTitleChange={(e) => setTitle(e.target.value)}
        showModal={ShowDeleteNoteModal}
        tree={tree}
        setSelectedFolder={setSelectedFolder}
        selectedFolder={selectedFolder}
      />

      <RenameFolderModal
        closeOnClick={() => {
          setSelectedFolder(tree[0]);
          setShowRenameFolderModal(false);
        }}
        saveOnClick={() => {
          // deleteFolder(selectedFolder.id, title, tree);
          renameItem(selectedFolder.id, newTitle, tree);
          setSelectedFolder(tree[0]);
          // setNoteTree();
          setShowRenameFolderModal(false);
        }}
        onTitleChange={(e) => setTitle(e.target.value)}
        showModal={ShowRenameFolderModal}
        setShowModal={setShowRenameFolderModal}
        tree={tree}
        setSelectedFolder={setSelectedFolder}
        selectedFolder={selectedFolder}
      />

      <RenameNoteModal
        closeOnClick={() => {
          setSelectedFolder(tree[0]);
          setShowRenameNoteModal(false);
        }}
        saveOnClick={() => {
          // deleteFolder(selectedFolder.id, title, tree);
          renameItem(selectedFolder.id, newTitle, tree);
          setSelectedFolder(tree[0]);
          // setNoteTree();
          setShowRenameNoteModal(false);
        }}
        onTitleChange={(e) => setTitle(e.target.value)}
        showModal={ShowRenameNoteModal}
        tree={tree}
        setSelectedFolder={setSelectedFolder}
        selectedFolder={selectedFolder}
        isRenameNote={true}
      />



    </>
  );
}
