import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import Create from "./Create";
import Join from "./Join";

function ModalForm({ trigger, setTrigger, fetchData, isNew }) {
  if (!trigger) return null;

  return ReactDOM.createPortal(
    <div
      id='form-popup'
      className='fixed w-screen h-screen top-0 left-0 flex bg-black bg-opacity-10 justify-center items-center'
    >
      <motion.form
        initial={{ scale: 0, opacity: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        method='POST'
        className=' bg-white h-1/2 w-1/5 px-2 fixed flex flex-col rounded-xl justify-center space-y-3'
      >
        {isNew ? (
          <Create setTrigger={setTrigger} fetchData={fetchData} />
        ) : (
          <Join setTrigger={setTrigger} fetchData={fetchData} />
        )}
        <button
          className='absolute right-4 top-0'
          onClick={(e) => {
            setTrigger(false);
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            fill='#000000'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
          </svg>
        </button>
      </motion.form>
    </div>,
    document.getElementById("root-portals")
  );
}

export default ModalForm;
