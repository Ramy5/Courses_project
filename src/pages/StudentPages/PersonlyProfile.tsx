import {
  ProfileIntroduction,
  StudentPersonalContact,
  StudentPersonalContactWithOptionalIcon,
} from "../../components";
import { MdOutlineEmail, MdPeople } from "react-icons/md";
import studentProfileCover from "../../assets/students/studentProfileCover.svg";
import studentProfileImg from "../../assets/students/studentProfileImg.svg";
import { t } from "i18next";
import { HiOutlineIdentification } from "react-icons/hi";
import { IoMdPhonePortrait } from "react-icons/io";
import { PiCertificate, PiMapPinLight } from "react-icons/pi";
import customFetch from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/UI/Loading";

const getStudentProfile = async () => {
  const { data } = await customFetch("studentProfile");
  return data.data.student;
};

const PersonlyProfile = () => {
  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["get-student-profile"],
    queryFn: getStudentProfile,
  });

  console.log(data);

  const studentProfileData = {
    id: 1,
    profileCover: studentProfileCover,
    personalImage: data?.personal_image || studentProfileImg,
    name: data?.full_name,
    phoneNumber: "",
    email: data?.email,
    address: data?.address,
    idNumber: data?.id_number,
    educationalQualification: data?.qualification,
    fatherName: data?.parent?.full_name,
    fatherPhone: data?.parent?.phone,
    fatherEmail: data?.parent?.email,
    personal_image: data?.personal_image,
    academicData: data?.academicData,
  };

  const studentAcademicData = [
    {
      title: t("academic number"),
      value: studentProfileData?.academicData?.Academic_code,
    },
    {
      title: t("program"),
      value: studentProfileData?.academicData?.program.program_name,
    },
    {
      title: t("level"),
      value: studentProfileData?.academicData?.level,
    },
    {
      title: t("date of enrollment"),
      value: studentProfileData?.academicData?.joined_date,
    },
    {
      title: t("section number"),
      value: studentProfileData?.academicData?.group,
    },
    {
      title: t("educational qualification"),
      value: studentProfileData?.educationalQualification,
    },
  ];

  if (isLoading || isFetching || isRefetching) return <Loading />;

  return (
    <div>
      {Object.keys(data).length > 0 ? (
        <div className="pb-2 bg-white rounded-2xl">
          <ProfileIntroduction
            personalData={studentProfileData}
            blocking={false}
          />

          <div className="flex flex-col gap-10 p-4 pt-0 mt-24 lg:p-8">
            {/* PERSONAL DETAILS */}
            <div className="p-6 lg:p-10 bg-mainColor/15 rounded-xl">
              <div className="grid items-center gap-8 md:grid-cols-2 lg:grid-cols-2 lg:gap-14">
                <StudentPersonalContact
                  contactTitle={t("address")}
                  contactValue={studentProfileData.address}
                  icon={<PiMapPinLight size={30} />}
                />
                {/* <StudentPersonalContact
                  contactTitle={t("phone")}
                  contactValue={studentProfileData.phoneNumber}
                  icon={<IoMdPhonePortrait size={30} />}
                /> */}
                <StudentPersonalContact
                  contactTitle={t("email")}
                  contactValue={studentProfileData.email}
                  icon={<MdOutlineEmail size={30} />}
                />
                <StudentPersonalContactWithOptionalIcon
                  contactTitle={t("id number")}
                  contactValue={studentProfileData.idNumber}
                  icon={
                    <HiOutlineIdentification
                      className="text-mainColor"
                      size={30}
                    />
                  }
                />
                <StudentPersonalContactWithOptionalIcon
                  contactTitle={t("educational qualification")}
                  contactValue={studentProfileData.educationalQualification}
                  icon={<PiCertificate className="text-mainColor" size={30} />}
                />
              </div>
            </div>

            {/* ACADEMIC DETAILS */}
            <div className="p-6 lg:p-10 bg-mainColor/15 rounded-xl">
              <h2 className="mb-10 text-2xl font-bold">{t("academic data")}</h2>

              <div className="grid items-center gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
                {studentAcademicData?.map((item, index) => (
                  <StudentPersonalContactWithOptionalIcon
                    key={index}
                    contactTitle={item.title}
                    contactValue={item.value}
                  />
                ))}
              </div>
            </div>

            {/* FATHER  DETAILS */}
            <div className="p-6 lg:p-10 bg-mainColor/15 rounded-xl">
              <h2 className="mb-10 text-2xl font-bold">{t("father data")}</h2>

              <div className="grid items-center gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
                <StudentPersonalContact
                  contactTitle={t("name")}
                  contactValue={studentProfileData.fatherName}
                  icon={<MdPeople size={30} />}
                />
                <StudentPersonalContact
                  contactTitle={t("phone")}
                  contactValue={studentProfileData.fatherPhone}
                  icon={<IoMdPhonePortrait size={30} />}
                />
                <StudentPersonalContact
                  contactTitle={t("email")}
                  contactValue={studentProfileData.fatherEmail}
                  icon={<MdOutlineEmail size={30} />}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 my-8 bg-white rounded-3xl">
          <p className="py-8 text-xl font-semibold text-center text-mainColor">
            {t("No data has been added to the profile yet")}
          </p>
        </div>
      )}
    </div>
  );
};

export default PersonlyProfile;
