import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo } from "react";
import { Table, TitlePage } from "../../../components";
import Select from "react-select";
import { Form, Formik } from "formik";
import { FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";

type testFilter = "program" | "level";

const TestManagement = () => {
  const initialValues: Record<testFilter, string> = {
    program: "",
    level: "",
  };

  const examsData = [
    {
      index: 1,
      subject: "Physics",
      examTitle: "End of Semester Exam 1",
      examDate: "2/2/2022",
      questionCount: 40,
      duration: "40 minutes",
      finalScore: 40,
      status: "approved",
    },
    {
      index: 2,
      subject: "Physics",
      examTitle: "Midterm Exam 1",
      examDate: "2/2/2022",
      questionCount: 40,
      duration: "40 minutes",
      finalScore: 40,
      status: "approved",
    },
    {
      index: 3,
      subject: "Physics",
      examTitle: "End of Semester Exam 1",
      examDate: "2/2/2022",
      questionCount: 40,
      duration: "40 minutes",
      finalScore: 40,
      status: "approved",
    },
    {
      index: 4,
      subject: "Physics",
      examTitle: "End of Semester Exam 1",
      examDate: "2/2/2022",
      questionCount: 40,
      duration: "40 minutes",
      finalScore: 40,
      status: "approved",
    },
    {
      index: 5,
      subject: "Physics",
      examTitle: "End of Semester Exam 1",
      examDate: "2/2/2022",
      questionCount: 40,
      duration: "40 minutes",
      finalScore: 40,
      status: "pending approval",
    },
    {
      index: 6,
      subject: "Physics",
      examTitle: "End of Semester Exam 1",
      examDate: "2/2/2022",
      questionCount: 40,
      duration: "40 minutes",
      finalScore: 40,
      status: "pending approval",
    },
    {
      index: 7,
      subject: "Physics",
      examTitle: "End of Semester Exam 1",
      examDate: "2/2/2022",
      questionCount: 40,
      duration: "40 minutes",
      finalScore: 40,
      status: "pending approval",
    },
  ];

  const examsColumns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        header: () => <span>{t("subject")}</span>,
        accessorKey: "subject",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam title")}</span>,
        accessorKey: "examTitle",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam date")}</span>,
        accessorKey: "examDate",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("number of questions")}</span>,
        accessorKey: "questionCount",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("duration")}</span>,
        accessorKey: "duration",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("final score")}</span>,
        accessorKey: "finalScore",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam status")}</span>,
        accessorKey: "status",
        cell: (info) => {
          if (info.getValue() === "approved") {
            return (
              <span className="inline-block w-full px-2 text-green-800">
                {t("approved")}
              </span>
            );
          } else {
            return (
              <Link
                to={`/testManagement/testApproved/${info.row.original.index}`}
                className="inline-block w-full px-2 text-red-800 bg-red-200 border rounded-md w-30 border-red-950"
              >
                {t("pending approval")}
              </Link>
            );
          }
        },
      },
    ],
    []
  );

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
      {({ values, setFieldValue }) => {
        return (
          <Form>
            <TitlePage
              mainTitle={t("test management")}
              icon={<FiFileText className="text-xl text-mainColor" />}
            />

            <div className="bg-white rounded-2xl">
              <div className="flex flex-wrap items-center gap-10 px-4 py-6">
                <div>
                  <label className="font-bold" htmlFor="program">
                    {t("program")}
                  </label>
                  <Select className="w-56 mt-1" id="program" name="program" />
                </div>
                <div>
                  <label className="font-bold" htmlFor="level">
                    {t("level")}
                  </label>
                  <Select className="w-56 mt-1" id="level" name="level" />
                </div>
              </div>

              <Table data={examsData} columns={examsColumns} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TestManagement;
