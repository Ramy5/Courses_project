import { t } from "i18next";
import { useEffect, useState } from "react";
import {
  StudentAddAcademicData,
  StudentAddFatherData,
  StudentAddLoginData,
  StudentAddPersonalData,
} from "../../../components";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { useParams } from "react-router-dom";
import Loading from "../../../components/UI/Loading";

const getStudentsEdit = async (id: string) => {
  const response = await customFetch(`student/${id}`);
  return response.data.data.student;
};

const EditStudent = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [studentID, setStudentID] = useState<number | null>(null);
  const [loginEditData, setLoginEditData] = useState(null);
  const [personalEditData, setPersonalEditData] = useState(null);
  const [fatherEditData, setFatherEditData] = useState(null);
  const [academicEditData, setAcademicEditData] = useState(null);
  const { id: studentParamID } = useParams();

  const { data, isSuccess, isRefetching, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["get-students-edit", studentParamID],
    queryFn: () => getStudentsEdit(studentParamID),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setLoginEditData({
        id: studentParamID,
        email_login: data?.email,
        password_login: data?.password,
        confirm_password_login: data?.confirm_password_login,
      });

      setPersonalEditData({
        id: studentParamID,
        fullName_personal: data?.full_name,
        nationality_personal: data?.nationality,
        id_number_personal: data?.id_number,
        country_residence_personal: data?.country_residence,
        educational_qualification_personal: data?.qualification,
        address_personal: data?.address,
        date_birth_personal: new Date(data?.date_birth),
        type_personal: data?.type,
        image: data?.personal_image,
      });

      setFatherEditData({
        id: data?.parent?.id,
        address_father: data?.parent?.address,
        country_father: data?.parent?.country_residence,
        phone_father: data?.parent?.phone,
        email_father: data?.parent?.email,
        fullName_father: data?.parent?.full_name,
      });

      setAcademicEditData({
        id: data?.academicData?.id,
        number_academic: data?.academicData?.Academic_code,
        program_academic: {
          id: data?.academicData?.program?.id,
          label: data?.academicData?.program?.program_name,
          value: data?.academicData?.program?.id,
        },
        level_academic: {
          id: data?.academicData?.level,
          label: data?.academicData?.level,
          value: data?.academicData?.level,
        },
        division_number_academic: {
          id: data?.academicData?.group,
          label: data?.academicData?.group,
          value: data?.academicData?.group,
        },
        join_date_academic: new Date(data?.academicData?.joined_date),
      });
    }
  }, [data, isSuccess, studentParamID]);

  const tabs = [
    { id: 0, title: "login" },
    { id: 1, title: "personal" },
    { id: 2, title: "father" },
    { id: 3, title: "academic" },
  ];

  useEffect(() => {
    refetch();
  }, [studentParamID, loginEditData]);

  if (isRefetching || isLoading || isFetching) return <Loading />;

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
        {activeTab === "login" && (
          <StudentAddLoginData
            editObj={loginEditData}
            setStudentID={setStudentID}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "personal" && (
          <StudentAddPersonalData
            editObj={personalEditData}
            studentID={studentID}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "father" && (
          <StudentAddFatherData
            editObj={fatherEditData}
            studentID={studentID}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "academic" && (
          <StudentAddAcademicData
            studentID={studentID}
            editObj={academicEditData}
          />
        )}
      </div>
    </div>
  );
};

export default EditStudent;
