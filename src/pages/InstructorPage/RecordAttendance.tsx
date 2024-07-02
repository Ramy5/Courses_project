import { useMemo, useState } from "react";
import { t } from "i18next";
import { ColumnDef } from "@tanstack/react-table";
import { Button, DateInputField, Table } from "../../components";
import Select from "react-select";
import { Form, Formik } from "formik";
import selectStyle from "../../utils/selectStyle";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const RecordAttendance = () => {
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const handleCheckboxChange = (event: any, selectedRow: any) => {
    const checkboxId = event.target.id;
    if (event.target.checked) {
      setSelectedRows((prevSelectedItems: any) => [
        ...prevSelectedItems,
        selectedRow.row.original,
      ]);
    } else {
      setSelectedRows((prevSelectedItems: any) =>
        prevSelectedItems.filter((item: any) => item.id !== Number(checkboxId))
      );
    }
  };

  const examsTodayData = [
    {
      id: 1,
      student_name: "محمد احمد يوسف ",
      studentCode: "٦٢٣٥٦٥٧٨٨٧٧",
      absence_rate: 10,
      presence: "no",
    },
    {
      id: 2,
      student_name: "محمد احمد يوسف ",
      studentCode: "٦٢٣٥٦٥٧٨٨٧٧",
      absence_rate: 18,
      presence: "yes",
    },
    {
      id: 3,
      student_name: "محمد احمد يوسف ",
      studentCode: "٦٢٣٥٦٥٧٨٨٧٧",
      absence_rate: 8,
      presence: "no",
    },
    {
      id: 4,
      student_name: "محمد احمد يوسف ",
      studentCode: "٦٢٣٥٦٥٧٨٨٧٧",
      absence_rate: 75,
      presence: "yes",
    },
    {
      id: 5,
      student_name: "محمد احمد يوسف ",
      studentCode: "٦٢٣٥٦٥٧٨٨٧٧",
      absence_rate: 50,
      presence: "no",
    },
    {
      id: 6,
      student_name: "محمد احمد يوسف ",
      studentCode: "٦٢٣٥٦٥٧٨٨٧٧",
      absence_rate: 90,
      presence: "no",
    },
  ];

  const examsTodayColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("#")}</span>,
        accessorKey: "index",
        cell: (info) => info.row.index + 1,
      },
      {
        header: () => <span>{t("Student Name")}</span>,
        accessorKey: "student_name",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("studentCode")}</span>,
        accessorKey: "studentCode",
        cell: (info) => <span>{t(`${info.getValue()}`)}</span>,
      },
      {
        header: () => <span>{t("absence rate")}</span>,
        accessorKey: "absence_rate",
        cell: (info) => {
          const colorAbsence =
            Number(info.getValue()) <= 15
              ? "#46BD84"
              : Number(info.getValue()) > 15 && Number(info.getValue()) < 50
              ? "#FEAE4F"
              : Number(info.getValue()) >= 50
              ? "#E63329"
              : "";
          return (
            <CircularProgressbar
              className="w-12 font-bold m-auto"
              value={Number(info.getValue())}
              text={`${Number(info.getValue())}%`}
              strokeWidth={11}
              styles={buildStyles({
                textColor: colorAbsence,
                pathColor: colorAbsence,
                trailColor: "#ECF3FE",
                textSize: "27px",
              })}
            />
          );
        },
      },
      {
        header: () => <span>{t("presence")}</span>,
        accessorKey: "presence",
        cell: (info: any) => {
          return (
            <div className="flex items-center justify-center gap-4">
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer"
                id={info.row.original.id}
                name="selectedItem"
                onClick={(event) => handleCheckboxChange(event, info)}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const courseOption = [
    {
      id: 1,
      value: "ذكاء اصطناعي",
      label: "ذكاء اصطناعي",
    },
    {
      id: 2,
      value: "حاسبات ومعلومات",
      label: "حاسبات ومعلومات",
    },
    {
      id: 3,
      value: "نظم ومعلومات",
      label: "نظم ومعلومات",
    },
  ];

  const initialValues = {
    Courses: "",
    lecture_date: "",
  };

  return (
    <div>
      <div className="bg-[#F9F9F9] rounded-3xl py-5 px-8 main_shadow mb-5">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log("🚀 ~ RecordAttendance ~ values:", values);
          }}
        >
          {({ setFieldValue }) => {
            return (
              <Form className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="Courses" className="font-bold">
                    {t("courses")}
                  </label>
                  <Select
                    placeholder={t("courses")}
                    className="mt-2"
                    id="Courses"
                    name="Courses"
                    options={courseOption}
                    // value={values?.level_academic}
                    onChange={(e) => {
                      setFieldValue("Courses", e.value);
                    }}
                    styles={selectStyle}
                  />
                </div>
                <div>
                  <DateInputField
                    label={`${t("lecture date")}`}
                    placeholder={`${t("date of birth")}`}
                    name="lecture_date"
                    labelProps={{
                      style: { fontWeight: "700", marginBottom: "6px" },
                    }}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>

      <div className="bg-white p-5 rounded-3xl">
        <div>
          <Table
            data={examsTodayData}
            columns={examsTodayColumns}
            showNavigation={true}
            totalPages={40}
            currentPage={"1"}
          />
        </div>
      </div>

      <div className="flex justify-end items-center my-8">
        <Button>{t("submit")}</Button>
      </div>
    </div>
  );
};

export default RecordAttendance;
