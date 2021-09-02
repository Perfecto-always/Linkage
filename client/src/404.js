import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Errors() {
  useEffect(() => {
    document.title = "Page Not Found";
  }, []);
  return (
    <div className='container-full-page bg-black justify-items-center overflow-hidden'>
      <div className='mx-10'>
        <h1 className='error glitch ' data-text='404'>
          404
        </h1>
        <p className='text-xl text-gray-300 my-2 font-medium '>
          Page Not Found
        </p>
        <p className='break-words md:w-2/5 tracking-widest text-gray-600'>
          Looks like you want to go somewhere but something got screwed in
          between don't worry fam we got you covered <br />
        </p>
        <p className='tracking-widest text-gray-500 my-4'>
          Want to go back to Home page?{" "}
          <NavLink exact to='/' className='text-indigo-400'>
            Home
          </NavLink>
        </p>
      </div>
    </div>
  );
}
