import { useMemo, useState } from "react";
import { Button, SearchInput, Table, TitlePage } from "../../../components";
import { t } from "i18next";
import { PiStudent } from "react-icons/pi";
import { FaFilter } from "react-icons/fa";
import { FiPrinter } from "react-icons/fi";
import { ColumnDef } from "@tanstack/react-table";
import { IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";

const fetchStudent = async () => {
  const response = await customFetch("students");
  return response;
};

const Students = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  const {
    data: studentsData,
    error,
    isLoading,
    isRefetching,
    isFetching,
  } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudent,
  });

  // const studentsData = [
  //   {
  //     id: 1,
  //     studentName: "محمد يس احمد يس",
  //     program: "علوم حاسب",
  //     level: "الثالث",
  //     email: "jacob@yahoo.com",
  //     paymentStatus: "منتظم",
  //   },
  //   {
  //     id: 2,
  //     studentName: "محمد يس احمد يس",
  //     program: "علوم حاسب",
  //     level: "الثالث",
  //     email: "jacob@yahoo.com",
  //     paymentStatus: "محروم",
  //   },
  //   {
  //     id: 3,
  //     studentName: "محمد يس احمد يس",
  //     program: "علوم حاسب",
  //     level: "الثالث",
  //     email: "jacob@yahoo.com",
  //     paymentStatus: "منتظم",
  //   },
  //   {
  //     id: 4,
  //     studentName: "محمد يس احمد يس",
  //     program: "علوم حاسب",
  //     level: "الثالث",
  //     email: "jacob@yahoo.com",
  //     paymentStatus: "منتظم",
  //   },
  //   {
  //     id: 5,
  //     studentName: "محمد يس احمد يس",
  //     program: "علوم حاسب",
  //     level: "الثالث",
  //     email: "jacob@yahoo.com",
  //     paymentStatus: "منتظم",
  //   },
  //   {
  //     id: 6,
  //     studentName: "محمد يس احمد يس",
  //     program: "علوم حاسب",
  //     level: "الثالث",
  //     email: "jacob@yahoo.com",
  //     paymentStatus: "منتظم",
  //   },
  //   {
  //     id: 7,
  //     studentName: "محمد يس احمد يس",
  //     program: "علوم حاسب",
  //     level: "الثالث",
  //     email: "jacob@yahoo.com",
  //     paymentStatus: "منتظم",
  //   },
  //   {
  //     id: 8,
  //     studentName: "محمد يس احمد يس",
  //     program: "علوم حاسب",
  //     level: "الثالث",
  //     email: "jacob@yahoo.com",
  //     paymentStatus: "منتظم",
  //   },
  // ];

  const studentsColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "index",
        cell: (info) => {
          return (
            <IoMdEye
              className="mx-auto cursor-pointer lg:w-full text-mainColor"
              size={24}
              onClick={() =>
                navigate(`/students/studentProfile/${info.row.original.id}`)
              }
            />
          );
        },
      },
      {
        header: () => <span>{t("Student Name")}</span>,
        accessorKey: "full_name",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("country")}</span>,
        accessorKey: "country_residence",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("date birth")}</span>,
        accessorKey: "date_birth",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("qualification")}</span>,
        accessorKey: "qualification",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("type")}</span>,
        accessorKey: "type",
        cell: (info) => info.getValue(),
      },
      // {
      //   header: () => <span>{t("Program")}</span>,
      //   accessorKey: "program",
      //   cell: (info) => info.getValue(),
      // },
      // {
      //   header: () => <span>{t("Level")}</span>,
      //   accessorKey: "level",
      //   cell: (info) => <span>{t(`${info.getValue()}`)}</span>,
      // },
      {
        header: () => <span>{t("nationality")}</span>,
        accessorKey: "nationality",
        cell: (info) => <span>{t(`${info.getValue()}`)}</span>,
      },
      {
        header: () => <span>{t("Email Address")}</span>,
        accessorKey: "email",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("Payment Status")}</span>,
        accessorKey: "paymentStatus",
        cell: (info) => {
          if (info.row.original.paymentStatus === "محروم") {
            return (
              <span className="inline-block w-full px-2 text-red-800 bg-red-200 border rounded-md w-30 border-red-950">
                {t(`${info.getValue()}`)}
              </span>
            );
          } else {
            return (
              <span className="inline-block w-full px-2 border rounded-md text-cyan-800 bg-cyan-200 w-30 border-cyan-950">
                {t(`${info.getValue()}`)}
              </span>
            );
          }
        },
      },
    ],
    []
  );

  if (isLoading || isRefetching || isFetching) return <Loading />;

  if (error)
    return (
      <div className="">
        <h2>{error.message}</h2>
      </div>
    );

  return (
    <div>
      <div>
        <TitlePage
          mainTitle={t("students data")}
          icon={<PiStudent size={28} className="font-bold fill-mainColor" />}
        />
      </div>

      <div className="p-6 bg-white rounded-xl">
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between">
          <p className="flex items-center gap-2">
            <span>
              <FaFilter size={24} className="text-mainColor" />
            </span>
            <span className="text-xl text-gray-700">{t("filter")}</span>
          </p>
          <div className="flex flex-wrap items-center gap-6 mt-4 lg:gap-12 lg:mt-0">
            <SearchInput />
            <Button
              type="button"
              className="text-xl font-medium"
              action={() => navigate("/students/addStudent")}
            >
              {t("add student +")}
            </Button>
            <p>
              <FiPrinter size={24} className="cursor-pointer text-mainColor" />
            </p>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-6">
          <Table
            data={studentsData?.data?.data?.students || []}
            columns={studentsColumns}
            showNavigation={true}
            totalPages={40}
            currentPage={page}
          />
        </div>
      </div>
    </div>
  );
};

export default Students;
