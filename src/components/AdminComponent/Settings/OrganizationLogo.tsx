import React, { useState } from "react";
import { Button, UploadFile } from "../..";
import { t } from "i18next";

interface OrganizationLogo_TP {
  setOrganizationFile: (file: object) => void;
  setOrganizationCoverFile: (file: object) => void;
  organizationFile: [];
  organizationCoverFile: [];
  setActiveTab: (activeTab: string) => void;
}

const OrganizationLogo: React.FC<OrganizationLogo_TP> = ({
  setOrganizationFile,
  setOrganizationCoverFile,
  organizationFile,
  organizationCoverFile,
  setActiveTab,
}) => {
  return (
    <div>
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
        </div>
      </div>
      <div className="flex justify-end gap-6 mx-8">
        <Button
          className="bg-lightGray text-mainColor"
          action={() => setActiveTab("organization data")}
        >
          {t("previous")}
        </Button>
        <Button action={() => setActiveTab("side menu color")} className="">
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default OrganizationLogo;
