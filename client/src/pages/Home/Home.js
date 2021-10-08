import React, { useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Faq from "../../components/Faq";
import { faq } from "./FAQ";
import { motion } from "framer-motion";
import useOnScreen from "../../hooks/useOnScreen";

export default function Home() {
  const history = useHistory();
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  const pageVariants = {
    in: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.27, type: "tween", ease: "linear" },
    },
    out: {
      opacity: 0,
      x: "-100vw",
      transition: { duration: 0.27, type: "tween", ease: "linear" },
    },
  };
  return (
    <>
      <motion.div variants={pageVariants} initial='out' animate='in' exit='out'>
        <main className='main-home bg-violet-300  flex justify-center items-center'>
          <div className='space-y-3 mx-2 text-center leading-9'>
            <h1 className='text-5xl text-violet-700 font-extrabold font-goblin uppercase tracking-widest max-w-3xl md:text-2xl'>
              Listen and Chat at the same time
            </h1>
            <p className='text-violet-600 text-lg md:text-sm'>
              Listen anywhere and with anyone no more hassles of syncing with
              what your friend is listening to.
            </p>
            <button className=' py-3'>
              <NavLink
                exact
                to='/register'
                className=' bg-violet-700 px-10 py-4 hover:shadow-md hover:bg-violet-500  text-white font-bold rounded-full transition-colors duration-300'
                onClick={(e) => {
                  history.push("/register");
                  window.location.reload();
                }}
              >
                Get started
              </NavLink>
              <NavLink
                exact
                to='/login'
                className='  px-10 py-4 text-lg text-violet-700 hover:underline font-bold'
                onClick={(e) => {
                  history.push("/login");
                  window.location.reload();
                }}
              >
                Log In
              </NavLink>
            </button>
          </div>
        </main>
        <motion.article className='h-screen bg-red-300 grid grid-flow-col grid-cols-1 grid-rows-2 gap-4 md:gap-0 md:py-6 md:block md:h-auto honeycomb'>
          <motion.h1
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : "50%" }}
            transition={{ duration: 1, type: "spring" }}
            ref={ref}
            className='text-5xl font-poppins-700 text-red-700 font-extrabold uppercase flex items-center justify-center lg:flex-none md:py-5 md:px-1 md:text-lg md:text-center'
          >
            Frequently asked questions?
          </motion.h1>

          <div className='grid grid-flow-col grid-cols-3 gap-3 px-7 max-w-full lg:grid-flow-col lg:grid-cols-1 lg:grid-rows-3 md:space-y-4 md:mt-4'>
            {faq.map((data, index) => (
              <Faq key={index}>
                <Faq.Question>{data.question}</Faq.Question>
                <Faq.Answer>{data.answer}</Faq.Answer>
              </Faq>
            ))}
          </div>
        </motion.article>
      </motion.div>
    </>
  );
}
