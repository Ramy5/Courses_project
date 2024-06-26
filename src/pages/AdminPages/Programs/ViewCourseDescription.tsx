import React, { useMemo } from "react";
import { Table, TitlePage } from "../../../components";
import { FaFolder, FaUserAlt } from "react-icons/fa";
import { t } from "i18next";
import { GoDotFill } from "react-icons/go";
import { FaDotCircle } from "react-icons/fa";
import { ColumnDef } from "@tanstack/react-table";

const ViewCourseDescription = () => {
  const courseDescriptionData = {
    courceCode: "#archaive",
    level: "الثالث",
    instructors: [
      "أ.د محمد عامر",
      "أ.د محمد عامر",
      "أ.د محمد عامر",
      "أ.د محمد عامر",
      "أ.د محمد عامر",
      "أ.د محمد عامر",
    ],
    student_number: "+2000 طالب",
    course_objectives: [
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum",
    ],
    information_concepts: [
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum  bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum  bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum  bibendum.lobortis bibendum.lobortis bibendum",
    ],
    mental_skills: [
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum",
    ],
    professional_skills: [
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum",
    ],
    general_skills: [
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum  bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum  bibendum.lobortis bibendum.lobortis bibendum",
      "bibendum.lobortis bibendum.lobortis bibendum  bibendum.lobortis bibendum.lobortis bibendum",
    ],
    teaching_learning_methods: [
      "محاضرات",
      "تدريب عملي",
      "تطبيقات",
      "ابحاث",
      "دراسة حالة",
      "مشروع",
    ],
  };

  const Section = ({ title, items }: any) => {
    return (
      <div
        className={`${
          items == "information_concepts" && items == "general_skills"
            ? "w-full lg:w-1/2"
            : "w-full lg:w-4/5"
        } grid grid-cols-1 text-lg font-medium gap-4 mt-5`}
      >
        <div className="flex gap-2 items-center">
          <FaDotCircle size={18} className="fill-mainColor" />
          <p className="font-semibold">{t(`${title}`)}</p>
        </div>
        <div className="grid grid-cols-1 gap-2 ms-5">
          {courseDescriptionData?.[items]?.map((instructor) => (
            <div className="flex gap-2">
              <GoDotFill size={20} className="fill-mainColor" />
              <p>{instructor}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const suggestedReferencesData = [
    {
      index: 1,
      reference_title: "W3School",
      author: "",
      date: "21/5/2023",
      link: "http://www.w3school.com",
    },
    {
      index: 2,
      reference_title: "W3School",
      author: "",
      date: "21/5/2023",
      link: "http://www.w3school.com",
    },
    {
      index: 3,
      reference_title: "W3School",
      author: "",
      date: "21/5/2023",
      link: "http://www.w3school.com",
    },
  ];

  const suggestedReferencesColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("reference title")}</span>,
        accessorKey: "reference_title",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("author")}</span>,
        accessorKey: "author",
        cell: (info) => <span>{t(`${info.getValue()}`)}</span>,
      },
      {
        header: () => <span>{t("date")}</span>,
        accessorKey: "date",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("link")}</span>,
        accessorKey: "link",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return (
    <div>
      <TitlePage
        mainTitle="Programs"
        supTitle="computer science program"
        ThirdTitle="systems analysis course description"
        icon={<FaFolder size={28} className="fill-mainColor" />}
      />

      <div className="pb-2 bg-white rounded-2xl py-6">
        <div className="px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 text-lg font-medium">
              <div className="flex gap-2 items-center">
                <FaDotCircle size={18} className="fill-mainColor" />
                <p className="font-semibold">{t("course code")}</p>
              </div>
              <p className="ms-7">{courseDescriptionData.courceCode}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 text-lg font-medium">
              <div className="flex gap-2 items-center">
                <FaDotCircle size={18} className="fill-mainColor" />
                <p className="font-semibold">{t("level")}</p>
              </div>
              <p className="ms-7">{courseDescriptionData.level}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 text-lg font-medium">
              <div className="flex gap-2 items-center">
                <FaDotCircle size={18} className="fill-mainColor" />
                <p className="font-semibold">{t("number students")}</p>
              </div>
              <p className="ms-7">{courseDescriptionData.student_number}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 w-full lg:w-2/3 text-lg font-medium gap-4 mt-5">
            <div className="flex gap-2 items-center">
              <FaDotCircle size={18} className="fill-mainColor" />
              <p className="font-semibold">{t("instructors")}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 ms-6">
              {courseDescriptionData.instructors.map((instructor) => (
                <div className="flex gap-2">
                  <FaUserAlt size={20} className="fill-mainColor" />
                  <p>{instructor}</p>
                </div>
              ))}
            </div>
          </div>

          <Section title="course objectives" items="course_objectives" />

          <Section
            title="information and concepts"
            items="information_concepts"
          />

          <Section title="mental skills" items="mental_skills" />

          <Section title="professional skills" items="professional_skills" />

          <Section title="general skills" items="general_skills" />

          <div className="grid grid-cols-1 w-full lg:w-1/2 text-lg font-medium gap-4 mt-5">
            <div className="flex gap-2 items-center">
              <FaDotCircle size={18} className="fill-mainColor" />
              <p className="font-semibold">
                {t("teaching and learning methods")}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 ms-6">
              {courseDescriptionData.teaching_learning_methods.map(
                (instructor) => (
                  <div className="flex gap-2 items-center">
                    <GoDotFill size={20} className="fill-mainColor" />
                    <p>{instructor}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#EEEDED] my-7 py-6">
          <h2 className="mb-5 text-2xl font-semibold text-center ms-5 sm:text-start">
            {t("suggested references")}
          </h2>
          <Table
            data={suggestedReferencesData}
            columns={suggestedReferencesColumns}
            className="bg-mainColor"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewCourseDescription;
