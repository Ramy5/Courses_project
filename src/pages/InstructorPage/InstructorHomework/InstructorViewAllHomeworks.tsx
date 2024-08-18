import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo } from "react";
import { Button, Table, TitlePage } from "../../../components";
import { Link, useParams } from "react-router-dom";
import Back from "../../../components/UI/Back";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";

const getStudentsHomeworkAnswers = async (id: number | string) => {
  const { data } = await customFetch(`getStudentHomeWorkAnswer/${id}`);
  return data.data;
};

const InstructorViewAllHomeworks = () => {
  const { id: studentId } = useParams();

  const {
    data: homeworksDataAnswer,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["homeworksDataAnswerData"],
    queryFn: () => getStudentsHomeworkAnswers(studentId),
  });

  const allHomeworksData = homeworksDataAnswer?.map((data: any) => {
    return {
      answerId: data?.answer_id,
      homeworkId: data?.homework_id,
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
            <Link
              to={`/instructor/homeworks/evaluate/${row.original.answerId}`}
            >
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
      <div className="flex items-center justify-between">
        <TitlePage mainLink="/instructor/homeworks" mainTitle="homeworks" />
        <Back className="bg-white border border-mainColor text-mainColor" />
      </div>
      <div>
        {allHomeworksData?.length > 0 ? (
          <Table data={allHomeworksData || []} columns={allHomeworksColumns} />
        ) : (
          <h2 className="text-xl font-bold text-center text-mainColor">
            {t("there is no answers right now")}
          </h2>
        )}
      </div>
    </div>
  );
};

export default InstructorViewAllHomeworks;
