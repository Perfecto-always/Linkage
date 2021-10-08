import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router";

function Contact() {
  const pageVariants = {
    in: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.27, type: "tween", ease: "linear" },
    },
    out: {
      opacity: 0,
      x: "100vw",
      transition: { duration: 0.27, type: "tween", ease: "linear" },
    },
  };

  return (
    <>
      <motion.div variants={pageVariants} initial='out' animate='in' exit='out'>
        <div className='h-screen'>
          <form action=''>
            <label htmlFor='sender-name'>Name</label>
            <input
              type='text'
              placeholder='Enter Your Name'
              name='sender-name'
            />
            <label htmlFor='sender-email'>Email</label>
            <input
              type='email'
              placeholder='Enter you email'
              name='sender-name'
            />
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default Contact;
