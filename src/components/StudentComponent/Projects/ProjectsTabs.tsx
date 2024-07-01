import React, { useMemo, useState } from "react";
import { Button } from "../..";
import { t } from "i18next";
import HomeworkRequiredBox from "../Homeworks/HomeworkRequiredBox";
import HomeworkDone from "../Homeworks/HomeworkDone";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const ProjectsTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const data = [
    {
      id: 1,
      subject: "Physics",
      professor: "Professor Abdullah Fares",
      taskName: "project",
      startDate: "23/3/2024",
      endDate: "30/3/2024",
      color: "#f00",
    },
    {
      id: 2,
      subject: "Mathematics",
      professor: "Professor Ali Ahmed",
      taskName: "project",
      startDate: "1/4/2024",
      endDate: "8/4/2024",
      color: "#f0f",
    },
    {
      id: 3,
      subject: "Mathematics",
      professor: "Professor Ali Ahmed",
      taskName: "project",
      startDate: "1/4/2024",
      endDate: "8/4/2024",
      color: "#f0f",
    },
    {
      id: 4,
      subject: "Mathematics",
      professor: "Professor Ali Ahmed",
      taskName: "project",
      startDate: "1/4/2024",
      endDate: "8/4/2024",
      color: "#ff0",
    },
  ];

  const navigate = useNavigate();

  const projectDoneData = [
    {
      id: 1,
      subject: "الفيزياء",
      projectTitle: "مسألة كيرشوف",
      submissionDate: "23/5/2025",
      grade: 100,
      viewProject: "#",
    },
    {
      id: 2,
      subject: "الفيزياء",
      projectTitle: "مسألة كيرشوف",
      submissionDate: "23/5/2025",
      grade: 100,
      viewProject: "#",
    },
    {
      id: 3,
      subject: "الفيزياء",
      projectTitle: "مسألة كيرشوف",
      submissionDate: "23/5/2025",
      grade: 100,
      viewProject: "#",
    },
  ];

  const projectDoneColumns = useMemo<ColumnDef<[]>[]>(
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
        header: () => <span>{t("project title")}</span>,
        accessorKey: "projectTitle",
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
        accessorKey: "viewProject",
        cell: (info) => (
          <Button
            action={() =>
              navigate(`/students/viewProjects/${info.row.original.id}`)
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
      <div className={`flex items-center gap-4 p-6 bg-white rounded-2xl`}>
        <Button
          className={`text-sm px-3  ${
            activeTab === 1 ? "" : " bg-transparent text-mainColor"
          }`}
          action={() => setActiveTab(1)}
        >
          {t("required projects")}
        </Button>
        <Button
          action={() => setActiveTab(2)}
          className={`text-sm px-3  ${
            activeTab === 2 ? "" : "bg-transparent text-mainColor"
          } `}
        >
          {t("projects carried out")}
        </Button>
      </div>

      <div>
        {activeTab === 1 && (
          <div className="grid items-center my-10 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-8">
            {data.map((el, index) => {
              return <HomeworkRequiredBox key={index} {...el} isProject />;
            })}
          </div>
        )}
        {activeTab === 2 && (
          <HomeworkDone data={projectDoneData} column={projectDoneColumns} />
        )}
      </div>
    </div>
  );
};

export default ProjectsTabs;
