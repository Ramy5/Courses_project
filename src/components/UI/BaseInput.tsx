import { useFormikContext } from "formik";
import { t } from "i18next";
import { tv } from "tailwind-variants";
import { FormikError } from "./FormikError";
import { useEffect } from "react";
import { changeSidebarRoute } from "../../features/dirty/dirtySlice";
import { useAppDispatch } from "../../hooks/reduxHooks";

export type BaseInput_TP = {
  label?: string;
  id: string;
  noMb?: boolean;
  required?: boolean;
  className?: string;
  labelProps?: string;
  name: string;
  placeholder?: string;
  ref?: any;
  disabled?: boolean;
  autoFocus?: any;
  type?:
    | "text"
    | "number"
    | "password"
    | "email"
    | "checkbox"
    | "text"
    | "date"
    | "time";
    min?: number;
    max?: number;
};

const BaseInput = ({
  label,
  id,
  required,
  labelProps,
  noMb = false,
  type = "text",
  placeholder,
  ref,
  disabled,
  autoFocus,
  min, 
  max,
  ...props
}: BaseInput_TP) => {

  const dispatch = useAppDispatch();

  const {
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
    values,
    dirty,
    isSubmitting,
  } = useFormikContext<{
    [key: string]: any;
  }>();
    console.log("🚀 ~ values:", values)

  useEffect(() => {
    dispatch(changeSidebarRoute(dirty && !isSubmitting));
  }, [dirty]);

  const GeneralInputClass: string =
    "form-input px-4 py-[.30rem] w-full shadows";

  const baseInput = tv({
    base: `rounded-md border-2 border-transparent focus:!border-2 focus:!border-black`,
    variants: {
      error: {
        true: "border-mainRed",
      },
      type: {
        checkbox:
          "w-4 h-4 text-mainGreen border-gray-300 rounded focus:ring-mainColor form-checkbox shadow-none",
        radio:
          "w-5 h-5 form-radio rounded-full focus:ring-mainGreen border-gray-300",
        text: GeneralInputClass,
        email: GeneralInputClass,
        password: GeneralInputClass,
        number: GeneralInputClass,
        date: GeneralInputClass,
        time: GeneralInputClass,
        datetime: GeneralInputClass,
        month: GeneralInputClass,
        week: GeneralInputClass,
        tel: GeneralInputClass,
        url: GeneralInputClass,
        search: GeneralInputClass,
        color: GeneralInputClass,
      },
    },
  });

  return (
    <div className={noMb ? "col-span-1 relative" : "col-span-1 relative"}>
      <div className="relative flex flex-col gap-1">
        {label && (
          <label
            className={`${labelProps} text-base font-normal text-black`}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          autoFocus={autoFocus}
          id={id}
          value={props.value || values[props.name]}
          error={touched[props.name] && !!errors[props.name]}
          placeholder={placeholder ? `${t(placeholder)}` : ""}
          autoComplete="off"
          onBlur={() => {
            setFieldTouched(props.name, true);
          }}
          onChange={(e) => {
            props.onChange && props.onChange(e);
            if (props.value === undefined) {
              setFieldValue(props.name, e.target.value);
            }
          }}
          className={baseInput({
            error: errors,
            className: props.className,
            type: props.type || "text",
          })}
          ref={ref}
          disabled={disabled}
          min={min}
          max={max}
        />
      </div>
      <FormikError name={props.name} className="absolute whitespace-nowrap" />
    </div>
  );
};

export default BaseInput;
