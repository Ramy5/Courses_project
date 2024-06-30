import React, { useState } from "react";
import { Button, UploadFile } from "../..";
import { t } from "i18next";

const OrganizationLogo = () => {
  const [organizationFile, setOrganizationFile] = useState(null);
  const [organizationCoverFile, setOrganizationCoverFile] = useState(null);

  return (
    <div className="flex flex-col w-full gap-5 px-4 lg:px-16 md:w-3/4">
      <div className="mt-8">
        <div className="grid items-center justify-between gap-8 mb-12 lg:grid-cols-3">
          <div className="col-span-1 text-center">
            <h2>{t("organization logo")}</h2>
            <UploadFile
              files={organizationFile}
              setFiles={setOrganizationFile}
              id="logo"
            />
          </div>

          <div className="col-span-2 text-center">
            <h2>{t("image cover")}</h2>
            <UploadFile
              id="cover"
              files={organizationCoverFile}
              setFiles={setOrganizationCoverFile}
            />
          </div>
        </div>

        <Button className="me-5">{t("confirm")}</Button>
        <Button className="bg-[#E6EAEE] text-mainColor">{t("cancel")}</Button>
      </div>
    </div>
  );
};

export default OrganizationLogo;
