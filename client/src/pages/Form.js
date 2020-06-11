import React, { useEffect } from 'react';
import useForm from '../components/useForm';
import NavBar from '../components/NavBar';
import '../assets/test.css';
// import NavBar from '../components/NavBar'
// https://upmostly.com/tutorials/using-custom-react-hooks-simplify-forms

const Form = () => {
  const { values, handleChange, handleSubmit, handleIsLogin, setValues } = useForm(login);
  const { email, password, confirmPassword, username, emailError, passwordError, confirmPasswordError, usernameError, isLogin } = values;
  const passwordPattern1 = new RegExp('^[a-zA-Z 0-9?!_-]*$');
  const passwordPattern2 = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$');

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
    <div class="bg-gray-100 md:mt-8 mx-auto max-w-2xl bg-white py-20 sm:px-12 lg:px-24 shadow-xl mb-24">
      <form onSubmit={handleSubmit}>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          {/* <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input name="username" class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" type="text" placeholder="Username"/>
            <div>
              <span class="text-red-500 text-xs italic">
                Please fill out this field.
              </span>
            </div>
          </div>
          <div class="md:w-1/2 px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" htmlFor="title">
              Title*
            </label>
            <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="title" type="text" placeholder="Software Engineer"/>
          </div>
        </div> */}
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
            </label>
              <input name="username" className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" onChange={handleChange} value={username || ""} required />
              <div>
                <span class="text-red-500 text-xs italic">
                  {usernameError}
              </span>
              </div>
            </div>
          </div>
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
              <input name="email" className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="email" placeholder="user@example.com" onChange={handleChange} value={email || ""} required />
              <div>
                <span class="text-red-500 text-xs italic">
                  {emailError}
              </span>
              </div>
            </div>
          </div>
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
              <input name="password" className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="password" placeholder="*********************" onChange={handleChange} value={password || ""}/>
              <div>
                <span class="text-red-500 text-xs italic">
                  {passwordError}
              </span>
              </div>
            </div>
          </div>
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2"/*class="uppercase tracking-wide text-black text-xs font-bold mb-2"*/ htmlFor="confirmPassword">
                Confirm Password
            </label>
              <input name="confirmPassword" className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" /*class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"*/ type="password" placeholder="*********************" onChange={handleChange} value={confirmPassword || ""}/>
              <div>
                <span class="text-red-500 text-xs italic">
                  {confirmPasswordError}
              </span>
              </div>
            </div>
          </div>

          {/* <div class="-mx-3 md:flex mb-2">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" htmlFor="location">
              Location*
            </label>
            <div>
              <select class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded" id="location">
                <option>Abuja</option>
                <option>Enugu</option>
                <option>Lagos</option>
              </select>
            </div>
          </div>
          <div class="md:w-1/2 px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" htmlFor="job-type">
              Job Type*
            </label>
            <div>
              <select class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded" id="job-type">
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
              </select>
            </div>
          </div>
          <div class="md:w-1/2 px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" htmlFor="department">
              Department*
            </label>
            <div>
              <select class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded" id="department">
                <option>Engineering</option>
                <option>Design</option>
                <option>Customer Support</option>
              </select>
            </div>
          </div>
        </div> */}
          <div class="flex justify-between align-center mt-2">
            {/* <div class="md:w-full px-3"> */}
            {/* <button class="bg-brandBlue-A text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full">
              Button
            </button> */}
            <button className="bg-brandBlue-A hover:bg-brandBlue-B text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {isLogin ? "Sign Up" : "Login"}
            </button>
            <a className="inline-block self-center font-semibold text-sm text-brandBlue-A hover:text-brandBlue-B" onClick={handleIsLogin} href="#">
              {isLogin ? "Login instead?" : "Sign Up instead?"}
            </a>
            {/* </div> */}
          </div>
        </div>
      </form>
    </div>

  );

  // return (
  //   // <div className="bg-gray-100">
  //     <div className="h-screen bg-white border-gray-400 p-4 px-3 py-10 bg-gray-200 flex justify-center">
  //     <div className="w-full max-w-xs md:max-w-sm m-auto">
  //     <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
  //       {isLogin && <div className="mb-4">
  //         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
  //           Username
  //         </label>
  //         <input className="input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" placeholder="Username" onChange={handleChange} value={username || ""} required/>
  //         <p className="text-red-500 text-xs italic">{usernameError}</p>
  //       </div>}
  //       <div className="mb-4">
  //         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
  //           Email
  //         </label>
  //         <input className="input shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" placeholder="user@example.com" onChange={handleChange} value={email || ""} required/>
  //         <p className="text-red-500 text-xs italic">{emailError}</p>
  //       </div>
  //       <div className="mb-4">
  //         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
  //           Password
  //         </label>
  //         <input className="input shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="******************" onChange={handleChange} value={password || ""} required />
  //         <p className="text-red-500 text-xs italic">{passwordError}</p>
  //       </div>
  //       {isLogin && <div className="mb-6">
  //         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
  //           Confirm Password
  //         </label>
  //         <input className="input shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="confirmPassword" type="password" placeholder="******************" onChange={handleChange} value={confirmPassword || ""} required />
  //         <p className="text-red-500 text-xs italic">{confirmPasswordError}</p>
  //       </div>}
  //       <div className="flex items-center justify-between">
  //         <button className="bg-brandBlue-A hover:bg-brandBlue-B text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
  //           {isLogin ? "Sign Up" : "Login"}
  //         </button>
  //         <a className="inline-block align-baseline font-semibold text-sm text-brandBlue-A hover:text-brandBlue-B" onClick={handleIsLogin} href="#">
  //           {isLogin ? "Login instead?" : "Sign Up instead?"}
  //         </a>
  //       </div>
  //     </form>
  //     {/* <p className="text-center text-gray-500 text-xs">
  //       &copy;2020 Lidth Corp. All rights reserved.
  //     </p> */}
  //   </div>
  //     </div>

  //   // </div>

  // );
};

export default Form;