import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Faq({ children }) {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key='content'
          initial='collapsed'
          animate='open'
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: {
              opacity: 0,
              transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
            },
          }}
          transition={{ duration: 1, ease: [0.04, 0.62, 0.23, 0.98] }}
          className='bg-white rounded-3xl text-left py-2 px-10 flex flex-col h-auto w-full'
        >
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { isHidden, setIsHidden });
          })}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

const Question = ({ children, isHidden, setIsHidden }) => {
  return (
    <div className='flex justify-between font-medium'>
      <h6 className='text-lg'>{children}</h6>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsHidden(!isHidden);
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='24px'
          viewBox='0 0 24 24'
          width='24px'
          fill='#000000'
        >
          <path d='M24 24H0V0h24v24z' fill='none' opacity='.87' />
          <path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z' />
        </svg>
      </button>
    </div>
  );
};

const Answer = ({ children, isHidden }) => {
  if (isHidden) return null;

  return (
    <motion.p
      // key='content'
      // initial='collapsed'
      // animate='open'
      // exit='collapsed'
      // variants={{
      //   open: { opacity: 1, height: "auto" },
      //   collapsed: { opacity: 0, height: 0 },
      // }}
      // transition={{ duration: .8, ease: [0.04, 0.62, 0.23, 0.98] }}

      variants={{
        collapsed: {
          opacity: 0,
          height: 0,
          width: "-50%",
          transition: { ease: "easeInOut", easings: [0.42, 0, 0.58, 1] },
        },
        open: {
          scale: 1,
          opacity: 1,
          height: "auto",
          transition: { ease: "linear", easings: [0.42, 0, 0.58, 1] },
        },
      }}
      animate={!isHidden ? "open" : "collapsed"}
      transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
      className='break-words flex justify-start items-start w-11/12 my-2'
    >
      {children}
    </motion.p>
  );
};

Faq.Question = Question;
Faq.Answer = Answer;

export default Faq;
