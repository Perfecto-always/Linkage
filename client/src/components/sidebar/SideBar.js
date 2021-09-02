import React from "react";
import { NavLink } from "react-router-dom";
import chat from "../../assets/icons/chat.svg";
import music from "../../assets/icons/music.svg";
import setting from "../../assets/icons/settings.svg";
//state
// import { useState } from "react";

const SideBar = () => {
  const liItems = [
    {
      id: 1,
      img: chat,
      alt: "chat",
      to: "/chat",
    },
    {
      id: 2,
      img: music,
      alt: "music",
      to: "/music",
    },
    {
      id: 3,
      img: setting,
      alt: "settings",
      to: "/settings",
    },
  ];
  return (
    <nav className='sidebar'>
      <ul className='side-items'>
        {liItems.map((items) => (
          <li key={items.id} className='px-2' title={items.alt}>
            <NavLink
              to={items.to}
              activeClassName='active bg-pink-700 '
              className='side-btn hover:bg-pink-800'
            >
              <img src={items.img} alt={items.alt} />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default SideBar;
