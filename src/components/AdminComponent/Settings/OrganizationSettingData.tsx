import BaseInput from "../../UI/BaseInput";
import { useFormikContext } from "formik";
import { t } from "i18next";
import { Button } from "../..";

const OrganizationSettingData = () => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="flex flex-col w-full gap-5 px-4 lg:px-16 md:w-3/4">
      <BaseInput
        name="organization_name"
        id="organization_name"
        type="text"
        className="lg:w-[35vw] text-lg py-2 bg-[#E6EAEE] rounded-lg main_shadow text-slate-800 focus-within:outline-none"
        placeholder={t("organization name")}
        label={t("organization name")}
        labelProps="!font-semibold"
      />

      <BaseInput
        name="organization_email"
        id="organization_email"
        type="text"
        className="lg:w-[35vw] text-lg py-2 bg-[#E6EAEE] rounded-lg main_shadow text-slate-800 focus-within:outline-none"
        placeholder={t("organization email")}
        label={t("organization email")}
        labelProps="!font-semibold"
      />

      <div className="flex flex-col">
        <label htmlFor="organization_vision" className="font-semibold">
          {t("organization vision")}
        </label>
        <textarea
          name="organization_vision"
          id="organization_vision"
          className=" text-lg lg:w-[35vw] py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
          value={values?.organization_vision}
          placeholder={t("organization vision")}
          onChange={(e) => {
            setFieldValue("organization_vision", e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="organization_mission" className="font-semibold">
          {t("organization mission")}
        </label>
        <textarea
          name="organization_mission"
          id="organization_mission"
          className=" text-lg lg:w-[35vw] py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
          value={values?.organization_mission}
          placeholder={t("organization mission")}
          onChange={(e) => {
            setFieldValue("organization_mission", e.target.value);
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

export default OrganizationSettingData;
