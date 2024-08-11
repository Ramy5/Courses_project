import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo } from "react";
import { Button, Table } from "../../components";
import customFetch from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/UI/Loading";

const getVirtualClasses = async () => {
  const { data } = await customFetch("todayInsLectures");
  return data.data.lectures;
};

const InstructorVirtualClasses = () => {
  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["get-instructor-virtual-classes"],
    queryFn: getVirtualClasses,
  });

  const virtualClassesColumns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "status",
        cell: (info) => {
          let statusColor;
          switch (info.getValue()) {
            case "complete":
              statusColor = "bg-green-700";
              break;
            case "inProgress":
              statusColor = "bg-[#D42828]";
              break;
            case "setup":
              statusColor = "bg-[#F2B385]";
              break;
            default:
              statusColor = "bg-[#369252]";
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
        accessorKey: "course",
        cell: (info) => info.getValue()?.course_name || "---",
      },
      {
        header: () => <span>{t("academic program")}</span>,
        accessorKey: "program",
        cell: (info) => info.getValue()?.program_name || "---",
      },
      {
        header: () => <span>{t("level")}</span>,
        accessorKey: "level",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("branch")}</span>,
        accessorKey: "group",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("lecture date")}</span>,
        accessorKey: "date",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("start time")}</span>,
        accessorKey: "start_time",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("end time")}</span>,
        accessorKey: "end_time",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("zoom link")}</span>,
        accessorKey: "zoom_link",
        cell: (info: any) => {
          if (
            info.row.original.status === "inProgress" ||
            info.row.original.status === "setup"
          ) {
            return (
              <div className="flex gap-4">
                <Button className="text-xs bg-cyan-600">
                  <a
                    href={info.getValue()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("enter the lecture")}
                  </a>
                </Button>
                <Button className="text-xs">
                  <a
                    href={info.getValue()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("record attendance")}
                  </a>
                </Button>
              </div>
            );
          }
        },
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
      {data?.length > 0 ? (
        <Table data={data || []} columns={virtualClassesColumns} />
      ) : (
        <p className="text-xl font-bold text-center text-mainColor">
          {t("there is no today lecture yet")}
        </p>
      )}
    </div>
  );
};

export default InstructorVirtualClasses;
