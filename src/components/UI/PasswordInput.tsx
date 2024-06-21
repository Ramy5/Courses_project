import React, { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

interface PasswordInput_TP {
  name: string;
  value?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  parentClass?: string;
}

const PasswordInput = (props: PasswordInput_TP) => {
  const {
    value,
    name,
    placeholder,
    className,
    id,
    onChange,
    onBlur,
    parentClass,
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div
      className={`${parentClass} flex items-center w-full gap-2 rounded-full bg-[#D8DEEA] px-6  shadow-lg`}
    >
      <input
        name={name}
        id={id || name}
        value={value}
        className={` ${className} w-full px-2 py-3 text-xl bg-transparent text-slate-800 focus-within:outline-none`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        type={showPassword ? "text" : "password"}
      />
      {showPassword ? (
        <IoMdEyeOff
          size={28}
          className="cursor-pointer text-[#393D94]"
          onClick={handleShowPassword}
        />
      ) : (
        <IoEye
          size={28}
          className="cursor-pointer text-[#393D94]"
          onClick={handleShowPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
