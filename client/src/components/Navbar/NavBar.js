import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className='flex justify-between px-4 py-7  items-center h-20'>
      <div className='text-xl font-bold tracking-widest font-mono'>
        LINKAGE.
      </div>
      <ul className='flex'>
        <li className='mx-3'>
          <NavLink
            exact
            to='/'
            className='text-gray-500 font-medium  hover:text-black'
            activeClassName='active-nav'
          >
            Home
          </NavLink>
        </li>
        <li className='mx-3'>
          <NavLink
            to='/about'
            className='text-gray-500 font-medium  hover:text-black'
            activeClassName='active-nav'
          >
            About Us
          </NavLink>
        </li>
      </ul>
      <NavLink
        to='/register'
        className='mx-3 text-indigo-500 font-medium'
        activeClassName=''
      >
        Sign In
      </NavLink>
    </nav>
  );
};

export default NavBar;
