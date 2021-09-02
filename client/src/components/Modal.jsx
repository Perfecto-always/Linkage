import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

function Modal({ children, closeModal, openModal, isSuccess }) {
  useEffect(() => {
    setTimeout(() => {
      closeModal(false);
    }, 3800);
  });
  if (!openModal) return null;

  const changeBg = !isSuccess
    ? "bg-red-500 border-red-400"
    : "bg-green-500 border-green-400";

  return ReactDOM.createPortal(
    <>
      <AnimatePresence type='crossfade'>
        <motion.div
          key='modal'
          initial={{ y: -10, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{ opacity: [1, 0.7, 0.3, 0], type: "tween" }}
          transition={{ duration: 0.44, ease: "easeOut" }}
          className={`z-50 px-6 py-2 fixed top-3 rounded-lg left-2/4 ${changeBg} text-white shadow-2xl border `}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>,
    document.getElementById("root-portals")
  );
}

export default Modal;
