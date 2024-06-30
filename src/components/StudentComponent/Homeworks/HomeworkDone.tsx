import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo } from "react";
import { Button, Table } from "../..";
import { useNavigate } from "react-router-dom";

const HomeworkDone = () => {
  const navigate = useNavigate();

  const homeworkDoneData = [
    {
      id: 1,
      subject: "الفيزياء",
      assignmentTitle: "مسألة كيرشوف",
      submissionDate: "23/5/2025",
      grade: 100,
      viewAssignment: "#",
    },
    {
      id: 2,
      subject: "الفيزياء",
      assignmentTitle: "مسألة كيرشوف",
      submissionDate: "23/5/2025",
      grade: 100,
      viewAssignment: "#",
    },
    {
      id: 3,
      subject: "الفيزياء",
      assignmentTitle: "مسألة كيرشوف",
      submissionDate: "23/5/2025",
      grade: 100,
      viewAssignment: "#",
    },
  ];

  const homeworkDoneColumns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        header: () => <span>{t("#")}</span>,
        accessorKey: "id",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("subject")}</span>,
        accessorKey: "subject",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("assignment title")}</span>,
        accessorKey: "assignmentTitle",
        cell: (info) => info.getValue(),
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
        header: () => <span>{t("")}</span>,
        accessorKey: "viewAssignment",
        cell: (info) => (
          <Button
            action={() =>
              navigate(`/students/viewHomework/${info.row.original.id}`)
            }
          >
            {t("view assignment")}
          </Button>
        ),
      },
    ],
    []
  );
  return (
    <div className="p-6 mt-6 bg-white rounded-2xl">
      <Table data={homeworkDoneData} columns={homeworkDoneColumns} />
    </div>
  );
};

export default HomeworkDone;
