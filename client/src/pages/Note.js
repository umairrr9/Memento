import React, { useRef, useState, useEffect } from "react";
import EditorJs from "@natterstefan/react-editor-js";
import TOOLS from "../editorjs/config";
import SideNav from "../components/SideNav";
import AddFolderModal from "../components/AddFolderModal";
import AddNoteModal from "../components/AddNoteModal";
import DeleteItemModal from "../components/DeleteItemModal";
import RenameFolderModal from "../components/RenameFolderModal";
import RenameNoteModal from "../components/RenameNoteModal";
import SettingsDropdown from "../components/SettingsDropdown";
import PlusDropdown from "../components/PlusDropdown";
import ProfileModal from "../components/ProfileModal";
import {
  logout,
  getUser,
  setNote,
  getNote,
  createNewNote,
  setNoteTree,
  getNoteTree,
  deleteNote,
} from "../api";

export default function Note() {
  let newTree = [];
  const editorInstance = useRef(null);
  const [editorLoading, setEditorLoading] = useState("Loading...");
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
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [showRenameNoteModal, setShowRenameNoteModal] = useState(false);
  const [showRenameFolderModal, setShowRenameFolderModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(tree[0]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedDropdown, setSelectedDropdown] = useState(-1);
  const [newTitle, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const [numKeyPresses, setKeyPresses] = useState(0);
  const [guest, setIsGuest] = useState(null);
  const [user, setUser] = useState({});

  // get the user details when the page opens
  useEffect(() => {
    getUser()
      .then((json) => {
        const isGuest = json.isGuest || false;
        setIsGuest(isGuest);
        setUser(json);
      })
      .catch(() => {
        alert(
          "Sorry, something went wrong, we couldn't get your user details."
        );
        if (process.env.NODE_ENV === "production") window.location.href = "/";
      });
  }, []);

  // get the note via the note id in the url params and get the notes tree for the user
  useEffect(() => {
    let containsNote = false;
    getNoteTree()
      .then((json) => {
        if (json.error) {
          throw new Error(json.error);
        }
        let t = json.notesTree;
        setTree(t);
        // does a note exist in tree
        containsNote = t.find((obj) => typeof obj.noteId !== "undefined") ? true : false; 
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
              setEditorLoading("");
              // set browser title
              setBrowserTitle(noteInTree.title + " - Memento");
            })
            .catch(() => {
              alert("Sorry, this note couldn't be found.");
              window.location.href = "/note";
            });
        } else {
          if (containsNote) {
            setEditorLoading("Select a note to start writing!");
          } else {
            setEditorLoading("Create a note to start writing!");
          }
        }
      })
      .catch(() => {
        alert("It seems like there's an error, try again!");
        if (process.env.NODE_ENV === "production") window.location.href = "/";
      });
  }, []);

  // delete the node and its children from the tree.
  // before calling this function, set newTree equal to
  // the tree which the node is being deleted from.
  function deleteNode(node, tree) {
    if (node.id) {
      if (node.noteId) {
        // make api request to server to delete this node
        deleteNote(node.noteId)
          .then((json) => {
            if (json.error) throw new Error(json.error);
          })
          .catch((err) => console.error(err));
      }
      let index = newTree.findIndex((n) => n.id === node.id);
      newTree.splice(index, 1);
    }
    let children = tree.filter((n) => n.parentId === node.id);
    if (children.length === 0) return;
    for (let i in children) {
      deleteNode(children[i], tree);
    }
  }

  function setBrowserTitle(title) {
    document.title = title;
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

  // const onReady = () => {
  //   // https://editorjs.io/configuration#editor-modifications-callback
  //   console.log("Editor.js is ready to work!");
  // };

  // const onChange = (api) => {
  //   // https://editorjs.io/configuration#editor-modifications-callback
  //   console.log("Now I know that Editor's content changed!");
  // };

  const onSave = async () => {
    if (editorInstance.current) {
      try {
        const outputData = await editorInstance.current.save();
        setNote(selectedNote.noteId, outputData)
          .then((json) => {
            // if there are no errors,
            // set is saving to true
            if (json.error) {
              throw new Error();
            } else {
              setIsSaving(true);
            }
          })
          // if there is any errors, alert the user
          .catch(() =>
            alert("Sorry, the note couldn't be saved, please try again.")
          )
          // finally, set is saving to false after a delay
          .finally(() =>
            setTimeout(() => {
              setIsSaving(false);
            }, 1000)
          );
        setData(outputData);
      } catch {
        alert("Sorry, the note couldn't be saved, please try again.");
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
            "bg-gray-100 flex items-center justify-start h-8 w-full fixed z-10 "
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
          {selectedNote ? (
            <h2 className="ml-2 text-sm truncate title-max-w">
              {selectedNote.title}
            </h2>
          ) : null}
          {isSaving ? (
            <h3 className="ml-2 text-gray-700 font-hairline text-sm">
              Saving...
            </h3>
          ) : null}
          <div
            className={
              "flex items-center ml-auto duration-500 " +
              (isNavOpen ? "mr-32 sm:mr-56" : "")
            }
          >
            {guest ? null : (
              <>
                <button
                  onClick={onSave}
                  className={"focus:outline-none hover:shadow-md rounded outline-none focus:shadow-md mx-2 " + (selectedNote ? "" : "hidden" )  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                    className="text-brandBlue-A"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      fill="currentColor"
                      d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
                    />
                  </svg>
                </button>

                <SettingsDropdown
                  id={1}
                  tree={tree}
                  setSelectedFolder={setSelectedFolder}
                  isShowing={selectedDropdown}
                  setIsShowing={setSelectedDropdown}
                  setShowDeleteItemModal={setShowDeleteItemModal}
                  setShowRenameNoteModal={setShowRenameNoteModal}
                  setShowRenameFolderModal={setShowRenameFolderModal}
                  selectedNote={selectedNote}
                  setShowProfileModal={setShowProfileModal}
                  showProfileModal={showProfileModal}
                  logout={logout}
                  onSave={onSave}
                />

                <PlusDropdown
                  id={2}
                  isShowing={selectedDropdown}
                  setIsShowing={setSelectedDropdown}
                  setSelectedFolder={setSelectedFolder}
                  tree={tree}
                  setShowNoteModal={setShowNoteModal}
                  setShowFolderModal={setShowFolderModal}
                />
              </>
            )}
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
            />
          ) : (
            <h1 className="text-2xl font-semibold text-center mt-12">
              {editorLoading}
            </h1>
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

      <DeleteItemModal
        closeOnClick={() => {
          setSelectedFolder(tree[0]);
          setShowDeleteItemModal(false);
        }}
        saveOnClick={() => {
          newTree = tree;
          deleteNode(selectedFolder, tree);
          setTree(newTree);
          setNoteTree(newTree)
            .then((json) => {
              if (json.error) throw new Error(json.error);
            })
            .catch((err) => console.error(err));
          setSelectedFolder(tree[0]);
          setShowDeleteItemModal(false);
        }}
        showModal={showDeleteItemModal}
        setShowModal={setShowDeleteItemModal}
        tree={tree}
        setSelectedFolder={setSelectedFolder}
        selectedFolder={selectedFolder}
        isDeleteNote={true}
        labelTitle={"Deleting a folder will remove notes/folders within."}
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
        showModal={showRenameFolderModal}
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
        showModal={showRenameNoteModal}
        tree={tree}
        setSelectedFolder={setSelectedFolder}
        selectedFolder={selectedFolder}
        isRenameNote={true}
      />

      <ProfileModal
        user={user}
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        closeOnClick={() => setShowProfileModal(false)}
      />
    </>
  );
}
