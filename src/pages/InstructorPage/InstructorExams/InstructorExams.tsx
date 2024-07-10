import { useMemo } from "react";
import { t } from "i18next";
import { ColumnDef } from "@tanstack/react-table";
import { Button, Table, TitlePage } from "../../../components";
import { TbFileText } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const InstructorExams = () => {
  const navigate = useNavigate();

  const examsData = [
    {
      id: 1,
      course_name: "الفيزياء",
      exam_title: "الفصل الدراسي الأول",
      exam_type: "فصلي اول",
      exam_date: "2023-12-06",
      number_questions: 20,
      duration: 40,
      exam_time: "12:00",
      final_score: 100,
      exam_status: "قيد التنفيذ",
    },
    {
      id: 2,
      course_name: "الفيزياء",
      exam_title: "الفصل الدراسي الأول",
      exam_type: "فصلي اول",
      exam_date: "2023-12-06",
      number_questions: 20,
      duration: 40,
      exam_time: "12:00",
      final_score: 100,
      exam_status: "تم الإختبار",
    },
    {
      id: 3,
      course_name: "الفيزياء",
      exam_title: "الفصل الدراسي الأول",
      exam_type: "فصلي اول",
      exam_date: "2023-12-06",
      number_questions: 20,
      duration: 40,
      exam_time: "12:00",
      final_score: 100,
      exam_status: "قيد التنفيذ",
    },
    {
      id: 4,
      course_name: "الفيزياء",
      exam_title: "الفصل الدراسي الأول",
      exam_type: "فصلي اول",
      exam_date: "2023-12-06",
      number_questions: 20,
      duration: 40,
      exam_time: "12:00",
      final_score: 100,
      exam_status: "تم الإختبار",
    },
    {
      id: 5,
      course_name: "الفيزياء",
      exam_title: "الفصل الدراسي الأول",
      exam_type: "فصلي اول",
      exam_date: "2023-12-06",
      number_questions: 20,
      duration: 40,
      exam_time: "12:00",
      final_score: 100,
      exam_status: "قيد التنفيذ",
    },
    {
      id: 6,
      course_name: "الفيزياء",
      exam_title: "الفصل الدراسي الأول",
      exam_type: "فصلي اول",
      exam_date: "2023-12-06",
      number_questions: 20,
      duration: 40,
      exam_time: "12:00",
      final_score: 100,
      exam_status: "قيد التنفيذ",
    },
  ];

  const examsColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("course name")}</span>,
        accessorKey: "course_name",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam title")}</span>,
        accessorKey: "exam_title",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam type")}</span>,
        accessorKey: "exam_type",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam date")}</span>,
        accessorKey: "exam_date",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("number of questions")}</span>,
        accessorKey: "number_questions",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("duration")}</span>,
        accessorKey: "duration",
        cell: (info) => <>{`${info.getValue()} ${t("minute")} `}</>,
      },
      {
        header: () => <span>{t("exam time")}</span>,
        accessorKey: "exam_time",
        cell: (info) => info.getValue(),
      },

      {
        header: () => <span>{t("final score")}</span>,
        accessorKey: "final_score",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam status")}</span>,
        accessorKey: "exam_status",
        cell: (info) => (
          <span
            className={`${
              info.getValue() === "قيد التنفيذ"
                ? "text-[#EBA352]"
                : "text-[#369252]"
            }`}
          >
            {t(`${info.getValue()}`)}
          </span>
        ),
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "actions",
        cell: (info) => {
          return (
            <>
              {info.row.original.exam_status === "قيد التنفيذ" && (
                <div className="flex items-center gap-4">
                  <FaRegEdit
                    size={24}
                    className="cursor-pointer fill-mainColor"
                  />
                  <RiDeleteBin5Line
                    size={24}
                    className="cursor-pointer fill-mainRed"
                  />
                </div>
              )}
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <div>
      <div>
        <TitlePage
          mainTitle="exams"
          supTitle=""
          icon={<TbFileText size={25} className="text-mainColor" />}
        />
      </div>

      <div className="flex justify-end items-center mb-5">
        <Button action={() => navigate("/instructor/exams/add")}>
          {t("add exam +")}
        </Button>
      </div>

      <div className="bg-white p-5 rounded-3xl">
        <div>
          <Table data={examsData} columns={examsColumns} />
        </div>
      </div>
    </div>
  );
};

export default InstructorExams;
