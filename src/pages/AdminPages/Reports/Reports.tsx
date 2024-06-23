import { Form, Formik } from "formik";
import { t } from "i18next";
import Select from "react-select";
import { SearchInput, Table } from "../../../components";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FiPrinter } from "react-icons/fi";

type reportsFilter = "program" | "level" | "course";

const Reports = () => {
  const initialValues: Record<reportsFilter, string> = {
    course: "",
    level: "",
    program: "",
  };

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
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("student number")}</span>,
        accessorKey: "studentNumber",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("student name")}</span>,
        accessorKey: "studentName",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("section")}</span>,
        accessorKey: "section",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("grade")}</span>,
        accessorKey: "grade",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("percentage")}</span>,
        accessorKey: "percentage",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("status")}</span>,
        accessorKey: "status",
        cell: (info) => {
          return <span>{t(`${info.getValue()}`)}</span>;
        },
      },
    ],
    []
  );

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
                  <Select className="mt-1" id="program" name="program" />
                </div>
                <div className="w-52">
                  <label className="font-bold" htmlFor="level">
                    {t("level")}
                  </label>
                  <Select className="mt-1" id="level" name="level" />
                </div>
                <div className="w-52">
                  <label className="font-bold" htmlFor="course">
                    {t("course")}
                  </label>
                  <Select className="mt-1" id="course" name="course" />
                </div>
                <div className="flex items-center self-end gap-8 ">
                  <SearchInput />
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
              data={studentsData}
              columns={studentsColumns}
              showNavigation={true}
              totalPages={40}
              currentPage={"1"}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default Reports;
