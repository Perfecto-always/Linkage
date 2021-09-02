import React from "react";

function Footer() {
  return (
    <>
      <div className='h-screen bg-black text-white'>
        <h1 className='text-gray-400 text-right'>
          {" "}
          &#169; under Linkage from 2021-{new Date().getFullYear()}{" "}
        </h1>
      </div>
    </>
  );
}

export default Footer;
