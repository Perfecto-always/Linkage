import { motion } from "framer-motion";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  close: (agrs: boolean) => void;
  children: JSX.Element | JSX.Element[] | string ;
}

function Modal({ open, close, children }: ModalProps) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      id='form-popup'
      className='fixed w-screen h-screen top-0 left-0 flex bg-gray-600 bg-opacity-10 justify-center items-center'
      onClick={() => {
        close(false);
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        className='z-50 bg-primary-200 text-white relative p-8 rounded-md'
      >
        {/* <button
          className='absolute right-2 top-2'
          onClick={(e) => {
            e.preventDefault();
            close(false);
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
        </button> */}
        {children}
      </motion.div>
    </div>,
    document.getElementById("root-portals")!
  );
}

export default Modal;
