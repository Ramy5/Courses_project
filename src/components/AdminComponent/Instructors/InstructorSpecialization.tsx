import { t } from "i18next";
import React from "react";

const InstructorSpecialization = () => {
  return (
    <div className="bg-[#E6EAEE] rounded-2xl my-7 mx-5 py-6 px-8">
      <h2 className="text-2xl font-semibold text-center sm:text-start">
        {t("specialization")}
      </h2>

      <div className="grid grid-cols-1 gap-6 my-12 text-center sm:grid-cols-2 sm:text-start">
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold text-mainColor">
            {t("general specialization")}
          </p>
          <span className="font-semibold">Lorem ipsum </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold text-mainColor">
            {t("Specialization")}
          </p>
          <span className="font-semibold">Lorem ipsum </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold text-mainColor">
            {t("degree")}
          </p>
          <span className="font-semibold">Lorem ipsum </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold text-mainColor">{t("date")}</p>
          <span className="font-semibold">3/2/2010</span>
        </div>
      </div>
    </div>
  );
};

export default InstructorSpecialization;
