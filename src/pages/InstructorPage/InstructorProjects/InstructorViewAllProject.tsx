import { Link } from "react-router-dom";
import { Button, Table, TitlePage } from "../../../components";
import { t } from "i18next";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";

const getStudentsProjectAnswers = async () => {
  const { data } = await customFetch("");
  return data.data.answers;
};

const InstructorViewAllProject = () => {
  const {
    data: projectsDataAnswer,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["projectsDataAnswerData"],
    queryFn: getStudentsProjectAnswers,
  });

  const allProjectsData = projectsDataAnswer?.map((data: any) => {
    return {
      id: data?.id,
      studentName: data?.student?.full_name,
      studentCode: data?.student?.academicData?.Academic_code,
      submissionDate: data?.delivered_date,
      grade: data?.degree,
    };
  });

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
            <Link to={`/instructor/homeworks/evaluate/${row.original.id}`}>
              {t("evaluate")}
            </Link>
          </Button>
        ),
      },
    ],
    []
  );

  if (isLoading || isFetching || isRefetching) return <Loading />;

  return (
    <div>
      <TitlePage mainLink="/instructor/viewHomework" mainTitle="homeworks" />

      <div>
        <Table data={allProjectsData || []} columns={allHomeworksColumns} />
      </div>
    </div>
  );
};

export default InstructorViewAllProject;
