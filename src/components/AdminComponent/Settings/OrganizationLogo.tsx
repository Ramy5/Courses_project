import React from "react";
import { Button } from "../..";
import { t } from "i18next";
import { useFormikContext } from "formik";

const OrganizationLogo = () => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="flex flex-col w-full gap-5 px-4 lg:px-16 md:w-3/4">
      <div className="mt-8">
        <Button className="me-5">{t("confirm")}</Button>
        <Button className="bg-[#E6EAEE] text-mainColor">{t("cancel")}</Button>
      </div>
    </div>
  );
};

export default OrganizationLogo;
