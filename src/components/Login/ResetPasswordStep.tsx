import { useFormikContext } from "formik";
import { t } from "i18next";
import MainBtn from "../UI/MainBtn";
import resetPasswordImg from "../../assets/login/resetPasswordImg.gif";
import { useRTL } from "../../hooks/useRTL";

interface ResetPasswordStepProps_TP {
  setStep: (step: number) => void;
}

const ResetPasswordStep = (props: ResetPasswordStepProps_TP) => {
  const { setStep } = props;
  const { setFieldValue, values } = useFormikContext();
  const isRTL = useRTL();

  return (
    <div className="grid items-center justify-center h-full lg:justify-between lg:grid-cols-2">
      <div
        className={`flex flex-col gap-6 px-6 ${
          isRTL
            ? "lg:border-l-[3px] lg:pl-12 animate_from_right"
            : "lg:border-r-[3px] lg:pr-12 animate_from_left"
        } lg:border-[#393D94]`}
      >
        <h2 className="mb-2 text-2xl font-bold text-center lg:text-3xl">
          {t("reset password")}
        </h2>
        {/* NEW PASSWORD */}
        <div className="flex items-center w-full gap-2 rounded-full bg-[#D8DEEA] px-6  shadow-lg">
          <input
            type="password"
            value={values?.newPassword}
            onChange={(e) => {
              setFieldValue("newPassword", e.target.value);
            }}
            className="w-full px-2 py-3 text-xl bg-transparent text-slate-800 focus-within:outline-none"
            placeholder={t("new password")}
            name="newPassword"
          />
        </div>
        {/* CONFIRM NEW PASSWORD */}
        <div className="flex items-center w-full gap-2 rounded-full bg-[#D8DEEA] px-6  shadow-lg">
          <input
            type="password"
            value={values?.confirmNewPassword}
            onChange={(e) => {
              setFieldValue("confirmNewPassword", e.target.value);
            }}
            className="w-full px-2 py-3 text-xl bg-transparent text-slate-800 focus-within:outline-none"
            placeholder={t("confirm new password")}
            name="confirmNewPassword"
          />
        </div>
        {/* BUTTON */}
        <MainBtn
          btnText={t("confirm")}
          className="text-xl"
          onclick={() => setStep(1)}
        />
        <MainBtn
          btnText={t("back to login")}
          className="text-xl bg-cyan-500 hover:bg-cyan-600"
          onclick={() => setStep(1)}
        />
      </div>

      {/* IMAGE */}
      <div className="hidden lg:inline-block">
        <img src={resetPasswordImg} alt="login image" />
      </div>
    </div>
  );
};

export default ResetPasswordStep;
