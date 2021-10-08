import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import { withRouter } from "react-router";

function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  let name, value;

  const inputHandler = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    await axios
      .post(
        `http://localhost:8080/api/user/login`,
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
            history.push("/chat");
          }, 3000);
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        }
      })
      .catch((error) => {
        setIsMessage(true);
        setIsSuccess(false);
        setMessage(error.response.data.message);
      });
  };

  const showPassword = (e) => {
    const password = document.getElementById("password");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  return (
    <div className='w-full justify-center self-center flex-1'>
      <Modal
        children={message}
        isSuccess={isSuccess}
        openModal={isMessage}
        closeModal={setIsMessage}
      />
      <h1 className='mx-4 my-2 text-3xl text-center font-bold text-indigo-700'>
        Login
      </h1>
      <form method='POST' className='px-20 my-8'>
        <label htmlFor='email'>Email Address:</label>
        <br />
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Enter your email'
          className='my-4 rounded-xl px-4 py-2 w-full border border-indigo-500 focus:ring-2 ring-indigo-500 outline-none'
          value={user.email}
          onChange={inputHandler}
        />
        <br />
        <label htmlFor='password'>Password:</label>
        <br />
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Enter your password'
          className='my-4 rounded-xl px-4 py-2 w-full border border-indigo-500 focus:ring-2 ring-indigo-500 outline-none'
          value={user.password}
          onChange={inputHandler}
        />
        <input type='checkbox' name='showPassword' onClick={showPassword} />
        <label htmlFor='showPassword' className='text-sm'>
          {" "}
          Show Password
        </label>
        <br />
        <button
          type='submit'
          className='my-4 rounded-xl px-4 py-2 w-full border text-white font-medium bg-gradient-to-r from-indigo-600 to-violet-600 focus:ring-2 ring-indigo-500 outline-none hover:from-indigo-500 hover:to-violet-500'
          onClick={loginHandler}
        >
          Submit
        </button>
        <p>
          Do not have an account:{" "}
          <NavLink to='/register' className='text-violet-700 font-medium '>
            Sign up
          </NavLink>
        </p>
      </form>
    </div>
  );
}
export default withRouter(Login);
