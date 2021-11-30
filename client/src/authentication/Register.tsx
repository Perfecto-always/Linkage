import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import Particles from "../components/Particles";
import { BACKEND_URL } from "../config/config";

function Register() {
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  let name, value;

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const formHandler = async (e: any) => {
    e.preventDefault();
    const { username, email, password } = user;

    await axios
      .post(BACKEND_URL + "/api/user/register", {
        username,
        email,
        password,
      })
      .then((res) => {
        setIsMessage(true);
        if (res.data.auth === false) {
          setIsSuccess(false);
          setMessage(res.data.message);
        } else {
          setIsSuccess(true);
          setMessage(res.data.message);
          setTimeout(() => {
            history.push("/login");
          }, 3000);
        }
      })
      .catch((error) => {
        setIsMessage(true);
        setIsSuccess(false);
        setMessage(error.response.data.message);
      });
  };

  const showPassword = (e: any) => {
    const password = document.getElementById("password") as HTMLInputElement;
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  return (
    <>
      <Particles
        children={message}
        isSuccess={isSuccess}
        openModal={isMessage}
        closeModal={setIsMessage}
      />
      <div
        className='flex justify-evenly 
      md:space-y-5 md:flex-col'
      >
        <div
          className='text-left leading-5 mx-5
        md:text-center'
        >
          <h1 className='mt-10 mb-3 font-poppins-700 text-6xl sm:text-4xl sm:mt-5'>
            Create a New Account
          </h1>
          <p className='mb-3 text-gray-400'>Welcome to Praline.</p>
        </div>
        <form
          method='POST'
          className='space-y-3 px-20 w-10/12 text-left
          md:w-full sm:px-10'
          onSubmit={formHandler}
        >
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Enter username'
            className='p-3 w-full bg-primary-0 border border-primary-100 outline-none rounded-md focus:border-accent-0'
            value={user.username}
            onChange={inputHandler}
            autoComplete='off'
            required={true}
            minLength={3}
          />
          <br />
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter email'
            className='p-3 w-full bg-primary-0 border border-primary-100 outline-none rounded-md focus:border-accent-0'
            value={user.email}
            onChange={inputHandler}
            autoComplete='off'
            required={true}
          />
          <br />
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter password'
            className='p-3 w-full bg-primary-0 border border-primary-100 outline-none rounded-md focus:border-accent-0'
            value={user.password}
            onChange={inputHandler}
            required={true}
            autoComplete='off'
            minLength={8}
            pattern='^[a-zA-Z0-9]{3,30}$'
          />
          <br />
          <div className='inline-flex'>
            <input
              type='checkbox'
              name='showPassword'
              onClick={showPassword}
              className='h-5 w-5 rounded form-checkbox text-teal-500 mr-2 focus:ring-0 border-0'
            />
            <label htmlFor='showPassword' className='text-sm'>
              {" "}
              Show Password
            </label>
          </div>
          <br />
          <button
            type='submit'
            className='p-3 w-full bg-gradient-to-r to-cyan-400 via-teal-600  from-emerald-600 rounded-md inline-flex justify-between font-medium hover:opacity-95'
          >
            Create a New Account
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z'></path>
            </svg>
          </button>
          <p className='text-gray-400'>
            Already have an account:{" "}
            <NavLink to='/login' className='text-teal-500 font-medium'>
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
}
export default Register;
