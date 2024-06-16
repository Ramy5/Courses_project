import { t } from "i18next";
import { useFormikContext } from "formik";
import forgetPasswordImg from "../../assets/login/forgetPasswordImg.gif";
import { useState } from "react";
import { useRTL } from "../../hooks/useRTL";
import { Button } from "..";

interface ForgetPasswordStep_TP {
  setStep: (step: number) => void;
}
const ForgetPasswordStep = (props: ForgetPasswordStep_TP) => {
  const { setStep } = props;
  const { setFieldValue, values } = useFormikContext();
  const [checkEmailStep, setCheckEmailStep] = useState(false);
  const isRTL = useRTL();

  return (
    <div className="grid items-center justify-center h-full lg:justify-between lg:grid-cols-2">
      <div
        className={`flex flex-col gap-6 px-6 ${
          isRTL ? "lg:border-l-[3px] lg:pl-12 " : "lg:border-r-[3px] lg:pr-12 "
        } lg:border-[#393D94] animate_from_bottom`}
      >
        <h2 className="mb-2 text-2xl font-bold text-center lg:text-3xl">
          {t("forget the password?")}
        </h2>

        {!checkEmailStep && (
          <>
            {/* EMAIL */}
            <input
              type="text"
              value={values?.resetPasswordEmail}
              onChange={(e) => {
                setFieldValue("resetPasswordEmail", e.target.value);
              }}
              className="py-3 text-xl flex items-center w-full gap-2 rounded-full bg-[#D8DEEA] px-6  shadow-lg text-slate-800 focus-within:outline-none"
              placeholder={t("email")}
              name="resetPasswordEmail"
            />

            {/* BUTTON */}
            <Button
              action={() => setCheckEmailStep(true)}
              className="py-3 text-xl rounded-full"
            >
              {t("reset password")}
            </Button>
          </>
        )}

        {checkEmailStep && (
          <Button
            action={() => setStep(3)}
            className="py-3 text-xl rounded-full"
          >
            {t("check your email")}
          </Button>
        )}

        <Button
          action={() => setStep(1)}
          className="py-3 text-xl rounded-full bg-cyan-500 hover:bg-cyan-600"
        >
          {t("back to login")}
        </Button>
      </div>

      {/* IMAGE */}
      <div className="hidden lg:inline-block">
        <img src={forgetPasswordImg} alt="reset password image" />
      </div>
    </div>
  );
};

export default ForgetPasswordStep;
