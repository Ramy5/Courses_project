import { useMemo, useState } from "react";
import { Button } from "../..";
import { t } from "i18next";
import HomeworksRequired from "./HomeworksRequired";
import HomeworkDone from "./HomeworkDone";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const HomeworksTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

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
    <div>
      <div
        className={`flex items-center gap-4 p-3 lg:p-6 bg-white rounded-2xl`}
      >
        <Button
          className={`text-sm px-3 ${
            activeTab === 1 ? "" : " bg-transparent text-mainColor"
          }`}
          action={() => setActiveTab(1)}
        >
          {t("required duties")}
        </Button>
        <Button
          action={() => setActiveTab(2)}
          className={`text-sm px-3  ${
            activeTab === 2 ? "" : "bg-transparent text-mainColor"
          } `}
        >
          {t("duties carried out")}
        </Button>
      </div>

      <div>
        {activeTab === 1 && <HomeworksRequired />}
        {activeTab === 2 && (
          <HomeworkDone data={homeworkDoneData} column={homeworkDoneColumns} />
        )}
      </div>
    </div>
  );
};

export default HomeworksTabs;
