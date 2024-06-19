import ProfileIntroduction from "../../../components/AdminComponent/Instructors/ProfileIntroduction";
import TitlePage from "../../../components/UI/TitlePage";
import ProfileCover from "../../../assets/instructors/profile-cover.svg";
import PersonalImage from "../../../assets/instructors/instructor_2.svg";
import { MdPhoneIphone } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { t } from "i18next";
import { Table } from "../../../components";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

export type InstructorPersonalData_TP = {
  profileCover?: any;
  personalImage?: any;
  instructorName?: String;
};

const InstructorPersonalProfile = () => {
  const instructorPersonalData = {
    profileCover: ProfileCover,
    personalImage: PersonalImage,
    instructorName: "Dimitres Viga",
    jobTitle: "محاضر شبكات",
    phoneNumber: "+009735625632",
    emial: "Albert Adam@gmail.com",
    address: "123,المنصورة الجديدة",
    linkedIn: "user@example.com",
    facebook: "user@example.com",
    whatsapp: "+009759568548",
    twitter: "user@example.com",
  };

  const studentsDataFee = [
    {
      index: 1,
      type_certificate: "بكالروريوس",
      certificate_name: "حاسبات ومعلومات",
      donor: "معد مصر",
      date_acquisition: "25/3/2001",
      specialization: "علوم الحاسب",
      appreciation: "جيد جدا",
    },
    {
      index: 2,
      type_certificate: "بكالروريوس",
      certificate_name: "حاسبات ومعلومات",
      donor: "معد مصر",
      date_acquisition: "25/3/2001",
      specialization: "علوم الحاسب",
      appreciation: "جيد جدا",
    },
  ];

  const studentsColumnsFee = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("#")}</span>,
        accessorKey: "index",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("type of certificate")}</span>,
        accessorKey: "type_certificate",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("certificate name")}</span>,
        accessorKey: "certificate_name",
        cell: (info) => <span>{t(`${info.getValue()}`)}</span>,
      },
      {
        header: () => <span>{t("donor")}</span>,
        accessorKey: "donor",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("date of acquisition")}</span>,
        accessorKey: "date_acquisition",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("specialization")}</span>,
        accessorKey: "specialization",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("appreciation")}</span>,
        accessorKey: "appreciation",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "action",
        cell: () => (
          <HiOutlineDotsHorizontal
            size={35}
            className="fill-mainGray opacity-55 cursor-pointer"
          />
        ),
      },
    ],
    []
  );

  return (
    <div>
      <div>
        <TitlePage mainTitle="instructors" supTitle="Dimitres Viga" mainLink="/instructors" />
      </div>

      <div className="bg-white rounded-2xl pb-2">
        <ProfileIntroduction instructorPersonalData={instructorPersonalData} />

        <div className="bg-mainBg rounded-2xl mt-28 mx-5 py-6 px-8">
          <div className="flex items-center justify-between flex-col md:flex-row gap-y-5">
            <div className="flex gap-2 flex-col lg:flex-row text-center lg:text-start items-center lg:items-start">
              <div
                className="w-[50px] h-[50px] rounded-full bg-mainColor flex items-center justify-center "
                style={{ boxShadow: "0px 4px 4px 0px #00000080" }}
              >
                <MdPhoneIphone size={26} className="fill-white" />
              </div>
              <div className="mt-[6px] lg:mt-3 font-medium">
                <p className="text-mainGray">{t("phone")}</p>
                <span>{instructorPersonalData.phoneNumber}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-col lg:flex-row text-center lg:text-start items-center lg:items-start">
              <div
                className="w-[50px] h-[50px] rounded-full bg-mainColor text-white flex items-center justify-center"
                style={{ boxShadow: "0px 4px 4px 0px #00000080" }}
              >
                <HiOutlineMail size={26} />
              </div>
              <div className="mt-[6px] lg:mt-3 font-medium">
                <p className="text-mainGray">{t("E-mail")}</p>
                <span>{instructorPersonalData.emial}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-col lg:flex-row text-center lg:text-start items-center lg:items-start">
              <div
                className="w-[50px] h-[50px] rounded-full bg-mainColor text-white flex items-center justify-center"
                style={{ boxShadow: "0px 4px 4px 0px #00000080" }}
              >
                <IoLocationOutline size={26} />
              </div>
              <div className="mt-[6px] lg:mt-3 font-medium">
                <p className="text-mainGray">{t("address")}</p>
                <span>{instructorPersonalData.address}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-12">
            <div className="flex gap-3 items-center flex-col sm:flex-row">
              <FaLinkedin size={32} className="rounded-xl fill-[#0A66C2]" />
              <p className="font-medium">{instructorPersonalData.linkedIn}</p>
            </div>
            <div className="flex gap-3 items-center flex-col sm:flex-row">
              <FaFacebook size={32} fill="#1877F2" />
              <p className="font-medium">{instructorPersonalData.facebook}</p>
            </div>
            <div className="flex gap-3 items-center flex-col sm:flex-row">
              <RiWhatsappFill size={32} fill="#60D669" />
              <p className="font-medium">{instructorPersonalData.whatsapp}</p>
            </div>
            <div className="flex gap-3 items-center flex-col sm:flex-row">
              <FaTwitter size={32} fill="#55ACEE" />
              <p className="font-medium">{instructorPersonalData.twitter}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#E6EAEE] rounded-2xl my-7 mx-5 py-6">
          <h2 className="text-2xl font-semibold ms-5 mb-5 text-center sm:text-start">
            {t("scientific certificates")}
          </h2>
          <Table
            data={studentsDataFee}
            columns={studentsColumnsFee}
            className="bg-mainColor"
          />
        </div>

        <div className="bg-[#E6EAEE] rounded-2xl my-7 mx-5 py-6 px-8">
          <h2 className="text-2xl font-semibold text-center sm:text-start">{t("specialization")}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 text-center sm:text-start gap-6 my-12">
            <div className="flex gap-2 flex-col">
              <p className="text-mainColor font-semibold text-base">
                {t("general specialization")}
              </p>
              <span className="font-semibold">Lorem ipsum </span>
            </div>
            <div className="flex gap-2 flex-col">
              <p className="text-mainColor font-semibold text-base">
                {t("Specialization")}
              </p>
              <span className="font-semibold">Lorem ipsum </span>
            </div>
            <div className="flex gap-2 flex-col">
              <p className="text-mainColor font-semibold text-base">
                {t("degree")}
              </p>
              <span className="font-semibold">Lorem ipsum </span>
            </div>
            <div className="flex gap-2 flex-col">
              <p className="text-mainColor font-semibold text-base">
                {t("date")}
              </p>
              <span className="font-semibold">3/2/2010</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorPersonalProfile;
