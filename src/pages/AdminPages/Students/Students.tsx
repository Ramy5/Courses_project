import { useEffect, useMemo, useRef, useState } from "react";
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
import useDebounce from "../../../hooks/useDebounce";

const fetchStudent = async (page: number) => {
  const { data } = await customFetch(`students?page=${page}`);
  return data.data;
};

// const fetchStudent = async (page: number) => {
//   const { data } = await customFetch(`students?page=${page}`);
//   return data.data;
// };

const Students = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debounceSearchTerm = useDebounce(search, 200);

  const {
    data: studentsData,
    error,
    isLoading,
    isRefetching,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["students"],
    queryFn: () => fetchStudent(page),
  });

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
        header: () => <span>{t("academic number")}</span>,
        accessorKey: "academicData",
        cell: (info) => info.getValue()?.Academic_code || "---",
      },
      {
        header: () => <span>{t("Student Name")}</span>,
        accessorKey: "full_name",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("program")}</span>,
        accessorKey: "academicData",
        cell: (info) => info.getValue()?.program?.program_name || "---",
      },
      {
        header: () => <span>{t("level")}</span>,
        accessorKey: "academicData",
        cell: (info) => info.getValue()?.level || "---",
      },
      {
        header: () => <span>{t("joined date")}</span>,
        accessorKey: "academicData",
        cell: (info) => info.getValue()?.joined_date || "---",
      },
      {
        header: () => <span>{t("Email Address")}</span>,
        accessorKey: "email",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("Payment Status")}</span>,
        accessorKey: "academicData",
        cell: (info) => {
          if (info.getValue()?.status === "محروم") {
            return (
              <span className="inline-block w-full px-2 text-red-800 bg-red-200 border rounded-md w-30 border-red-950">
                {t(`${info.getValue()?.status || "---"}`)}
              </span>
            );
          } else {
            return (
              <span className="inline-block w-full px-2 border rounded-md text-cyan-800 bg-cyan-200 w-30 border-cyan-950">
                {t(`${info.getValue()?.status || "---"}`)}
              </span>
            );
          }
        },
      },
    ],
    []
  );

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (debounceSearchTerm) {
      console.log(search);
    }
  }, [debounceSearchTerm]);

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
            <SearchInput
              name="studentSearch"
              value={search}
              className="w-64"
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search about student")}
            />
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
            data={studentsData?.students || []}
            columns={studentsColumns}
            showNavigation={true}
            totalPages={studentsData?.totalPages}
            currentPage={studentsData?.currentPage}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Students;
