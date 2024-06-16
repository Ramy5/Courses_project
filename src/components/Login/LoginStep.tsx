import { t } from "i18next";
import LoginStepImg from "../../assets/login/LoginStepImg.gif";
import { AiOutlineMail } from "react-icons/ai";
import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import MainBtn from "../UI/MainBtn";
import { useRTL } from "../../hooks/useRTL";
import { RiLockPasswordLine } from "react-icons/ri";
import MainRadio from "../UI/MainRadio";
import { useFormikContext } from "formik";

interface LoginStepProps_TP {
  setStep: (step: number) => void;
}

const LoginStep = (props: LoginStepProps_TP) => {
  const { setStep } = props;

  const { setFieldValue, values } = useFormikContext();
  const isRTL = useRTL();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="grid items-center justify-center h-full lg:justify-between lg:grid-cols-2">
      <div
        className={`flex flex-col gap-6 px-6 ${
          isRTL
            ? "lg:border-l-[3px] lg:pl-12 animate_from_right"
            : "lg:border-r-[3px] lg:pr-12 animate_from_left"
        } lg:border-[#393D94]`}
      >
        <h2 className="mb-2 text-3xl font-bold text-center">{t("login")}</h2>

        {/* EMAIL */}
        <div className="flex items-center w-full gap-2 rounded-full bg-[#D8DEEA] px-6  shadow-lg">
          <AiOutlineMail size={28} className="text-slate-600" />
          <input
            type="text"
            value={values?.email}
            onChange={(e) => {
              setFieldValue("email", e.target.value);
            }}
            className="w-full px-2 py-3 text-xl bg-transparent text-slate-800 focus-within:outline-none"
            placeholder={t("email")}
            name="email"
          />
        </div>

        {/* PASSWORD */}
        <div className="flex items-center w-full gap-2 rounded-full bg-[#D8DEEA] px-6  shadow-lg">
          <RiLockPasswordLine size={28} className="text-slate-600" />
          <input
            name="password"
            value={values?.password}
            onChange={(e) => {
              setFieldValue("email", e.target.value);
            }}
            className="w-full px-2 py-3 text-xl bg-transparent text-slate-800 focus-within:outline-none"
            placeholder={t("password")}
            type={showPassword ? "text" : "password"}
          />
          {isRTL && showPassword ? (
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
        <p
          onClick={() => setStep(2)}
          className={`text-sm text-gray-700 ${
            isRTL ? "-translate-x-6" : "translate-x-6"
          }  -translate-y-2 cursor-pointer`}
        >
          {t("forget the password?")}
        </p>

        {/* LOGIN TYPE CHECKBOX */}
        <div className="grid items-center justify-center grid-cols-2 gap-4 lg:grid-cols-4">
          <MainRadio
            id={"student"}
            label={t("student")}
            name="loginType"
            value={"student"}
            checked={values.loginType === "student"}
            onChange={(e) => {
              setFieldValue("loginType", e.target.value);
            }}
          />
          <MainRadio
            id={"instructor"}
            label={t("instructor")}
            name="loginType"
            value={"instructor"}
            checked={values.loginType === "instructor"}
            onChange={(e) => {
              setFieldValue("loginType", e.target.value);
            }}
          />
          <MainRadio
            id={"supervisor"}
            label={t("supervisor")}
            name="loginType"
            value={"supervisor"}
            checked={values.loginType === "supervisor"}
            onChange={(e) => {
              setFieldValue("loginType", e.target.value);
            }}
          />
          <MainRadio
            id={"manager"}
            label={t("manager")}
            name="loginType"
            value={"manager"}
            checked={values.loginType === "manager"}
            onChange={(e) => {
              setFieldValue("loginType", e.target.value);
            }}
          />
        </div>

        {/* BUTTON */}
        <MainBtn btnText={t("login")} type="submit" className="text-xl" />
      </div>

      {/* IMAGE */}
      <div className="hidden lg:inline-block">
        <img src={LoginStepImg} alt="login image" />
      </div>
    </div>
  );
};

export default LoginStep;
