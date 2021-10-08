import React from "react";
import { Link, NavLink } from "react-router-dom";
import noImage from "../../assets/images/noAvatar.png";
import Larch from "../../assets/logo/Larch.svg";

const username = JSON.parse(localStorage.getItem("username"));

const NavBar = () => {
  return (
    <nav className='flex justify-between px-4 py-7 items-center h-20 md:justify-center bg-transparent shadow-md'>
      <div className='text-xl font-bold tracking-widest font-goblin '>
        <Link exact to='/' className='flex justify-between items-center'>
          <img src={Larch} alt='' className='w-12 mr-2' />
          LARCH.
        </Link>
      </div>
      <ul className='flex md:hidden'>
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
      {username ? (
        <div>
          <Link
            to='/chat'
            className='py-3 bg-gray-50 px-4 rounded-full flex hover:bg-gray-200 transiton duration-200'
          >
            <span className=''>
              <img
                src={noImage}
                alt={username}
                className='w-7 mr-2 rounded-full'
              />
            </span>
            {username}
          </Link>
        </div>
      ) : (
        <NavLink
          to='/register'
          className='mx-3 text-red-500 font-medium md:hidden'
          activeClassName=''
        >
          Sign In
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
