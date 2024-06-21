import BaseInput from "../../UI/BaseInput";
import { t } from "i18next";
import { Button } from "../..";
import PasswordInput from "../../UI/PasswordInput";
import { useFormikContext } from "formik";

const StudentAddLoginData = () => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="flex flex-col w-full gap-5 px-4 lg:px-16 md:w-3/4">
      <BaseInput
        name="email_login"
        id="email_login"
        type="text"
        className="lg:w-[35vw] text-lg py-2 bg-[#E6EAEE] rounded-lg main_shadow text-slate-800 focus-within:outline-none"
        placeholder={t("email")}
        value={values?.email_login}
        onChange={(e) => {
          setFieldValue("email_login", e.target.value);
        }}
        label={t("email")}
        labelProps="!font-semibold"
      />

      <div>
        <label htmlFor="password_login" className="font-bold">
          {t("password")}
        </label>
        <PasswordInput
          name="password_login"
          parentClass="lg:w-[35vw] rounded-lg main_shadow"
          placeholder={t("password")}
          value={values?.password_login}
          className="!text-lg !py-2"
          onChange={(e) => {
            setFieldValue("password_login", e.target.value);
          }}
        />
      </div>

      <div>
        <label htmlFor="confirm_password_login" className="font-bold">
          {t("confirm password")}
        </label>
        <PasswordInput
          name="confirm_password_login"
          parentClass="lg:w-[35vw] rounded-lg main_shadow"
          placeholder={t("confirm password")}
          className="!text-lg !py-2"
          value={values?.confirm_password_login}
          onChange={(e) => {
            setFieldValue("confirm_password_login", e.target.value);
          }}
        />
      </div>

      <div className="mt-8">
        <Button className="me-5">{t("confirm")}</Button>
        <Button className="bg-[#E6EAEE] text-mainColor">{t("cancel")}</Button>
      </div>
    </div>
  );
};

export default StudentAddLoginData;
