import { AnimatePresence } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import Faq from "../../components/Faq";
import { faq } from "./FAQ";

export default function Home() {
  return (
    <>
      <main className='main-home bg-gradient-to-b from-blue-100 to-white  flex justify-center items-center'>
        <div className='space-y-2 mx-2 text-center leading-9'>
          <h1 className='text-5xl font-extrabold font-mono uppercase tracking-widest max-w-3xl '>
            Listen and Chat at the same time
          </h1>
          <p className='text-gray-500 text-lg'>
            Listen anywhere and with anyone no more hassles of syncing with what
            your friend is doing
          </p>
          <button className='bg-sky-600 px-6 py-2 text-white rounded-full hover:bg-sky-700 transition-colors duration-300'>
            <Link to='/register'> Get started now</Link>
          </button>
        </div>
      </main>
      <article className='h-screen bg-gray-900 flex justify-center items-center'>
        <div className='space-y-9 mx-2 text-center flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-mono text-white font-extrabold uppercase tracking-wider'>
            Frequently asked questions?
          </h1>
          <div className='space-y-2 flex flex-col justify-center items-center w-1/2'>
            {/* <AnimatePresence initial={false}> */}
            {faq.map((data, index) => (
              <Faq key={index}>
                <Faq.Question>{data.question}</Faq.Question>
                <Faq.Answer>{data.answer}</Faq.Answer>
              </Faq>
            ))}
            {/* </AnimatePresence> */}
          </div>
        </div>
      </article>
    </>
  );
}
