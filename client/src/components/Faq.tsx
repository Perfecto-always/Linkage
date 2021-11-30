import React, { useState } from "react";

function Faq({ children }: any) {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <div className='text-left flex flex-col w-full text-red-700'>
        <div className='bg-red-400 hover:shadow-lg py-4 h-60 rounded-xl  transition-shadow duration-300 ease-in-out neo-card'>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { isHidden, setIsHidden });
          })}
        </div>
      </div>
    </>
  );
}

const Question = ({ children }: any) => {
  return (
    <div className='flex justify-between  py-2 px-10 rounded-3xl md:p-0'>
      <h6 className='text-2xl font-bold tracking-wider md:text-base '>
        {children}
      </h6>
    </div>
  );
};

const Answer = ({ children }: any) => {
  return (
    <div className='break-words py-3 px-10 tracking-wider max-w-xl text-base font-medium md:py-2 md:px-0 md:w-full md:text-sm md:font-thin'>
      {children}
    </div>
  );
};

Faq.Question = Question;
Faq.Answer = Answer;

export default Faq;
