import { useFormikContext } from "formik";
import { t } from "i18next";
import { createElement } from "react";
import { twMerge } from "tailwind-merge";

export const FormikError = ({
  name,
  as = "p",
  className,
  withTouched = true,
}: {
  name: string;
  as?: string;
  className?: string;
  withTouched?: boolean;
}) => {
  const { errors: formikErrors, touched: formikTouched } = useFormikContext<{
    [key: string]: any;
  }>();
  const error = formikErrors[name] ? `${t(`${formikErrors[name]}`)}` : "";
  const isTouched = formikTouched[name];
  return (withTouched ? !!error && isTouched : !!error)
    ? createElement(
        as,
        { className: twMerge(className, "text-mainRed") },
        error?.toString()
      )
    : null;
};
