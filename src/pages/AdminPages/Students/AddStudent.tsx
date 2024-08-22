import { t } from "i18next";
import { useState } from "react";
import {
  StudentAddAcademicData,
  StudentAddFatherData,
  StudentAddLoginData,
  StudentAddPersonalData,
} from "../../../components";

const AddStudent = () => {
  const [activeTab, setActiveTab] = useState<string>("login data");
  const [studentID, setStudentID] = useState<number | null>(null);

  const tabs = [
    { id: 0, title: "login data" },
    { id: 1, title: "personal data" },
    { id: 2, title: "guardian data" },
    { id: 3, title: "academy data" },
  ];

  return (
    <div>
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
        {activeTab === "login data" && (
          <StudentAddLoginData
            setStudentID={setStudentID}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "personal data" && (
          <StudentAddPersonalData
            studentID={studentID}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "guardian data" && (
          <StudentAddFatherData
            studentID={studentID}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "academy data" && (
          <StudentAddAcademicData studentID={studentID} />
        )}
      </div>
    </div>
  );
};

export default AddStudent;
