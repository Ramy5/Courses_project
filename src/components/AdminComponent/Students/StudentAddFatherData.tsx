import { t } from "i18next";
import { Button } from "../..";
import BaseInput from "../../UI/BaseInput";
import { useFormikContext } from "formik";

const StudentAddFatherData = () => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="flex flex-col w-full gap-5 px-4 lg:px-16 md:w-3/4">
      <BaseInput
        name="fullName_father"
        id="fullName_father"
        type="text"
        className="lg:w-[35vw] text-lg py-2 bg-[#E6EAEE] rounded-lg main_shadow text-slate-800 focus-within:outline-none"
        placeholder={t("full name")}
        label={t("full name")}
        labelProps="!font-semibold"
      />

      <BaseInput
        name="email_father"
        id="email_father"
        type="text"
        className="lg:w-[35vw] text-lg py-2 bg-[#E6EAEE] rounded-lg main_shadow text-slate-800 focus-within:outline-none"
        placeholder={t("email")}
        label={t("email")}
        labelProps="!font-semibold"
      />

      <BaseInput
        name="phone_father"
        id="phone_father"
        type="text"
        className="lg:w-[35vw] text-lg py-2 bg-[#E6EAEE] rounded-lg main_shadow text-slate-800 focus-within:outline-none"
        placeholder={t("phone number")}
        label={t("phone number")}
        labelProps="!font-semibold"
      />

      <BaseInput
        name="country_father"
        id="country_father"
        type="text"
        className="lg:w-[35vw] text-lg py-2 bg-[#E6EAEE] rounded-lg main_shadow text-slate-800 focus-within:outline-none"
        placeholder={t("country")}
        label={t("country")}
        labelProps="!font-semibold"
      />

      <div className="flex flex-col">
        <label htmlFor="address_father" className="font-semibold">
          {t("address")}
        </label>
        <textarea
          name="address_father"
          id="address_father"
          className=" text-lg lg:w-[35vw] py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
          value={values?.address_father}
          placeholder={t("address")}
          onChange={(e) => {
            setFieldValue("address_father", e.target.value);
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

export default StudentAddFatherData;
