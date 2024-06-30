import React, { useMemo, useState } from "react";
import { Button, Table } from "../../../components";
import { t } from "i18next";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const StudentExams = () => {
  const [tabs, setTabs] = useState(1);
  const navigate = useNavigate();

  const buttons = [
    { id: 1, label: "tests today" },
    { id: 2, label: "upcoming tests" },
    { id: 3, label: "previous tests" },
  ];

  const examsTodayData = [
    {
      id: 1,
      course_code: "#65654SD",
      course_name: "الفزياء",
      exam_date: "2023-12-06",
      exam_time: "12:00 مساء",
      exam_type: "فصلي اول",
    },
    {
      id: 2,
      course_code: "#65654SD",
      course_name: "الفزياء",
      exam_date: "2023-12-06",
      exam_time: "12:00 مساء",
      exam_type: "نهائي",
    },
    {
      id: 3,
      course_code: "#65654SD",
      course_name: "الفزياء",
      exam_date: "2023-12-06",
      exam_time: "12:00 مساء",
      exam_type: "فصلي اول",
    },
    {
      id: 4,
      course_code: "#65654SD",
      course_name: "الفزياء",
      exam_date: "2023-12-06",
      exam_time: "12:00 مساء",
      exam_type: "نهائي",
    },
    {
      id: 5,
      course_code: "#65654SD",
      course_name: "الفزياء",
      exam_date: "2023-12-06",
      exam_time: "12:00 مساء",
      exam_type: "فصلي اول",
    },
    {
      id: 6,
      course_code: "#65654SD",
      course_name: "الفزياء",
      exam_date: "2023-12-06",
      exam_time: "12:00 مساء",
      exam_type: "نهائي",
    },
  ];

  const examsTodayColumns = useMemo<ColumnDef<any>[]>(
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
        header: () => <span>{t("exam date")}</span>,
        accessorKey: "exam_date",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam time")}</span>,
        accessorKey: "exam_time",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam type")}</span>,
        accessorKey: "exam_type",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "action",
        cell: (info) => {
          return (
            <Button
              action={() =>
                navigate(`/student/exams/details/${info.row.original.id}`)
              }
            >
              {t("start exam")}
            </Button>
          );
        },
      },
    ],
    []
  );

  const examsPrevData = [
    {
      id: 1,
      course_code: "#65654SD",
      course_name: "الفزياء",
      exam_date: "2023-12-06",
      exam_time: "12:00 مساء",
      student_grade: "75",
      exam_type: "نهائي",
    },
    {
      id: 2,
      course_code: "#65654SD",
      course_name: "الفزياء",
      exam_date: "2023-12-06",
      exam_time: "12:00 مساء",
      student_grade: "75",
      exam_type: "فصلي اول",
    },
    {
      id: 3,
      course_code: "#65654SD",
      course_name: "الفزياء",
      exam_date: "2023-12-06",
      exam_time: "12:00 مساء",
      student_grade: "75",
      exam_type: "نهائي",
    },
    {
      id: 4,
      course_code: "#65654SD",
      course_name: "الفزياء",
      exam_date: "2023-12-06",
      exam_time: "12:00 مساء",
      student_grade: "75",
      exam_type: "فصلي اول",
    },
    {
      id: 5,
      course_code: "#65654SD",
      course_name: "الفزياء",
      exam_date: "2023-12-06",
      exam_time: "12:00 مساء",
      student_grade: "75",
      exam_type: "نهائي",
    },
    {
      id: 6,
      course_code: "#65654SD",
      course_name: "الفزياء",
      exam_date: "2023-12-06",
      exam_time: "12:00 مساء",
      student_grade: "75",
      exam_type: "فصلي اول",
    },
  ];

  const examsPrevColumns = useMemo<ColumnDef<any>[]>(
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
        header: () => <span>{t("exam date")}</span>,
        accessorKey: "exam_date",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam time")}</span>,
        accessorKey: "exam_time",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam type")}</span>,
        accessorKey: "exam_type",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("student grade")}</span>,
        accessorKey: "student_grade",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 md:gap-8 justify-between md:justify-start bg-[#F9F9F9] rounded-3xl py-5 px-8 main_shadow mb-5">
        {buttons.map((button) => (
          <Button
            key={button.id}
            className={`px-2 md:px-8 font-medium md:semibold w-4/5 sm:w-full m-auto sm:m-0 ${
              tabs === button.id
                ? "bg-mainColor text-white"
                : "bg-transparent text-black"
            }`}
            action={() => setTabs(button.id)}
          >
            {t(button.label)}
          </Button>
        ))}
      </div>

      <div className="bg-white p-5 rounded-3xl">
        {tabs === 1 && (
          <div>
            <Table
              data={examsTodayData}
              columns={examsTodayColumns}
              showNavigation={true}
              totalPages={40}
              currentPage={"1"}
            />
          </div>
        )}
        {tabs === 2 && (
          <div>
            <Table
              data={examsTodayData}
              columns={examsTodayColumns}
              showNavigation={true}
              totalPages={40}
              currentPage={"1"}
            />
          </div>
        )}
        {tabs === 3 && (
          <div>
            <Table
              data={examsPrevData}
              columns={examsPrevColumns}
              showNavigation={true}
              totalPages={40}
              currentPage={"1"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentExams;
