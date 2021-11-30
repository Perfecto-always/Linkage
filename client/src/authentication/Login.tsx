import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Particles from "../components/Particles";
import { BACKEND_URL } from "../config/config";

function Login() {
  const [user, setUser] = useState({
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

  const loginHandler = async (e: any) => {
    e.preventDefault();
    const { email, password } = user;
    await axios
      .post(
        BACKEND_URL + "/api/user/login",
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setIsMessage(true);
        if (res.data.auth === false) {
          setIsSuccess(false);
          setMessage(res.data.message);
        } else {
          setIsSuccess(true);
          localStorage.setItem("username", JSON.stringify(res.data.username));
          setMessage(res.data.message);
        }
      })
      .then(() => {
        if (!isSuccess) {
          setTimeout(() => {
            window.location.href = "/chat";
          }, 2500);
        }
      })
      .catch((error) => {
        setIsMessage(true);
        setIsSuccess(false);
        setMessage(error.response.data.message);
      });
  };

  const showPassword = (e: any) => {
    const password = document.getElementById("password")! as HTMLInputElement;
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
        className='flex 
      md:flex-col md:space-y-5'
      >
        <div className='text-left leading-5 mx-5 md:text-center'>
          <h1 className='my-3 font-poppins-700 text-6xl sm:text-4xl'>
            Login to Your Account
          </h1>
          <p className='mb-3 text-gray-400'>
            We are glad to have you back again.
          </p>
        </div>

        <form
          method='POST'
          className='space-y-3 px-20 w-10/12 text-left md:w-full sm:px-10'
          onSubmit={loginHandler}
        >
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
            autoComplete='off'
            required={true}
            minLength={8}
            pattern='^[a-zA-Z0-9]{3,30}$'
          />

          <br />
          <div className='inline-flex'>
            <input
              type='checkbox'
              name='showPassword'
              onClick={showPassword}
              className='h-4 w-4 rounded form-checkbox text-teal-500 mr-2 focus:ring-0 border-0'
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
            Login to Your Account
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
            Do not have an account:{" "}
            <NavLink to='/register' className='text-teal-500 font-medium'>
              Sign up
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
}
export default Login;
