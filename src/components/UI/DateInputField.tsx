import { useFormikContext } from "formik";
import { ReactNode, forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tv } from "tailwind-variants";
import BaseInput from "./BaseInput";
import { format, isValid, parse } from "date-fns";

export const DateInputField = ({
  label,
  icon,
  name,
  maxDate,
  required,
  minDate,
  labelProps,
  value,
  placeholder,
  className,
}: {
  label?: string;
  icon?: ReactNode;
  name: string;
  maxDate?: Date;
  minDate?: Date;
  value?: Date;
  required?: any;
  placeholder?: string;
  className?: any;
  labelProps?: {
    [key: string]: any;
  };
}) => {
  const { setFieldValue, errors, touched, handleBlur, values } =
    useFormikContext<{
      [key: string]: any;
    }>();
  //   const [dateActive, setDateActive] = useState(false);

  return (
    <div className="relative col-span-1">
      <div className="flex flex-col gap-1">
        <label
          htmlFor={name}
          required={required}
          {...labelProps}
          className="text-base"
        >
          {label}
        </label>
        <DatePicker
          selected={values[name]}
          icon={icon}
          placeholderText={placeholder}
          onChange={(date: Date) => {
            setFieldValue(name, date);
          }}
          onBlur={handleBlur(name)}
          className={`${className} w-full text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none`}
          maxDate={maxDate}
          dateFormat="dd/MM/yyyy"
          minDate={minDate}
          //   isClearable={true}
          name={name}
          autoComplete="off"
          value={
            // date to string
            values[name]
              ? values[name]?.toLocaleDateString()
              : value?.toLocaleDateString()
          }
        />
      </div>
      {/* <FormikError name={name} className="absolute whitespace-nowrap" /> */}
    </div>
  );
};
