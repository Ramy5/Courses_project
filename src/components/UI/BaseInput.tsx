import React from "react";

interface BaseInputProps {
  name: string;
  value: string;
  labelText?: string;
  type?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const BaseInput: React.FC<BaseInputProps> = ({
  name,
  value,
  labelText,
  type = "text",
  className,
  onChange,
  onBlur,
}) => {
  return (
    <div className="">
      <label className="" htmlFor={name}>
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`${className}`}
      />
    </div>
  );
};

export default BaseInput;
