import { t } from "i18next";
import { useState } from "react";
import InstructorLoginData from "../../../components/AdminComponent/Instructors/InstructorLoginData";
import InstructorPersonalData from "../../../components/AdminComponent/Instructors/InstructorPersonalData";
import InstructorContactInformation from "../../../components/AdminComponent/Instructors/InstructorContactInformation";
import InstructorQualificationData from "../../../components/AdminComponent/Instructors/InstructorQualificationData";

const InstructorEditProfile = () => {
  const [activeTab, setActiveTab] = useState<string>("login data");

  const tabs = [
    { id: 0, title: "login data" },
    { id: 1, title: "personal data" },
    { id: 2, title: "contact information" },
    { id: 3, title: "qualification data" },
  ];
  return (
    <div>
      <div className="px-16 py-3 bg-mainColor rounded-tr-2xl rounded-tl-2xl">
        <ul className="flex items-center justify-between">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer p-2 text-white font-medium text-lg ${
                activeTab === tab.title &&
                "border-b-4 border-b-[#369252] rounded-lg"
              }`}
              onClick={() => setActiveTab(tab.title)}
            >
              {t(`${tab.title}`)}
            </li>
          ))}
        </ul>
      </div>
      <div className="py-8 bg-white rounded-br-2xl rounded-bl-2xl">
        {activeTab === "login data" && <InstructorLoginData />}
        {activeTab === "personal data" && <InstructorPersonalData />}
        {activeTab === "contact information" && (
          <InstructorContactInformation />
        )}
        {activeTab === "qualification data" && <InstructorQualificationData />}
      </div>
    </div>
  );
};

export default InstructorEditProfile;
