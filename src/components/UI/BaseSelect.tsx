import { useFormikContext } from "formik";
import { t } from "i18next";
import { tv } from "tailwind-variants";
import { FormikError } from "./FormikError";
import Select from "react-select";
import selectStyle from "../../utils/selectStyle";
import LoadingIndicator from "../UI/LoadingIndicator";

export type BaseSelect_TP = {
  label?: string;
  id: string;
  name: string;
  options: any;
  onChange: () => void;
  isLoading: boolean;
  noMb?: boolean;
  required?: boolean;
  className?: string;
  labelProps?: string;
  placeholder?: string;
  disabled?: boolean;
};

const BaseSelect = ({
  label,
  id,
  name,
  options,
  className,
  onChange,
  required,
  isLoading,
  noMb = false,
  placeholder,
  disabled,
  ...props
}: BaseSelect_TP) => {
  console.log("🚀 ~ disabled:", disabled)

  return (
    <div>
      <label htmlFor="course" className="font-bold">
        {label}
      </label>
      <Select
        className={`mt-1 ${className}`}
        styles={selectStyle}
        id={id}
        name={name}
        placeholder={placeholder}
        options={options}
        value={props.value}
        onChange={onChange}
        isLoading={isLoading}
        // disabled={disabled}
        isDisabled={disabled}
        components={{ LoadingIndicator }}
      />
      <FormikError name="course_name" className="whitespace-nowrap" />
    </div>
  );
};

export default BaseSelect;
