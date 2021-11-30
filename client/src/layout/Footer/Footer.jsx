import React from "react";
import instagram from "../../assets/company icons/instagram.svg";
import facebook from "../../assets/company icons/facebook.svg";
import twitter from "../../assets/company icons/twitter.svg";

function Footer() {
  const imgs = [
    {
      source: instagram,
      alt: "instagram",
    },
    {
      source: facebook,
      alt: "facebook",
    },
    {
      source: twitter,
      alt: "twitter",
    },
  ];

  return (
    <>
      <div className='h-auto p-4 bg-black'>
        <div className='px-4 py-2 flex justify-between content-around flex-row-reverse'>
          <div className='flex space-x-6'>
            {imgs.map((img, index) => (
              <div key={index} className='bg-gray-800 rounded-full p-2'>
                <img
                  src={img.source}
                  alt={img.alt}
                  className='filter brightness-0 invert cursor-pointer hover-none transition-color duration-300 linear'
                />
              </div>
            ))}
          </div>
          <h1 className='text-gray-400 '>
            {" "}
            &#169; Linkage from 2021-{new Date().getFullYear()}{" "}
          </h1>
        </div>
      </div>
    </>
  );
}

export default Footer;
