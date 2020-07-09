import React, { useEffect, useState } from 'react';
import useForm from '../components/useForm';
import NavBar from '../components/NavBar';
import '../assets/test.css';
import logo from '../assets/transparent.png';
// import ErrorIcon from '@material-ui/icons/Error';
import { Link } from 'react-router-dom';
// import NavBar from '../components/NavBar'
// https://upmostly.com/tutorials/using-custom-react-hooks-simplify-forms
// https://material.io/resources/icons/?style=baseline

const Form = ({isLogin}) => {
  const { values, handleChange, handleSubmit, setValue } = useForm(getErrors);
  const { email, password, confirmPassword, username, emailError, passwordError, confirmPasswordError, usernameError } = values;
  const [error, setError] = useState(null);
  const [response, setResponse] = useState("");
  const passwordPattern = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$£%^&+=])(?=.*[a-z]).{8,}$');

  useEffect(() => {
    if (error === false)
      login();
  }, [error]);

  function getErrors() {
    // check they are not empty
    if (!email) {
      setValue("emailError", "Please enter a email.");
      setError(true);
      // setValues(values => ({ ...values, emailError: "Please enter a email."}));
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
      //setValues(values => ({ ...values, passwordError: "The password should be at least 8 characters long and contain at least one uppercase, lowercase, number, and one special character." }));
      //return;
      setValue("passwordError", "The password should be at least 8 characters long and contain at least one uppercase, lowercase, number, and one special character.");
      setError(true);
      return;
    } else {
      setValue("passwordError", "");
      // setValue("passwordError", "");
    }

    // if the passwords are not equal 
    if (!isLogin && (password !== confirmPassword)) {
      setValue("confirmPasswordError", "The password's don't match, please try again");
      setError(true);
      return;
    } else {
      setValue("confirmPasswordError", "");
    }

    // console.log("hi");
    setError(false);
  }

  function login() {
    // validate the username, email and password
    // check whether they are signing up or logging in
    // make post request to do login/signup



    console.log(values);
    console.log({ email, password, confirmPassword, username, emailError, passwordError, confirmPasswordError, usernameError, isLogin });

    //let noErrors = isLogin ? (!emailError && !passwordError) : (!emailError && !usernameError && !passwordError && !confirmPasswordError);

    //if (noErrors) {
    let url = isLogin ? `http://localhost:80/api/users/login` : `http://localhost:80/api/users/signup`;
    let body = isLogin ? JSON.stringify({ email, password }) : JSON.stringify({ email, username, password });
    const response = fetch(url, {
      method: "POST",
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      if (json.error) {
        setResponse(json.error);
        console.log(json.error);
      } else {
        window.location.href = '/note';
      }
    })
    .catch(err => {
      console.error(err);
      setResponse("Error, something was wrong, please try again.");
    });
    setError(null);
  }


  return (
    <div className="md:mt-8 mx-auto max-w-2xl bg-white py-16 sm:px-12 lg:px-24 shadow-xl mb-24">
      <div className="flex justify-center mb-8">
        <img src={logo} className="w-16 h-auto" />
        <h1 className="ml-6 self-center text-brandBlue-A font-bold text-xl">Memento</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          {!isLogin && <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input name="username" className={usernameError ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"} type="text" placeholder="Username" onChange={handleChange} value={username || ""} required />
              {usernameError && <div>
                <span className="text-red-500 text-xs italic">
                  {usernameError}
                </span>
              </div>}
            </div>
          </div>}
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input name="email" className={emailError ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"} type="email" placeholder="user@example.com" onChange={handleChange} value={email || ""} required />
              {emailError && <div>
                <span className="text-red-500 text-xs italic">
                  {emailError}
                </span>
              </div>}
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
              <input name="password" className={passwordError ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"} type="password" placeholder="*********************" onChange={handleChange} value={password || ""} required />
              {passwordError && <div>
                <span className="text-red-500 text-xs italic">
                  {passwordError}
                </span>
              </div>}
            </div>
          </div>
          {!isLogin && <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2"/*className="uppercase tracking-wide text-black text-xs font-bold mb-2"*/ htmlFor="confirmPassword">
                Confirm Password
            </label>
              <input name="confirmPassword" className={confirmPasswordError ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"} /*className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"*/ type="password" placeholder="*********************" onChange={handleChange} value={confirmPassword || ""} required />
              {confirmPasswordError && <div>
                <span className="text-red-500 text-xs italic">
                  {confirmPasswordError}
                </span>
              </div>}
            </div>
          </div>}
          {response && <div className="bg-red-100 flex items-center border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            {/* <strong class="font-bold">Holy smokes!</strong>
            <span class="block sm:inline">Something seriously bad happened.</span> */}
            {/* <span><ErrorIcon/></span> */}
            <p className="ml-2 inline">{response}</p>
            {/* <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span> */}
          </div>}
          <div className="flex justify-between align-center mt-2">
            <button className="bg-brandBlue-A hover:bg-brandBlue-B text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <Link className="inline-block self-center font-semibold text-sm text-brandBlue-A hover:text-brandBlue-B" /*onClick={handleIsLogin}*/ to={isLogin ? '/signup' : '/login'}>
              {isLogin ? "Sign Up instead?" : "Login instead?"}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;