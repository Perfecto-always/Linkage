import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import useOnScreen from "../../hooks/useOnScreen";

export default function AboutUs() {
  // const prevColor = usePrevious();
  // console.log(prevColor);
  const [color, setColor] = useState("bg-yellow-200");

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  const isVisible1 = useOnScreen(ref1);
  const isVisible2 = useOnScreen(ref2);
  const isVisible3 = useOnScreen(ref3);

  useEffect(() => {
    if (isVisible1) setColor("bg-yellow-200");
    if (isVisible2) setColor("bg-blue-300");
    if (isVisible3) setColor("bg-emerald-400");
  }, [isVisible1, isVisible2, isVisible3]);

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
        <div className='about flex '>
          <div
            className={`px-4 w-full flex flex-col justify-center items-center ${color} transition-colors duration-700 ease-in-out `}
          >
            <h1 className='text-5xl font-poppins-700 tracking-tight my-4'>
              About Us
            </h1>

            <p className='max-w-sm font-medium'>
              Praline makes it very easy to know whats your friends been up to.
              No more feeling of being left out.
              <br />
              <br />
              There are endless amount of time where you might have wanted to
              have the convienece at your finger tips not changing the app to
              change while chating with friend. This is now possible.
              <br />
              <br />
              Crystalize your life with Praline.
            </p>
          </div>
          <div className='w-full bg-gray-50 overflow-auto scroll-hidden snap-parent'>
            <div
              ref={ref1}
              className='h-screen snap-children bg-yellow-200'
            ></div>
            <div
              ref={ref2}
              className='h-screen snap-children bg-blue-300'
            ></div>
            <div
              ref={ref3}
              className='h-screen snap-children bg-emerald-400'
            ></div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
