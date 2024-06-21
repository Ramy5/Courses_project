import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import {
  StudentAddAcademicData,
  StudentAddFatherData,
  StudentAddLoginData,
  StudentAddPersonalData,
} from "../../../components";

interface AddStudent_TP {
  email_login: string;
  password_login: string;
  confirm_password_login: string;
  fullName_personal: string;
  nationality_personal: string;
  id_number_personal: string | number;
  country_residence_personal: string;
  educational_qualification_personal: string;
  address_personal: string;
  date_birth_personal: string | Date;
  type_personal: "male" | "female";
  image_upload_personal: [];
  fullName_father: string;
  email_father: string;
  phone_father: string | number;
  country_father: string;
  address_father: string;
  number_academic: string | number;
  program_academic: string;
  level_academic: string;
  division_number_academic: string | number;
  join_date_academic: string | Date;
}

const tabComponents = {
  login: <StudentAddLoginData />,
  personal: <StudentAddPersonalData />,
  father: <StudentAddFatherData />,
  academic: <StudentAddAcademicData />,
};

const AddStudent = ({ editObj }: { editObj?: AddStudent_TP }) => {
  const initialValues = {
    // LOGIN DATA
    email_login: editObj?.email_login || "",
    password_login: editObj?.password_login || "",
    confirm_password_login: editObj?.confirm_password_login || "",

    // PERSONAL DATA
    fullName_personal: editObj?.fullName_personal || "",
    nationality_personal: editObj?.nationality_personal || "",
    id_number_personal: editObj?.id_number_personal || "",
    country_residence_personal: editObj?.country_residence_personal || "",
    educational_qualification_personal:
      editObj?.educational_qualification_personal || "",
    address_personal: editObj?.address_personal || "",
    date_birth_personal: editObj?.date_birth_personal || "",
    type_personal: editObj?.type_personal || "male",
    image_upload_personal: editObj?.image_upload_personal || [],

    // FATHER DATA
    fullName_father: editObj?.fullName_father || "",
    email_father: editObj?.email_father || "",
    phone_father: editObj?.phone_father || "",
    country_father: editObj?.country_father || "",
    address_father: editObj?.address_father || "",

    // ACADEMIC DATA
    number_academic: editObj?.number_academic || "",
    program_academic: editObj?.program_academic || "",
    level_academic: editObj?.level_academic || "",
    division_number_academic: editObj?.division_number_academic || "",
    join_date_academic: editObj?.join_date_academic || "",
  };

  const [activeTab, setActiveTab] = useState<string>("login");

  const tabs = [
    { id: 0, title: "login" },
    { id: 1, title: "personal" },
    { id: 2, title: "father" },
    { id: 3, title: "academic" },
  ];

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
      <Form>
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
          {tabComponents[activeTab]}
        </div>
      </Form>
    </Formik>
  );
};

export default AddStudent;
