import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import useForm from "./useForm";

export default function ProfileModal({
  closeOnClick,
  showModal,
  user,
  setShowModal,
}) {
  const { values, handleChange, handleSubmit, setValue, setValues } = useForm(
    getErrors
  );
  const {
    email,
    currentPassword,
    newPassword,
    confirmPassword,
    username,
    currentPasswordError,
    newPasswordError,
    confirmPasswordError,
  } = values;
  const [error, setError] = useState(null);
  const [response, setResponse] = useState("");
  const passwordPattern = new RegExp(
    "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$£%^&+=])(?=.*[a-z]).{8,}$"
  );

  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [usernameSection, setUsernameSection] = useState(false);
  const [emailSection, setEmailSection] = useState(false);
  const [passwordSection, setPasswordSection] = useState(false);

  useEffect(() => {
    if (error === false) {
      changeInfo();
    }
  }, [error]);

  function deleteAccount() {
    let url = `/api/users/delete`;
    let body = "";
    fetch(url, {
      method: "DELETE",
      body,
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          console.log(json.error);
          throw new Error();
        }
        alert("Your account was successfully deleted.");
        window.location.href = "/";
      })
      .catch((err) => {
        console.error(err);
        alert("Sorry, your account couldn't be deleted, please try again.");
      });
  }

  function changeInfo() {
    let url = `/api/users/updateUser`;
    let body = JSON.stringify({
      email,
      username,
      currentPassword,
      newPassword,
    });
    fetch(url, {
      method: "PATCH",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.error) {
          setResponse(json.error);
          console.log(json.error);
        } else {
          setShowModal(false);
          setValues({});
          alert("Settings successfully updated.");
        }
      })
      .catch((err) => {
        console.error(err);
        setResponse("Error, something was wrong, please try again.");
      });
    setError(null);
  }

  function getErrors() {
    setResponse(null);

    if (currentPassword || newPassword || confirmPassword) {
      if (currentPassword && !currentPassword.match(passwordPattern)) {
        setValue(
          "currentPasswordError",
          "The password should be at least 8 characters long and contain at least one uppercase, lowercase, number, and one special character."
        );
        setError(true);
        return;
      } else {
        setValue("currentPasswordError", "");
      }

      if (newPassword && !newPassword.match(passwordPattern)) {
        setValue(
          "newPasswordError",
          "The password should be at least 8 characters long and contain at least one uppercase, lowercase, number, and one special character."
        );
        setError(true);
        return;
      } else {
        setValue("newPasswordError", "");
      }

      if (newPassword !== confirmPassword) {
        setValue(
          "confirmPasswordError",
          "The password's don't match, please try again."
        );
        setError(true);
        return;
      } else {
        setValue("confirmPasswordError", "");
      }
    }

    setError(false);
  }

  return (
    <Modal
      closeOnClick={closeOnClick}
      saveOnClick={handleSubmit}
      showModal={showModal}
      modalTitle={"Profile Settings"}
    >
      <div
        className="relative py-2 px-6 flex-auto overflow-y-scroll"
        style={{ maxHeight: "18rem" }}
      >
        <div className="mb-6">
          <h3 className="text-gray-500 font-lato text-md font-bold my-2">
            {user && user.username}
          </h3>

          <button
            className="bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-md font-lato font-semibold hover:text-white p-2 mb-2 border border-brandBlue-A hover:border-transparent rounded"
            onClick={() => {
              setUsernameSection(!usernameSection);
            }}
          >
            Change Username
          </button>
        </div>

        {usernameSection ? (
          <div className="flex items-center justify-between my-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Change Username:
              </label>
            </div>
            <div className="ml-8">
              <input
                name="username"
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="New Username"
                onChange={handleChange}
                value={username || ""}
              />
            </div>
          </div>
        ) : null}

        <div className="my-6">
          <h3 className="text-gray-500 font-lato text-md font-bold my-2">
            {user && user.email}
          </h3>

          <button
            className="bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-md font-lato font-semibold hover:text-white p-2 mb-2 border border-brandBlue-A hover:border-transparent rounded"
            onClick={() => {
              setEmailSection(!emailSection);
            }}
          >
            Change Email
          </button>
        </div>

        {emailSection ? (
          <div className="flex items-center justify-between my-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Change Email:
              </label>
            </div>
            <div className="ml-8">
              <input
                name="email"
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="New Email"
                onChange={handleChange}
                value={email || ""}
              />
            </div>
          </div>
        ) : null}

        <div className="my-6">
          <h3 className="text-gray-500 font-lato text-md font-bold my-2">
            Password
          </h3>

          <button
            className="bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-md font-lato font-semibold hover:text-white p-2 border border-brandBlue-A hover:border-transparent rounded"
            onClick={() => {
              setPasswordSection(!passwordSection);
            }}
          >
            Change Password
          </button>
        </div>

        {passwordSection ? (
          <div>
            <div className="flex items-center justify-between my-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Current Password:
                </label>
              </div>
              <div className="ml-8">
                <input
                  name="currentPassword"
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Current Password"
                  onChange={handleChange}
                />
              </div>
            </div>

            {currentPasswordError ? (
              <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {currentPasswordError}
              </p>
            ) : null}

            <div className="flex items-center justify-between my-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  New Password:
                </label>
              </div>
              <div className="ml-8">
                <input
                  name="newPassword"
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="New Password"
                  onChange={handleChange}
                />
              </div>
            </div>

            {newPasswordError ? (
              <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {newPasswordError}
              </p>
            ) : null}

            <div className="flex items-center justify-between my-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm New Password:
                </label>
              </div>
              <div className="ml-8">
                <input
                  name="confirmPassword"
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="New Password"
                  onChange={handleChange}
                />
              </div>
            </div>

            {confirmPasswordError ? (
              <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {confirmPasswordError}
              </p>
            ) : null}
          </div>
        ) : null}

        <button
          className="bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-md font-lato font-semibold hover:text-white p-2 mb-2 border border-brandBlue-A hover:border-transparent rounded"
          onClick={() => {
            setShowDeleteButton(!showDeleteButton);
          }}
        >
          {showDeleteButton ? "Cancel" : "Delete Account"}
        </button>

        {showDeleteButton ? (
          <button
            className="bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-md font-lato font-semibold hover:text-white p-2 mb-2 border border-brandBlue-A hover:border-transparent rounded"
            onClick={() => deleteAccount()}
          >
            Delete Account
          </button>
        ) : null}

        {response ? (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {response}
          </p>
        ) : null}
      </div>
    </Modal>
  );
}
