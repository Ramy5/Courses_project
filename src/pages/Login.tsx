import { useState } from "react";
import { Form, Formik } from "formik";
import {
  ForgetPasswordStep,
  LoginStep,
  ResetPasswordStep,
} from "../components";
import { useNavigate } from "react-router-dom";

interface initialValues_TP {
  email: string;
  password: string;
  loginType: string;
  resetPasswordEmail: string;
  newPassword: string;
  confirmNewpassword: string;
}

const Login = () => {
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();

  const initialValues: initialValues_TP = {
    email: "ramy@gmail.com",
    password: "111111111",
    loginType: "manager",
    resetPasswordEmail: "ramy@gmail.com",
    newPassword: "",
    confirmNewpassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log("🚀 ~ Login ~ values:", values);
        const loginType =
          values.loginType === "manager"
            ? "/informationPanel"
            : values.loginType === "student"
            ? "/student/informationPanel"
            : "";

        navigate(loginType);
      }}
    >
      <div className="flex items-center justify-center w-full h-screen bg-mainColor">
        <Form className="w-full lg:w-[70vw] rounded-xl px-2 lg:px-16 bg-white drop-shadow-xl transition-all duration-300 h-[80vh] lg:h-[70vh] hover:drop-shadow-2xl">
          {step === 1 ? (
            <LoginStep setStep={setStep} />
          ) : step === 2 ? (
            <ForgetPasswordStep setStep={setStep} />
          ) : step === 3 ? (
            <ResetPasswordStep setStep={setStep} />
          ) : null}
        </Form>
      </div>
    </Formik>
  );
};

export default Login;
