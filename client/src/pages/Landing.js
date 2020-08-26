import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { loginAsGuest, isLoggedIn } from "../api";
import NavBar from "../components/NavBar";
import ImageCaption from "../components/ImageCaption";
import Diagonal from "../components/Diagonal";
import Card from "../components/Card";
import CardWithImage from "../components/CardWithImage";
import Footer from "../components/Footer";
import researching from "../assets/researching.svg";
import inSync from "../assets/in_sync.svg";
import thoughtProcess from "../assets/thought_process.svg";
import Signup from "../assets/tutorial/signup.png";
import AddItem from "../assets/tutorial/additem.png";
import Note from "../assets/tutorial/note.png";
import SideNav from "../assets/tutorial/sidenav.png";
import Inline1 from "../assets/tutorial/inline1.png";
import Inline2 from "../assets/tutorial/inline2.png";
import Delete from "../assets/tutorial/delete.png";
import Rename from "../assets/tutorial/rename.png";
import Profile from "../assets/tutorial/profile.png";
import Save from "../assets/tutorial/save.png";
import Print from "../assets/tutorial/print.png";

function Landing() {
  const [loggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.body.classList.remove("architect");
  }, []);

  useEffect(() => {
    isLoggedIn().then((json) => {
      setIsLoggedIn(json);
    });
  }, []);

  return (
    <>
      <NavBar loggedIn={loggedIn} />

      <div className="" id="content">
        {/* Landing Page Front */}
        <div className="px-4 sm:px-8 pt-12 sm:pt-4 relative" id="front">
          <div className="text-center leading-tight sm:p-12">
            <h1 className="text-4xl sm:text-5xl text-black pt-12 font-inter">
              Productivity and simplicity with Memento.
            </h1>
            <p className="m-auto text-2xl text-gray-500 font-lato w-3/4 pt-3">
              Use Memento to take and store notes in the simplest way possible;
              whether you need to study, write meeting notes, make lists or
              anything else!
            </p>
          </div>

          {/* If logged in, display 'Go To Your Notes' button.
              If logged out, display 'Signup' and 'Try As Guest' buttons. */}
          <div
            id="buttons"
            className="my-8 sm:my-0 h-40 sm:h-auto flex flex-col sm:block text-center justify-center"
          >
            {loggedIn ? (
              <>
                <Link
                  className="shadow-md bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-3xl font-lato hover:text-white p-2 m-4 mb-2 border border-brandBlue-A hover:border-transparent rounded focus:outline-none focus:text-white focus:bg-brandBlue-A"
                  to="/note"
                >
                  Go To Your Notes
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="shadow-md bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-3xl font-lato hover:text-white p-2 m-4 mb-2 border border-brandBlue-A hover:border-transparent rounded focus:outline-none focus:text-white focus:bg-brandBlue-A"
                  onClick={() => {
                    loginAsGuest()
                      .then(() => {
                        window.location.href = "/note";
                      })
                      .catch(() =>
                        alert("There seems to be a problem, try again!")
                      );
                  }}
                  to="#"
                >
                  Try As Guest
                </Link>

                <Link
                  className="mt-4 sm:mt-0 shadow-md bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-3xl font-lato hover:text-white p-2 m-4 mb-2 border border-brandBlue-A hover:border-transparent rounded focus:outline-none focus:text-white focus:bg-brandBlue-A"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="m-auto text-center md:flex md:align-center md:justify-around py-20">
            <ImageCaption
              image={thoughtProcess}
              imageClasses="w-auto h-40 lg:h-48 object-cover inline"
              alt="Illustration of creative person looking at notes."
              caption="Unleash your creativity"
              captionClasses="mt-1 text-lato text-xl text-brandBlue-A"
            />

            <ImageCaption
              image={researching}
              imageClasses="w-auto h-40 lg:h-48 object-cover inline mt-8 md:mt-0"
              alt="Illustration of person laying down whilst using laptop."
              caption="Get productive"
              captionClasses="mt-1 text-lato text-xl text-brandBlue-A"
            />

            <ImageCaption
              image={inSync}
              imageClasses="w-auto h-40 lg:h-48 object-cover inline mt-8 md:mt-0"
              alt="Illustration demonstrating use of application across multiple devices."
              caption="Access your notes anywhere"
              captionClasses="mt-1 text-lato text-xl text-brandBlue-A"
            />
          </div>

          <Diagonal colour={"text-gray-100"} />
        </div>

        {/* Why Memento Section */}
        <div id="whymemento" className="pt-6 pb-16 px-8 bg-gray-100 relative">
          <h1 className="text-5xl font-inter">Why Memento</h1>

          <div id="cards" className="text-center mt-3">
            <Card
              title={"Inline Tools"}
              description={
                "Memento allows you to add headings, tables, lists, checklists, code, quotes and delimiters."
              }
              link={"inline1"}
            />

            <Card
              title={"More Tools"}
              description={
                "As well as using italic and bold text, transform text into inline code or highlight key words."
              }
              link={"inline2"}
            />

            <Card
              title={"Organising"}
              description={
                "Organise your folders and notes neatly using Memento's hierarchical structure."
              }
              link={"organising"}
            />

            <Card
              title={"Printing"}
              description={
                "For those who need their notes on paper or exported as a PDF, Memento allows you to print."
              }
              link={"print"}
            />

            <Card
              title={"Saving"}
              description={
                "Notes are saved every few characters so you don't have to worry about losing them."
              }
              link={"save"}
            />

            <Card
              title={"Control"}
              description={
                "You can create, rename and remove your folders, notes and even your account."
              }
              link={"control"}
            />
          </div>

          <center>
            <div
              class="justify-center flex items-center bg-brandBlue-A text-white text-sm font-bold px-4 py-3 mt-3 w-full md:w-2/3"
              role="alert"
            >
              <svg
                class="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
              </svg>
              <p>Did you know Memento means 'to remember' in Latin.</p>
            </div>
          </center>

          <Diagonal colour={"text-white"} />
        </div>

        {/* Tutorial Section */}
        <div id="tutorial" className="px-8 relative pb-16">
          <h1 className="text-5xl pt-6"> Tutorial </h1>

          <CardWithImage
            imgSource={Signup}
            imgAlt={"Signing up on Memento."}
            title="Getting Started"
            description="Create an account by clicking on the ‘Sign Up’ button and completing the form.
            Upon completion of the form, check your email to confirm your account and from there you’ll
            be able to log in."
          />

          <CardWithImage
            imgSource={AddItem}
            imgAlt={"Memento's add note modal."}
            title="Creating a Note or Folder"
            description="Click the plus icon which is at the top right of the note page. This will open
            up a dropdown menu in which you can choose to add either a note or a folder. When you have
            decided which item you want to add, you must give it a name and select which folder you would
            like to save it in, if any. Then click ‘Save Changes’."
          />

          <CardWithImage
            id={"organising"}
            imgSource={SideNav}
            imgAlt={"Sidebar navigation of Memento."}
            title="Side Navigation & Hierarchical Structure"
            description="As we’ve just said, you can add notes or folders within other folders, which can
            be seen in the side navigation bar on the left side of the note page after clicking on the
            icon at the top left of the note page. Clicking on a folder will display all of the notes and
            folders nested within, whereas clicking a note would open it for you to view and edit. Our
            hierarchical structure gives you full flexibility and the freedom to organise and structure
            your notes as you would like."
          />

          <CardWithImage
            imgSource={Note}
            imgAlt={"Writing a note on Memento."}
            title="Writing Notes"
            description="When you’ve created/opened a note, you can simply click on the editor and begin
            typing away. This is a block-type editor, meaning each section or paragraph is a separate
            block. When you click on a block, on the right, there will be a small icon consisting of dots.
            Clicking this will allow you to tune the block; you can move it below or above other sections 
            of text, or even delete it. Clicking the plus button on the left side of an empty block allows
            you to add inline tools."
          />

          <CardWithImage
            id={"inline1"}
            imgSource={Inline1}
            imgAlt={"Using various inline tools in Memento."}
            title="Inline Tools 1"
          >
            <div className="text-gray-700">
              <ul>
                <li className="list-disc my-2">
                  <span className="font-bold">Heading</span> - use headings to
                  organise your notes into sections and improve readability. You
                  can tune heading blocks to change its size from H1 (largest)
                  to H6 (smallest).
                </li>

                <li className="list-disc my-2">
                  <span className="font-bold">Table</span> - use tables to
                  display organised data, allowing you to quickly read results.
                  Add rows and columns by clicking the plus icon which appears
                  upon hovering the borders of cells.
                </li>

                <li className="list-disc my-2">
                  <span className="font-bold">Lists</span> - use lists to
                  organise text and improve readability. You can tune lists to
                  choose between ordered and unordered lists.
                </li>

                <li className="list-disc my-2">
                  <span className="font-bold">Code</span> - use code blocks to
                  differentiate code from other text within the note. The grey
                  box and monospace font helps achieve this.
                </li>

                <li className="list-disc my-2">
                  <span className="font-bold">Quote</span> - use quote blocks to
                  format quotes with style.
                </li>

                <li className="list-disc my-2">
                  <span className="font-bold">Checklist</span> - use checklists
                  to organise tasks, write shopping lists and more. Click on the
                  circle next to a checklist item in order to check or uncheck.
                </li>

                <li className="list-disc my-2">
                  <span className="font-bold">Delimiter</span> - use delimiters
                  to separate different sections of content.
                </li>
              </ul>
            </div>
          </CardWithImage>

          <CardWithImage
            id={"inline2"}
            imgSource={Inline2}
            imgAlt={"Using various inline tools in Memento."}
            title="Inline Tools 2"
            description="There are other inline tools and content which are not accessible through the plus icon.
            Unfortunately at the moment, images can only be added through links of images online which end with its
            extension, e.g. .png. We recommend using Pixabay for images. Also, select plain text in order to make
            it bold, italic, underlined, highlighted, a link, inline code or even convert it to a heading list or
            quote."
          />

          <CardWithImage
            id={"save"}
            imgSource={Save}
            imgAlt={"Saving a note in Memento."}
            title="Saving"
            description="Whilst writing your notes, you don’t have to worry about losing your work as notes are
            saved after every 7 characters entered. However we do recommend that you manually save using the ‘save’
            icon before accessing another note or closing the tab."
          />

          <CardWithImage
            imgSource={Delete}
            imgAlt={"Memento's delete modal."}
            title="Delete Item"
            description="Click the 3 dots icon which is at the top right of the note page. This will open up a
            dropdown menu in which you can select ‘Delete Note/Folder’. Choose which item you would like to delete
            and click ‘Save Changes’."
          />

          <CardWithImage
            imgSource={Rename}
            imgAlt={"Memento's rename modal."}
            title="Rename Item"
            description="Click the 3 dots icon which is at the top right of the note page. This will open up a
            dropdown menu in which you can select ‘Rename Note’ or ‘Rename Folder’. Choose which item you want to
            rename, specify the new name and click ‘Save Changes’."
          />

          <CardWithImage
            id={"print"}
            imgSource={Print}
            imgAlt={"Print screen of a note in Memento."}
            title="Printing"
            description="Click the 3 dots icon which is at the top right of the note page. This will open up a
            dropdown menu in which you can select ‘Print’. Your work will be saved before a new tab opens with
            printing options."
          />

          <CardWithImage
            id={"control"}
            imgSource={Profile}
            imgAlt={"Memento's profile modal."}
            title="Edit & Delete Profile"
            description="Click the 3 dots icon which is at the top right of the note page. This will open up a
            dropdown menu in which you can select ‘Profile’. Your username and email will be displayed with the
            option to change them as well as change your password and delete your account. In order to change
            your password you must enter your current password, enter your new password and confirm your new
            password."
          />

          <Diagonal colour={"text-gray-800"} />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Landing;
