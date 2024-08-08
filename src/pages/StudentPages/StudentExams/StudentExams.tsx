import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Button, Table } from "../../../components";
import { t } from "i18next";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import { toast } from "react-toastify";
import {
  calculateTime,
  formatDate,
  formatEgyptDate,
  formatTime,
  formatTimeTo12Hour,
  formatTimeTo24Hour,
} from "../../../utils/helpers";

const StudentExams = () => {
  const [tabs, setTabs] = useState("today_exams");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const buttons = [
    { id: "today_exams", label: "tests today" },
    { id: "upcoming_exams", label: "upcoming tests" },
    { id: "past_exams", label: "previous tests" },
  ];

  const fetchStudentExams = async () => {
    const response = await customFetch(`getTimeExams`);
    return response;
  };

  const { data, isFetching, isRefetching, isLoading, refetch } = useQuery({
    queryKey: ["student_ExamsData"],
    queryFn: fetchStudentExams,
  });

  const studentExamsData = data && data?.data?.data;

  const examsData =
    tabs === "past_exams"
      ? studentExamsData?.past_exams
      : tabs === "today_exams"
      ? studentExamsData?.today_exams
      : studentExamsData?.upcoming_exams;

  const examsColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("type of certificate")}</span>,
        accessorKey: "course_code",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("certificate name")}</span>,
        accessorKey: "course_name",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam date")}</span>,
        accessorKey: "date",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("exam time")}</span>,
        accessorKey: "start_time",
        cell: (info) => formatTimeTo12Hour(info.getValue()),
      },
      {
        header: () => <span>{t("exam type")}</span>,
        accessorKey: "exam_type",
        cell: (info) => info.getValue(),
      },
      ...(tabs === "past_exams"
        ? [
            {
              header: () => <span>{t("student grade")}</span>,
              accessorKey: "degree",
              cell: (info) => info.getValue(),
            },
          ]
        : [
            {
              header: () => <span>{t("")}</span>,
              accessorKey: "action",
              cell: (info) => {
                const examDate = info.row.original.date;
                const startTime = info.row.original.start_time;

                const duration = info.row.original.duration;
                const formatDuration = formatTime(duration * 60);

                const currentDate = new Date();
                const currentTime = formatEgyptDate(currentDate);
                const currentTimeFormat = formatTimeTo24Hour(currentTime);

                const currentDateFormat = formatDate(currentDate);

                const finishedTime = calculateTime(formatDuration, startTime);

                const isReady =
                  currentDateFormat == examDate &&
                  currentTimeFormat >= startTime &&
                  currentTimeFormat <= finishedTime;

                return (
                  <Button
                    action={() => {
                      if (isReady) {
                        navigate(
                          `/student/exams/details/${info.row.original.id}`,
                          { replace: true }
                        );
                      } else {
                        toast.info(t("the exam is not ready"));
                      }
                    }}
                    disabled={!isReady}
                  >
                    {t("start exam")}
                  </Button>
                );
              },
            },
          ]),
    ],
    [tabs]
  );

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [tabs]);

  if (isFetching || isRefetching || isLoading) return <Loading />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 md:gap-8 justify-between md:justify-start bg-[#F9F9F9] rounded-3xl py-5 px-8 main_shadow mb-5">
        {buttons.map((button) => (
          <Button
            key={button.id}
            className={`px-2 md:px-8 font-medium md:semibold w-4/5 sm:w-full m-auto sm:m-0 ${
              tabs === button.id
                ? "bg-mainColor text-white"
                : "bg-transparent text-black"
            }`}
            action={() => setTabs(button.id)}
          >
            {t(button.label)}
          </Button>
        ))}
      </div>

      <div className="bg-white p-5 rounded-3xl">
        {examsData?.length > 0 ? (
          <>
            {buttons.map((button) => (
              <div key={button.id}>
                {loading ? (
                  <Loading />
                ) : (
                  <div className="fade-in">
                    {tabs === button.id && (
                      <div>
                        <Table
                          data={examsData || []}
                          columns={examsColumns}
                          // showNavigation={examsData?.length > 10}
                          // totalPages={40}
                          // currentPage={"1"}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <p className="text-center font-semibold text-xl my-8">
            {t("there is no test available yet.")}
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentExams;
