import { JsxElement } from "typescript";

interface InputProps {
  children?: string | JsxElement | JsxElement[];
  type?: string;
  id: string;
  name: string;
  placeholder: string;
  [x: string]: any;
}

function Input({ children, type, id, name, placeholder, ...rest }: InputProps) {
  return (
    <>
      <label htmlFor={name}>{name}</label>
      <input
        type={type || "text"}
        name={name}
        placeholder={placeholder}
        className='my-4 rounded-xl px-4 py-2 w-full border border-indigo-500 focus:ring-2 ring-indigo-500 outline-none'
        {...rest}
      />
    </>
  );
}

export default Input;
