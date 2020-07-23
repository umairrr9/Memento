import React, { useState, createRef } from "react";
import Popper from "popper.js";

export default function Dropdown({
  buttonStyles,
  buttonOnClick,
  innerButton,
  children,
  dropdownStyles,
}) {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  //   let bgColor;
  //   color === "white"
  //     ? (bgColor = "bg-gray-800")
  //     : (bgColor = "bg-" + color + "-500");
  return (
    <>
      <div className="flex flex-wrap px-2">
        {/* <div className="w-full sm:w-6/12 md:w-4/12 px-4"> */}
          <div className="relative inline-flex align-middle w-full">
            <button
              //   className={
              //     "text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 " +
              //     bgColor
              //   }
              className={buttonStyles}
              style={{ transition: "all .15s ease" }}
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                if (buttonOnClick) buttonOnClick();
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              {/* {color === "white" ? "White Dropdown" : color + " Dropdown"} */}
              {innerButton}
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") + dropdownStyles
                // + (color === "white" ? "bg-white " : bgColor + " ") +
                // "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
              }
              style={{ minWidth: "12rem", left: null, right: 0 }}
            >
              {/* <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                  (color === "white" ? " text-gray-800" : "text-white")
                }
                onClick={e => e.preventDefault()}
              >
                Action
              </a>
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                  (color === "white" ? " text-gray-800" : "text-white")
                }
                onClick={e => e.preventDefault()}
              >
                Another action
              </a>
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                  (color === "white" ? " text-gray-800" : "text-white")
                }
                onClick={e => e.preventDefault()}
              >
                Something else here
              </a>
              <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                  (color === "white" ? " text-gray-800" : "text-white")
                }
                onClick={e => e.preventDefault()}
              >
                Seprated link
              </a> */}
              {children}
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

// export default function DropdownRender() {
//   return (
//     <>
//       <Dropdown color="white" />
//     </>
//   );
// }
