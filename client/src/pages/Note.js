import React, { useRef, useState, useEffect } from "react";
import EditorJs from "@natterstefan/react-editor-js";
import TOOLS from "../editorjs/config";
import SideNav from "../components/SideNav";
import AddFolderModal from "../components/AddFolderModal";
import AddNoteModal from "../components/AddNoteModal";
import DeleteFolderModal from "../components/DeleteFolderModal";
import DeleteNoteModal from "../components/DeleteNoteModal";
import RenameFolderModal from "../components/RenameFolderModal";
import RenameNoteModal from "../components/RenameNoteModal";
import SettingsDropdown from "../components/SettingsDropdown";
import PlusDropdown from "../components/PlusDropdown";

// TODO Convert page to pdf: https://itnext.io/javascript-convert-html-css-to-pdf-print-supported-very-sharp-and-not-blurry-c5ffe441eb5e

export default function Note() {
  const editorInstance = useRef(null);
  const [editorLoading, setEditorLoading] = useState(true);
  const [tree, setTree] = useState([
    {
      title: null,
      parentId: null,
      id: 0,
    },
  ]);
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
  const [isNavOpen, setNavOpen] = useState(false);
  const [numKeyPresses, setKeyPresses] = useState(0);
  const [guest, setIsGuest] = useState(null);
  const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:80/api" : "/api";

  useEffect(() => {
    isGuest().then(json => {
      setIsGuest(json.isGuest);
    })
  }, [])

  useEffect(() => {
    getNoteTree()
      .then((json) => {
        if (json.error) {
          throw new Error(json.error);
        }
        let t = null;
        if (!json.error) {
          t = json.notesTree;
        }
        setTree(t);
        const noteId =
          new URLSearchParams(window.location.search).get("note") || "";
        if (noteId !== "") {
          getNote(noteId)
            .then((json) => {
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
              alert("Sorry, this note couldn't be found.");
              window.location.href = "/note";
            });
        }
      })
      .catch((error) => {
        // console.error(error);
        alert("It seems like there's an error, try again!");
        if (process.env.NODE_ENV === "production") window.location.href = "/";
      });
  }, []);

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

  function isGuest() {
    let url = API_URL + `/users/isGuest`;
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

  function deleteNote(noteId) {
    let url = API_URL + `/notes/${noteId}`;

    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }

  function setNote(noteId, note) {
    let url = API_URL + `/notes/${noteId}`;
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

  function createNewNote() {
    let url = API_URL + `/notes/create`;

    return fetch(url, {
      method: "POST",
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
    let url = API_URL + `/users/notesTree`;

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
    let url = API_URL + `/users/notesTree`;
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
        // console.log(newTree);
        setNoteTree(newTree);
        window.location.href = `/note?note=${json.noteId}`;
      })
      .catch(() =>
        alert("Sorry, the note couldn't be added. Please try again later.")
      );
  }

  function renameItem(id, newTitle, tree) {
    if (!(newTitle.length >= 1)) return;
    // let id = tree.length + 1;
    //let folder = { parentId: parentFolderId, title: newTitle, id };
    let itemIndex = tree.findIndex((n) => n.id === id);
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

  const onReady = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Editor.js is ready to work!");
  };

  const onChange = (api) => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Now I know that Editor's content changed!");
  };

  const onSave = async () => {
    if (editorInstance.current) {
      try {
        const outputData = await editorInstance.current.save();
        // console.log(outputData);
        setNote(selectedNote.noteId, outputData)
          .then((json) => {
            if (json.error) {
              throw new Error();
            } else {
              setIsSaving(true);
            }
            // console.log(json.newNote);
          })
          .catch(() => alert("Sorry, the note couldn't be saved, please try again."))
          .finally(() =>
            setTimeout(() => {
              setIsSaving(false);
            }, 1000)
          );
        setData(outputData);
      } catch (e) {
        // console.error(e);
      }
    }
  };

  // if the keyboard has been pressed a few times, save the note
  const handleKeyPress = async () => {
    if (editorLoading || guest) return;
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
        <nav
          className={
            "bg-gray-100 flex items-center justify-start h-8 w-full fixed z-10"
          }
        >
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
          <h2 className="ml-2 text-sm truncate title-max-w">{selectedNote && selectedNote.title}</h2>
          {isSaving && (
            <h3 className="ml-2 text-gray-700 font-hairline text-sm">
              Saving...
            </h3>
          )}
          <div
            className={
              "flex items-center ml-auto duration-500 " +
              (isNavOpen ? "mr-32 sm:mr-56" : "")
            }
          >
            {!guest ? <button onClick={onSave} className="focus:outline-none px-2">
              <svg
                height={24}
                viewBox="0 0 24 24"
                width={24}
                className="text-brandBlue-A"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="currentColor"
                  d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"
                />
              </svg>
            </button> : null}

            {guest ? null :
              <SettingsDropdown
                id={1}
                tree={tree}
                setSelectedFolder={setSelectedFolder}
                isShowing={selectedDropdown}
                setIsShowing={setSelectedDropdown}
                setShowDeleteNoteModal={setShowDeleteNoteModal}
                setShowDeleteFolderModal={setShowDeleteFolderModal}
                setShowRenameNoteModal={setShowRenameNoteModal}
                setShowRenameFolderModal={setShowRenameFolderModal}
                selectedNote={selectedNote}
                guest={guest}
              />}
            {!guest ? <PlusDropdown
              id={2}
              isShowing={selectedDropdown}
              setIsShowing={setSelectedDropdown}
              setSelectedFolder={setSelectedFolder}
              tree={tree}
              setShowNoteModal={setShowNoteModal}
              setShowFolderModal={setShowFolderModal}
            /> : null}
          </div>
        </nav>
        <div
          className={"px-4 md:px-12 lg:px-0 pt-10"}
          onKeyPress={handleKeyPress}
        >
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
          ) : (
              <div className="">
                <h1 className="text-2xl font-semibold text-center mt-12">
                  Select a note to start writing!
                </h1>
              </div>
            )}
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
          setSelectedFolder(tree[0]);
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
          setSelectedFolder(tree[0]);
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
          renameItem(selectedFolder.id, newTitle, tree);
          setSelectedFolder(tree[0]);
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
          renameItem(selectedFolder.id, newTitle, tree);
          setSelectedFolder(tree[0]);
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