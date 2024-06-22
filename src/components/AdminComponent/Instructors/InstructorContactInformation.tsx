import { Form, Formik } from "formik";
import BaseInput from "../../UI/BaseInput";
import { Button } from "../..";
import { t } from "i18next";

const InstructorContactInformation = () => {
  const initialValues = {
    phone: "",
    facebook: "",
    whatsApp: "",
    linkedIn: "",
    twitter: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log("🚀 ~ InstructorLoginData ~ values:", values);
      }}
    >
      <Form className="flex flex-col gap-5 w-full md:w-3/4 px-8 md:px-16 ">
        <div>
          <BaseInput
            name="phone"
            id="phone"
            type="text"
            className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("phone")}
            label={t("phone")}
            labelProps="!font-semibold"
          />
        </div>
        <div>
          <BaseInput
            name="facebook"
            id="facebook"
            type="text"
            className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("facebook")}
            label={t("facebook")}
            labelProps="!font-semibold"
          />
        </div>
        <div>
          <BaseInput
            name="whatsApp"
            id="whatsApp"
            type="text"
            className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("whats app")}
            label={t("whats app")}
            labelProps="!font-semibold"
          />
        </div>
        <div>
          <BaseInput
            name="linkedIn"
            id="linkedIn"
            type="text"
            className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("linked in")}
            label={t("linked in")}
            labelProps="!font-semibold"
          />
        </div>
        <div>
          <BaseInput
            name="twitter"
            id="twitter"
            type="text"
            className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("twitter")}
            label={t("twitter")}
            labelProps="!font-semibold"
          />
        </div>

        <div className="mt-5 flex justify-end">
          <Button type="submit" className="me-5">
            {t("confirm")}
          </Button>
          <Button type="button" className="bg-[#E6EAEE] text-mainColor">
            {t("cancel")}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default InstructorContactInformation;
