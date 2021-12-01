import { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { JsxElement } from "typescript";

interface ParticlesProps {
  children: JsxElement | JsxElement[] | string;
  closeModal?: (args: boolean) => void;
  openModal?: boolean;
  isSuccess?: boolean;
}

function Particles({
  children,
  closeModal,
  openModal,
  isSuccess,
}: ParticlesProps) {
  useEffect(() => {
    if (!openModal) return;
    const timeout = setTimeout(() => closeModal!(false), 2000);

    return () => clearTimeout(timeout);
  }, [openModal, closeModal]);

  const changeBg = !isSuccess
    ? "bg-red-500 border-red-400"
    : "bg-green-500 border-green-400";

  return ReactDOM.createPortal(
    <>
      {openModal && (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key='modal'
            variants={{
              open: {
                y: 0,
                opacity: 1,
              },
              closed: { y: -10, opacity: 0, x: "-50%" },
            }}
            initial='closed'
            animate='open'
            exit='closed'
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
            className={`z-50 px-6 py-2 fixed top-3 rounded-lg left-2/4 ${changeBg} text-white shadow-2xl border`}
          >
            {children.toString().length < 0
              ? "Internal Server Error"
              : children}
          </motion.div>
        </AnimatePresence>
      )}
    </>,
    document.getElementById("root-portals")!
  );
}

export default Particles;
