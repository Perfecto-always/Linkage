import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

function Modal({ children, closeModal, openModal, isSuccess }) {
  useEffect(() => {
    setTimeout(() => {
      closeModal(false);
    }, 3800);
  });

  const changeBg = !isSuccess
    ? "bg-red-500 border-red-400"
    : "bg-green-500 border-green-400";

  return ReactDOM.createPortal(
    <>
      {openModal && (
        <AnimatePresence>
          <motion.div
            key='modal'
            variants={{
              open: {
                y: 0,
                opacity: 1,
              },
              closed: { y: -10, opacity: [1, 0.7, 0.3, 0], type: "tween" },
            }}
            initial='closed'
            animate={openModal ? "open" : "closed"}
            exit='closed'
            // exit={{ }}
            transition={{ duration: 0.5, ease: "easeOut", type: "spring" }}
            className={`z-50 px-6 py-2 fixed top-3 rounded-lg left-2/4 ${changeBg} text-white shadow-2xl border `}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </>,
    document.getElementById("root-portals")
  );
}

export default Modal;
