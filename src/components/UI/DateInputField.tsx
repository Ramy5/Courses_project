import { useFormikContext } from "formik";
import { ReactNode } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BaseInput from "./BaseInput";

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
  const { setFieldValue, handleBlur, values } = useFormikContext<{
    [key: string]: any;
  }>();

  return (
    <div className="relative col-span-1">
      <div className="flex flex-col gap-1">
        <label
          htmlFor={name}
          required={required}
          {...labelProps}
          className="text-base font-semibold text-black"
        >
          {label}
        </label>
        {/* <DatePicker
          selected={values[name]}
          onChange={(date: Date) => {
            setFieldValue(name, date);
          }}
          isClearable
          placeholderText={placeholder || "I have been cleared!"}
          onBlur={handleBlur(name)}
          className={`${className} w-full text-lg text-center py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none`}
          dateFormat="dd/MM/yyyy"
          autoComplete="off"
          maxDate={maxDate}
          minDate={minDate}
          // value={
          //   values[name]
          //     ? values[name]?.toLocaleDateString()
          //     : value?.toLocaleDateString()
          // }
        /> */}
        <BaseInput
          name={name}
          type="date"
          className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
        />
      </div>
    </div>
  );
};
