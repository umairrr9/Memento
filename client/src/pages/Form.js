import React, { useEffect, useState } from "react";
import useForm from "../components/useForm";
import logo from "../assets/transparent.png";
import { Link } from "react-router-dom";

const Form = ({ isLogin }) => {
  const {
    values,
    handleChange,
    handleSubmit,
    setValue,
    passwordPattern,
  } = useForm(getErrors);
  const {
    email,
    password,
    confirmPassword,
    username,
    emailError,
    passwordError,
    confirmPasswordError,
    usernameError,
  } = values;
  const [error, setError] = useState(null);
  const [response, setResponse] = useState("");
  const [successResponse, setSuccessResponse] = useState("");

  useEffect(() => {
    document.body.classList.add("architect");
  }, []);

  useEffect(() => {
    if (error === false) login();
  }, [error]);

  function getErrors() {
    setResponse("");

    if (!email) {
      setValue("emailError", "Please enter a email.");
      setError(true);
      return;
    } else {
      setValue("emailError", "");
    }

    if (!username && !isLogin) {
      setValue("usernameError", "Please enter a username.");
      setError(true);
      return;
    } else {
      setValue("usernameError", "");
    }

    if (!password) {
      setValue("passwordError", "Please enter a password.");
      setError(true);
      return;
    } else {
      setValue("passwordError", "");
    }

    if (!password.match(passwordPattern)) {
      setValue(
        "passwordError",
        "The password should be at least 8 characters long and contain at least one uppercase, lowercase, number, and one special character."
      );
      setError(true);
      return;
    } else {
      setValue("passwordError", "");
    }

    // if the passwords are not equal
    if (!isLogin && password !== confirmPassword) {
      setValue(
        "confirmPasswordError",
        "The password's don't match, please try again"
      );
      setError(true);
      return;
    } else {
      setValue("confirmPasswordError", "");
    }

    setError(false);
  }

  function login() {
    let url = `/api/users` + (isLogin ? `/login` : `/signup`);
    let body = isLogin
      ? JSON.stringify({ email, password })
      : JSON.stringify({ email, username, password });
    fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setResponse(json.error);
        } else {
          // window.location.href = isLogin ? "/note" : "/login";
          if (isLogin) {
            window.location.href = "/note";
          } else {
            setSuccessResponse("Please confirm your email address to use Memento.")
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setResponse("Error, something was wrong, please try again.");
      });
    setError(null);
  }

  return (
    <div className="md:mt-8 mx-auto max-w-2xl bg-white py-16 sm:px-12 lg:px-24 shadow-xl mb-24">
      <Link className="flex justify-center mb-8" to="/">
        <img alt="Memento Logo" src={logo} className="w-16 h-auto" />
        <h1 className="ml-4 self-center text-brandBlue-A font-inter text-xl">
          Memento
        </h1>
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          {!isLogin && (
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full px-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 font-lato"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  name="username"
                  className={
                    "font-lato " +
                    (usernameError
                      ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      : "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline")
                  }
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                  value={username || ""}
                  required
                />
                {usernameError && (
                  <div>
                    <span className="text-red-500 text-xs italic font-lato">
                      {usernameError}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 font-lato"
                htmlFor="email"
              >
                Email
              </label>
              <input
                name="email"
                className={
                  "font-lato " +
                  (emailError
                    ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    : "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline")
                }
                type="email"
                placeholder="user@example.com"
                onChange={handleChange}
                value={email || ""}
                required
              />
              {emailError && (
                <div>
                  <span className="text-red-500 text-xs italic font-lato">
                    {emailError}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 font-lato"
                htmlFor="password"
              >
                Password
              </label>
              <input
                name="password"
                className={
                  "font-lato " +
                  (passwordError
                    ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    : "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline")
                }
                type="password"
                placeholder="*********************"
                onChange={handleChange}
                value={password || ""}
                required
              />
              {passwordError && (
                <div>
                  <span className="text-red-500 text-xs italic font-lato">
                    {passwordError}
                  </span>
                </div>
              )}
            </div>
          </div>
          {!isLogin && (
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full px-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 font-lato"
                  /*className="uppercase tracking-wide text-black text-xs font-bold mb-2"*/ htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  className={
                    "font-lato " +
                    (confirmPasswordError
                      ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      : "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline")
                  }
                  /*className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"*/ type="password"
                  placeholder="*********************"
                  onChange={handleChange}
                  value={confirmPassword || ""}
                  required
                />
                {confirmPasswordError && (
                  <div>
                    <span className="text-red-500 text-xs italic font-lato">
                      {confirmPasswordError}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          {response ? (
            <div
              className="bg-red-100 flex items-center border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
              role="alert"
            >
              <p className="ml-2 inline font-lato">{response}</p>
            </div>
          ) : null}
          {successResponse ? (
            <div
              className="bg-blue-100 flex items-center border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-6"
            >
              <p className="ml-2 inline font-lato">{successResponse}</p>
            </div>
          ) : null}
          <div className="flex justify-between align-center mt-2">
            <button
              className="bg-brandBlue-A hover:bg-brandBlue-B text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <Link
              className="inline-block self-center font-semibold text-sm text-brandBlue-A hover:text-brandBlue-B focus:outline-none focus:text-brandBlue-B"
              to={isLogin ? "/signup" : "/login"}
            >
              {isLogin ? "Sign Up instead?" : "Login instead?"}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
