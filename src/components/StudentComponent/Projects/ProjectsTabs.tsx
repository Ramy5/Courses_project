import React, { useMemo, useState } from "react";
import { Button } from "../..";
import { t } from "i18next";
import HomeworkRequiredBox from "../Homeworks/HomeworkRequiredBox";
import HomeworkDone from "../Homeworks/HomeworkDone";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../UI/Loading";

const getAllProjects = async () => {
  const { data } = await customFetch("getStudentProjects");
  return data.data;
};

const ProjectsTabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["get-all-projects"],
    queryFn: getAllProjects,
  });

  const projectDoneColumns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        header: () => <span>{t("#")}</span>,
        accessorKey: "id",
        cell: (info) => info.row.index + 1,
      },
      {
        header: () => <span>{t("subject")}</span>,
        accessorKey: "course_name",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("instructor")}</span>,
        accessorKey: "teacher_name",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("assignment title")}</span>,
        accessorKey: "project",
        cell: (info) => info.getValue()?.title,
      },
      {
        header: () => <span>{t("submission date")}</span>,
        accessorKey: "delivered_at",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("grade")}</span>,
        accessorKey: "degree",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("total grade")}</span>,
        accessorKey: "project",
        cell: (info) => info.getValue()?.score,
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "project",
        cell: (info) => (
          <Button
            action={() =>
              navigate(`/students/viewProjects/${info.getValue().id}`)
            }
          >
            {t("view project")}
          </Button>
        ),
      },
    ],
    []
  );

  if (isLoading || isFetching || isRefetching) return <Loading />;

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
            {data?.requiredProject?.map((el: any) => {
              return <HomeworkRequiredBox key={el.id} {...el} isProject />;
            })}
          </div>
        )}
        {activeTab === 2 && (
          <HomeworkDone
            data={data?.deliveredProject || []}
            column={projectDoneColumns}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsTabs;
