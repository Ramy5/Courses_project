import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { Table, TitlePage } from "../../../components";
import Select from "react-select";
import { Form, Formik } from "formik";
import { FiFileText } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import Loading from "../../../components/UI/Loading";
import BaseSelect from "../../../components/UI/BaseSelect";

type testFilter = "program" | "level";

const getAllPrograms = async () => {
  const { data } = await customFetch("programs");
  return data.data;
};

const getAllStudentsTest = async (
  programId: string = "",
  levelId: string = ""
) => {
  const { data } = await customFetch(
    `examMange?program_id=${programId}&level=${levelId}`
  );
  return data.data;
};

const TestManagement = () => {
  const [programSelect, setProgramSelect] = useState(null);
  const [levelSelect, setLevelSelect] = useState(null);
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const initialValues: Record<testFilter, string> = {
    program: "",
    level: "",
  };

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
    data: examsData,
    isLoading: examIsLoading,
    isFetching: examIsFetching,
    isRefetching: examIsRefetching,
    refetch: examRefetch,
  } = useQuery({
    queryKey: ["get-all-exams"],
    queryFn: () => getAllStudentsTest(programSelect?.id, levelSelect?.id),
  });

  const examsFlatData = examsData?.map((exam) => exam.exam)?.flat();

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

  const examsDatas = [
    {
      index: 1,
      subject: "Physics",
      examTitle: "End of Semester Exam 1",
      examDate: "2/2/2022",
      questionCount: 40,
      duration: "40 minutes",
      finalScore: 40,
      status: "approved",
    },
    {
      index: 2,
      subject: "Physics",
      examTitle: "Midterm Exam 1",
      examDate: "2/2/2022",
      questionCount: 40,
      duration: "40 minutes",
      finalScore: 40,
      status: "approved",
    },
    {
      index: 3,
      subject: "Physics",
      examTitle: "End of Semester Exam 1",
      examDate: "2/2/2022",
      questionCount: 40,
      duration: "40 minutes",
      finalScore: 40,
      status: "approved",
    },
    {
      index: 4,
      subject: "Physics",
      examTitle: "End of Semester Exam 1",
      examDate: "2/2/2022",
      questionCount: 40,
      duration: "40 minutes",
      finalScore: 40,
      status: "approved",
    },
    {
      index: 5,
      subject: "Physics",
      examTitle: "End of Semester Exam 1",
      examDate: "2/2/2022",
      questionCount: 40,
      duration: "40 minutes",
      finalScore: 40,
      status: "pending approval",
    },
    {
      index: 6,
      subject: "Physics",
      examTitle: "End of Semester Exam 1",
      examDate: "2/2/2022",
      questionCount: 40,
      duration: "40 minutes",
      finalScore: 40,
      status: "pending approval",
    },
    {
      index: 7,
      subject: "Physics",
      examTitle: "End of Semester Exam 1",
      examDate: "2/2/2022",
      questionCount: 40,
      duration: "40 minutes",
      finalScore: 40,
      status: "pending approval",
    },
  ];

  const examsColumns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        header: () => <span>{t("subject")}</span>,
        accessorKey: "course",
        cell: (info) => info.getValue()?.course_name || "---",
      },
      {
        header: () => <span>{t("exam title")}</span>,
        accessorKey: "title",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("exam date")}</span>,
        accessorKey: "date",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("number of questions")}</span>,
        accessorKey: "questionCount",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("duration")}</span>,
        accessorKey: "duration",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("final score")}</span>,
        accessorKey: "total_score",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("exam status")}</span>,
        accessorKey: "approved",
        cell: (info) => {
          if (info.getValue()?.is_approved === 1) {
            return (
              <span className="inline-block w-full px-2 text-green-800">
                {t("approved")}
              </span>
            );
          } else {
            return (
              <button
                onClick={() =>
                  navigate(
                    `/testManagement/testApproved/${info.row.original.course_id}`,
                    { state: info.row.original.id }
                  )
                }
                className="inline-block w-full px-2 text-red-800 bg-red-200 border rounded-md w-30 border-red-950"
              >
                {t("pending approval")}
              </button>
            );
          }
        },
      },
    ],
    []
  );

  useEffect(() => {
    examRefetch();
  }, [page, programSelect, levelSelect]);

  if (examIsLoading || examIsFetching || examIsRefetching) return <Loading />;

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
      {({ setFieldValue }) => {
        return (
          <Form>
            <TitlePage
              mainTitle={t("test management")}
              icon={<FiFileText className="text-xl text-mainColor" />}
            />

            <div className="bg-white rounded-2xl">
              <div className="flex flex-wrap items-center gap-10 px-4 py-6">
                <div>
                  <BaseSelect
                    id="program"
                    name="program"
                    className="w-56 mt-1"
                    placeholder={t("select a program")}
                    label={t("program")}
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
                <div>
                  <BaseSelect
                    id="level"
                    name="level"
                    label={t("level")}
                    className="w-56 mt-1"
                    placeholder={t("select the level")}
                    options={levelsOption}
                    value={levelSelect}
                    onChange={(e) => {
                      setLevelSelect(e);
                      setFieldValue("level", e.id);
                    }}
                  />
                </div>
              </div>

              {examsFlatData.length > 0 ? (
                <Table
                  data={examsFlatData || []}
                  columns={examsColumns}
                  // showNavigation={true}
                  // totalPages={40}
                  // currentPage={1}
                  setPage={setPage}
                ></Table>
              ) : (
                <p className="py-2 text-xl font-bold text-center text-mainColor">
                  {t("there is no exams yet")}
                </p>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TestManagement;
