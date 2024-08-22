import BaseInput from "../../UI/BaseInput";
import { useFormikContext } from "formik";
import { t } from "i18next";
import { Button } from "../..";

interface OrganizationSettingData_TP {
  setActiveTab: (activeTab: string) => void;
}

const OrganizationSettingData = ({
  setActiveTab,
}: OrganizationSettingData_TP) => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div>
      <div className="flex flex-col w-full gap-5 px-4 lg:px-16 md:w-3/4">
        <BaseInput
          name="organization_name"
          id="organization_name"
          type="text"
          className="lg:w-[35vw] text-lg py-2 bg-lightGray rounded-lg main_shadow text-slate-800 focus-within:outline-none"
          placeholder={t("organization name")}
          label={t("organization name")}
          labelProps="!font-semibold"
        />

        <BaseInput
          name="organization_email"
          id="organization_email"
          type="text"
          className="lg:w-[35vw] text-lg py-2 bg-lightGray rounded-lg main_shadow text-slate-800 focus-within:outline-none"
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
            className=" text-lg lg:w-[35vw] py-2 px-4 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
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
            className=" text-lg lg:w-[35vw] py-2 px-4 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            value={values?.organization_mission}
            placeholder={t("organization mission")}
            onChange={(e) => {
              setFieldValue("organization_mission", e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex justify-end w-full mt-8">
        <Button
          action={() => setActiveTab("organization logo")}
          className="me-5"
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default OrganizationSettingData;
