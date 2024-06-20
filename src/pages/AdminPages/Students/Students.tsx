import { useMemo, useRef } from "react";
import { Button, SearchInput, Table, TitlePage } from "../../../components";
import { t } from "i18next";
import { PiStudent } from "react-icons/pi";
import { FaFilter } from "react-icons/fa";
import { FiPrinter } from "react-icons/fi";
import { ColumnDef } from "@tanstack/react-table";
import { IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const navigate = useNavigate();

  const studentsData = [
    {
      id: 1,
      studentName: "محمد يس احمد يس",
      program: "علوم حاسب",
      level: "الثالث",
      email: "jacob@yahoo.com",
      paymentStatus: "منتظم",
    },
    {
      id: 2,
      studentName: "محمد يس احمد يس",
      program: "علوم حاسب",
      level: "الثالث",
      email: "jacob@yahoo.com",
      paymentStatus: "محروم",
    },
    {
      id: 3,
      studentName: "محمد يس احمد يس",
      program: "علوم حاسب",
      level: "الثالث",
      email: "jacob@yahoo.com",
      paymentStatus: "منتظم",
    },
    {
      id: 4,
      studentName: "محمد يس احمد يس",
      program: "علوم حاسب",
      level: "الثالث",
      email: "jacob@yahoo.com",
      paymentStatus: "منتظم",
    },
    {
      id: 5,
      studentName: "محمد يس احمد يس",
      program: "علوم حاسب",
      level: "الثالث",
      email: "jacob@yahoo.com",
      paymentStatus: "منتظم",
    },
    {
      id: 6,
      studentName: "محمد يس احمد يس",
      program: "علوم حاسب",
      level: "الثالث",
      email: "jacob@yahoo.com",
      paymentStatus: "منتظم",
    },
    {
      id: 7,
      studentName: "محمد يس احمد يس",
      program: "علوم حاسب",
      level: "الثالث",
      email: "jacob@yahoo.com",
      paymentStatus: "منتظم",
    },
    {
      id: 8,
      studentName: "محمد يس احمد يس",
      program: "علوم حاسب",
      level: "الثالث",
      email: "jacob@yahoo.com",
      paymentStatus: "منتظم",
    },
  ];

  const studentsColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "index",
        cell: (info) => {
          return (
            <IoMdEye
              className="w-full mx-auto cursor-pointer text-mainColor"
              size={24}
              onClick={() =>
                navigate(`/studentProfile/${info.row.original.id}`)
              }
            />
          );
        },
      },
      {
        header: () => <span>{t("Student Name")}</span>,
        accessorKey: "studentName",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("Program")}</span>,
        accessorKey: "program",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("Level")}</span>,
        accessorKey: "level",
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
          <div className="flex items-center gap-12">
            <SearchInput />
            <Button type="button" className="text-xl font-medium">
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
            data={studentsData}
            columns={studentsColumns}
            showNavigation={true}
            totalPages={40}
            currentPage={"1"}
          />
        </div>
      </div>
    </div>
  );
};

export default Students;
