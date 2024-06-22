import { t } from "i18next";
import { DotsDropDown, Table, TitlePage } from "../../../components";
import { FaFolder, FaUserAlt } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { PiStudentBold } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { GrView } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";

const ProgramInformation = () => {
  const ProgramInf = {
    program_name: "علوم حاسب",
    program_code: "#1545456",
    strat_Period: "24/5/2024",
    end_Period: "24/5/2024",
    vision:
      "Acsapienmor bigravidaplace ratvariusvit aemorbi lobortis bibe ndum.lobortis bibendum.lobortis bibendum.",
    message:
      " Acsapienmor bigravidaplace ratvariusvit aemorbi lobortis bibe ndum.lobortis bibendum.lobortis bibendum. Acsapienm orbigravi daplacerat variusv itaem orbi  lobor tis biben  dum.lobortis bibend um.lobortis bibendum.",
    rating_excellent: "85%",
    rating_veryGood: "75%",
    rating_good: "65%",
    rating_acceptable: "50%",
    statistics_courses: "20 مقرر",
    statistics_Instructors: "15 محاضر",
    statistics_students: "+5000 طالب",
    academic_levels: 4,
    number_classes: 4,
  };

  const studentsDataFee = [
    {
      index: 1,
      course_code: "#65654SD",
      course_name: "تحليل نظم",
      level: "الثالث",
    },
    {
      index: 2,
      course_code: "#65654SD",
      course_name: "تحليل نظم",
      level: "الثالث",
    },
  ];

  const studentsColumnsFee = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("type of certificate")}</span>,
        accessorKey: "course_code",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("certificate name")}</span>,
        accessorKey: "course_name",
        cell: (info) => <span>{t(`${info.getValue()}`)}</span>,
      },
      {
        header: () => <span>{t("donor")}</span>,
        accessorKey: "level",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "action",
        cell: (info) => (
          <DotsDropDown
            instructorRoute="/programs/courseDescription"
            instructorId={info.row.original.id}
            firstName="view course description"
            firstIcon={<GrView size={22} className="fill-mainColor" />}
            secondName="edit course description"
            secondIcon={<FaRegEdit size={22} className="fill-mainColor" />}
          />
        ),
      },
    ],
    []
  );

  return (
    <div>
      <TitlePage
        mainTitle="Programs"
        supTitle="computer science program"
        icon={<FaFolder size={28} className="fill-mainColor" />}
      />

      <div className="bg-[#D7DFE7] rounded-2xl p-5">
        <div className="text-center w-full mb-6">
          <span className="font-medium">{t("training program")}</span>
          <h2 className="font-semibold text-3xl text-mainColor">
            {ProgramInf.program_name}
          </h2>
          <span className="font-medium">{ProgramInf.program_code}</span>
          <p className="font-medium">
            {t("time period :")} {ProgramInf.strat_Period} -{" "}
            {ProgramInf.end_Period}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-2xl text-mainColor mb-2">
            {t("vision")}
          </h2>
          <p className="text-2xl font-medium">{ProgramInf.vision}</p>
        </div>

        <div className="my-6">
          <h2 className="font-semibold text-2xl text-mainColor mb-2">
            {t("message")}
          </h2>
          <p className="text-2xl font-medium">{ProgramInf.message}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-e-0 md:border-e-[3px] border-mainColor text-center md:text-start mb-5">
            <h2 className="font-semibold text-2xl text-mainColor">
              {t("distribution of program estimates (%)")}
            </h2>
            <ul className="text-xl font-semibold list-disc list-inside mt-5">
              <li className="grid grid-cols-2">
                <div className="flex gap-3 items-center">
                  <GoDotFill size={25} className="fill-mainColor" />
                  <p>{t("excellent")}</p>
                </div>
                <p>{ProgramInf.rating_excellent}</p>
              </li>
              <li className="grid grid-cols-2 my-3">
                <div className="flex gap-3 items-center">
                  <GoDotFill size={25} className="fill-mainColor" />
                  <p>{t("very good")}</p>
                </div>
                <p>{ProgramInf.rating_veryGood}</p>
              </li>
              <li className="grid grid-cols-2">
                <div className="flex gap-3 items-center">
                  <GoDotFill size={25} className="fill-mainColor" />
                  <p>{t("good")}</p>
                </div>
                <p>{ProgramInf.rating_good}</p>
              </li>
              <li className="grid grid-cols-2 my-3">
                <div className="flex gap-3 items-center">
                  <GoDotFill size={25} className="fill-mainColor" />
                  <p>{t("acceptable")}</p>
                </div>
                <p>{ProgramInf.rating_acceptable}</p>
              </li>
            </ul>
          </div>
          <div className="text-center mb-5">
            <h2 className="font-semibold text-2xl text-mainColor">
              {t("statistics")}
            </h2>
            <div className="flex gap-3 items-center justify-center mt-5">
              <CgNotes size={25} className=" text-mainColor" />
              <p className="font-medium text-xl">
                {ProgramInf.statistics_courses}
              </p>
            </div>
            <div className="flex gap-3 items-center justify-center my-3 ms-5">
              <FaUserAlt size={25} className="fill-mainColor" />
              <p className="font-medium text-xl">
                {ProgramInf.statistics_Instructors}
              </p>
            </div>
            <div className="flex gap-3 items-center justify-center ms-11">
              <PiStudentBold size={25} className="fill-mainColor" />
              <p className="font-medium text-xl">
                {ProgramInf.statistics_students}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
          <div>
            <h2 className="font-semibold text-2xl text-mainColor text-start">
              {t("number academic levels")}
            </h2>
            <p className="font-semibold text-xl mt-3 ms-16">
              {ProgramInf.academic_levels}
            </p>
          </div>
          <div className="text-center">
            <h2 className="font-semibold text-2xl text-mainColor">
              {t("number classes")}
            </h2>
            <p className="font-semibold text-xl text-center mt-3">
              {ProgramInf.number_classes}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#D7DFE7] rounded-2xl my-7 py-6">
        <h2 className="mb-5 text-2xl font-semibold text-center ms-5 sm:text-start">
          {t("Courses")}
        </h2>
        <Table
          data={studentsDataFee}
          columns={studentsColumnsFee}
          className="bg-mainColor"
        />
      </div>
    </div>
  );
};

export default ProgramInformation;
