import { Link } from "react-router-dom";
import { Button, Table, TitlePage } from "../../../components";
import { t } from "i18next";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

const InstructorViewAllProject = () => {
  const allHomeworksData = [
    {
      id: 1,
      studentName: "محمد احمد يوسف",
      studentCode: "١٢٣٤٥٦٧٨٨٧٧",
      submissionDate: "٢٥/رجب/١٤٤٢",
      grade: "١٠",
    },
    {
      id: 2,
      studentName: "محمد احمد يوسف",
      studentCode: "١٢٣٤٥٦٧٨٨٧٧",
      submissionDate: "٢٥/رجب/١٤٤٢",
      grade: "١٠",
    },
    {
      id: 3,
      studentName: "محمد احمد يوسف",
      studentCode: "١٢٣٤٥٦٧٨٨٧٧",
      submissionDate: "٢٥/رجب/١٤٤٢",
      grade: ".......",
    },
    {
      id: 4,
      studentName: "محمد احمد يوسف",
      studentCode: "١٢٣٤٥٦٧٨٨٧٧",
      submissionDate: "٢٥/رجب/١٤٤٢",
      grade: "١٨٠",
    },
    {
      id: 5,
      studentName: "محمد احمد يوسف",
      studentCode: "١٢٣٤٥٦٧٨٨٧٧",
      submissionDate: "٢٥/رجب/١٤٤٢",
      grade: ".......",
    },
    {
      id: 6,
      studentName: "محمد احمد يوسف",
      studentCode: "١٢٣٤٥٦٧٨٨٧٧",
      submissionDate: "٢٥/رجب/١٤٤٢",
      grade: "١٨٠",
    },
  ];

  const allHomeworksColumns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        header: () => <span>{t("#")}</span>,
        accessorKey: "index",
        cell: (info) => info.row.index + 1,
      },
      {
        header: () => <span>{t("Student Name")}</span>,
        accessorKey: "studentName",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("studentCode")}</span>,
        accessorKey: "studentCode",
        cell: (info) => <span>{info.getValue()}</span>,
      },
      {
        header: () => <span>{t("submission date")}</span>,
        accessorKey: "submissionDate",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("grade")}</span>,
        accessorKey: "grade",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("evaluate")}</span>,
        accessorKey: "evaluate",
        cell: ({ row }) => (
          <Button className="text-white">
            <Link to={`/instructors/evaluatehomework/${row.original.id}`}>
              {t("evaluate")}
            </Link>
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <TitlePage mainLink="/instructors/viewHomework" mainTitle="homeworks" />

      <div>
        <Table data={allHomeworksData} columns={allHomeworksColumns} />
      </div>
    </div>
  );
};

export default InstructorViewAllProject;
