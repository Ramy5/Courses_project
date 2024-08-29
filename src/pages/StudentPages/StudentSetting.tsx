import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useRTL } from "../../hooks/useRTL";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Form, Formik } from "formik";
import { BaseInput, Button } from "../../components";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import customFetch from "../../utils/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const changePassword = async (newPassword: any) => {
  const data = customFetch.post("changeStudentPassword", newPassword);
  return data;
};

const StudentSetting = () => {
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

  const { mutate, isPending } = useMutation({
    mutationKey: ["change-student-password"],
    mutationFn: changePassword,
    onSuccess: (data: any) => {
      toast.success(t("password has been changed successfully"));
    },
  });

  const handleChangePassword = async (values: any) => {
    const newPassword = {
      current_password: values.current_password,
      new_password: values.new_password,
      new_password_confirmation: values.confirm_new_password,
    };

    await mutate(newPassword);
  };

  return (
    <div>
      <h2 className="mt-4 mb-12 text-xl font-semibold">{t("settings")}</h2>
      <div>
        <div
          className="flex items-center justify-between p-5 bg-mainColor rounded-t-xl"
          onClick={toggleAccordion}
        >
          <h1 className="text-lg font-semibold text-white opacity-100">
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
            onSubmit={(values) => handleChangePassword(values)}
          >
            <Form className="px-5 pt-8">
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
                    className="absolute cursor-pointer text-mainColor top-1/2 end-5"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <IoEye
                    size={28}
                    className="absolute cursor-pointer text-mainColor top-1/2 end-5"
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
                    className="absolute cursor-pointer text-mainColor top-1/2 end-5"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <IoEye
                    size={28}
                    className="absolute cursor-pointer text-mainColor top-1/2 end-5"
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
                    className="absolute cursor-pointer text-mainColor top-1/2 end-5"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <IoEye
                    size={28}
                    className="absolute cursor-pointer text-mainColor top-1/2 end-5"
                    onClick={handleShowPassword}
                  />
                )}
              </div>

              <div className="flex items-center justify-end my-8">
                <Button type="submit">{t("submit")}</Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default StudentSetting;
