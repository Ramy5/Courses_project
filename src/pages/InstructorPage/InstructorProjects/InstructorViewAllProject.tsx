import { Link, useParams } from "react-router-dom";
import { Button, Table, TitlePage } from "../../../components";
import { t } from "i18next";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";

const getStudentsProjectsAnswers = async (id: number | string) => {
  const { data } = await customFetch(`getStudentProjectAnswers/${id}`);
  return data.data;
};

const InstructorViewAllProject = () => {
  const { id: studentId } = useParams();

  const {
    data: projectsDataAnswer,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["projectsDataAnswerData"],
    queryFn: () => getStudentsProjectsAnswers(studentId),
  });
  console.log(
    "🚀 ~ InstructorViewAllProject ~ projectsDataAnswer:",
    projectsDataAnswer
  );

  const allProjectsData = projectsDataAnswer?.map((data: any) => {
    return {
      answerId: data?.answer_id,
      projectId: data?.project_id,
      studentId: data?.student_id,
      studentName: data?.full_name,
      studentCode: data?.code,
      submissionDate: data?.delivered_date,
      grade: data?.degree?.degree,
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
            <Link to={`/instructor/projects/evaluate/${row.original.answerId}`}>
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
      <TitlePage mainLink="/instructor/projects" mainTitle="projects" />

      <div>
        <div>
          {allProjectsData?.length > 0 ? (
            <Table data={allProjectsData || []} columns={allHomeworksColumns} />
          ) : (
            <h2 className="text-xl font-bold text-center text-mainColor">
              {t("there is no answers right now")}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorViewAllProject;
