import { t } from "i18next";
import React, { useState } from "react";
import { useRTL } from "../../hooks/useRTL";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Form, Formik } from "formik";
import { BaseInput, Button } from "../../components";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

const InstructorSetting = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(true);

  const isRTL = useRTL();

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const initialValues = {
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mt-4 mb-12">
        {t("settings")}
      </h2>
      <div>
        <div
          className="bg-mainColor flex items-center justify-between p-5 rounded-t-xl"
          onClick={toggleAccordion}
        >
          <h1 className="text-white font-semibold text-lg opacity-100">
            {t("change password")}
          </h1>
          {isOpen ? (
            <FiChevronDown size={28} className="text-white" />
          ) : (
            <>
              {isRTL ? (
                <FiChevronLeft size={28} className="text-white" />
              ) : (
                <FiChevronRight size={28} className="text-white" />
              )}
            </>
          )}
        </div>
        <div
          className={`bg-white rounded-b-xl overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log("🚀 ~ StudentSetting ~ values:", values);
            }}
          >
            <Form className="pt-8 px-5">
              <div className="relative">
                <BaseInput
                  name="current_password"
                  label={t("current password")}
                  id="current_password"
                  className="w-full text-lg py-2 rounded-lg bg-[#E6EAEE] main_shadow text-slate-800 focus-within:outline-none"
                  placeholder={t("current password")}
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
              <div className="relative my-7">
                <BaseInput
                  name="new_password"
                  label={t("new password")}
                  id="new_password"
                  className="w-full text-lg py-2 rounded-lg bg-[#E6EAEE] main_shadow text-slate-800 focus-within:outline-none"
                  placeholder={t("new password")}
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
                  name="confirm_new_password"
                  label={t("confirm new password")}
                  id="confirm_new_password"
                  className="w-full text-lg py-2 rounded-lg bg-[#E6EAEE] main_shadow text-slate-800 focus-within:outline-none"
                  placeholder={t("confirm new password")}
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

              <div className="flex justify-end items-center my-8">
                <Button type="submit">{t("submit")}</Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default InstructorSetting;