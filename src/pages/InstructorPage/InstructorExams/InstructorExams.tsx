import { useEffect, useMemo, useState } from "react";
import { t } from "i18next";
import { ColumnDef } from "@tanstack/react-table";
import { Button, Table, TitlePage } from "../../../components";
import { TbFileText } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import customFetch from "../../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import { toast } from "react-toastify";
import { formatTimeTo12Hour } from "../../../utils/helpers";

const getAllExam = async (page) => {
  const response = await customFetch(`exams?page=${page}`);
  return response;
};

const deleteExam = async (examId) => {
  const response = await customFetch.delete(`/exams/${examId}`);
  return response;
};

const InstructorExams = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["all_exam"],
    queryFn: () => getAllExam(page),
  });

  const reverseExamsData = data?.data?.data?.exams || [];
  console.log("🚀 ~ InstructorExams ~ reverseExamsData:", reverseExamsData)
  const examsPagenation = data?.data?.data || [];

  const { mutate } = useMutation({
    mutationKey: ["delete_exam"],
    mutationFn: deleteExam,
    onSuccess: (data) => {
      queryClient.invalidateQueries("delete_exam");
      toast.success(`${t("the exam has been deleted successfully.")}`);
      refetch();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  });

  const examsColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("course name")}</span>,
        accessorKey: "course_name",
        cell: (info) => info?.row?.original?.course.course_name,
      },
      {
        header: () => <span>{t("exam title")}</span>,
        accessorKey: "title",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam type")}</span>,
        accessorKey: "exam_type",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam date")}</span>,
        accessorKey: "date",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("number of questions")}</span>,
        accessorKey: "number_questions",
        cell: (info) =>
          info?.row?.original?.num_q_multipleChoice +
          info?.row?.original?.num_q_trueOrFalse,
      },
      {
        header: () => <span>{t("duration")}</span>,
        accessorKey: "duration",
        cell: (info) => <>{`${info.getValue()} ${t("minute")} `}</>,
      },
      {
        header: () => <span>{t("exam time")}</span>,
        accessorKey: "start_time",
        cell: (info) => formatTimeTo12Hour(info.getValue()),
      },

      {
        header: () => <span>{t("final score")}</span>,
        accessorKey: "score",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam status")}</span>,
        accessorKey: "status",
        cell: (info) => (
          <span
            className={`${
              info.getValue() === "inProgress"
                ? "text-[#EBA352]"
                : "text-[#369252]"
            }`}
          >
            {t(`${info.getValue()}`)}
          </span>
        ),
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "actions",
        cell: (info) => {
          return (
            <>
              {info.row.original.status === "inProgress" && (
                <div className="flex items-center gap-4">
                  <FaRegEdit
                    onClick={() =>
                      navigate(`/instructor/exams/add`, {
                        state: info.row.original.id,
                      })
                    }
                    size={24}
                    className="cursor-pointer fill-mainColor"
                  />
                  <RiDeleteBin5Line
                    onClick={() => {
                      mutate(info.row.original.id);
                    }}
                    size={24}
                    className="cursor-pointer fill-mainRed"
                  />
                </div>
              )}
            </>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    refetch();
  }, [page]);

  if (isLoading || isFetching) return <Loading />;

  return (
    <div>
      <div>
        <TitlePage
          mainTitle="exams"
          supTitle=""
          icon={<TbFileText size={25} className="text-mainColor" />}
        />
      </div>

      <div className="flex justify-end items-center mb-5">
        <Button action={() => navigate("/instructor/exams/add")}>
          {t("add exam +")}
        </Button>
      </div>

      <div className="bg-white p-5 rounded-3xl">
        <div>
          <Table
            data={reverseExamsData}
            columns={examsColumns}
            showNavigation
            totalPages={examsPagenation?.totalPages}
            currentPage={examsPagenation?.currentPage}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default InstructorExams;
