import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import {
  OrganizationLogo,
  OrganizationSettingData,
  SideBarMenuColor,
} from "../../../components";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>("organization data");

  const initialValues = {
    organization_name: "",
    organization_email: "",
    organization_vision: "",
    organization_mission: "",
    color: "#144DAA",
  };

  const tabs = [
    { id: 0, title: "organization data" },
    { id: 1, title: "organization logo" },
    { id: 2, title: "side menu color" },
  ];

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
      <Form>
        <h2 className="mb-8 text-3xl font-bold text-gray-600">
          {t("settings")}
        </h2>
        <div className="px-2 py-3 md:px-3 xl:px-16 bg-mainColor rounded-tr-2xl rounded-tl-2xl">
          <ul className="flex items-center justify-between">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`cursor-pointer p-1 lg:p-2 text-white font-medium text-sm lg:text-lg ${
                  activeTab === tab.title && "border-b-4 border-b-[#369252]"
                }`}
                onClick={() => setActiveTab(tab.title)}
              >
                {t(`${tab.title}`)}
              </li>
            ))}
          </ul>
        </div>
        <div className="py-8 bg-white rounded-br-2xl rounded-bl-2xl">
          {activeTab === "organization data" && <OrganizationSettingData />}
          {activeTab === "organization logo" && <OrganizationLogo />}
          {activeTab === "side menu color" && <SideBarMenuColor />}
        </div>
      </Form>
    </Formik>
  );
};

export default Settings;
