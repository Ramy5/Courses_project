import { useMemo, useState } from "react";
import { Button } from "../..";
import { t } from "i18next";
import HomeworksRequired from "./HomeworksRequired";
import HomeworkDone from "./HomeworkDone";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../UI/Loading";

const getAllHomeworks = async () => {
  const { data } = await customFetch("getStudentHomework");
  return data.data;
};

const HomeworksTabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["get-all-homeworks"],
    queryFn: getAllHomeworks,
  });

  console.log(data);

  const homeworkDoneColumns = useMemo<ColumnDef<[]>[]>(
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
        accessorKey: "homework",
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
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("total grade")}</span>,
        accessorKey: "homework",
        cell: (info) => info.getValue()?.degree,
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "homework",
        cell: (info) => (
          <Button
            action={() =>
              navigate(`/students/viewHomework/${info.getValue().id}`)
            }
          >
            {t("view assignment")}
          </Button>
        ),
      },
    ],
    []
  );

  if (isLoading || isFetching || isRefetching) return <Loading />;

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
        {activeTab === 1 && (
          <HomeworksRequired data={data?.required_homework} />
        )}
        {activeTab === 2 && (
          <HomeworkDone
            data={data?.delivered_homework || []}
            column={homeworkDoneColumns}
          />
        )}
      </div>
    </div>
  );
};

export default HomeworksTabs;
