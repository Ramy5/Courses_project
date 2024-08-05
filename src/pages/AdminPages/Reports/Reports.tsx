import { Form, Formik } from "formik";
import { t } from "i18next";
import Select from "react-select";
import { SearchInput, Table } from "../../../components";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FiPrinter } from "react-icons/fi";
import useDebounce from "../../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import Loading from "../../../components/UI/Loading";

type reportsFilter = "program" | "level" | "course";

const getReport = async (page: number, search: string="", levelID: string="", courseID:string="") => {
  const { data } = await customFetch(
    `getProgramCoursesLevel?level=${levelID}&course_id=${courseID}`
  );
  return data.data;
};
 
const getAllPrograms = async () => {
  const { data } = await customFetch("programs");
  return data.data;
};

const getAllCourses = async (programId: number) => {
  const { data } = await customFetch(`courses?program_id=${programId}`);
  return data.data;
};
 
const Reports = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debounceSearchTerm = useDebounce(search, 400);
  const [programSelect, setProgramSelect] = useState(null);
  const [levelSelect, setLevelSelect] = useState(null);
  const [courseSelect, setCourseSelect] = useState(null);

  const initialValues: Record<reportsFilter, string> = {
    course: "",
    level: "",
    program: "",
  };

  const {
    data: studentReportsData,
    isLoading,
    isRefetching,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["students-reports"],
    queryFn: () => getReport(page, search, levelSelect?.id, courseSelect?.id),
  });
  console.log("🚀 ~ Reports ~ studentReportsData:", studentReportsData);

  const {
    data: programsOptions,
    isLoading: programIsLoading,
    isFetching: programIsFetching,
    isRefetching: programIsRefetching,
  } = useQuery({
    queryKey: ["get-all-programs"],
    queryFn: getAllPrograms,
    select: (data) => {
      return data?.programs?.map((program) => {
        return {
          id: program?.id,
          label: program?.program_name,
          value: program?.id,
        };
      });
    },
  });

  const {
    data: coursesOptions,
    isLoading: coursesIsLoading,
    isFetching: coursesIsFetching,
    isRefetching: coursesIsRefetching,
    refetch: coursesRefetch,
  } = useQuery({
    queryKey: ["get-all-courses"],
    queryFn: () => getAllCourses(programSelect?.id),
    select: (data) => {
      return data?.courses?.map((course) => {
        return {
          id: course?.id,
          label: course?.course_name,
          value: course?.id,
        };
      });
    },
  });

  const levelsOption = [
    {
      label: `${t("level")} 1`,
      value: "level 1",
      id: 1,
    },
    {
      label: `${t("level")} 2`,
      value: "level 2",
      id: 2,
    },
    {
      label: `${t("level")} 3`,
      value: "level 3",
      id: 3,
    },
    {
      label: `${t("level")} 4`,
      value: "level 4",
      id: 4,
    },
  ];

  const studentsData = [
    {
      index: 1,
      studentNumber: "12545454",
      studentName: "Mohamed Youssef Ahmed",
      section: "Group 2",
      grade: 60,
      percentage: "60%",
      status: "accepted",
    },
    {
      index: 2,
      studentNumber: "12545455",
      studentName: "Ali Hassan Mohamed",
      section: "Group 2",
      grade: 60,
      percentage: "60%",
      status: "accepted",
    },
    {
      index: 3,
      studentNumber: "12545456",
      studentName: "Sara Ali Ahmed",
      section: "Group 2",
      grade: 60,
      percentage: "60%",
      status: "accepted",
    },
    {
      index: 4,
      studentNumber: "12545457",
      studentName: "Ahmed Mohamed Salah",
      section: "Group 2",
      grade: 60,
      percentage: "60%",
      status: "accepted",
    },
    {
      index: 5,
      studentNumber: "12545458",
      studentName: "Laila Mahmoud Youssef",
      section: "Group 2",
      grade: 60,
      percentage: "60%",
      status: "accepted",
    },
    {
      index: 6,
      studentNumber: "12545459",
      studentName: "Khaled Ibrahim Ali",
      section: "Group 2",
      grade: 60,
      percentage: "60%",
      status: "accepted",
    },
    {
      index: 7,
      studentNumber: "12545460",
      studentName: "Fatima Omar Youssef",
      section: "Group 2",
      grade: 60,
      percentage: "60%",
      status: "accepted",
    },
  ];

  const studentsColumns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        header: () => <span>{t("#")}</span>,
        accessorKey: "index",
        cell: (info) => info.row.index + 1,
      },
      {
        header: () => <span>{t("student number")}</span>,
        accessorKey: "academic_data",
        cell: (info) => info.getValue()?.Academic_code || "---",
      },
      {
        header: () => <span>{t("student name")}</span>,
        accessorKey: "full_name",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("section")}</span>,
        accessorKey: "academic_data",
        cell: (info) => info.getValue()?.group || "---",
      },
      {
        header: () => <span>{t("grade")}</span>,
        accessorKey: "total_degree",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("percentage")}</span>,
        accessorKey: "percentage",
        cell: (info) => `${Number(info.getValue())?.toFixed(2)}%` || "---",
      },
      {
        header: () => <span>{t("status")}</span>,
        accessorKey: "performance",
        cell: (info) => {
          // const target = info.getValue()?.program;
          // let grade;
          // console.log(parseInt(info.row.original?.attend_percentage));

          // if (
          //   parseInt(info.row.original?.attend_percentage) >=
          //     target?.acceptable &&
          //   parseInt(info.row.original?.attend_percentage) <= target?.good
          // ) {
          //   grade = "acceptable";
          // } else if (
          //   parseInt(info.row.original?.attend_percentage) >= target?.good &&
          //   parseInt(info.row.original?.attend_percentage) <= target?.very_good
          // ) {
          //   grade = "good";
          // } else if (
          //   parseInt(info.row.original?.attend_percentage) >=
          //     target?.very_good &&
          //   parseInt(info.row.original?.attend_percentage) <= target?.excellence
          // ) {
          //   grade = "very good";
          // } else {
          //   grade = "excellence";
          // }

          return <span>{t(`${info.getValue()}`)}</span>;
        },
      },
    ],
    []
  );

  useEffect(() => {
    refetch();
  }, [page, programSelect, levelSelect, courseSelect]);

  useEffect(() => {
    if (debounceSearchTerm.length >= 0) {
      setPage(1);
      refetch();
    }
  }, [debounceSearchTerm]);

  useEffect(() => {
    coursesRefetch();
  }, [programSelect]);

  if (isLoading || isRefetching || isFetching) return <Loading />;

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
      {({ values, setFieldValue }) => {
        return (
          <Form className="bg-white rounded-xl">
            <div className="p-6">
              <h3 className="mb-6 text-2xl font-bold">
                {t("students results")}
              </h3>
              <div className="grid items-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="w-52">
                  <label className="font-bold" htmlFor="program">
                    {t("program")}
                  </label>
                  <Select
                    id="program"
                    name="program"
                    placeholder={t("select a program")}
                    options={programsOptions}
                    isLoading={
                      programIsLoading ||
                      programIsFetching ||
                      programIsRefetching
                    }
                    value={programSelect}
                    onChange={(e) => {
                      setProgramSelect(e);
                      setFieldValue("program", e.id);
                    }}
                  />
                </div>
                <div className="w-52">
                  <label className="font-bold" htmlFor="course">
                    {t("course")}
                  </label>
                  <Select
                    id="course"
                    name="course"
                    placeholder={t("select a course")}
                    options={coursesOptions}
                    value={courseSelect}
                    isDisabled={
                      programIsLoading ||
                      programIsFetching ||
                      programIsRefetching
                    }
                    isLoading={
                      coursesIsLoading ||
                      coursesIsFetching ||
                      coursesIsRefetching
                    }
                    onChange={(e) => {
                      setCourseSelect(e);
                      setFieldValue("course", e.id);
                    }}
                  />
                </div>
                <div className="w-52">
                  <label className="font-bold" htmlFor="level">
                    {t("level")}
                  </label>
                  <Select
                    id="level"
                    name="level"
                    placeholder={t("select the level")}
                    options={levelsOption}
                    value={levelSelect}
                    onChange={(e) => {
                      setLevelSelect(e);
                      setFieldValue("level", e.id);
                    }}
                  />
                </div>

                <div className="flex items-center self-end gap-8 ">
                  <SearchInput
                    name="reportSearch"
                    value={search}
                    className="w-44"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("search about student")}
                  />
                  <p>
                    <FiPrinter
                      size={24}
                      className="cursor-pointer text-mainColor"
                    />
                  </p>
                </div>
              </div>
            </div>
            <Table
              data={studentReportsData || []}
              columns={studentsColumns}
              showNavigation={true}
              totalPages={10}
              currentPage={1}
              setPage={setPage}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default Reports;
