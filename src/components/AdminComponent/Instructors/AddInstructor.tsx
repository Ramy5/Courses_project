import { t } from "i18next";
import { useState } from "react";
import InstructorLoginData from "../../../components/AdminComponent/Instructors/InstructorLoginData";
import InstructorPersonalData from "../../../components/AdminComponent/Instructors/InstructorPersonalData";
import InstructorContactInformation from "../../../components/AdminComponent/Instructors/InstructorContactInformation";
import InstructorQualificationData from "../../../components/AdminComponent/Instructors/InstructorQualificationData";

const AddInstructor = () => {
  const [activeTab, setActiveTab] = useState<string>("login data");
  const [instructorID, setInstructorID] = useState<number | null>(null);

  const tabs = [
    { id: 0, title: "login data" },
    { id: 1, title: "personal data" },
    { id: 2, title: "contact information" },
    { id: 3, title: "qualification data" },
  ];

  return (
    <div>
      <div className="px-8 py-3 md:px-16 bg-mainColor rounded-tr-2xl rounded-tl-2xl">
        <ul className="flex items-center justify-between py-2">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer p-1 text-white font-medium text-base ${
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
        {activeTab === "login data" && (
          <InstructorLoginData
            setActiveTab={setActiveTab}
            setInstructorID={setInstructorID}
          />
        )}
        {activeTab === "personal data" && (
          <InstructorPersonalData
            instructorID={instructorID}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "contact information" && (
          <InstructorContactInformation
            instructorID={instructorID}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "qualification data" && (
          <InstructorQualificationData instructorID={instructorID} />
        )}
      </div>
    </div>
  );
};

export default AddInstructor;
