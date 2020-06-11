import React, { useEffect } from 'react';
import useForm from '../components/useForm';
import NavBar from '../components/NavBar';
import '../assets/test.css';
import logo from '../assets/transparent.png';
// import NavBar from '../components/NavBar'
// https://upmostly.com/tutorials/using-custom-react-hooks-simplify-forms

const Form = () => {
  const { values, handleChange, handleSubmit, handleIsLogin, setValues } = useForm(login);
  const { email, password, confirmPassword, username, emailError, passwordError, confirmPasswordError, usernameError, isLogin } = values;
  const passwordPattern1 = new RegExp('^[a-zA-Z 0-9?!_-]*$');
  const passwordPattern2 = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$');

  useEffect(() => {
    let isLogin = new URLSearchParams(window.location.search).get("isLogin") ? true : false;
    setValues(values => ({ ...values, isLogin: isLogin}));
  }, [setValues]);

  function login() {
    // validate the username, email and password
    // check whether they are signing up or logging in
    // make post request to do login/signup

    if (!email) setValues(values => ({ ...values, emailError: "Please enter a email." }));
    if (!username) setValues(values => ({ ...values, usernameError: "Please enter a username." }));
    if (!password) setValues(values => ({ ...values, passwordError: "Please enter a password." }));

    if (!(password.match(passwordPattern1) && password.match(passwordPattern2))) {
      setValues(values => ({ ...values, passwordError: "Password is invalid." }));
    } else {
      setValues(values => ({ ...values, passwordError: "" }));
    }

    console.log(values);

  }

  return (
    <div className="bg-gray-100 md:mt-8 mx-auto max-w-2xl bg-white py-16 sm:px-12 lg:px-24 shadow-xl mb-24">
      <div className="flex justify-center mb-8">
        <img src={logo} className="w-16 h-auto"/>
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
              <input name="email" className={emailError ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"}  type="email" placeholder="user@example.com" onChange={handleChange} value={email || ""} required />
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
              <input name="password" className={passwordError ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"}  type="password" placeholder="*********************" onChange={handleChange} value={password || ""} required/>
              {passwordError && <div>
                <span className="text-red-500 text-xs italic">
                  {passwordError}
                </span>
              </div>}
            </div>
          </div>
          {!isLogin &&<div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2"/*className="uppercase tracking-wide text-black text-xs font-bold mb-2"*/ htmlFor="confirmPassword">
                Confirm Password
            </label>
              <input name="confirmPassword" className={confirmPasswordError ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"} /*className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"*/ type="password" placeholder="*********************" onChange={handleChange} value={confirmPassword || ""} required/>
              {confirmPasswordError && <div>
                <span className="text-red-500 text-xs italic">
                  {confirmPasswordError}
                </span>
              </div>}
            </div>
          </div>}
          <div className="flex justify-between align-center mt-2">
            <button className="bg-brandBlue-A hover:bg-brandBlue-B text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <a className="inline-block self-center font-semibold text-sm text-brandBlue-A hover:text-brandBlue-B" onClick={handleIsLogin} href="#">
              {isLogin ? "Sign Up instead?" : "Login instead?"}
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;