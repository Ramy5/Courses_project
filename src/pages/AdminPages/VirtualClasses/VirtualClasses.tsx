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
  const virtualClassesData = [
    {
      index: 1,
      subject: "Physics",
      academicProgram: "Artificial Intelligence",
      level: "Level Three",
      branch: "Computer Science",
      lectureDate: "21/5/2025",
      startTime: "8 AM",
      endTime: "10 AM",
      zoomLink: "https://zoom.us/j",
      status: "green",
    },
    {
      index: 2,
      subject: "Physics",
      academicProgram: "Artificial Intelligence",
      level: "Level Three",
      branch: "Computer Science",
      lectureDate: "21/5/2025",
      startTime: "8 AM",
      endTime: "10 AM",
      zoomLink: "https://zoom.us/j",
      status: "red",
    },
    {
      index: 3,
      subject: "Physics",
      academicProgram: "Artificial Intelligence",
      level: "Level Three",
      branch: "Computer Science",
      lectureDate: "21/5/2025",
      startTime: "8 AM",
      endTime: "10 AM",
      zoomLink: "https://zoom.us/j",
      status: "orange",
    },
    {
      index: 4,
      subject: "Physics",
      academicProgram: "Artificial Intelligence",
      level: "Level Three",
      branch: "Computer Science",
      lectureDate: "21/5/2025",
      startTime: "8 AM",
      endTime: "10 AM",
      zoomLink: "https://zoom.us/j",
      status: "green",
    },
    {
      index: 5,
      subject: "Physics",
      academicProgram: "Artificial Intelligence",
      level: "Level Three",
      branch: "Computer Science",
      lectureDate: "21/5/2025",
      startTime: "8 AM",
      endTime: "10 AM",
      zoomLink: "https://zoom.us/j",
      status: "green",
    },
    {
      index: 6,
      subject: "Physics",
      academicProgram: "Artificial Intelligence",
      level: "Level Three",
      branch: "Computer Science",
      lectureDate: "21/5/2025",
      startTime: "8 AM",
      endTime: "10 AM",
      zoomLink: "-",
      status: "red",
    },
  ];

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["get-virtual-classes"],
    queryFn: getVirtualClassesData,
  });
  console.log("🚀 ~ VirtualClasses ~ data:", data);

  const virtualClassesColumns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "status",
        cell: (info) => {
          let statusColor;
          switch (info.getValue()) {
            case "inProgress":
              statusColor = "bg-green-700";
              break;
            case "setup":
              statusColor = "bg-[#D42828]";
              break;
            case "orange":
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
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("academic program")}</span>,
        accessorKey: "academicProgram",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("level")}</span>,
        accessorKey: "level",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("branch")}</span>,
        accessorKey: "branch",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("lecture date")}</span>,
        accessorKey: "lectureDate",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("start time")}</span>,
        accessorKey: "startTime",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("end time")}</span>,
        accessorKey: "endTime",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("zoom link")}</span>,
        accessorKey: "zoomLink",
        cell: (info: any) => (
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
      <Table data={data || []} columns={virtualClassesColumns} />
    </div>
  );
};

export default VirtualClasses;
