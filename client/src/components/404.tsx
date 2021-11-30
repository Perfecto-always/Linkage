import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import error from "../assets/images/404.svg";

export default function Errors() {
  useEffect(() => {
    document.title = "Page Not Found";
  }, []);
  return (
    <div className='container h-screen bg-primary-500 flex justify-center items-center sm:flex-col-reverse'>
      <div className='mx-10'>
        <p className='text-xl text-gray-300 my-2 font-medium '>
          Page Not Found
        </p>
        <p className='break-words tracking-widest text-gray-400'>
          Look like you lost your route
        </p>
        <p className='tracking-widest text-gray-400 my-4'>
          Want to go back?{" "}
          <NavLink exact to='/chat' className='text-teal-400'>
            Chat
          </NavLink>
        </p>
      </div>
      <div className='relative'>
        <div className='absolute inset-0 backdrop-filter backdrop-saturate-150'></div>
        <img src={error} alt='404 not found' className='w-96 h-96 ' />
      </div>
    </div>
  );
}
