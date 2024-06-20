import { Form, Formik } from "formik";
import { useState } from "react";
import BaseInput from "../../UI/BaseInput";
import { useRTL } from "../../../hooks/useRTL";
import { t } from "i18next";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { Button } from "../..";

const InstructorLoginData = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const isRTL = useRTL();

  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const initialValues = {
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log("🚀 ~ InstructorLoginData ~ values:", values);
        }}
      >
        <Form className="flex flex-col gap-5 w-full md:w-3/4 px-16">
          <div>
            <BaseInput
              name="full_name"
              id="full_name"
              type="text"
              className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("name quadrilateral")}
              label={t("name quadrilateral")}
              labelProps="!font-semibold"
            />
          </div>
          <div>
            <BaseInput
              name="email"
              id="email"
              type="text"
              className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("email")}
              label={t("email")}
              labelProps="!font-semibold"
            />
          </div>
          <div className="relative">
            <BaseInput
              name="password"
              label={t("password")}
              id="password"
              className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("password")}
              type={showPassword ? "text" : "password"}
              labelProps="!font-semibold"
            />
            {isRTL && showPassword ? (
              <IoMdEyeOff
                size={28}
                className="cursor-pointer text-mainColor absolute top-1/2 end-5"
                onClick={handleShowPassword}
              />
            ) : (
              <IoEye
                size={28}
                className="cursor-pointer text-mainColor absolute top-1/2 end-5"
                onClick={handleShowPassword}
              />
            )}
          </div>
          <div className="relative">
            <BaseInput
              name="confirm_password"
              id="confirm_password"
              className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("confirm password")}
              label={t("confirm password")}
              type={showPassword ? "text" : "password"}
              labelProps="!font-semibold"
            />
            {isRTL && showConfirmPassword ? (
              <IoMdEyeOff
                size={28}
                className="cursor-pointer text-[#393D94] absolute top-1/2 end-5"
                onClick={handleShowConfirmPassword}
              />
            ) : (
              <IoEye
                size={28}
                className="cursor-pointer text-[#393D94] absolute top-1/2 end-5"
                onClick={handleShowConfirmPassword}
              />
            )}
          </div>

          <div className="mt-4">
            <Button type="submit" className="me-5">{t("confirm")}</Button>
            <Button type="button" className="bg-[#E6EAEE] text-mainColor">{t("cancel")}</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default InstructorLoginData;
