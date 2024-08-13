import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo } from "react";
import { Table } from "../../../components";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";

const getVirtualClassesData = async () => {
  const data = await customFetch("todayLectures");
  return data.data;
};

const VirtualClasses = () => {
  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["get-virtual-classes"],
    queryFn: getVirtualClassesData,
  });

  const virtualClassesColumns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "status",
        cell: (info) => {
          let statusColor;
          switch (info.getValue()) {
            case "completed":
              statusColor = "bg-green-700";
              break;
            case "inProgress":
              statusColor = "bg-[#D42828]";
              break;
            case "setup":
              statusColor = "bg-[#F2B385]";
              break;
          }

          return (
            <span
              className={`inline-block w-3 h-3 rounded-full ${statusColor}`}
            ></span>
          );
        },
      },
      {
        header: () => <span>{t("subject")}</span>,
        accessorKey: "subject",
        cell: (info) => info.row.original?.course?.course_name,
      },
      {
        header: () => <span>{t("academic program")}</span>,
        accessorKey: "academicProgram",
        cell: (info) => info.row.original?.program?.program_name,
      },
      {
        header: () => <span>{t("level")}</span>,
        accessorKey: "level",
        cell: (info) => info.row.original?.level,
      },
      {
        header: () => <span>{t("branch")}</span>,
        accessorKey: "branch",
        cell: (info) => info.row.original?.group,
      },
      {
        header: () => <span>{t("lecture date")}</span>,
        accessorKey: "lectureDate",
        cell: (info) => info.row.original?.date,
      },
      {
        header: () => <span>{t("start time")}</span>,
        accessorKey: "startTime",
        cell: (info) => info.row.original?.start_time,
      },
      {
        header: () => <span>{t("end time")}</span>,
        accessorKey: "endTime",
        cell: (info) => info.row.original?.end_time,
      },
      {
        header: () => <span>{t("zoom link")}</span>,
        accessorKey: "zoom_link",
        cell: (info: any) =>
          info.row.original?.status === "completed" ? (
            "---"
          ) : (
            <a href={info.getValue()} target="_blank" rel="noopener noreferrer">
              {info.getValue()}
            </a>
          ),
      },
    ],
    []
  );

  if (isLoading || isFetching || isRefetching) return <Loading />;

  return (
    <div className="py-6 bg-white rounded-2xl">
      <h2 className="mb-6 text-lg font-bold lg:text-2xl ms-4">
        {t("virtual classes (today's lecture)")}
      </h2>
      {data?.data?.lectures?.length ? (
        <Table
          data={data?.data?.lectures || []}
          columns={virtualClassesColumns}
        ></Table>
      ) : (
        <p className="mt-12 mb-4 text-xl font-bold text-center text-mainColor">
          {t("there is no today's lecture")}
        </p>
      )}
    </div>
  );
};

export default VirtualClasses;
