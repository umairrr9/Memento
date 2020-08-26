import React, { createRef } from "react";
import Popper from "popper.js";

export default function Dropdown({
  buttonStyles,
  buttonOnClick,
  innerButton,
  children,
  dropdownStyles,
  isShowing,
  setIsShowing,
  id,
}) {
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setIsShowing(id);
  };
  const closeDropdownPopover = () => {
    setIsShowing(-1);
  };

  return (
    <>
      <div className="flex flex-wrap px-2">
        <div className="relative inline-flex align-middle w-full">
          <button
            className={buttonStyles}
            style={{ transition: "all .15s ease" }}
            type="button"
            ref={btnDropdownRef}
            onClick={() => {
              if (buttonOnClick) buttonOnClick();
              isShowing === id ? closeDropdownPopover() : openDropdownPopover();
            }}
          >
            {innerButton}
          </button>
          <div
            ref={popoverDropdownRef}
            className={
              (isShowing === id ? "block " : "hidden ") + dropdownStyles
            }
            style={{ minWidth: "12rem", left: null, right: 0 }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}