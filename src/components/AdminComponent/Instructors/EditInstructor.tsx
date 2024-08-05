import { t } from "i18next";
import { useEffect, useState } from "react";
import InstructorLoginData from "../../../components/AdminComponent/Instructors/InstructorLoginData";
import InstructorPersonalData from "../../../components/AdminComponent/Instructors/InstructorPersonalData";
import InstructorContactInformation from "../../../components/AdminComponent/Instructors/InstructorContactInformation";
import InstructorQualificationData from "../../../components/AdminComponent/Instructors/InstructorQualificationData";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../UI/Loading";
import { useLocation, useParams } from "react-router-dom";

const getInstructorEdit = async (id: any) => {
  const response = await customFetch(`teacher/${id}`);
  return response?.data;
};

const EditInstructor = () => {
  const [activeTab, setActiveTab] = useState<string>("login data");
  const [instructorID, setInstructorID] = useState<number | null>(null);
  const [loginEditData, setLoginEditData] = useState(null);
  const [personalEditData, setPersonalEditData] = useState(null);
  const [contactInformationEditData, SetContactInformationEditData] =
    useState(null);


  const [qualificationEditData, setQualificationEditData] = useState(null);
  const { id: instructorParamID } = useParams();
  const location = useLocation();
  const dataReceived = location.state;

  const { data, isSuccess, isRefetching, isLoading, isFetching, refetch } =
    useQuery({
      queryKey: ["instructor-edit", instructorParamID],
      queryFn: () => getInstructorEdit(instructorParamID),
    });

  const instructorData = data?.data?.teacher;
  const contactInfo =
    data?.data?.teacher?.contactInfo && data?.data?.teacher?.contactInfo[0];
  const qualifications =
    data?.data?.teacher?.qualifications &&
    data?.data?.teacher?.qualifications[0];

  useEffect(() => {
    if (isSuccess && data) {
      setLoginEditData({
        id: instructorParamID,
        full_name: instructorData?.full_name,
        email: instructorData?.email,
        password: instructorData?.password,
        password_confirmation: instructorData?.password_confirmation,
      });

      setPersonalEditData({
        id: instructorParamID,
        nationality: instructorData?.nationality,
        id_number: instructorData?.id_number,
        country_residence: instructorData?.country_residence,
        address: instructorData?.address,
        date_birth: new Date(instructorData?.date_birth),
        type: instructorData?.type,
        personal_image: instructorData?.personal_image,
        teacher_id: instructorID,
      });

      SetContactInformationEditData({
        id: contactInfo?.id,
        phone: contactInfo?.phone,
        facebook: contactInfo?.facebook,
        whatsApp: contactInfo?.whatsApp,
        linkedIn: contactInfo?.linkedIn,
        twitter: contactInfo?.twitter,
        teacher_id: contactInfo?.id,
      });

      setQualificationEditData({
        id: qualifications.id,
        general_specialization: qualifications?.general_specialization,
        specialization: qualifications?.specialization,
        degree: qualifications?.degree,
        year_acquisition: qualifications?.year_acquisition,
        cv_file: qualifications?.cv_file,
        job_title: qualifications?.job_title,
        newCertificate: instructorData?.certificates,
        teacher_id: instructorParamID,
      });

      if (dataReceived) {
        setActiveTab(`qualification data`);
      } else {
        setActiveTab("login data");
      }
    }
  }, [data, isSuccess, instructorParamID, instructorID]);

  const tabs = [
    { id: 0, title: "login data" },
    { id: 1, title: "personal data" },
    { id: 2, title: "contact information" },
    { id: 3, title: "qualification data" },
  ];

  useEffect(() => {
    refetch();
  }, [instructorParamID, loginEditData]);

  if (isLoading || isFetching || isRefetching) return <Loading />;

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
            editObj={loginEditData}
            setInstructorID={setInstructorID}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "personal data" && (
          <InstructorPersonalData
            editObj={personalEditData}
            instructorID={instructorID}
            setInstructorID={setInstructorID}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "contact information" && (
          <InstructorContactInformation
            editObj={contactInformationEditData}
            instructorID={instructorID}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "qualification data" && (
          <InstructorQualificationData
            instructorID={instructorID}
            editObj={qualificationEditData}
            dataReceived={dataReceived}
          />
        )}
      </div>
    </div>
  );
};

export default EditInstructor;
